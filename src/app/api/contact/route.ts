import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  website?: string;
};

type RateLimitBucket = {
  hits: number;
  windowStart: number;
  blockedUntil: number;
  lastSeen: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_BLOCK_MS = 20 * 60 * 1000;
const RATE_LIMIT_MAX_ENTRIES = 5000;

const MAX_NAME_LENGTH = 80;
const MAX_PHONE_LENGTH = 40;
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 3000;
const PHONE_PATTERN = /^[0-9+().\-\s]{6,30}$/;

const rateLimitStore = new Map<string, RateLimitBucket>();

function value(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePort(input: string) {
  const parsed = Number(input);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    return null;
  }
  return parsed;
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function jsonResponse(payload: { ok: boolean; error?: string }, status: number, extraHeaders?: Record<string, string>) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function isSameHost(sourceUrl: string, host: string) {
  try {
    return new URL(sourceUrl).host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}

function getClientAddress(request: Request) {
  const forwardedFor = value(request.headers.get("x-forwarded-for"));
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0];
    if (first) {
      return first.trim();
    }
  }

  const realIp = value(request.headers.get("x-real-ip"));
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

function cleanupRateLimitStore(now: number) {
  if (rateLimitStore.size <= RATE_LIMIT_MAX_ENTRIES) {
    return;
  }

  for (const [key, bucket] of rateLimitStore.entries()) {
    if (bucket.lastSeen + RATE_LIMIT_BLOCK_MS < now) {
      rateLimitStore.delete(key);
    }
  }
}

function applyRateLimit(rateKey: string, now: number) {
  cleanupRateLimitStore(now);
  const current = rateLimitStore.get(rateKey);

  if (!current) {
    rateLimitStore.set(rateKey, {
      hits: 1,
      windowStart: now,
      blockedUntil: 0,
      lastSeen: now,
    });
    return { allowed: true as const };
  }

  current.lastSeen = now;

  if (current.blockedUntil > now) {
    return {
      allowed: false as const,
      retryAfterSeconds: Math.ceil((current.blockedUntil - now) / 1000),
    };
  }

  if (now - current.windowStart > RATE_LIMIT_WINDOW_MS) {
    current.windowStart = now;
    current.hits = 1;
    current.blockedUntil = 0;
    return { allowed: true as const };
  }

  current.hits += 1;

  if (current.hits > RATE_LIMIT_MAX_REQUESTS) {
    current.blockedUntil = now + RATE_LIMIT_BLOCK_MS;
    return {
      allowed: false as const,
      retryAfterSeconds: Math.ceil(RATE_LIMIT_BLOCK_MS / 1000),
    };
  }

  return { allowed: true as const };
}

function validatePayload(payload: ContactPayload) {
  const name = value(payload.name);
  const phone = value(payload.phone);
  const email = value(payload.email);
  const message = value(payload.message);
  const website = value(payload.website);

  if (!name || !phone || !email || !message) {
    return { ok: false as const, error: "Vyplňte prosím všechna povinná pole." };
  }

  if (website) {
    return { ok: false as const, spamTrap: true as const };
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    phone.length > MAX_PHONE_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return {
      ok: false as const,
      error: "Některé pole překročilo maximální povolenou délku.",
    };
  }

  if (!isValidEmail(email)) {
    return { ok: false as const, error: "Zadejte platný e-mail." };
  }

  if (!PHONE_PATTERN.test(phone)) {
    return { ok: false as const, error: "Telefon má neplatný formát." };
  }

  return { ok: true as const, name, phone, email, message };
}

export async function POST(request: Request) {
  const host = value(request.headers.get("x-forwarded-host") ?? request.headers.get("host")).toLowerCase();
  const origin = value(request.headers.get("origin"));
  const referer = value(request.headers.get("referer"));

  if (!host || (!origin && !referer)) {
    return jsonResponse({ ok: false, error: "Neplatný původ požadavku." }, 403);
  }

  if ((origin && !isSameHost(origin, host)) || (!origin && referer && !isSameHost(referer, host))) {
    return jsonResponse({ ok: false, error: "Neplatný původ požadavku." }, 403);
  }

  const now = Date.now();
  const clientAddress = getClientAddress(request);
  const userAgent = value(request.headers.get("user-agent")).slice(0, 120) || "unknown";
  const rateKey = `${clientAddress}|${userAgent}`;
  const rateLimit = applyRateLimit(rateKey, now);

  if (!rateLimit.allowed) {
    return jsonResponse(
      { ok: false, error: "Byl překročen limit požadavků. Zkuste to prosím později." },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse({ ok: false, error: "Neplatný formát požadavku." }, 400);
  }

  const payloadResult = validatePayload(body);
  if (!payloadResult.ok) {
    if ("spamTrap" in payloadResult && payloadResult.spamTrap) {
      return jsonResponse({ ok: true }, 200);
    }
    return jsonResponse({ ok: false, error: payloadResult.error }, 400);
  }

  const hostValue = value(process.env.SMTP_HOST);
  const user = value(process.env.SMTP_USER);
  const pass = value(process.env.SMTP_PASS);
  const portValue = value(process.env.SMTP_PORT) || "465";
  const port = normalizePort(portValue);
  const secureValue = value(process.env.SMTP_SECURE).toLowerCase();
  const secure = secureValue ? secureValue === "true" : port === 465;

  if (!hostValue || !user || !pass || port === null) {
    return jsonResponse({ ok: false, error: "Mail server není nastavený." }, 500);
  }

  const from = user;
  const to = value(process.env.CONTACT_TO) || user;
  const recipients = to
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (!isValidEmail(from)) {
    return jsonResponse({ ok: false, error: "Mail server není správně nastavený." }, 500);
  }

  if (recipients.length === 0 || recipients.some((address) => !isValidEmail(address))) {
    return jsonResponse({ ok: false, error: "Příjemce e-mailu není správně nastavený." }, 500);
  }

  const transporter = nodemailer.createTransport({
    host: hostValue,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from,
      sender: from,
      to: recipients.join(", "),
      envelope: {
        from,
        to: recipients,
      },
      replyTo: `${payloadResult.name} <${payloadResult.email}>`,
      subject: `Nová poptávka z webu | ${payloadResult.name}`,
      text: `Jméno: ${payloadResult.name}\nTelefon: ${payloadResult.phone}\nE-mail: ${payloadResult.email}\n\nZpráva:\n${payloadResult.message}`,
      html: `
        <h2>Nová poptávka z webu</h2>
        <p><strong>Jméno:</strong> ${escapeHtml(payloadResult.name)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(payloadResult.phone)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(payloadResult.email)}</p>
        <p><strong>Zpráva:</strong></p>
        <p>${escapeHtml(payloadResult.message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return jsonResponse({ ok: true }, 200);
  } catch (error) {
    const incidentId = randomUUID();
    console.error(`[contact-form:${incidentId}]`, error);

    return jsonResponse(
      {
        ok: false,
        error: `Nepodařilo se odeslat poptávku. Zkuste to prosím později. (ID: ${incidentId})`,
      },
      500,
    );
  }
}


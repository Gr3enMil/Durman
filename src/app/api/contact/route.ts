import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

function value(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = value(body.name);
    const phone = value(body.phone);
    const email = value(body.email);
    const message = value(body.message);

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Vyplňte prosím všechna povinná pole." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Zadejte platný e-mail." }, { status: 400 });
    }

    const host = value(process.env.SMTP_HOST);
    const user = value(process.env.SMTP_USER);
    const pass = value(process.env.SMTP_PASS);
    const port = Number(value(process.env.SMTP_PORT) || "465");
    const secureValue = value(process.env.SMTP_SECURE).toLowerCase();
    const secure = secureValue ? secureValue === "true" : port === 465;

    if (!host || !user || !pass || Number.isNaN(port)) {
      return NextResponse.json(
        { ok: false, error: "Mail server není nastavený. Doplňte prosím hodnoty v .env." },
        { status: 500 },
      );
    }

    const from = user;
    const to = value(process.env.CONTACT_TO) || user;
    const recipients = to
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean);

    if (!isValidEmail(from)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Proměnná SMTP_USER musí být kompletní přihlašovací e-mail (např. vas-email@seznam.cz).",
        },
        { status: 500 },
      );
    }

    if (recipients.length === 0 || recipients.some((address) => !isValidEmail(address))) {
      return NextResponse.json(
        {
          ok: false,
          error: "Proměnná CONTACT_TO musí obsahovat platný e-mail nebo více e-mailů oddělených čárkou.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from,
      sender: from,
      to: recipients.join(", "),
      envelope: {
        from,
        to: recipients,
      },
      replyTo: `${name} <${email}>`,
      subject: `Nová poptávka z webu | ${name}`,
      text: `Jméno: ${name}\nTelefon: ${phone}\nE-mail: ${email}\n\nZpráva:\n${message}`,
      html: `
        <h2>Nová poptávka z webu</h2>
        <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Zpráva:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Mail server odmítl požadavek.";
    const seznamFromError = "550 5.7.1 use your login email address as mail from";
    const normalized = message.toLowerCase();

    if (normalized.includes("550 5.7.1") || normalized.includes(seznamFromError)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "SMTP server odmítl odesílatele. U Seznamu musí být SMTP_USER přihlašovací e-mail a musí být stejný jako odesílatel.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { ok: false, error: `Nepodařilo se odeslat poptávku. ${message}` },
      { status: 500 },
    );
  }
}

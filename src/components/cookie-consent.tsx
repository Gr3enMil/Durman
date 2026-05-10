"use client";

import { useEffect, useState } from "react";
import styles from "./cookie-consent.module.css";

const CONSENT_COOKIE = "durman_cookie_consent";
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const OPEN_SETTINGS_EVENT = "open-cookie-settings";

type StoredConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

type ConsentDraft = {
  analytics: boolean;
  marketing: boolean;
};

function parseCookieValue(name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function readStoredConsent(): StoredConsent | null {
  const raw = parseCookieValue(CONSENT_COOKIE);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (
      parsed.necessary === true &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean" &&
      typeof parsed.updatedAt === "string"
    ) {
      return parsed as StoredConsent;
    }
  } catch {
    return null;
  }

  return null;
}

function applyConsentToDocument(consent: StoredConsent) {
  document.documentElement.dataset.cookieAnalytics = consent.analytics ? "granted" : "denied";
  document.documentElement.dataset.cookieMarketing = consent.marketing ? "granted" : "denied";
}

function writeStoredConsent(consent: StoredConsent) {
  const payload = encodeURIComponent(JSON.stringify(consent));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${payload}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  applyConsentToDocument(consent);
}

function buildStoredConsent(draft: ConsentDraft): StoredConsent {
  return {
    necessary: true,
    analytics: draft.analytics,
    marketing: draft.marketing,
    updatedAt: new Date().toISOString(),
  };
}

function defaultDraft() {
  return {
    analytics: false,
    marketing: false,
  };
}

function getInitialDraft() {
  if (typeof document === "undefined") {
    return defaultDraft();
  }

  const stored = readStoredConsent();
  if (!stored) {
    return defaultDraft();
  }

  return {
    analytics: stored.analytics,
    marketing: stored.marketing,
  };
}

function getInitialVisibility() {
  if (typeof document === "undefined") {
    return false;
  }

  return readStoredConsent() === null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(getInitialVisibility);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentDraft>(getInitialDraft);

  useEffect(() => {
    const stored = readStoredConsent();

    if (stored) {
      applyConsentToDocument(stored);
    } else {
      applyConsentToDocument(buildStoredConsent(defaultDraft()));
    }

    const openSettings = () => {
      const current = readStoredConsent();
      if (current) {
        setDraft({
          analytics: current.analytics,
          marketing: current.marketing,
        });
      }
      setVisible(true);
      setSettingsOpen(true);
    };

    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  function saveAndClose(nextDraft: ConsentDraft) {
    writeStoredConsent(buildStoredConsent(nextDraft));
    setVisible(false);
    setSettingsOpen(false);
  }

  function acceptAll() {
    saveAndClose({ analytics: true, marketing: true });
  }

  function rejectAll() {
    saveAndClose({ analytics: false, marketing: false });
  }

  function saveCustom() {
    saveAndClose(draft);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <section className={styles.card}>
        <h2 id="cookie-title" className={styles.title}>
          Nastavení cookies
        </h2>
        <p className={styles.text}>
          Používáme technické cookies pro fungování webu. Analytické a marketingové cookies používáme jen s
          vaším souhlasem.
        </p>

        {!settingsOpen ? (
          <div className={styles.actions}>
            <button type="button" className={`${styles.button} ${styles.primary}`} onClick={acceptAll}>
              Přijmout vše
            </button>
            <button type="button" className={`${styles.button} ${styles.secondary}`} onClick={rejectAll}>
              Odmítnout vše
            </button>
            <button type="button" className={`${styles.button} ${styles.ghost}`} onClick={() => setSettingsOpen(true)}>
              Nastavení
            </button>
          </div>
        ) : (
          <>
            <div className={styles.preferenceList}>
              <div className={styles.preferenceItem}>
                <div>
                  <p className={styles.preferenceTitle}>Nezbytné</p>
                  <p className={styles.preferenceText}>Nutné pro bezpečné fungování webu.</p>
                </div>
                <input type="checkbox" checked disabled aria-label="Nezbytné cookies (vždy zapnuté)" />
              </div>

              <div className={styles.preferenceItem}>
                <div>
                  <p className={styles.preferenceTitle}>Analytické</p>
                  <p className={styles.preferenceText}>Pomáhají zlepšovat web na základě používání.</p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.analytics}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      analytics: event.target.checked,
                    }))
                  }
                  aria-label="Analytické cookies"
                />
              </div>

              <div className={styles.preferenceItem}>
                <div>
                  <p className={styles.preferenceTitle}>Marketingové</p>
                  <p className={styles.preferenceText}>Umožňují personalizaci marketingového obsahu.</p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.marketing}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      marketing: event.target.checked,
                    }))
                  }
                  aria-label="Marketingové cookies"
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button type="button" className={`${styles.button} ${styles.primary}`} onClick={saveCustom}>
                Uložit nastavení
              </button>
              <button type="button" className={`${styles.button} ${styles.secondary}`} onClick={acceptAll}>
                Přijmout vše
              </button>
              <button type="button" className={`${styles.button} ${styles.ghost}`} onClick={rejectAll}>
                Odmítnout vše
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

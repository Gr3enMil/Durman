import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site-content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Právní informace",
  description: "Informace o zpracování osobních údajů, cookies a identifikační údaje.",
  alternates: {
    canonical: "/pravni-informace",
  },
};

export default function LegalInformationPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeLink}>
            Zpět na hlavní web
          </Link>
        </div>

        <header className={styles.header}>
          <p className={styles.kicker}>Právní informace</p>
          <h1 className={styles.title}>GDPR, cookies a identifikační údaje společnosti</h1>
          <p className={styles.lead}>
            Zde najdete informace o správci osobních údajů, způsobu jejich zpracování a pravidlech používání
            cookies.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Správce osobních údajů</h2>
          <div className={styles.panel}>
            <p>
              <strong>Název:</strong> {SITE.legalName}
            </p>
            <p>
              <strong>Jméno:</strong> Tomáš Ďuriš
            </p>
            <p>
              <strong>IČO:</strong> 23764155
            </p>
            <p>
              <strong>Jméno:</strong> Štefan Ďuriš
            </p>
            <p>
              <strong>IČO:</strong> 10048987
            </p>
            <p>
              <strong>DIČ:</strong> CZ6309041068
            </p>
            <p>
              <strong>Sídlo:</strong> Šabina 203, 356 01
            </p>
            <p>
              <strong>E-mail:</strong> {SITE.email}
            </p>
            <p>
              <strong>Telefon:</strong> {SITE.phone}
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Zpracování osobních údajů (GDPR)</h2>
          <div className={styles.panel}>
            <p>
              Zpracováváme údaje, které nám poskytnete přes kontaktní/poptávkový formulář: jméno, telefon, e-mail a
              obsah zprávy.
            </p>
            <p>
              Účely a právní základy zpracování:
            </p>
            <ul className={styles.list}>
              <li>
                vyřízení poptávky a předsmluvní komunikace podle čl. 6 odst. 1 písm. b) GDPR,
              </li>
              <li>
                ochrana právních nároků a bezpečnost provozu podle čl. 6 odst. 1 písm. f) GDPR.
              </li>
            </ul>
            <p>
              Údaje uchováváme po dobu nezbytně nutnou k vyřízení poptávky, nejdéle 24 měsíců od poslední komunikace,
              pokud právní předpis neukládá delší dobu.
            </p>
            <p>
              Příjemci údajů mohou být poskytovatel hostingu, e-mailové infrastruktury a souvisejících IT služeb.
            </p>
            <p>Pověřenec pro ochranu osobních údajů nebyl jmenován.</p>
            <p>
              Osobní údaje standardně nepředáváme mimo EU/EHP. Pokud by k takovému předání došlo, bude provedeno v
              souladu s GDPR (např. na základě odpovídajících záruk).
            </p>
            <p>
              Poskytnutí údajů je dobrovolné, ale bez základních kontaktních údajů nemůžeme poptávku vyřídit.
            </p>
            <p>
              Máte právo na přístup, opravu, výmaz, omezení zpracování, přenositelnost údajů, námitku proti zpracování
              a právo podat stížnost u ÚOOÚ.
            </p>
            <p>Neprovádíme automatizované individuální rozhodování ani profilování.</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Cookies</h2>
          <div className={styles.panel}>
            <p>Web používá tyto kategorie cookies:</p>
            <ul className={styles.list}>
              <li>
                <strong>Nezbytné:</strong> technické cookies nutné pro správné fungování a zabezpečení webu.
              </li>
              <li>
                <strong>Analytické:</strong> volitelné cookies pro měření návštěvnosti a zlepšování webu.
              </li>
              <li>
                <strong>Marketingové:</strong> volitelné cookies pro personalizaci marketingu.
              </li>
            </ul>
            <p>
              Analytické a marketingové cookies ukládáme pouze po udělení souhlasu. Nezbytné cookies jsou ukládány bez
              souhlasu, protože jsou nutné pro provoz webu.
            </p>
            <p>Právním základem pro volitelné cookies je souhlas podle čl. 6 odst. 1 písm. a) GDPR.</p>
            <p>
              Souhlas můžete kdykoli změnit nebo odvolat přes volbu <strong>Nastavení cookies</strong> v zápatí.
            </p>
            <p>Tento web ukládá volbu souhlasu do cookie `durman_cookie_consent` na dobu 12 měsíců.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

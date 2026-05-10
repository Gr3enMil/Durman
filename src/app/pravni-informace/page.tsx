import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site-content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `Právní informace | ${SITE.name}`,
  description:
    "Informace o zpracování osobních údajů, cookies a identifikační údaje společnosti.",
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
            Tato stránka je pracovní verze určená pro doplnění finálních firemních údajů a právních textů
            před spuštěním produkčního webu.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Správce osobních údajů (mock)</h2>
          <div className={styles.panel}>
            <p>
              <strong>Název:</strong> {SITE.legalName} (doplnit plné obchodní jméno)
            </p>
            <p>
              <strong>IČ:</strong> 12345678 (mock)
            </p>
            <p>
              <strong>DIČ:</strong> CZ12345678 (mock)
            </p>
            <p>
              <strong>Sídlo:</strong> Ulice 123, 360 01 Karlovy Vary (mock)
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
              Zpracováváme údaje, které nám sami poskytnete přes poptávkový formulář: jméno, telefon, e-mail
              a obsah zprávy.
            </p>
            <p>
              Účelem je vyřízení poptávky a následná komunikace k realizaci zakázky. Právním základem je
              jednání o smlouvě podle čl. 6 odst. 1 písm. b) GDPR a oprávněný zájem podle čl. 6 odst. 1 písm.
              f) GDPR (ochrana právních nároků, provozní bezpečnost).
            </p>
            <p>
              Údaje uchováváme po dobu nezbytně nutnou pro vyřízení poptávky, nejdéle však 24 měsíců od
              poslední komunikace, pokud právní předpis neukládá delší dobu.
            </p>
            <p>
              Příjemci údajů mohou být poskytovatel hostingu, e-mailové infrastruktury a nezbytných IT služeb.
            </p>
            <p>
              Máte právo na přístup, opravu, výmaz, omezení zpracování, přenositelnost údajů, námitku proti
              zpracování a právo podat stížnost u ÚOOÚ.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Cookies</h2>
          <div className={styles.panel}>
            <p>Web používá tři kategorie cookies:</p>
            <ul className={styles.list}>
              <li>
                <strong>Nezbytné:</strong> technické cookies potřebné pro provoz a zabezpečení webu.
              </li>
              <li>
                <strong>Analytické:</strong> volitelné cookies pro měření využití webu, pouze po udělení
                souhlasu.
              </li>
              <li>
                <strong>Marketingové:</strong> volitelné cookies pro personalizaci marketingu, pouze po udělení
                souhlasu.
              </li>
            </ul>
            <p>
              Souhlas lze kdykoli změnit přes volbu <strong>Nastavení cookies</strong> ve footeru.
            </p>
            <p>
              Tento web aktuálně ukládá souhlas pod názvem <code>durman_cookie_consent</code> na dobu 12 měsíců.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Povinné údaje podnikatele (mock)</h2>
          <div className={styles.panel}>
            <p>
              <strong>Zápis v rejstříku:</strong> živnostenský rejstřík (doplnit přesné údaje)
            </p>
            <p>
              <strong>Dozorový orgán:</strong> Česká obchodní inspekce (ČOI)
            </p>
            <p>
              <strong>ADR:</strong> Spotřebitel může využít platformu pro řešení sporů online (ODR) a kontakty
              ČOI.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Kontakt pro GDPR požadavky (mock)</h2>
          <div className={styles.panel}>
            <p>
              Pro žádosti k osobním údajům použijte e-mail <strong>gdpr@domena.cz</strong> (mock) nebo kontakt
              uvedený výše.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}


import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllReferences } from "@/lib/references";
import { SITE } from "@/lib/site-content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `Reference | ${SITE.name}`,
  description:
    "Archiv realizovaných zakázek: rekonstrukce střech, nové střechy, opravy a klempířské práce.",
};

export default function ReferenceArchivePage() {
  const references = getAllReferences();

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.container}>
          <div className={styles.actions}>
            <Link href="/" className={styles.homeLink}>
              Zpět na hlavní web
            </Link>
          </div>

          <p className={styles.kicker}>Reference</p>
          <h1 className={styles.title}>Archiv realizací</h1>
          <p className={styles.lead}>Kompletní přehled zakázek řazený od nejnovějších po starší realizace.</p>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.container}>
          <div className={styles.cardsGrid}>
            {references.map((reference) => (
              <Link key={reference.slug} href={`/reference/${reference.slug}`} className={styles.card}>
                <Image
                  src={reference.mainImage}
                  alt={reference.mainAlt}
                  fill
                  className={styles.cardImage}
                  sizes="(min-width: 72rem) 33vw, (min-width: 48rem) 50vw, 100vw"
                />
                <span className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <h1 className={styles.cardTitle}>{reference.title}</h1>
                  <h2 className={styles.cardSubtitle}>{reference.location}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

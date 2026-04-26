import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllReferences, getReferenceBySlug } from "@/lib/references";
import { SITE } from "@/lib/site-content";
import styles from "./page.module.css";

type ReferenceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllReferences().map((reference) => ({
    slug: reference.slug,
  }));
}

export async function generateMetadata({ params }: ReferenceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const reference = getReferenceBySlug(slug);

  if (!reference) {
    return {
      title: `Reference nenalezena | ${SITE.name}`,
    };
  }

  return {
    title: `${reference.title} | ${reference.location}`,
    description: reference.excerpt,
    openGraph: {
      title: `${reference.title} | ${reference.location}`,
      description: reference.excerpt,
      images: [
        {
          url: reference.mainImage,
          alt: reference.mainAlt,
        },
      ],
    },
  };
}

export default async function ReferenceDetailPage({ params }: ReferenceDetailPageProps) {
  const { slug } = await params;
  const reference = getReferenceBySlug(slug);

  if (!reference) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.linkRow}>
            <Link href="/reference" className={styles.backLink}>
              Zpět na archiv realizací
            </Link>
            <Link href="/" className={styles.homeLink}>
              Hlavní web
            </Link>
          </div>

          <div className={styles.heroMedia}>
            <Image
              src={reference.mainImage}
              alt={reference.mainAlt}
              fill
              className={styles.heroImage}
              sizes="(min-width: 72rem) 72vw, 100vw"
              priority
            />
          </div>

          <header className={styles.heroHeader}>
            <p className={styles.kicker}>Reference</p>
            <h1 className={styles.title}>{reference.title}</h1>
            <h2 className={styles.subtitle}>{reference.location}</h2>
          </header>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <article className={styles.panel}>
              <h2 className={styles.panelTitle}>Situace</h2>
              <p className={styles.panelText}>{reference.situation}</p>
            </article>

            <article className={styles.panel}>
              <h2 className={styles.panelTitle}>Řešení</h2>
              <p className={styles.panelText}>{reference.solution}</p>
            </article>

            <aside className={`${styles.panel} ${styles.testimonialPanel}`}>
              <h2 className={styles.panelTitle}>Hodnocení zákazníka</h2>
              <blockquote className={styles.quote}>„{reference.testimonial.quote}“</blockquote>
              <p className={styles.quoteAuthor}>{reference.testimonial.author}</p>
            </aside>
          </div>

          <section className={styles.mediaSection}>
            <h2 className={styles.mediaTitle}>Fotogalerie / video</h2>

            <div className={styles.mediaGrid}>
              {reference.media.map((item, index) => (
                <article className={styles.mediaCard} key={`${reference.slug}-media-${index}`}>
                  {item.type === "image" ? (
                    <div className={styles.mediaImageWrap}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className={styles.mediaImage}
                        sizes="(min-width: 72rem) 33vw, 100vw"
                      />
                    </div>
                  ) : (
                    <video className={styles.mediaVideo} controls playsInline poster={item.poster}>
                      <source src={item.src} />
                      Váš prohlížeč nepodporuje přehrávání videa.
                    </video>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

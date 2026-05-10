import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { HeaderNav } from "@/components/header-nav";
import { ReferenceShowcase } from "@/components/reference-showcase";
import {
  ArrowRightIcon,
  ClockIcon,
  GutterIcon,
  HouseIcon,
  MailIcon,
  MapPinIcon,
  MedalIcon,
  MenuIcon,
  PhoneIcon,
  RenovationIcon,
  RoofIcon,
  ShieldIcon,
  UserIcon,
  WrenchIcon,
} from "@/components/icons";
import { ASSETS } from "@/lib/assets";
import {
  ABOUT_POINTS,
  HERO_BENEFITS,
  NAV_ITEMS,
  SERVICES,
  SITE,
  type IconName,
} from "@/lib/site-content";
import { getLatestReferences } from "@/lib/references";
import styles from "./page.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://durisasyn.cz";

const iconMap: Record<IconName, typeof ShieldIcon> = {
  shield: ShieldIcon,
  roof: RoofIcon,
  clock: ClockIcon,
  mapPin: MapPinIcon,
  house: HouseIcon,
  renovation: RenovationIcon,
  wrench: WrenchIcon,
  gutter: GutterIcon,
  user: UserIcon,
  medal: MedalIcon,
  phone: PhoneIcon,
  mail: MailIcon,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: SITE.name,
  description: SITE.description,
  url: siteUrl,
  logo: `${siteUrl}${ASSETS.logo}`,
  image: `${siteUrl}${ASSETS.openGraphImage}`,
  telephone: [SITE.phone, SITE.secondaryPhone],
  email: SITE.email,
  areaServed: SITE.serviceArea,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karlovy Vary",
    addressRegion: "Karlovarský kraj",
    addressCountry: "CZ",
  },
  serviceType: SERVICES.map((service) => service.title),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: siteUrl,
  inLanguage: "cs-CZ",
};

export default function Home() {
  const aboutHighlights = ABOUT_POINTS.slice(0, 3);
  const latestReferences = getLatestReferences(4).map((item) => ({
    slug: item.slug,
    title: item.title,
    location: item.location,
    reference: item.testimonial.quote,
    image: item.mainImage,
    alt: item.mainAlt,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className={styles.page}>
        <header className={styles.siteHeader}>
          <div className={`${styles.container} ${styles.headerInner}`}>
            <a className={styles.logoLink} href="#uvod" aria-label={`${SITE.name} - domovská stránka`}>
              <Image src={ASSETS.logo} alt={SITE.name} width={330} height={90} className={styles.logoImage} priority />
            </a>

            <nav className={styles.desktopNav} aria-label="Hlavní navigace">
              <HeaderNav
                items={NAV_ITEMS}
                listClassName={styles.desktopNavList}
                linkClassName={styles.navLink}
                activeClassName={styles.navLinkActive}
              />
            </nav>

            <a className={styles.headerCta} href="#kontakt-form">
              Nezávazná poptávka
            </a>

            <details className={styles.mobileMenu}>
              <summary aria-label="Otevřít menu">
                <MenuIcon className={styles.mobileMenuIcon} />
              </summary>
              <div className={styles.mobilePanel}>
                <nav aria-label="Mobilní navigace">
                  <ul className={styles.mobileNavList}>
                    {NAV_ITEMS.map((item) => (
                      <li key={`mobile-${item.href}`}>
                        <a className={styles.mobileNavLink} href={item.href}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <a className={styles.mobileCta} href="#kontakt-form">
                  Nezávazná poptávka
                </a>
              </div>
            </details>
          </div>
        </header>

        <main className={styles.main}>
          <section className={styles.topSection} id="uvod">
            <div className={styles.topMedia}>
              <Image
                src={ASSETS.heroImage}
                alt="Pokrývač při práci na střeše rodinného domu."
                fill
                className={styles.topImage}
                priority
                sizes="100vw"
              />
              <div className={styles.topShade} aria-hidden="true" />

              <div className={`${styles.container} ${styles.topContentWrap}`}>
                <div className={styles.topContent}>
                  <h1 className={styles.topTitle}>
                    Svěřte svou střechu
                    <br />
                    do rukou profesionálů
                    <span className={styles.topAccent}>.</span>
                  </h1>
                  <a className={styles.primaryCta} href="#kontakt-form">
                    Poptat realizaci
                    <ArrowRightIcon className={styles.ctaIcon} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.benefitsSection}>
            <div className={styles.container}>
              <div className={styles.benefitsGrid}>
                {HERO_BENEFITS.map((benefit) => {
                  const Icon = iconMap[benefit.icon];

                  return (
                    <article className={styles.benefitCard} key={benefit.title}>
                      <Icon className={styles.benefitIcon} />
                      <h2 className={styles.benefitTitle}>{benefit.title}</h2>
                      <p className={styles.benefitText}>{benefit.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className={styles.section} id="sluzby">
            <div className={styles.container}>
              <header className={`${styles.sectionHead} ${styles.sectionCenter}`}>
                <p className={styles.sectionLabel}>Služby</p>
                <h2 className={styles.sectionTitle}>Kompletní služby pro vaši střechu</h2>
              </header>

              <div className={styles.servicesGrid}>
                {SERVICES.map((service) => {
                  const Icon = iconMap[service.icon];

                  return (
                    <article className={styles.serviceCard} key={service.title}>
                      <Icon className={styles.serviceIcon} />
                      <h3 className={styles.serviceTitle}>{service.title}</h3>
                      <p className={styles.serviceText}>{service.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className={styles.section} id="reference">
            <div className={styles.container}>
              <header className={`${styles.sectionHead} ${styles.sectionCenter}`}>
                <p className={styles.sectionLabel}>Reference</p>
                <h2 className={styles.sectionTitle}>Vybrané realizace</h2>
              </header>

              <ReferenceShowcase items={latestReferences} />
            </div>
          </section>

          <section className={styles.aboutSection} id="o-nas">
            <div className={styles.aboutBackground} aria-hidden="true">
              <Image src={ASSETS.aboutImage} alt="" fill className={styles.aboutBgImage} sizes="100vw" />
              <div className={styles.aboutBgShade} />
            </div>

            <div className={`${styles.container} ${styles.aboutInner}`}>
              <div className={styles.aboutRow}>
                <header className={`${styles.sectionHead} ${styles.aboutIntro}`}>
                  <p className={styles.sectionLabel}>O nás</p>
                  <h2 className={styles.sectionTitle}>D&amp;D Pokrývačství</h2>
                  <p className={styles.aboutLead}>
                    Spojení zkušeností, precizního řemesla a moderního přístupu ke střechám. Realizujeme
                    střechy, které dlouhodobě chrání Váš domov.
                  </p>
                </header>

                <div className={styles.aboutValues}>
                  {aboutHighlights.map((point) => {
                    const Icon = iconMap[point.icon];

                    return (
                      <article className={styles.aboutValue} key={point.title}>
                        <div className={styles.aboutValueTop}>
                          <Icon className={styles.aboutIcon} />
                          <h3 className={styles.aboutValueTitle}>{point.title}</h3>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.contactSection}`} id="kontakt">
            <div className={styles.container}>
              <div className={styles.contactShell}>
                <article className={styles.contactInfo}>
                  <p className={styles.sectionLabel}>Kontakt</p>
                  <h2 className={styles.sectionTitle}>Ozvěte se nám</h2>

                  <ul className={styles.contactList}>
                    <li className={styles.contactItem}>
                      <span className={styles.contactBadge}>
                        <PhoneIcon className={styles.contactIcon} />
                      </span>
                      <p className={`${styles.contactValue} ${styles.contactValueSplit}`}>
                        <a href={SITE.phoneHref}>{SITE.phone}</a>
                        <a href={SITE.secondaryPhoneHref}>{SITE.secondaryPhone}</a>
                      </p>
                    </li>

                    <li className={styles.contactItem}>
                      <span className={styles.contactBadge}>
                        <MailIcon className={styles.contactIcon} />
                      </span>
                      <p className={styles.contactValue}>
                        <a href={SITE.emailHref}>{SITE.email}</a>
                      </p>
                    </li>

                    <li className={styles.contactItem}>
                      <span className={styles.contactBadge}>
                        <MapPinIcon className={styles.contactIcon} />
                      </span>
                      <p className={styles.contactValue}>{SITE.location}</p>
                    </li>
                  </ul>

                  <p className={styles.contactHint}>Rádi vám připravíme nezávaznou cenovou nabídku.</p>
                </article>

                <article className={styles.contactFormCard}>
                  <ContactForm />
                </article>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={`${styles.container} ${styles.footerInner}`}>
            <div className={styles.footerBrand}>
              <Image src={ASSETS.logoLight} alt={SITE.name} width={330} height={90} className={styles.footerLogo} />
              <p className={styles.footerTag}>
                {SITE.tagline}
                <span className={styles.footerAccent}>.</span>
              </p>
            </div>

            <ul className={styles.footerContact}>
              <li>
                <PhoneIcon className={styles.footerIcon} />
                <span className={styles.footerPhoneGroup}>
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                  <a href={SITE.secondaryPhoneHref}>{SITE.secondaryPhone}</a>
                </span>
              </li>
              <li>
                <MailIcon className={styles.footerIcon} />
                <a href={SITE.emailHref}>{SITE.email}</a>
              </li>
              <li>
                <MapPinIcon className={styles.footerIcon} />
                {SITE.location}
              </li>
            </ul>

            <div className={styles.footerMeta}>
              <ul className={`${styles.footerContact} ${styles.footerPolicy}`}>
                <li>
                  <Link className={styles.footerPolicyLink} href="/pravni-informace">
                    Právní informace (GDPR a cookies)
                  </Link>
                </li>
                <li>
                  <CookieSettingsButton className={styles.footerPolicyButton} />
                </li>
              </ul>
              <p className={styles.footerLegal}>© {SITE.copyrightYear} {SITE.legalName}. Všechna práva vyhrazena.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

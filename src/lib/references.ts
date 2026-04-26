import { ASSETS } from "./assets";

export type ReferenceMedia =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      title?: string;
    };

export type ReferenceEntry = {
  slug: string;
  title: string;
  location: string;
  excerpt: string;
  mainImage: string;
  mainAlt: string;
  situation: string;
  solution: string;
  testimonial: {
    quote: string;
    author: string;
  };
  media: ReadonlyArray<ReferenceMedia>;
  publishedAt: string;
};

const REFERENCE_DATA: ReadonlyArray<ReferenceEntry> = [
  {
    slug: "rekonstrukce-strechy-pruhonice",
    title: "Rekonstrukce střechy RD",
    location: "Průhonice",
    excerpt:
      "Kompletní obnova střešního pláště včetně nové krytiny, oplechování a detailního napojení na stávající konstrukce.",
    mainImage: ASSETS.referenceImages[0],
    mainAlt: "Nově zrekonstruovaná střecha rodinného domu.",
    situation:
      "Původní krytina po letech zatékala kolem komínového tělesa a vikýřů. Majitelé potřebovali rychlé řešení bez dlouhého omezení provozu domu.",
    solution:
      "Navrhli jsme kompletní výměnu krytiny, nové latování, úpravu odvětrání a klempířské detaily. Realizace proběhla ve třech etapách tak, aby dům zůstal plně obyvatelný.",
    testimonial: {
      quote:
        "Skvělá komunikace, čistá práce a hlavně přesně dodržený termín. S výsledkem jsme maximálně spokojeni.",
      author: "Majitel domu, Průhonice",
    },
    media: [
      {
        type: "image",
        src: ASSETS.referenceImages[2],
        alt: "Detail nové střešní krytiny po realizaci.",
      },
    ],
    publishedAt: "2026-04-20",
  },
  {
    slug: "nova-strecha-praha-vychod",
    title: "Nová střecha na novostavbě",
    location: "Praha-východ",
    excerpt:
      "Realizace nové střechy na klíč od přípravy skladby až po finální montáž klempířských prvků.",
    mainImage: ASSETS.referenceImages[1],
    mainAlt: "Novostavba rodinného domu s novou střechou.",
    situation:
      "U novostavby bylo klíčové navrhnout střechu s důrazem na dlouhou životnost, bezproblémové odvodnění a čistý moderní vzhled.",
    solution:
      "Navrhli jsme kompletní skladbu střechy, provedli pokládku krytiny a osadili odvodňovací systém. Důraz byl na přesné napojení detailů kolem komínu a střešních oken.",
    testimonial: {
      quote:
        "Profesionální přístup od první schůzky až po předání. Vše proběhlo bez komplikací a v domluveném rozpočtu.",
      author: "Investor stavby, Praha-východ",
    },
    media: [
      {
        type: "image",
        src: ASSETS.heroImage,
        alt: "Průběh realizace střešních prací.",
      },
    ],
    publishedAt: "2026-04-18",
  },
  {
    slug: "oprava-krytiny-praha",
    title: "Oprava krytiny a detailů",
    location: "Praha",
    excerpt:
      "Lokální oprava poškozené krytiny, revize oplechování a výměna kritických detailů s rizikem zatékání.",
    mainImage: ASSETS.referenceImages[2],
    mainAlt: "Detail tmavé taškové střechy po opravě.",
    situation:
      "Po silném větru došlo k uvolnění části krytiny a opakovanému zatékání do podkroví. Potřebný byl rychlý zásah a trvalé odstranění příčiny.",
    solution:
      "Vyměnili jsme poškozené části krytiny, opravili podkladní vrstvy a doplnili nové oplechování rizikových míst. Součástí byla i preventivní kontrola okolních ploch.",
    testimonial: {
      quote:
        "Přijeli opravdu rychle, vše nám vysvětlili a po opravě je střecha bez jediného problému.",
      author: "Majitel objektu, Praha",
    },
    media: [
      {
        type: "image",
        src: ASSETS.referenceImages[3],
        alt: "Okapový detail po servisním zásahu.",
      },
    ],
    publishedAt: "2026-04-15",
  },
  {
    slug: "klempirske-prace-ricany",
    title: "Klempířské práce a okapy",
    location: "Říčany",
    excerpt:
      "Výměna stávajícího okapového systému, nové oplechování hran a detailní dopracování přechodů.",
    mainImage: ASSETS.referenceImages[3],
    mainAlt: "Detail nového okapu a oplechování.",
    situation:
      "Původní systém odvodnění byl na hraně životnosti, s viditelnou korozí a netěsnostmi v napojeních.",
    solution:
      "Demontovali jsme staré prvky, osadili nový systém s vyšší odolností a sjednotili všechny klempířské detaily do jednoho funkčního celku.",
    testimonial: {
      quote:
        "Precizně odvedená práce, čistota na stavbě a výborná domluva. Určitě doporučujeme dál.",
      author: "Zákazník, Říčany",
    },
    media: [
      {
        type: "image",
        src: ASSETS.referenceImages[1],
        alt: "Pohled na dům po dokončení klempířských prací.",
      },
    ],
    publishedAt: "2026-04-12",
  },
];

function sortByLatest(a: ReferenceEntry, b: ReferenceEntry) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export function getAllReferences() {
  return [...REFERENCE_DATA].sort(sortByLatest);
}

export function getLatestReferences(limit = 4) {
  return getAllReferences().slice(0, limit);
}

export function getReferenceBySlug(slug: string) {
  return REFERENCE_DATA.find((item) => item.slug === slug) ?? null;
}

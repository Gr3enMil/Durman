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
    slug: "bytovy-dum-habartov",
    title: "Bytový dům",
    location: "Habartov",
    excerpt:
      "Rekonstrukce střechy bytového domu s původní asfaltovou šindelovou krytinou, která přestala plnit svou funkci.",
    mainImage: ASSETS.referenceImages.bytovyDumHabartov[1],
    mainAlt: "Bytový dům v Habartově po pokládce laminovaného šindele IKO Cambridge.",
    situation:
      "Původní krytina z asfaltového šindele přestala plnit svou funkci. Součástí problému byl také poškozený hromosvod.",
    solution:
      "Navrhli jsme kompletní odstranění původní krytiny, montáž podkladního pásu IKO Armourbase a následné pokrytí prémiovým laminovaným šindelem IKO Cambridge. Odvětrání střešního pláště bylo provedeno použitím IKO Armourvent, tedy větráním hřebenem.",
    testimonial: {
      quote: "",
      author: "",
    },
    media: [
      {
        type: "image",
        src: ASSETS.referenceImages.bytovyDumHabartov[0],
        alt: "Bytový dům v Habartově s původní šindelovou krytinou před rekonstrukcí.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.bytovyDumHabartov[1],
        alt: "Bytový dům v Habartově po pokládce laminovaného šindele IKO Cambridge.",
      },
    ],
    publishedAt: "2026-05-10",
  },
  {
    slug: "rekonstrukce-strechy-krajkova",
    title: "Rekonstrukce střechy",
    location: "Krajková",
    excerpt:
      "Rekonstrukce střechy s odstraněním dožilé tvrdé krytiny, doplněním DHV, novým laťováním, klempířskými prvky a protisněhovými zábranami.",
    mainImage: ASSETS.referenceImages.rekonstrukceStrechyKrajkova[2],
    mainAlt: "Rekonstrukce střechy v Krajkové po pokládce nové tvrdé krytiny.",
    situation:
      "Rekonstrukce střechy vyžadovala odstranění stávající tvrdé krytiny, která byla po své životnosti. Tašky se začaly rozpadat působením povětrnostních vlivů a pod krytinou nebyla instalována žádná doplňková hydroizolace.",
    solution:
      "Navrhli jsme odstranění stávající krytiny, demontáž střešních latí a klempířských prvků. Střecha byla doplněna o střešní fólii (DHV), nové laťování, dostatečné odvětrání střešního pláště, nové žlaby a okapy, oplechování komínového tělesa včetně opláštění, pokládku nové tvrdé krytiny a instalaci protisněhových zábran.",
    testimonial: {
      quote: "",
      author: "",
    },
    media: [
      {
        type: "image",
        src: ASSETS.referenceImages.rekonstrukceStrechyKrajkova[0],
        alt: "Původní střecha v Krajkové před rekonstrukcí.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.rekonstrukceStrechyKrajkova[1],
        alt: "Původní tvrdá krytina před demontáží.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.rekonstrukceStrechyKrajkova[2],
        alt: "Rekonstrukce střechy v Krajkové po pokládce nové tvrdé krytiny.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.rekonstrukceStrechyKrajkova[3],
        alt: "Dokončená střecha s novou tvrdou krytinou a protisněhovými zábranami.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.rekonstrukceStrechyKrajkova[4],
        alt: "Letecký pohled na dokončenou rekonstrukci střechy v Krajkové.",
      },
    ],
    publishedAt: "2026-05-10",
  },
  {
    slug: "rekonstrukce-rd-karlovy-vary",
    title: "Rekonstrukce RD",
    location: "Karlovy Vary",
    excerpt:
      "Kompletní rekonstrukce rodinného domu s návrhem lehčí plechové krytiny, doplňkovou hydroizolační vrstvou, novým laťováním a klempířskými prvky.",
    mainImage: ASSETS.referenceImages.rekonstrukceRdKarlovyVary[0],
    mainAlt: "Rodinný dům v Karlových Varech po rekonstrukci střechy.",
    situation:
      "Kompletní rekonstrukce rodinného domu. Majitelé si nepřáli zatěžovat krov tvrdou krytinou a zároveň potřebovali přístavby a následný návrh střešního pláště.",
    solution:
      "Navrhli jsme plechovou krytinu v imitaci střešních tašek s doplňkovou hydroizolační vrstvou a novým laťováním s dostatečným odvětráním střešního pláště. Součástí byl nový okapový systém a klempířské prvky. Přístavba byla zhotovena ve spolupráci s naším tesařem.",
    testimonial: {
      quote: "",
      author: "",
    },
    media: [
      {
        type: "image",
        src: ASSETS.referenceImages.rekonstrukceRdKarlovyVary[0],
        alt: "Rodinný dům po rekonstrukci střechy s plechovou krytinou v imitaci tašek.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.rekonstrukceRdKarlovyVary[1],
        alt: "Pohled na dokončenou střechu rodinného domu v Karlových Varech.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.rekonstrukceRdKarlovyVary[2],
        alt: "Rodinný dům během kompletní rekonstrukce.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.rekonstrukceRdKarlovyVary[3],
        alt: "Střešní plášť a přístavba během přípravy rekonstrukce.",
      },
    ],
    publishedAt: "2026-05-10",
  },
  {
    slug: "asfaltove-pasy-karlovy-vary",
    title: "Asfaltové pásy",
    location: "Karlovy Vary",
    excerpt:
      "Rekonstrukce ploché střechy se zatékáním a nedostatečným odtokem povrchové vody pomocí asfaltových pásů určených k natavení na stávající vrstvu.",
    mainImage: ASSETS.referenceImages.asfaltovePasyKarlovyVary[1],
    mainAlt: "Plochá střecha po rekonstrukci asfaltovými pásy.",
    situation:
      "Objekt postihovalo zatékání plochou střechou a zároveň nedostatečný odtok povrchové vody.",
    solution:
      "K rekonstrukci byly použity speciální asfaltové pásy určené k natavení na stávající asfaltové pásy. Před natavením byl vyřešen systém odtékání povrchové vody zapuštěním vpustí níže, než byly původně vybudovány.",
    testimonial: {
      quote: "",
      author: "",
    },
    media: [
      {
        type: "image",
        src: ASSETS.referenceImages.asfaltovePasyKarlovyVary[0],
        alt: "Plochá střecha před rekonstrukcí s vodou na původním povrchu.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.asfaltovePasyKarlovyVary[1],
        alt: "Plochá střecha po pokládce asfaltových pásů.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.asfaltovePasyKarlovyVary[2],
        alt: "Dokončená plocha střechy po rekonstrukci asfaltovými pásy.",
      },
    ],
    publishedAt: "2026-05-10",
  },
  {
    slug: "oprava-kominu-brezova",
    title: "Oprava komínu",
    location: "Březová",
    excerpt:
      "Komín v havarijním stavu s rizikem újmy na zdraví a majetku. Realizace zahrnovala odstranění komínového tělesa a návazné doplnění DHV.",
    mainImage: ASSETS.referenceImages.opravaKominuBrezova[1],
    mainAlt: "Střecha po opravě komínu a navazujících detailů v Březové.",
    situation:
      "Nepodceňujte komín v havarijním stavu. Zde hrozily újmy na zdraví a majetku.",
    solution:
      "Odstranění komínového tělesa, následné doplnění a napojení DHV a pokrytí tvrdou krytinou.",
    testimonial: {
      quote: "",
      author: "",
    },
    media: [
      {
        type: "image",
        src: ASSETS.referenceImages.opravaKominuBrezova[0],
        alt: "Komín v havarijním stavu před odstraněním.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.opravaKominuBrezova[1],
        alt: "Střecha po dokončení opravy komínu a navazujících detailů.",
      },
    ],
    publishedAt: "2026-05-09",
  },
  {
    slug: "dokonceni-strechy-karlovy-vary",
    title: "Dokončení střechy",
    location: "Karlovy Vary",
    excerpt:
      "Majitel zahájil realizaci svépomocí, ale finální pokrytí střechy nedokončil. Dokončili jsme práce včetně instalace krytiny Satjam Rapid.",
    mainImage: ASSETS.referenceImages.dokonceniStrechyKarlovyVary[1],
    mainAlt: "Dokončená střecha s krytinou Satjam Rapid v Karlových Varech.",
    situation:
      "Majitel se pustil sám do realizace své střechy, ale finální pokrytí své střechy nedokončil.",
    solution:
      "Dodělali jsme započatou práci a nainstalovali krytinu Satjam Rapid.",
    testimonial: {
      quote: "",
      author: "",
    },
    media: [
      {
        type: "image",
        src: ASSETS.referenceImages.dokonceniStrechyKarlovyVary[0],
        alt: "Dokončovaná střecha s plechovou krytinou Satjam Rapid.",
      },
      {
        type: "image",
        src: ASSETS.referenceImages.dokonceniStrechyKarlovyVary[1],
        alt: "Dokončená plechová střecha Satjam Rapid.",
      },
    ],
    publishedAt: "2026-05-08",
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

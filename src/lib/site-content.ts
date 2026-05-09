export type IconName =
  | "shield"
  | "roof"
  | "clock"
  | "mapPin"
  | "house"
  | "renovation"
  | "wrench"
  | "gutter"
  | "user"
  | "medal"
  | "phone"
  | "mail";

export const SITE = {
  name: "D&D Pokrývačství",
  legalName: "D&D Pokrývačství",
  tagline: "Svěřte svou střechu do rukou profesionálů",
  description:
    "Kompletní pokrývačské a klempířské práce v Karlovarském kraji. Nové střechy, rekonstrukce, opravy a servis.",
  phone: "+420 739 276 897",
  phoneHref: "tel:+420739276897",
  secondaryPhone: "+420 604 866 731",
  secondaryPhoneHref: "tel:+420604866731",
  email: "tom.duris@email.cz",
  emailHref: "mailto:tom.duris@email.cz",
  location: "Karlovarský kraj",
  serviceArea: "Karlovarský kraj",
  copyrightYear: "2026",
} as const;

export const NAV_ITEMS = [
  { label: "Úvod", href: "#uvod" },
  { label: "Služby", href: "#sluzby" },
  { label: "Reference", href: "#reference" },
  { label: "O nás", href: "#o-nas" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

// Připraveno na budoucí napojení na samostatnou podstránku referencí.
export const REFERENCE_ARCHIVE_PATH = "/reference";

export const HERO_BENEFITS: ReadonlyArray<{
  icon: IconName;
  title: string;
  text: string;
}> = [
  {
    icon: "shield",
    title: "Zkušenosti z praxe",
    text: "Přes 20 let zkušeností s pokrývačskými a klempířskými prácemi na novostavbách i rekonstrukcích.",
  },
  {
    icon: "roof",
    title: "Kvalitní materiály",
    text: "Používáme certifikované materiály od renomovaných výrobců pro maximální životnost Vaší střechy.",
  },
  {
    icon: "clock",
    title: "Férový přístup",
    text: "Ke každé zakázce přistupujeme individuálně a vždy hledáme nejlepší řešení pro zákazníka.",
  },
  {
    icon: "mapPin",
    title: "Spolehlivost a dodržování termínů",
    text: "Pracujeme tak, aby vše proběhlo včas, bez zbytečných průtahů.",
  },
];

export const SERVICES: ReadonlyArray<{
  icon: IconName;
  title: string;
  text: string;
}> = [
  {
    icon: "house",
    title: "Pokrývačské práce",
    text: "Nové střechy nebo rekonstrukce té stávající? Zajistíme kompletní řešení od návrhu po realizaci střechy.",
  },
  {
    icon: "gutter",
    title: "Klempířské práce",
    text: "Vyrábíme klempířské prvky na míru pro maximální ochranu Vaší střechy.",
  },
  {
    icon: "wrench",
    title: "Opravy a servis",
    text: "Zatéká Vám do střechy? Vyřešíme to rychle a profesionálně.",
  },
  {
    icon: "renovation",
    title: "Řešení havarijních stavů",
    text: "Ohrožuje Vaše střecha zdraví nebo majetek? Postaráme se o rychlé a bezpečné řešení problému.",
  },
];

export const ABOUT_POINTS: ReadonlyArray<{
  icon: IconName;
  title: string;
  text: string;
}> = [
  {
    icon: "shield",
    title: "Poctivá práce",
    text: "",
  },
  {
    icon: "user",
    title: "Ekologické postupy",
    text: "",
  },
  {
    icon: "medal",
    title: "Kvalitní materiály",
    text: "",
  },
];

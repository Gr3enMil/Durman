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
  name: "Duris a syn",
  legalName: "Duris a syn",
  tagline: "Střechy, na které je spoleh.",
  description:
    "Kompletní pokrývačské a klempířské práce v Praze a Středočeském kraji. Nové střechy, rekonstrukce, opravy a servis.",
  phone: "+420 777 123 456",
  phoneHref: "tel:+420777123456",
  email: "info@durisasyn.cz",
  emailHref: "mailto:info@durisasyn.cz",
  location: "Praha a okolí",
  serviceArea: "Praha a Středočeský kraj",
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
    title: "15+ let praxe",
    text: "Zkušenosti, na které se můžete spolehnout.",
  },
  {
    icon: "roof",
    title: "Kompletní pokrývačské práce",
    text: "Od návrhu po finální realizaci.",
  },
  {
    icon: "clock",
    title: "Rychlá realizace",
    text: "Dodržujeme termíny a domluvu.",
  },
  {
    icon: "mapPin",
    title: "Působnost Praha a Středočeský kraj",
    text: "Působíme v Praze a širokém okolí.",
  },
];

export const SERVICES: ReadonlyArray<{
  icon: IconName;
  title: string;
  text: string;
}> = [
  {
    icon: "house",
    title: "Nové střechy",
    text: "Navrhneme a zrealizujeme novou střechu na klíč.",
  },
  {
    icon: "renovation",
    title: "Rekonstrukce střech",
    text: "Kompletní obnovy střech včetně výměny krytiny.",
  },
  {
    icon: "wrench",
    title: "Opravy a servis",
    text: "Rychlé a spolehlivé opravy střech všech typů.",
  },
  {
    icon: "gutter",
    title: "Klempířské práce",
    text: "Oplechování střech, okapů a dalších detailů.",
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
    text: "Děláme práci tak, aby vydržela.",
  },
  {
    icon: "user",
    title: "Osobní přístup",
    text: "Ke každému zákazníkovi přistupujeme individuálně.",
  },
  {
    icon: "medal",
    title: "Kvalitní materiály",
    text: "Používáme prověřené materiály od ověřených dodavatelů.",
  },
  {
    icon: "mapPin",
    title: "Praha a okolí",
    text: "Působíme v Praze a širokém okolí.",
  },
];

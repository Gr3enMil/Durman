import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <path d="M12 2 4 5v7c0 5.3 3.3 8.3 8 10 4.7-1.7 8-4.7 8-10V5z" />
      <path d="m9.5 11.5 1.6 1.6 3.4-3.4" />
    </svg>
  );
}

export function RoofIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <path d="m3 11 9-7 9 7" />
      <path d="M6 10v8h4v-5h4v5h4v-8" />
      <path d="m18 5 2 2" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function HouseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <path d="m3 11 9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function RenovationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <path d="m3 12 7-6 7 6" />
      <path d="m14 7 7 6" />
      <path d="M6 19a3 3 0 0 1 6 0" />
      <path d="M17 15h3" />
    </svg>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <path d="m15 6 3-3a4 4 0 0 1-5 5L5 16a2 2 0 0 0 3 3l8-8a4 4 0 0 1 5-5l-3 3" />
    </svg>
  );
}

export function GutterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <path d="M6 3h10v4H6z" />
      <path d="M8 7v10a4 4 0 0 1-4 4" />
      <path d="M16 7v12h4" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.8-3.3 4.4-5 8-5s6.2 1.7 8 5" />
    </svg>
  );
}

export function MedalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <circle cx="12" cy="9" r="4" />
      <path d="m10 13-2 8 4-2 4 2-2-8" />
      <path d="m10.8 9 0 0" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <path d="M7.6 3h3l1 4-2 1a15 15 0 0 0 6.4 6.4l1-2 4 1v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.2 5.2 2 2 0 0 1 6.2 3Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...baseProps} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

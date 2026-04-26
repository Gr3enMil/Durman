"use client";

import { useEffect, useMemo, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type HeaderNavProps = {
  items: ReadonlyArray<NavItem>;
  listClassName: string;
  linkClassName: string;
  activeClassName: string;
};

export function HeaderNav({ items, listClassName, linkClassName, activeClassName }: HeaderNavProps) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "#uvod");

  const sectionMap = useMemo(
    () => items.map((item) => ({ href: item.href, id: item.href.replace(/^#/, "") })),
    [items],
  );

  useEffect(() => {
    const updateByHash = () => {
      const hash = window.location.hash;
      if (hash && items.some((item) => item.href === hash)) {
        setActiveHref(hash);
      }
    };

    const updateByScroll = () => {
      let current = items[0]?.href ?? "#uvod";
      const offset = 140;

      for (const section of sectionMap) {
        const el = document.getElementById(section.id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = section.href;
        }
      }

      setActiveHref(current);
    };

    updateByHash();
    updateByScroll();

    window.addEventListener("hashchange", updateByHash);
    window.addEventListener("scroll", updateByScroll, { passive: true });

    return () => {
      window.removeEventListener("hashchange", updateByHash);
      window.removeEventListener("scroll", updateByScroll);
    };
  }, [items, sectionMap]);

  return (
    <ul className={listClassName}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            className={`${linkClassName} ${activeHref === item.href ? activeClassName : ""}`}
            href={item.href}
            onClick={() => setActiveHref(item.href)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useState } from "react";
import styles from "./reference-showcase.module.css";

type ReferenceItem = {
  slug: string;
  title: string;
  location: string;
  reference: string;
  image: string;
  alt: string;
};

type ReferenceShowcaseProps = {
  items: ReadonlyArray<ReferenceItem>;
};

export function ReferenceShowcase({ items }: ReferenceShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.showcase}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <Link
            key={item.slug}
            href={`/reference/${item.slug}`}
            className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            style={{ "--grow": isActive ? 2 : 1 } as CSSProperties}
            aria-label={`Zobrazit referenci: ${item.title}`}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className={styles.image}
              sizes="(min-width: 64rem) 25vw, 100vw"
            />

            <span className={styles.scrim} aria-hidden="true" />

            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.location}>{item.location}</p>
              <p className={styles.text}>„{item.reference}“</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

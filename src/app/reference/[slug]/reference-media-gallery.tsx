"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReferenceMedia } from "@/lib/references";
import styles from "./page.module.css";

type ReferenceMediaGalleryProps = {
  media: ReadonlyArray<ReferenceMedia>;
};

export function ReferenceMediaGallery({ media }: ReferenceMediaGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const imageIndexes = useMemo(
    () =>
      media
        .map((item, index) => (item.type === "image" ? index : null))
        .filter((index): index is number => index !== null),
    [media],
  );

  const closeLightbox = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  const openLightbox = useCallback((index: number) => {
    setActiveImageIndex(index);
  }, []);

  const moveInLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (activeImageIndex === null) {
        return;
      }

      const currentPosition = imageIndexes.findIndex((index) => index === activeImageIndex);
      if (currentPosition === -1) {
        return;
      }

      const nextPosition =
        direction === "next"
          ? (currentPosition + 1) % imageIndexes.length
          : (currentPosition - 1 + imageIndexes.length) % imageIndexes.length;

      setActiveImageIndex(imageIndexes[nextPosition]);
    },
    [activeImageIndex, imageIndexes],
  );

  useEffect(() => {
    if (activeImageIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveInLightbox("prev");
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveInLightbox("next");
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, closeLightbox, moveInLightbox]);

  const activeItem = activeImageIndex !== null ? media[activeImageIndex] : null;

  return (
    <>
      <div className={styles.mediaGrid}>
        {media.map((item, index) => (
          <article className={styles.mediaCard} key={`media-${index}`}>
            {item.type === "image" ? (
              <button
                type="button"
                className={styles.mediaButton}
                onClick={() => openLightbox(index)}
                aria-label={`Zobrazit fotku ${index + 1} na celou obrazovku`}
              >
                <div className={styles.mediaImageWrap}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={styles.mediaImage}
                    sizes="(min-width: 72rem) 33vw, 100vw"
                  />
                </div>
              </button>
            ) : (
              <video className={styles.mediaVideo} controls playsInline poster={item.poster}>
                <source src={item.src} />
                Vas prohlizec nepodporuje prehravani videa.
              </video>
            )}
          </article>
        ))}
      </div>

      {activeItem && activeItem.type === "image" ? (
        <div
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Nahled fotografie"
          onClick={closeLightbox}
        >
          <div className={styles.lightboxFrame} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.lightboxClose} onClick={closeLightbox} aria-label="Zavrit nahled">
              Zavrit
            </button>

            {imageIndexes.length > 1 ? (
              <>
                <button
                  type="button"
                  className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                  onClick={() => moveInLightbox("prev")}
                  aria-label="Predchozi fotka"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                  onClick={() => moveInLightbox("next")}
                  aria-label="Dalsi fotka"
                >
                  &gt;
                </button>
              </>
            ) : null}

            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              className={styles.lightboxImage}
              sizes="90vw"
              quality={100}
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import styles from "./cookie-settings-button.module.css";

const OPEN_SETTINGS_EVENT = "open-cookie-settings";

type CookieSettingsButtonProps = {
  className?: string;
};

export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  const classes = className ? `${styles.button} ${className}` : styles.button;

  return (
    <button
      type="button"
      className={classes}
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
    >
      Nastavení cookies
    </button>
  );
}


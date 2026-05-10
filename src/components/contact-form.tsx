"use client";

import { FormEvent, useState } from "react";
import { ArrowRightIcon } from "./icons";
import styles from "./contact-form.module.css";

type FormStatus = "idle" | "loading" | "success" | "error";

const initialNotice = "";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [notice, setNotice] = useState(initialNotice);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    setStatus("loading");
    setNotice("Odesílám poptávku...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Odeslání se nepodařilo.");
      }

      setStatus("success");
      setNotice("Děkujeme, poptávka byla odeslána. Ozveme se co nejdříve.");
      form.reset();
    } catch (error) {
      setStatus("error");
      const message = error instanceof Error ? error.message : "Odeslání se nepodařilo.";
      setNotice(message);
    }
  }

  return (
    <form className={styles.form} id="kontakt-form" onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <input
          className={styles.input}
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Jméno a příjmení"
          required
        />
        <input
          className={styles.input}
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          placeholder="Telefon"
          required
        />
      </div>

      <input
        className={styles.input}
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        placeholder="E-mail"
        required
      />

      <textarea
        className={styles.textarea}
        id="message"
        name="message"
        placeholder="Napište nám, co potřebujete..."
        required
      />

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Nevyplňujte toto pole</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button className={styles.submit} type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Odesílám..." : "Odeslat poptávku"}
        <ArrowRightIcon className={styles.submitIcon} />
      </button>

      <p
        className={`${styles.notice} ${
          status === "success" ? styles.noticeSuccess : status === "error" ? styles.noticeError : ""
        }`}
        aria-live="polite"
      >
        {notice}
      </p>
    </form>
  );
}

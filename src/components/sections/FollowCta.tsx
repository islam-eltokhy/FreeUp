"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Instagram } from "@/lib/icons";
import { STORE } from "@/lib/utils";

export function FollowCta() {
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 10) return;
    setDone(true);
  }

  return (
    <section className="container-x pb-10 pt-4">
      <div className="noise relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand via-brand-2 to-ink px-6 py-14 text-center text-white sm:px-12 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blush-2 opacity-30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-camel opacity-40 blur-3xl" />
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur">
          <Instagram className="h-6 w-6" />
        </span>
        <p className="font-script mt-5 text-3xl">{STORE.tagline}</p>
        <h2 className="font-display mx-auto mt-2 max-w-2xl text-balance text-3xl font-semibold leading-[1.05] sm:text-5xl">
          Be first to the next drop.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/75">
          New pieces land every week and the best sizes go first. Leave your WhatsApp number for early access, or
          follow along on Instagram.
        </p>
        {done ? (
          <p className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-brand">
            <Check className="h-4 w-4" strokeWidth={3} /> You’re on the list. We’ll message you before the next drop.
          </p>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <label htmlFor="whatsapp-number" className="sr-only">
              WhatsApp number
            </label>
            <input
              id="whatsapp-number"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01X XXXX XXXX"
              className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-white placeholder:text-white/50 backdrop-blur focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold text-brand transition hover:bg-blush"
            >
              Notify me <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
        <a
          href={STORE.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline-offset-4 hover:underline"
        >
          <Instagram className="h-4 w-4" /> Follow Vibes Outlet on Instagram
        </a>
      </div>
    </section>
  );
}

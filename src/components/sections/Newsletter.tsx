"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  }

  return (
    <section className="container-x pb-10 pt-4">
      <div className="noise relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet via-violet-2 to-ink px-6 py-14 text-center text-white sm:px-12 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime opacity-30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-coral opacity-30 blur-3xl"
        />
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
          <Mail className="h-6 w-6" />
        </span>
        <h2 className="font-display mx-auto mt-6 max-w-2xl text-balance text-3xl font-extrabold leading-[1.05] sm:text-5xl">
          Get the drop before it drops.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/75">
          New outlet stock lands every Thursday. Subscribers get 24 hours early access and an extra 10% off their
          first order.
        </p>
        {done ? (
          <p className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 font-semibold text-ink">
            <Check className="h-4 w-4" strokeWidth={3} /> You’re on the list. Check your inbox for VIBES10.
          </p>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-white placeholder:text-white/50 backdrop-blur focus:border-lime focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 font-semibold text-ink transition hover:bg-lime-2"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
        <p className="mt-4 text-xs text-white/50">No spam. Unsubscribe any time.</p>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="container-shell py-8 md:py-12">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="card-surface relative overflow-hidden px-6 py-10 md:px-10 md:py-14"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(232,240,235,0.9),_transparent_42%)]" />
          <div className="relative z-10 max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.34em] text-[var(--sage)]">
              Gujarati Voice Ordering
            </p>
            <h1 className="section-title text-5xl leading-[0.92] md:text-7xl">
              Dairy Mitra
            </h1>
            <p className="mt-4 max-w-xl text-2xl leading-tight text-[var(--ink)] md:text-3xl">
              Your doodhwala&apos;s voice ledger, structured.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] md:text-lg">
              Turn informal Gujarati voice notes into clean subscription orders and ready-to-send WhatsApp confirmations using Gemma 4.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/workspace" className="btn-primary">
                Open Workspace
              </Link>
              <Link href="/customers" className="btn-secondary">
                View Customers
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="card-surface overflow-hidden"
        >
          <div className="relative min-h-[440px]">
            <Image
              src="https://images.unsplash.com/photo-1517448931760-9bf4414148c5?auto=format&fit=crop&w=1400&q=80"
              alt="Morning dairy delivery setup"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,32,26,0.72)] via-[rgba(20,32,26,0.2)] to-transparent" />
            <div className="absolute bottom-0 p-6 text-white md:p-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/75">
                Designed For Local Vendors
              </p>
              <p className="max-w-md text-lg leading-7 text-white/92">
                Capture spoken customer changes, review the extracted card, then send a clean Gujarati confirmation without leaving the browser.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

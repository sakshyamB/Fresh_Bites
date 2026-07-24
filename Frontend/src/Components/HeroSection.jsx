import React from "react";

const HeroSection = () => (
  <section className="overflow-hidden rounded-4xl border border-emerald-100 bg-white/90 p-6 shadow-[0_20px_60px_-25px_rgba(16,185,129,0.35)] backdrop-blur md:p-8">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="mb-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
          Fresh picks • Fast delivery
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Comfort food made simple, right to your door.
        </h2>
        <p className="mt-3 text-base text-slate-600 sm:text-lg">
          Browse handcrafted favorites, pick your cravings, and place your order in seconds.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 sm:min-w-70">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-2xl font-bold text-emerald-600">20+</p>
          <p className="text-sm text-slate-500">Daily specials</p>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-2xl font-bold text-emerald-600">4.9</p>
          <p className="text-sm text-slate-500">Rated by guests</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;

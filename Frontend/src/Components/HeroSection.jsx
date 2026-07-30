import React from "react";

const HeroSection = () => (
  <section className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white/90 p-4 shadow-[0_20px_60px_-25px_rgba(16,185,129,0.35)] backdrop-blur sm:p-6 md:p-8">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Delivering foods in no time, right at your doorsteps.
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base lg:text-lg">
          Explore, pick your cravings, and place your order in seconds.
        </p>
      </div>

      <div className="grid w-full max-w-sm grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3 sm:p-4">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-xl font-bold text-emerald-600 sm:text-2xl">20+</p>
          <p className="text-sm text-slate-500">Daily specials</p>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-xl font-bold text-emerald-600 sm:text-2xl">4.8</p>
          <p className="text-sm text-slate-500">Rated by guests</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;

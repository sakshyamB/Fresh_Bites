import React from "react";

const HeroSection = () => (
  <section className="panel rounded-[1.5rem] p-5 sm:p-6 lg:p-8">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Delivering food in no time, right to your door.
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
          Explore, pick your cravings, and place your order in seconds.
        </p>
      </div>

      <div className="grid w-full max-w-sm grid-cols-2 gap-3 rounded-xl border border-[#f3dcbc] bg-[#fff6ea] p-3">
        <div className="rounded-lg bg-white p-3 shadow-sm">
          <p className="text-xl font-semibold text-[#c2410c]">20+</p>
          <p className="text-sm text-slate-500">Daily specials</p>
        </div>
        <div className="rounded-lg bg-white p-3 shadow-sm">
          <p className="text-xl font-semibold text-[#c2410c]">4.8</p>
          <p className="text-sm text-slate-500">Rated by guests</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
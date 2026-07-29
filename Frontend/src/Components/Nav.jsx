import React from "react";
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { FaUser } from "react-icons/fa6";

const Nav = ({ Search, setSearch, setcart, setprofile, cartCount = 0 }) => {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4 md:px-8">
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-emerald-500 text-white shadow-md sm:h-12 sm:w-12">
            <MdFastfood className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Fresh Bites</p>
          </div>
        </div>

        <form className="flex min-w-0 flex-1 items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm sm:gap-3 sm:px-4 sm:py-3">
          <IoSearch className="h-4 w-4 shrink-0 text-slate-400 sm:h-5 sm:w-5" />
          <input
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            type="text"
            placeholder="Search items..."
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setcart(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-white text-emerald-600 shadow-md transition hover:bg-emerald-50 sm:h-12 sm:w-12"
          >
            <LuShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button 
          type="button"
          onClick={() => setprofile(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 shadow-sm sm:h-12 sm:w-12">
            <FaUser className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
import React from "react";
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";

const Nav = ({ Search, setSearch, setcart, cartCount = 0 }) => {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500 text-white shadow-md">
            <MdFastfood className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">Fresh Bites</p>
            <h1 className="text-xl font-bold text-slate-900">Food Order</h1>
          </div>
        </div>

        <form className="flex min-w-[320px] flex-1 items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm md:max-w-xl">
          <IoSearch className="text-slate-400 h-5 w-5" />
          <input
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            type="text"
            placeholder="Search items..."
            value={Search}
            onChange={(e) => setSearch?.(e.target.value)}
          />
        </form>

        <button
          type="button"
          onClick={() => setcart?.(true)}
          className="relative inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white text-emerald-600 shadow-md transition hover:bg-emerald-50"
        >
          <LuShoppingBag className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Nav;
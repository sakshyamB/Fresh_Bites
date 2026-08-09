import React from "react";
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ Search, setSearch, setcart, profile, setprofile, setlogoutpopup }) => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const getUserFromStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.log("Invalid user data in localStorage.");
      return null;
    }
  };

  const user = getUserFromStorage();

  return (
    <header className="sticky top-0 z-20 w-full border-b border-[#f3dcbc] bg-[#fffaf3]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4 md:px-8">
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f97316] text-white shadow-sm sm:h-11 sm:w-11">
            <MdFastfood className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c2410c]">
            Fresh Bites
          </p>
        </div>

        <form className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-[#f3dcbc] bg-white px-3 py-2 shadow-sm sm:gap-3 sm:px-4 sm:py-2.5">
          <IoSearch className="h-4 w-4 shrink-0 text-[#fb923c]" />
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
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#f3dcbc] bg-[#ffedd5] text-[#c2410c] shadow-sm sm:h-11 sm:w-11"
          >
            <FaShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 items-center justify-center rounded-full bg-[#f97316] px-1.5 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setprofile(!profile)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#f3dcbc] bg-[#ffedd5] text-[#c2410c] shadow-sm sm:h-11 sm:w-11"
            >
              <FaUser className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            {profile && (
              <div className="absolute right-0 top-14 w-56 rounded-xl border border-slate-200 bg-white shadow-lg">
                <div className="border-b px-4 py-3">
                  <p className="font-semibold">
                    Hello, {user?.username || "there"}
                  </p>
                </div>

                {user ? (
                  <>
                    <Link
                      to="/myorder"
                      onClick={() => setprofile(false)}
                      className="block w-full border-b px-4 py-3 text-left hover:bg-gray-100"
                    >
                      My Orders
                    </Link>

                    <button
                      type="button"
                      onClick={()=> setlogoutpopup(true)}
                      className="w-full px-4 py-3 text-left text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-3">
                    <Link
                      to="/login"
                      onClick={() => setprofile(false)}
                      className="block text-sm font-semibold text-orange-600"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setprofile(false)}
                      className="mt-2 block text-sm text-slate-600"
                    >
                      Create an account
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AdminNav = ({ setlogoutpopup }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setOpen(false);
    navigate(path);
  };

  const getUserFromStorage = () =>{
    const userstored = localStorage.getItem("user");
    if(!userstored){
        return null;
    }
    try{
    return JSON.parse(userstored)
    }
    catch(error){
    console.log("Invalid user in localstorage.")
    return null;
    }
  }

  const user = getUserFromStorage(); 

  return (
    <>
      <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-orange-600">
                Fresh Bites
              </h1>

              <p className="text-xs text-gray-500">
                Admin Panel
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition hover:bg-orange-200"
            aria-label="Open admin menu"
          >
            <IoMdMenu size={24} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute right-0 top-0 h-full w-72 bg-white p-5 shadow-2xl">
            <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Admin Panel
                </h2>

                <p className="text-sm text-gray-500">
                  Manage Fresh Bites
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close admin menu"
              >
                <IoMdClose size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
                <h1 className="rounded-xl bold px-4 py-0 text-left font-medium text-rose-600">
                    Hello, {user.username || "there"}.
                </h1>

              <button
                type="button"
                onClick={() => handleNavigation("/dashboard")}
                className="rounded-xl border px-4 py-3 text-left font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Orders
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/menu")}
                className="rounded-xl border px-4 py-3 text-left font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Menu
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/stats")}
                className="rounded-xl border px-4 py-3 text-left font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Statistics
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/promos")}
                className="rounded-xl border px-4 py-3 text-left font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Promo codes
              </button>            

              <button
                type="button"
                onClick={() => setlogoutpopup(true)}
                className="mt-4 border rounded-xl px-4 py-3 text-left font-medium text-red-500 transition hover:bg-red-50"
              >
                Logout
              </button>

            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminNav;


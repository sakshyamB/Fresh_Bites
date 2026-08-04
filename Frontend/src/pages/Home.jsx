import React, { useState } from "react";
import Nav from "../Components/Nav";
import Categories from "../Category";
import HeroSection from "../Components/HeroSection";
import CategoryTabs from "../Components/CategoryTabs";
import Food from "../Components/Food";
import CartPanel from "../Components/CartPanel";

const Home = () => {
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [selected, setSelected] = useState("All");
  const [showCart, setShowCart] = useState(false);

  const hasActiveSearch = search.trim() !== "";

  const filter = (categoryName) => {
    setSearch("");
    setSelected(categoryName);
  };

  return (
    <div className="app-shell">
      <Nav
        Search={search}
        setSearch={setSearch}
        profile={showProfile}
        setprofile={setShowProfile}
        setcart={setShowCart}
      />

      <main className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
        {!hasActiveSearch && <HeroSection />}

        {!hasActiveSearch && (
          <section className="panel p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-md font-bold uppercase text-[#c2410c] md:text-sm">
                  Menu
                </p>
                <p className="mt-1 text-sm font-semibold text-[#f97316]">
                  Choose your desired category.
                </p>
              </div>
            </div>
            <CategoryTabs
              categories={Categories}
              selected={selected}
              onSelect={filter}
            />
          </section>
        )}

        <Food selectedCategory={selected} search={search} />
      </main>

      {showCart && <CartPanel onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default Home;
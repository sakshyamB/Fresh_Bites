import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Components/Nav";
import Categories from "../Category";
import HeroSection from "../Components/HeroSection";
import CategoryTabs from "../Components/CategoryTabs";
import FoodGrid from "../Components/FoodGrid";
import CartPanel from "../Components/CartPanel";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/food/getfoods");
        setFoods(response.data.data);
      } catch {
        setError("Unable to load food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filter = (categoryName) => {
    setSearch("");
    setSelected(categoryName);
  };

  const filteredFood = selected === "All" ? foods : foods.filter((item) => item.category === selected);
  const searchedFood = filteredFood.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const addToCart = (food) => {
    const itemId = food._id ?? food.id;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) return prev.map((item) => (item.id === itemId ? { ...item, qty: item.qty + 1 } : item));

      return [...prev, { id: itemId, name: food.name, price: food.price, image: food.image, qty: 1 }];
    });
  };

  const increaseQty = (id) => setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
  const decreaseQty = (id) => setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item)));
  const removeItem = (id) => setCartItems((prev) => prev.filter((item) => item.id !== id));
  const placeOrder = () => {
    alert("Order placed successfully 🎉");
    setCartItems([]);
    setShowCart(false);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = cartItems.length > 0 ? 50 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f0fdf4,#ffffff_55%)] text-slate-800">
      <Nav Search={search} setSearch={setSearch} setcart={setShowCart} cartCount={cartItems.length} />

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 lg:px-8">
        <HeroSection />

        <section className="rounded-4xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-slate-900">Explore by category</h3>
            <p className="text-sm text-slate-500">Choose a favorite and keep browsing.</p>
          </div>
          <CategoryTabs categories={Categories} selected={selected} onSelect={filter} />
        </section>

        <section className="rounded-4xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
          {loading ? (
            <div className="flex min-h-60 items-center justify-center rounded-2xl bg-slate-50 text-center">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Loading food items...</h2>
                <p className="mt-2 text-sm text-slate-500">Fetching the latest favorites.</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex min-h-60 items-center justify-center rounded-2xl bg-rose-50 text-center">
              <h2 className="text-xl font-semibold text-rose-700">{error}</h2>
            </div>
          ) : !searchedFood.length ? (
            <div className="flex min-h-60 items-center justify-center rounded-2xl bg-slate-50 text-center">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Nothing matches right now</h2>
                <p className="mt-2 text-sm text-slate-500">Try another category or search term.</p>
              </div>
            </div>
          ) : (
            <FoodGrid items={searchedFood} onAdd={addToCart} />
          )}
        </section>
      </main>

      {showCart && (
        <CartPanel
          cartItems={cartItems}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          grandTotal={grandTotal}
          onClose={() => setShowCart(false)}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onRemove={removeItem}
          onPlaceOrder={placeOrder}
        />
      )}
    </div>
  );
};

export default Home;
import React from "react";

const FoodCard = ({ item, onAdd }) => {
  const itemId = item._id ?? item.id;
  const isVeg = item.type === "veg" || item.type === "🟢veg";

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img src={item.image} alt={item.name} className="h-52 w-full object-cover" />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
            <p className="text-sm text-slate-500">{item.category}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isVeg ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
            {item.type}
          </span>
        </div>
        <p className="text-sm leading-6 text-slate-600">{item.description}</p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-slate-900">Rs. {item.price}</span>
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;

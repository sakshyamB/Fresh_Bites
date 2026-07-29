import React from "react";

const FoodCard = ({ item, onAdd }) => {
  const isVeg = item.type === "veg" || item.type === "🟢veg";

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img src={item.image} alt={item.name} className="h-44 w-full object-cover sm:h-52" />
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">{item.name}</h3>
            <p className="text-sm text-slate-500">{item.category}</p>
          </div>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${isVeg ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
            {item.type}
          </span>
        </div>
        <p className="text-sm leading-6 text-slate-600">{item.description}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-lg font-bold text-slate-900">Rs. {item.price}</span>
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="w-full rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 sm:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;

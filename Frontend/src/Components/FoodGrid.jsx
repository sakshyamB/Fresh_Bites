import React from "react";
import FoodCard from "./FoodCard";

const FoodGrid = ({ items, onAdd }) => {
  if (!items.length) {
    return (
      <div className="w-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
        No items match your search.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <FoodCard key={item._id ?? item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default FoodGrid;

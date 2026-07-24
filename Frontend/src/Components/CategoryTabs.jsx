import React from "react";

const CategoryTabs = ({ categories, selected, onSelect }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.name)}
          className={`flex flex-col items-center justify-center gap-2 rounded-3xl border px-4 py-4 text-center transition focus:outline-none ${
            selected === category.name
              ? "border-emerald-400 bg-emerald-50 shadow-sm"
              : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          <span>{category.icon}</span>
          <span className="text-sm font-semibold text-slate-700">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;

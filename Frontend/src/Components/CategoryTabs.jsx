import React from "react";

const CategoryTabs = ({ categories, selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
      {categories.map((category) => {
        const isActive = selected === category.name;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.name)}
            className={`flex min-h-24 rounded-2xl border flex-col items-center justify-center gap-1 px-3 py-3 text-center transition ${
              isActive
                ? "border-[#f97316] bg-[#ffedd5] text-[#c2410c] shadow-sm"
                : "border-[#f3dcbc] bg-[#fffaf3] text-slate-700"
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;

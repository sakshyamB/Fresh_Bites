import React from "react";

const CartItem = ({ item, increase, decrease, remove }) => {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center">
      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-slate-900">{item.name}</h3>
        <p className="mt-1 text-sm text-slate-500">
          Rs. {item.price} × {item.qty} ={" "}
          <span className="font-semibold text-slate-900">Rs. {item.price * item.qty}</span>
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => decrease(item.id)}
            disabled={item.qty === 1}
            className={`h-8 w-8 rounded-full border border-slate-300 text-lg transition ${
              item.qty === 1 ? "cursor-not-allowed opacity-40" : "hover:bg-slate-100"
            }`}
          >
            −
          </button>

          <span className="min-w-6 text-center text-sm font-semibold">{item.qty}</span>

          <button
            type="button"
            onClick={() => increase(item.id)}
            className="h-8 w-8 rounded-full border border-slate-300 text-lg transition hover:bg-slate-100"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => remove(item.id)}
          className="ml-1 text-lg text-rose-500 transition hover:text-rose-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;
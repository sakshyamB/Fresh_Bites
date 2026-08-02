import React from "react";

const CartItem = ({ item, increase, decrease, remove }) => {
  return (
    <div className="mb-3 flex flex-col gap-3 rounded-[1.25rem] border border-[#f3dcbc] bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 rounded-2xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-slate-900">{item.name}</h3>
        <p className="mt-1 text-sm text-slate-500">
          Rs. {item.price} × {item.quantity} ={" "}
          <span className="font-semibold text-[#c2410c]">
            Rs. {item.price * item.quantity}
          </span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <div className="flex items-center gap-2">
          <button
            onClick={() => decrease(item._id)}
            disabled={item.quantity === 1}
            className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#f3dcbc] text-lg ${
              item.quantity === 1
                ? "cursor-not-allowed opacity-40"
                : "hover:bg-[#fff6ea]"
            }`}
          >
            −
          </button>

          <span className="min-w-6 text-center text-sm font-semibold">{item.quantity}</span>

          <button
            onClick={() => increase(item._id)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f3dcbc] text-lg hover:bg-[#fff6ea]"
          >
            +
          </button>
        </div>

        <button
          onClick={() => remove(item._id)}
          className="text-lg text-rose-500 transition hover:text-rose-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;
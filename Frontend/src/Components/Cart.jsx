import React from "react";
import CartItem from "./CartItem";

const Cart = ({ cart, increase, decrease, remove }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#f3dcbc] bg-[#fff6ea] p-4">
        <p className="text-sm font-semibold text-slate-700">
          Pick your quantity and place the order whenever you are ready.
        </p>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2 sm:px-3">
        {cart.length === 0 ? (
          <div className="mt-8 rounded-[1.25rem] border border-dashed border-[#f3dcbc] bg-white/80 p-6 text-center text-sm text-slate-500">
            Your cart is empty. Add a few favorites to get started.
          </div>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              increase={increase}
              decrease={decrease}
              remove={remove}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
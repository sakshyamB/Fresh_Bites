import React from "react";
import Cart from "./Cart";

const CartDrawer = ({ open, onClose, cartItems, increase, decrease, remove, subtotal, deliveryFee, grandTotal, onPlaceOrder }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/30">
      <div className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#f3dcbc] bg-[#fff6ea] p-4">
          <h2 className="text-xl font-bold text-slate-900">Your Cart</h2>
          <button type="button" onClick={onClose} className="text-xl">❌</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Cart cart={cartItems} increase={increase} decrease={decrease} remove={remove} />
        </div>

        <div className="space-y-3 border-t border-[#f3dcbc] p-4">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Delivery Fee</span>
            <span>Rs. {deliveryFee}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-slate-900">
            <span>Total</span>
            <span>Rs. {grandTotal}</span>
          </div>
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={onPlaceOrder}
            className={`w-full rounded-3xl px-4 py-3 text-sm font-semibold text-white transition ${
              cartItems.length === 0 ? "bg-slate-300 cursor-not-allowed" : "bg-[#f97316] hover:bg-[#ea580c]"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

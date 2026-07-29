import React from "react";
import Cart from "./Cart";

const CartPanel = ({ cartItems, subtotal, deliveryFee, grandTotal, onClose, onIncrease, onDecrease, onRemove, onPlaceOrder }) => (
  <div className="fixed inset-0 z-50 bg-slate-900/50" onClick={onClose}>
    <div className="absolute inset-0 flex h-full w-full flex-col bg-white shadow-2xl sm:absolute sm:right-0 sm:top-0 sm:max-w-md sm:inset-auto" onClick={(event) => event.stopPropagation()}>
      <div className="flex items-center justify-between border-b border-slate-200 bg-emerald-50 p-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Your cart</h2>
          <p className="text-sm text-slate-500">Ready for checkout</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-slate-800">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="mt-10 text-center text-slate-500">Your cart is empty.</p>
        ) : (
          <Cart cart={cartItems} increase={onIncrease} decrease={onDecrease} remove={onRemove} />
        )}
      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>Rs. {subtotal}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-slate-600">
          <span>Delivery Fee</span>
          <span>Rs. {deliveryFee}</span>
        </div>
        <div className="mt-3 flex justify-between text-lg font-semibold text-slate-900">
          <span>Grand Total</span>
          <span>Rs. {grandTotal}</span>
        </div>

        <button
          type="button"
          disabled={cartItems.length === 0}
          onClick={onPlaceOrder}
          className={`mt-4 w-full rounded-full py-3 font-semibold text-white transition ${
            cartItems.length === 0 ? "cursor-not-allowed bg-slate-400" : "bg-emerald-500 hover:bg-emerald-600"
          }`}
        >
          Place order
        </button>
      </div>
    </div>
  </div>
);

export default CartPanel;

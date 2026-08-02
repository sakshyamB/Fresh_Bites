import React from "react";
import Cart from "./Cart";
import { useCart } from "../context/CartContext";

const CartPanel = ({ onClose }) => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const deliveryFee = cart.length > 0 ? 50 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const placeOrder = () => {
    alert("Order placed successfully 🎉");
    clearCart();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/30"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-[#f3dcbc] bg-[#fffaf3]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#f3dcbc] bg-[#fff6ea] p-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Your cart</h2>
            <p className="text-sm text-slate-500">Ready for checkout</p>
          </div>

          <button onClick={onClose} className="rounded-full p-2 text-slate-600">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="mt-10 px-4 text-center text-sm text-slate-500">
              Your cart is empty.
            </p>
          ) : (
            <Cart
              cart={cart}
              increase={increaseQuantity}
              decrease={decreaseQuantity}
              remove={removeFromCart}
            />
          )}
        </div>

        <div className="border-t border-[#f3dcbc] bg-white p-4">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>Rs. {cartTotal}</span>
          </div>

          <div className="mt-2 flex justify-between text-sm text-slate-600">
            <span>Delivery Fee</span>
            <span>Rs. {deliveryFee}</span>
          </div>

          <div className="mt-3 flex justify-between text-base font-semibold text-slate-900">
            <span>Grand Total</span>
            <span>Rs. {grandTotal}</span>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={placeOrder}
            className={`mt-4 w-full rounded-full py-3 font-semibold text-white ${
              cart.length === 0 ? "cursor-not-allowed bg-slate-400" : "bg-[#f97316] hover:bg-[#ea580c]"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
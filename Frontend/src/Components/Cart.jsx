import React from "react";
import CartItem from "./CartItem";

const Cart = ({ cart, increase, decrease, remove }) => {
  return (
    <div className="h-full flex flex-col">
      <p className="text-sm font-bold p-4 border-b">
        Please Select the Quantity and place your order.
      </p>
      <div className="flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            Your cart is empty.
          </p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
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
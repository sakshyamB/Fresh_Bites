import React, { useState } from "react";
import axios from "axios";
import toastr from "toastr";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ cart, deliveryFee, grandTotal, onCancel, onPlaceOrder }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [notes, setNotes] = useState("");
    const [promoCode, setPromoCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const { clearCart } = useCart();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!fullName || !phoneNumber || !deliveryAddress) {
            setError("Please fill in all required fields.");
            return;
        }

        if (cart.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setShowLoginPrompt(true);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(
                `${API_URL}/orders/create`,
                {
                    items: cart.map((item) => ({
                        food: item._id,
                        quantity: item.quantity,
                    })),
                    fullName,
                    phoneNumber,
                    deliveryAddress,
                    paymentMethod,
                    notes,
                    promoCode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const successMessage =
                response.data.message || "Order placed successfully.";

            setMessage(successMessage);

            toastr.success(successMessage, "Order Placed", {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-right",
                timeOut: 2500,
            });

            clearCart();
            onPlaceOrder();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Could not place order. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (showLoginPrompt) {
        return (
            <div className="p-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                        <span className="text-2xl">🔐</span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Please Login to Place an Order
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                        You need to be logged in before you can place your order.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 sm:w-auto"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-2">
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                        Full Name
                    </span>

                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
                        placeholder="Your Name"
                        required
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                        Phone Number
                    </span>

                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
                        placeholder="98XXXXXXXX or 97XXXXXXXX"
                        required
                    />
                </label>
            </div>

            <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                    Delivery Address
                </span>

                <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
                    placeholder="Street, City, District"
                    rows={4}
                    required
                />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                        Mode of Payment
                    </span>

                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
                    >
                        <option>Cash on Delivery</option>
                        <option>E-sewa</option>
                        <option>Khalti</option>
                        <option>Mobile Banking</option>
                    </select>
                </label>

                <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                        Promo Code
                    </span>

                    <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
                        placeholder="Enter promo code"
                    />
                </label>
            </div>

            <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                    Notes for Delivery
                </span>

                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
                    placeholder="e.g. leave at the gate, ring bell once"
                    rows={3}
                />
            </label>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">
                    Order summary
                </p>

                <div className="mt-3 flex justify-between text-sm">
                    <span>Subtotal</span>

                    <span>
                        Rs.{" "}
                        {cart.reduce(
                            (sum, item) =>
                                sum + item.price * item.quantity,
                            0
                        )}
                    </span>
                </div>

                <div className="mt-2 flex justify-between text-sm">
                    <span>Delivery fee</span>
                    <span>Rs. {deliveryFee}</span>
                </div>

                <div className="mt-2 flex justify-between text-sm font-semibold text-slate-900">
                    <span>Grand total</span>
                    <span>Rs. {grandTotal}</span>
                </div>
            </div>

            {error && (
                <div className="rounded-md border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {message && (
                <div className="rounded-md border border-green-300 bg-green-100 px-4 py-3 text-sm text-green-700">
                    {message}
                </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full rounded-full border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 sm:w-auto sm:px-6"
                >
                    Back to cart
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto sm:px-6"
                >
                    {isSubmitting ? "Placing order..." : "Place Order"}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
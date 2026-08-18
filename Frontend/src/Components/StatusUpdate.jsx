import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StatusUpdate = ({ setopenOrderStatus, orderId }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [status, setStatus] = useState("");
    const [isChanging, setIsChanging] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!status) {
            setError("Please select a status.");
            return;
        }

        setIsChanging(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                return;
            }

            const response = await axios.put(`${API_URL}/orders/${orderId}/status`,
                { status: status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);
            setSuccess(true);

        } catch (error) {
            console.log(error);

            setError(error.message ||
                "Couldn't change the status."
            );
        } finally {
            setIsChanging(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-6 sm:px-6">
            <div className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl ring-1 ring-slate-200 sm:p-8">
                {success ? (
                    <div className="space-y-5 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                            ✓
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900">Status Updated</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Order status changed successfully.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setopenOrderStatus(false);
                                navigate("/dashboard");
                                window.location.reload();
                            }}
                            className="mx-auto inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        >
                            OK
                        </button>
                    </div>
                ) : (
                    <div className="space-y-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-900">Change Order Status</h2>
                                <p className="mt-2 text-sm text-slate-500">
                                    Choose the new status for this order.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setopenOrderStatus(false)}
                                className="rounded-full px-3 py-2 text-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                    "Pending",
                                    "Processing",
                                    "Packaging",
                                    "Out for Delivery",
                                    "Delivered",
                                    "Cancelled",
                                ].map((value) => (
                                    <label
                                        key={value}
                                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${status === value
                                                ? "border-orange-400 bg-orange-50"
                                                : "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/70"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value={value}
                                            checked={status === value}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="h-4 w-4 accent-orange-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700">{value}</span>
                                    </label>
                                ))}
                            </div>

                            {error && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isChanging}
                                className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                            >
                                {isChanging ? "Updating..." : "Update Status"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusUpdate;


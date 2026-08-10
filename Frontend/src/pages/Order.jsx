import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav";
import Logoutpopup from "../Components/Logoutpopup";
import axios from "axios";
import StatusUpdate from "../Components/StatusUpdate";

const formatDate = (value) => {
  if (!value) return "Unknown date";
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logoutpopup, setlogoutpopup] = useState(false);
  const [openOrderStatus, setopenOrderStatus] = useState(false);
  const [selectedOrderId, setselectedOrderId] = useState(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:3001/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <AdminNav setlogoutpopup={setlogoutpopup} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-orange-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              All Orders
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Review recent orders, payment details, and delivery status in one
              place.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid min-h-[60vh] place-items-center rounded-3xl bg-white p-10 text-slate-500 shadow-sm">
            Loading orders...
          </div>
        ) : error ? (
          <div className="grid min-h-[60vh] place-items-center rounded-3xl bg-white p-10 text-center text-red-500 shadow-sm">
            {error}
          </div>
        ) : !orders.length ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">No orders yet</h2>
            <p className="mt-3 text-sm text-slate-500">
              As soon as orders arrive, they will show up here for review.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              return (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm"
                >
                  <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                          #{order._id.slice(-8)}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">
                          Customer
                        </p>
                        <p className="text-lg font-semibold text-slate-900">
                          {order.fullName}
                        </p>
                      </div>
                    </div>

                    <div className=" flex items-start gap-5 sm:items-end">
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] ${order.status == "cancelled"
                            ? "bg-rose-100 text-rose-600"
                            : "bg-orange-100 text-orange-700"
                          }`}
                      >
                        {order.status || "Pending"}
                      </span>
                      <span>
                        <button
                          onClick={() => {setopenOrderStatus(true);
                            setselectedOrderId(order._id);
                          }}
                          className="rounded-md bg-rose-300 px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                        >
                          Change Status
                        </button>
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">
                      Total:{" "}
                      <span className="font-semibold text-slate-900">
                        Rs. {order.grandTotal}
                      </span>
                    </p>
                  </div>

                  <div className="grid gap-4 p-4 md:grid-cols-[1.4fr_0.6fr]">
                    <div className="space-y-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-3xl bg-[#fff6ea] p-3">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-orange-600">
                            Delivery
                          </p>
                          <p className="mt-2 text-sm text-slate-700">
                            {order.deliveryAddress}
                          </p>
                        </div>
                        <div className="rounded-3xl bg-[#fff6ea] p-3">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-orange-600">
                            Payment
                          </p>
                          <p className="mt-2 text-sm text-slate-700">
                            {order.paymentMethod}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-2 rounded-3xl bg-orange-50 p-3 sm:grid-cols-3">
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-orange-600">
                            Subtotal
                          </p>
                          <p className="mt-1 font-semibold text-slate-900">
                            Rs. {order.subtotal}
                          </p>
                        </div>
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-orange-600">
                            Delivery
                          </p>
                          <p className="mt-1 font-semibold text-slate-900">
                            Rs. {order.deliveryCharge}
                          </p>
                        </div>
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-orange-600">
                            Discount
                          </p>
                          <p className="mt-1 font-semibold text-slate-900">
                            Rs. {order.discount}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {order.status == "cancelled" ? (
                        <div className="rounded-3xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
                          This order has been cancelled and is no longer moving
                          through the delivery flow.
                        </div>
                      ) : (
                        <div className="space-y-4"></div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 p-4">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h2 className="text-base font-semibold text-slate-900">
                          Order items
                        </h2>
                        <p className="text-sm text-slate-500">
                          {order.items?.length || 0} item(s)
                        </p>
                      </div>
                      {order.promoCode && (
                        <span className="rounded-full bg-orange-100 px-2 py-1 text-[0.65rem] font-semibold text-orange-700">
                          Promo: {order.promoCode}
                        </span>
                      )}
                    </div>

                    <div className="divide-y divide-slate-100">
                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-900">
                              {item.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {item.quantity} × Rs. {item.price}
                            </p>
                          </div>
                          <p className="font-semibold text-slate-900">
                            Rs. {item.price * item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {logoutpopup && (
        <Logoutpopup setLogoutpopup={setlogoutpopup} setprofile={() => { }} />
      )}

      {openOrderStatus && (<StatusUpdate setopenOrderStatus={setopenOrderStatus}
      orderId={selectedOrderId}
      />)}
    </div>
  );
};

export default Order;

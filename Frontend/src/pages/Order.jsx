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

        const { data } = await axios.get(
          "http://localhost:3001/orders/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 text-slate-900">

      <AdminNav setlogoutpopup={setlogoutpopup} />

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}
        <div className="mb-5 rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm backdrop-blur-sm">

          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600">
            Admin Dashboard
          </p>

          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                All Orders
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Review orders, payment details and delivery status.
              </p>
            </div>

            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              {orders.length} Orders
            </span>

          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid min-h-[40vh] place-items-center rounded-[2rem] border border-dashed border-orange-200 bg-white p-10 text-slate-500 shadow-sm">
            Loading orders...
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-[2rem] border border-red-200 bg-white p-10 text-center text-red-500 shadow-sm">
            {error}
          </div>
        )}

        {/* NO ORDERS */}
        {!loading && !error && !orders.length && (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              As soon as orders arrive, they will show up here for review.
            </p>
          </div>
        )}

        {/* ORDERS */}
        {!loading && !error && orders.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-2">

            {orders.map((order) => (

              <article
                key={order._id}
                className="overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >

                {/* HEADER */}
                <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 via-white to-orange-50 p-4">

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-700">
                          #{order._id.slice(-8)}
                        </span>

                        <span className="text-xs text-slate-400">
                          {formatDate(order.createdAt)}
                        </span>

                      </div>

                      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                        Customer
                      </p>

                      <p className="truncate text-base font-bold text-slate-900">
                        {order.fullName}
                      </p>

                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-2">

                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          order.status?.toLowerCase() === "cancelled"
                            ? "border-rose-200 bg-rose-50 text-rose-600"
                            : "border-orange-200 bg-orange-50 text-orange-700"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>

                      <p className="text-lg font-bold text-orange-600">
                        Rs. {order.grandTotal}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => {
                      setopenOrderStatus(true);
                      setselectedOrderId(order._id);
                    }}
                    className="mt-3 w-full rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                  >
                    Change Status
                  </button>

                </div>

                {/* DELIVERY + PAYMENT */}
                <div className="grid grid-cols-2 gap-3 p-4">

                  <div className="rounded-2xl bg-[#fff7eb] p-3 ring-1 ring-orange-50">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                      Delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-700">
                      {order.deliveryAddress}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-[#fff7eb] p-3 ring-1 ring-orange-50">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                      Payment
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-700">
                      {order.paymentMethod}
                    </p>

                  </div>

                </div>

                {/* PRICE SUMMARY */}
                <div className="mx-4 mb-4 grid grid-cols-3 gap-2 rounded-2xl bg-orange-50 p-2">

                  <div className="rounded-xl bg-white p-2.5">
                    <p className="text-[9px] uppercase tracking-wider text-slate-400">
                      Subtotal
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Rs. {order.subtotal}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-2.5">
                    <p className="text-[9px] uppercase tracking-wider text-slate-400">
                      Delivery
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Rs. {order.deliveryCharge}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-2.5">
                    <p className="text-[9px] uppercase tracking-wider text-slate-400">
                      Discount
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      Rs. {order.discount}
                    </p>
                  </div>

                </div>

                {/* CANCELLED MESSAGE */}
                {order.status?.toLowerCase() === "cancelled" && (

                  <div className="mx-4 mb-4 rounded-2xl border border-rose-100 bg-rose-50 p-3 text-xs text-rose-700">
                    This order has been cancelled and is no longer moving
                    through the delivery flow.
                  </div>

                )}

                {/* ITEMS */}
                <div className="border-t border-slate-100 p-4">

                  <div className="mb-2 flex items-center justify-between">

                    <h2 className="text-sm font-bold text-slate-900">
                      Order Items
                    </h2>

                    <span className="text-xs text-slate-400">
                      {order.items?.length || 0} item(s)
                    </span>

                  </div>

                  <div className="divide-y divide-slate-100">

                    {order.items?.map((item, index) => (

                      <div
                        key={index}
                        className="flex items-center justify-between gap-3 py-2.5"
                      >

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-slate-900">
                            {item.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {item.quantity} × Rs. {item.price}
                          </p>

                        </div>

                        <p className="shrink-0 text-sm font-bold text-slate-900">
                          Rs. {item.price * item.quantity}
                        </p>

                      </div>

                    ))}

                  </div>

                  {order.promoCode && (

                    <div className="mt-3">

                      <span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-semibold text-orange-700">
                        Promo: {order.promoCode}
                      </span>

                    </div>

                  )}

                </div>

              </article>

            ))}

          </div>
        )}

      </main>

      {/* LOGOUT */}
      {logoutpopup && (
        <Logoutpopup
          setLogoutpopup={setlogoutpopup}
          setprofile={() => {}}
        />
      )}

      {/* STATUS UPDATE */}
      {openOrderStatus && (
        <StatusUpdate
          setopenOrderStatus={setopenOrderStatus}
          orderId={selectedOrderId}
        />
      )}

    </div>
  );
};

export default Order;


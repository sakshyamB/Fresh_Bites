import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../Components/AdminNav";
import Logoutpopup from "../Components/Logoutpopup";

const Statistics = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logoutpopup, setlogoutpopup] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${API_URL}/orders/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message ||"Could not load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const countStatus = (status) => {
    return orders.filter(
      (order) =>
        order.status?.toLowerCase() === status.toLowerCase()
    ).length;
  };

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.grandTotal || 0),
    0
  );

  const delivered = countStatus("Delivered");
  const cancelled = countStatus("Cancelled");
  const pending = countStatus("Pending");
  const processing = countStatus("Processing");
  const packaging = countStatus("Packaging");
  const outForDelivery = countStatus("Out for Delivery");

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf3]">
        <AdminNav setlogoutpopup={setlogoutpopup}/>

    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600">
          Admin Analytics
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Statistics
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Order and revenue overview for Fresh Bites.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wider text-orange-600">
            Total Orders
          </p>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            {totalOrders}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            All orders received
          </p>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wider text-orange-600">
            Revenue
          </p>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            {formatCurrency(totalRevenue)}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Total order value
          </p>
        </div>

        <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wider text-green-600">
            Delivered
          </p>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            {delivered}
          </p>
        </div>

        <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wider text-red-600">
            Cancelled
          </p>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            {cancelled}
          </p>
        </div>

      </section>

      <section className="mt-6 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">

        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Live Orders
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current orders that are still being processed.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">
              Pending
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {pending}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-semibold text-blue-600">
              Processing
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {processing}
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
            <p className="text-sm font-semibold text-yellow-600">
              Packaging
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {packaging}
            </p>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
            <p className="text-sm font-semibold text-orange-600">
              Out for Delivery
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {outForDelivery}
            </p>
          </div>
        </div>
      </section>
    </main>
       {logoutpopup && (
        <Logoutpopup setLogoutpopup={setlogoutpopup} setprofile={() => { }} />
      )}
    </div>
  );
};

export default Statistics;


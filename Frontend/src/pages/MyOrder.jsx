import { useEffect, useState } from "react";
import axios from "axios";

const statuses = [
  "Pending",
  "Processing",
  "Packaging",
  "Out for Delivery",
  "Delivered",
];

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:3001/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusIndex = (status) =>
    statuses.findIndex((s) => s.toLowerCase() === status?.toLowerCase());

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center bg-[#fffaf3] text-slate-500">
        Loading orders...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen grid place-items-center bg-[#fffaf3] px-4 text-center text-red-500">
        {error}
      </div>
    );

  return (
    <main className="min-h-screen bg-[#fffaf3] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
            Order History
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
            </div>

            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>
        </header>

        {!orders.length ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No orders yet
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Your orders will appear here once you place one.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const current = statusIndex(order.status);
              return (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5">
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        ORDER #{order._id.slice(-8)}
                      </p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {order.fullName}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-400">TOTAL</p>
                      <p className="text-xl font-bold text-orange-600">
                        Rs. {order.grandTotal}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#fffaf3] p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="font-bold text-slate-800">Order Status</h2>

                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                        {order.status || "Pending"}
                      </span>
                    </div>

                    <div className="overflow-x-auto pb-2">
                      <div className="flex min-w-140 items-start">
                        {statuses.map((status, i) => (
                          <div key={status} className="flex flex-1 items-start">
                            <div className="flex flex-col items-center">
                              <div
                                className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${
                                  i <= current
                                    ? "bg-orange-500 text-white"
                                    : "bg-slate-200 text-slate-400"
                                }`}
                              >
                                {i < current ? "✓" : i + 1}
                              </div>
                              <span
                                className={`mt-2 whitespace-nowrap text-xs ${
                                  i <= current
                                    ? "font-bold text-orange-600"
                                    : "text-slate-400"
                                }`}
                              >
                                {status}
                              </span>
                            </div>
                            {i < statuses.length - 1 && (
                              <div
                                className={`mt-4 h-1 flex-1 ${
                                  i < current ? "bg-orange-500" : "bg-slate-200"
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex justify-between">
                      {" "}
                      <h2 className="font-bold text-slate-800">Items</h2>
                      <span className="text-sm text-slate-500">
                        {order.items?.length || 0} items
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {order.items?.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-3 py-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-medium text-slate-800">
                              {item.name}
                            </p>
                            <p className="text-sm text-slate-400">
                              {item.quantity} × Rs. {item.price}
                            </p>
                          </div>

                          <p className="shrink-0 font-semibold text-slate-700">
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
      </div>
    </main>
  );
};

export default Order;

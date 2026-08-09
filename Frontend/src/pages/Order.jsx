import React, { useState, useEffect } from 'react'
import AdminNav from '../Components/AdminNav'
import Logoutpopup from '../Components/Logoutpopup'
import axios from 'axios'

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logoutpopup, setlogoutpopup] = useState(false);

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
    <div>
      <AdminNav setlogoutpopup={setlogoutpopup} />
    
    {!orders.length? (
     <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
    <h2 className="mt-4 text-xl font-bold text-slate-900">
      No orders yet
     </h2>
     </div>):
     (
        <div>
        {orders.map((order)=>(
            <article key={order._id}>
                {order.status}
                {order.subtotal}
            </article>
        ))}
        </div>
     )
        }

      {logoutpopup && (
        <Logoutpopup
          setLogoutpopup={setlogoutpopup}
          setprofile={() => {}}
        />
      )}
    </div>
  )
}

export default Order

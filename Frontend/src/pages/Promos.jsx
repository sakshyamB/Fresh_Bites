import React, { useEffect, useState } from 'react'
import AdminNav from '../Components/AdminNav'
import Logoutpopup from '../Components/Logoutpopup'
import axios from 'axios'
import AddPromos from '../Components/AddPromos'

const Promos = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [promos, setPromos] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [logoutpopup, setlogoutpopup] = useState(false)
  const [showAddPromos, setShowAddPromos] = useState(false)

  useEffect(() => {
    fetchAllPromos()
  }, [])

  const fetchAllPromos = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${API_URL}/promos/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPromos(res.data.promos || [])
    } catch (err) {
      setError(err.message || "Couldn't fetch promo codes.")
    } finally {
      setLoading(false)
    }
  }

  const DeletingItem = async (item) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${API_URL}/promos/promos/${item._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPromos((prevPromos) => prevPromos.filter((promo) => promo._id !== item._id))
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Couldn't delete promo.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <AdminNav />
      {logoutpopup && <Logoutpopup setLogoutpopup={setlogoutpopup} setprofile={() => {}} />}

      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Promo Codes</h2>
          <p className="mt-1 text-sm text-slate-500">Manage active discounts and expiration settings for your menu.</p>
        </div>
        <button
          onClick={() => setShowAddPromos(true)}
          className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
        >
          Add Promo Code
        </button>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-dashed border-orange-300 bg-orange-50 p-8 text-center text-orange-700">Loading promos...</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-700">{error}</div>
      ) : promos.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">No promos found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {promos.map((p) => (
            <div key={p._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{p.code}</h3>
                  <p className="mt-1 text-sm text-slate-500">Created: {new Date(p.createdAt).toLocaleString()}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${p.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {p.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p>Discount: <span className="font-semibold text-slate-900">{p.discountPercentage}%</span></p>
                <p>Minimum Subtotal: <span className="font-semibold text-slate-900">Rs. {p.minSubtotal}</span></p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => DeletingItem(p)}
                  className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
     {showAddPromos && (
        <AddPromos onClose={() => setShowAddPromos(false)} onSaved={() => fetchAllPromos()} />
      )}
    </div>
  )
}

export default Promos

import React, { useEffect, useState } from 'react'
import AdminNav from '../Components/AdminNav'
import Logoutpopup from '../Components/Logoutpopup'
import axios from 'axios'
import AddPromos from '../Components/AddPromos'

const Promos = () => {
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
      const res = await axios.get('http://localhost:3001/promos/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPromos(res.data.promos || [])
    } catch (err) {
      setError(err.message || "Couldn't fetch promo codes.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <AdminNav />
      {logoutpopup && <Logoutpopup setLogoutpopup={setlogoutpopup} setprofile={() => {}} />}

      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Promo Codes</h2>
          <div>
          <button
            onClick={() => setShowAddPromos(true)}
            className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Add Promo Code
          </button>
          </div>
        </div>


        {loading ? (
          <div>Loading promos...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : promos.length === 0 ? (
          <div>No promos found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promos.map((p) => (
              <div key={p._id} className="p-4 border rounded shadow-sm">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">{p.code}</h3>
                  <span className="text-sm text-gray-600">{p.active ? 'Active' : 'Inactive'}</span>
                </div>
                <p className="mt-2">Discount: <strong>{p.discountPercentage}%</strong></p>
                <p>Minimum Subtotal: <strong>Rs. {p.minSubtotal}</strong></p>
                <p className="text-xs text-gray-500 mt-2">Created: {new Date(p.createdAt).toLocaleString()}</p>
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

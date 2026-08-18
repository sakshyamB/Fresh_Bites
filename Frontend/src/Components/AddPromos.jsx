import React, { useState } from 'react'
import axios from 'axios'

const AddPromos = ({ onClose, onSaved }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [code, setCode] = useState('')
  const [discountPercentage, setDiscountPercentage] = useState('')
  const [minSubtotal, setMinSubtotal] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${API_URL}/promos/create`,
        {
          code,
          discountPercentage: Number(discountPercentage),
          minSubtotal: Number(minSubtotal),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setMessage('Promo created successfully')
      setCode('')
      setDiscountPercentage('')
      setMinSubtotal('')
      if (onSaved) onSaved()
      if (onClose) onClose()
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Couldn't add new promo code.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm'>
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Create Promo Code</h2>
            <p className="mt-1 text-sm text-slate-500">Add a new discount code for customers.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Promo code</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. SUMMER20"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Discount (%)</span>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                placeholder="10"
                min="0"
                max="100"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Minimum subtotal</span>
              <input
                type="number"
                value={minSubtotal}
                onChange={(e) => setMinSubtotal(e.target.value)}
                placeholder="0"
                min="0"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </label>
          </div>

          {error && <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
          {message && <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300">
              {saving ? 'Creating...' : 'Create Promo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPromos

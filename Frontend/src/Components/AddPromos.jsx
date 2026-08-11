import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddPromos = ({ onClose, onSaved }) => {
  const [code, setCode] = useState('')
  const [discountPercentage, setDiscountPercentage] = useState('')
  const [minSubtotal, setMinSubtotal] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://localhost:3001/promos/create',
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
      navigate('/promos')
      window.location.reload();
      
    } catch (err) {
      setError(err.message || "Couldn't Add new promo code.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='fixed inset-0 bg-[#fff3e3] bg-opacity-40 flex items-center justify-center z-50 p-4'>
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Create Promo Code</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Code</label>
            <input value={code} onChange={(e) => setCode(e.target.value)} className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Discount Percentage</label>
            <input type="number" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className="mt-1 block w-full border rounded p-2" min="0" max="100" />
          </div>
          <div>
            <label className="block text-sm font-medium">Minimum Subtotal</label>
            <input type="number" value={minSubtotal} onChange={(e) => setMinSubtotal(e.target.value)} className="mt-1 block w-full border rounded p-2" min="0" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {message && <div className="text-sm text-green-600">{message}</div>}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-orange-500 text-white">
              {saving ? 'Creating...' : 'Create Promo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPromos

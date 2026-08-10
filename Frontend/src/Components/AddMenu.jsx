import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddMenu = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    type: 'veg',
    description: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://localhost:3001/food/add',
        {
          name: form.name,
          price: Number(form.price),
          category: form.category,
          image: form.image,
          type: form.type,
          description: form.description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      navigate('/menu')
    }
    catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add food')
    }
    finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#fffaf3] to-[#fff3e3] py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Add New Food Item</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="mt-2 block w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} className="mt-2 block w-full rounded-2xl border border-gray-200 px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input name="category" value={form.category} onChange={handleChange} className="mt-2 block w-full rounded-2xl border border-gray-200 px-4 py-3" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} className="mt-2 block w-full rounded-2xl border border-gray-200 px-4 py-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="mt-2 block w-full rounded-2xl border border-gray-200 px-4 py-3">
                <option value="veg">veg</option>
                <option value="non-veg">non-veg</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="mt-2 block w-full rounded-2xl border border-gray-200 px-4 py-3" rows={3} />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => navigate('/menu')} className="rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60">
              {saving ? 'Adding...' : 'Add Food'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMenu

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditMenu = ({ item, onClose, onSaved }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    type: 'veg',
    description: ''
  })
  const API_URL = import.meta.env.VITE_API_URL;
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name || '',
        price: item.price || '',
        category: item.category || '',
        image: item.image || '',
        type: item.type || 'veg',
        description: item.description || ''
      })
    }
  }, [item])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const uploadImageToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration is missing.')
    }

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', uploadPreset)

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      data
    )

    return response.data.secure_url
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      setError(null)
      const uploadedUrl = await uploadImageToCloudinary(file)
      setForm(prev => ({ ...prev, image: uploadedUrl }))
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Image upload failed.')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!item) return
    if (!form.image) {
      setError('Please upload an image first.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        image: form.image,
        type: form.type,
        description: form.description
      }
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/food/foods/${item._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      onSaved && onSaved()
      onClose && onClose()
    }
    catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update')
    }
    finally {
      setSaving(false)
    }
  }

  if (!item) return null

  return (
    <div className="fixed inset-0 bg-[#fff3e3] bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Food</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full border rounded p-2" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} className="mt-1 block w-full border rounded p-2" />
            </div>
            <div>
            <label className='block text-sm font-medium text-gray-700'>Category</label>
            <select name='category' value={form.category} onChange={handleChange} className='mt-1 block w-40 border rounded p-2'>
              <option value="Breakfast">Breakfast</option>
              <option value="Main">Main</option>
              <option value="Dessert">Dessert</option>
              <option value="Soup">Soup</option>
              <option value="Drinks">Drinks</option>
              <option value="Salads">Salads</option>
            </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full border rounded p-2" />
            {uploadingImage && <p className="mt-1 text-xs text-orange-600">Uploading image...</p>}
            {form.image && (
              <img src={form.image} alt="Current preview" className="mt-2 h-20 w-20 rounded object-cover border" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="mt-1 block w-40 border rounded p-2">
              <option value="veg">veg</option>
              <option value="non-veg">non-veg</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 block w-full border rounded p-2" rows={3} />
          </div>

          {error && (<div className="text-sm text-red-600">{error}</div>)}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-orange-500 text-white">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditMenu

import React, { useState, useEffect } from 'react'
import AdminNav from '../Components/AdminNav'
import Logoutpopup from '../Components/Logoutpopup'
import axios from 'axios'
import EditMenu from '../Components/EditMenu'

const Menu = () => {
  const [logoutpopup, setlogoutpopup] = useState(false);
  const [menu, setMenu] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    fetchAllfoods()
  }, [])

  const fetchAllfoods = async () => {
    setLoading(true)
    try {
      const res = await axios.get("http://localhost:3001/food/getfoods");
      setMenu(res.data.data || []);
    }
    catch (err) {
      setError(err.response?.data?.message || err.message || "Couldn't fetch any foods.")
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-[#fffaf3] to-[#fff3e3]'>
      <AdminNav setlogoutpopup={setlogoutpopup} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className='text-3xl font-semibold text-gray-800 mb-6'>Menu</h1>

        {loading ? (
          <div className="text-center p-4 bg-white rounded-md shadow-sm">Loading foods...</div>
        ) : error ? (
          <div className="text-center p-4 bg-white rounded-md shadow-sm text-red-600">{error}</div>
        ) : (
          <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {menu.map(item => (
              <article className='bg-white rounded-xl overflow-hidden shadow-md flex flex-col' key={item._id}>
                <div className="relative h-44">
                  <img className='w-full h-full object-cover' src={item.image} alt={item.name} onError={(e)=>{e.target.src='/placeholder-image.png'}} />
                  <span className={`absolute left-3 top-3 px-2 py-1 rounded text-xs font-semibold text-white ${item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}>{item.type}</span>
                  <span className="absolute right-3 top-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">{item.category}</span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-2 flex-1">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">₹{item.price}</div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditingItem(item)} className="bg-white border px-3 py-1 rounded-lg hover:bg-gray-50">Edit</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {logoutpopup && (
        <Logoutpopup setLogoutpopup={setlogoutpopup} setprofile={() => { }} />
      )}

      {editingItem && (
        <EditMenu item={editingItem} onClose={() => setEditingItem(null)} onSaved={() => fetchAllfoods()} />
      )}

    </div>
  )
}

export default Menu;

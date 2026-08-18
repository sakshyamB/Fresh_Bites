import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from "../context/CartContext";

const Food = ({ selectedCategory, search }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [food, setFood] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`${API_URL}/food/getfoods`)
        setFood(res.data.data || [])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFoods()
  }, [])

  const normalizedSearch = search?.trim().toLowerCase() || ''

  const visibleFood = food.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory

    const matchesSearch =
      normalizedSearch === '' ||
      item.name?.toLowerCase().includes(normalizedSearch) ||
      item.description?.toLowerCase().includes(normalizedSearch)

    return matchesCategory && matchesSearch
  })

  if (loading) {
    return <p className="panel-soft p-6 text-sm text-slate-600">Foods are loading...</p>
  }

  if (error) {
    return <p className="panel-soft p-6 text-sm text-slate-600">Foods could not be loaded.</p>
  }

  return (
    <section>
      {visibleFood.length === 0 ? (
        <div className="panel-soft p-8 text-center text-sm text-slate-500">
          No food items match your current selection.
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {visibleFood.map((item) => (
            <article key={item._id} className="card overflow-hidden">
              <div className="bg-[#fff3e6]">
                <img src={item.image} alt={item.name} className="h-36 w-full object-cover" />
              </div>
              <div className="space-y-2 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500">{item.category}</p>
                  </div>
                  {item.type === "veg" ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold uppercase text-emerald-700">
                      {item.type}
                    </span>
                  ) : (
                    <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold uppercase text-rose-700">
                      {item.type}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-5 text-slate-600">
                  {item.description || "A delicious choice made with fresh ingredients."}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-semibold text-[#c2410c]">Rs. {item.price}</span>
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="rounded-full bg-[#f97316] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Food

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Food = () => {
  const [food, setFood] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get('http://localhost:3001/food/getfoods')
        setFood(res.data.data || [])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFoods()
  }, [])

  if (loading) {
    return <p>Foods are loading.</p>
  }

  if (error) {
    return <p>Foods could not be loaded.</p>
  }

  return (
    <section className="px-4 py-6 md:px-8 md:py-8">
      {food.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">No food items available yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {food.map((item) => {
            return (
              <article
                key={item._id}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    {item.type === "veg" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {item.type}
                      </span>) :
                      (<span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        {item.type}
                      </span>)}
                  </div>
                  <p className="text-sm leading-6 text-gray-600">
                    {item.description || "A delicious choice made with fresh ingredients."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${item.price}</span>
                    <button className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600">
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Food  

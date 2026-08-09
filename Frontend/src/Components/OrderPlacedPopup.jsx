import React from 'react'
import { Link } from 'react-router-dom'

const OrderPlacedPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <h2 className="mb-3 text-xl font-semibold text-slate-900">Order placed successfully</h2>
        <p className="mb-6 text-sm leading-6 text-slate-600">
          Your order has been placed. You can view your order from the profile section.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
          <Link
            to="/myorder"
            onClick={onClose}
            className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderPlacedPopup

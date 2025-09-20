import { useState } from 'react'
import { Link } from 'react-router-dom'
import ChatBot from './ChatBot.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false)
  const { removeProduct } = useProducts()

  function onDelete() {
    const ok = confirm(`Delete \"${product.name}\"? This cannot be undone.`)
    if (ok) removeProduct(product.id)
  }

  const outOfStock = Number(product.stock || 0) <= 0

  return (
    <div className="card overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-sm text-gray-500">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="btn btn-danger px-3 py-1.5" onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
        <div className="mt-1 text-xs">Stock: <span className={outOfStock ? 'text-rose-400' : 'text-teal-300'}>{product.stock ?? 0}</span></div>
        {product.description && (
          <p className="mt-2 text-sm text-gray-300 line-clamp-2">{product.description}</p>
        )}
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-xl font-bold">${Number(product.price || 0).toFixed(2)}</span>
          <div className="flex gap-2">
            <Link to={`/product/${product.id}`} className="btn btn-secondary">View</Link>
            <button className="btn btn-secondary" onClick={() => setOpen(true)}>Ask AI</button>
          </div>
        </div>
      </div>

      {open && (
        <ChatBot product={product} onClose={() => setOpen(false)} />
      )}
    </div>
  )
}

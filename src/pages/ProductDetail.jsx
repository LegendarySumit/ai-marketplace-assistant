import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext.jsx'
import { useState } from 'react'

export default function ProductDetail() {
  const { id } = useParams()
  const { products } = useProducts()
  const nav = useNavigate()
  const product = products.find(p => p.id === id)
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <p className="text-gray-400">Product not found.</p>
      </section>
    )
  }

  const outOfStock = Number(product.stock || 0) <= 0

  function goToCheckout() {
    nav('/checkout', { state: { productId: product.id, qty: Number(qty) } })
  }

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
          ) : (
            <div className="aspect-[4/3] flex items-center justify-center text-gray-500">No image</div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="mt-1 text-sm text-gray-400">{product.category}</div>
          <div className="mt-3 text-xl font-semibold">${Number(product.price || 0).toFixed(2)}</div>
          <div className="mt-1 text-sm">Stock: <span className={outOfStock ? 'text-rose-400' : 'text-teal-300'}>{product.stock ?? 0}</span></div>
          {product.description && <p className="mt-4 text-sm text-gray-300">{product.description}</p>}

          <div className="mt-6 card p-4">
            <h3 className="section-title mb-2">Buy</h3>
            <div className="flex items-center gap-3">
              <label className="label m-0">Quantity</label>
              <input className="input w-28" type="number" min="1" max={Math.max(1, product.stock || 1)} value={qty}
                     onChange={(e) => setQty(Math.max(1, Math.min(Number(e.target.value||1), Number(product.stock||1))))} />
            </div>
            <button className="btn btn-primary text-white mt-4 w-full" disabled={outOfStock} onClick={goToCheckout}>
              {outOfStock ? 'Out of Stock' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

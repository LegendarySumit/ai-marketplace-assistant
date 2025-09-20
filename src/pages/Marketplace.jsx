import { useProducts } from '../context/ProductsContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { Link } from 'react-router-dom'

import { useMemo, useState } from 'react'

export default function Marketplace() {
  const { products } = useProducts()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')

  const CATEGORIES = useMemo(() => ['All','Pottery','Jewelry','Textiles','Woodwork','Artwork','Other'], [])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesQ = q ? (p.name?.toLowerCase().includes(q.toLowerCase()) || p.description?.toLowerCase().includes(q.toLowerCase())) : true
      const matchesCat = cat === 'All' ? true : (p.category === cat)
      return matchesQ && matchesCat
    })
  }, [products, q, cat])

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text-pink">Artisan Marketplace</h2>
          <p className="text-sm text-gray-400">Discover unique handcrafted treasures from talented local artisans.</p>
        </div>
        <Link to="/upload" className="btn btn-primary text-white">Upload Product</Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <input
            className="input"
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div>
          <select className="input" value={cat} onChange={(e) => setCat(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14 text-center">
          <p className="text-gray-500">No Products Found</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}

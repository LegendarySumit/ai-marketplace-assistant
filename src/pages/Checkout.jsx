import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext.jsx'
import { useOrders } from '../context/OrdersContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect, useMemo, useState } from 'react'

export default function Checkout() {
  const { state } = useLocation()
  const nav = useNavigate()
  const { products, decrementStock } = useProducts()
  const { createOrder } = useOrders()
  const { currentUser } = useAuth()
  const buyer = currentUser()

  const product = useMemo(() => products.find(p => p.id === state?.productId), [products, state])
  const [qty, setQty] = useState(Math.max(1, Number(state?.qty || 1)))
  const [paymentMethod, setPaymentMethod] = useState('Card')
  const [address, setAddress] = useState({ name: buyer?.name || '', line1: '', line2: '', city: '', state: '', zip: '', country: 'USA' })
  const [err, setErr] = useState('')

  useEffect(() => {
    if (!product) nav('/marketplace', { replace: true })
  }, [product, nav])

  if (!product) return null

  const total = Number(product.price || 0) * qty

  function placeOrder(e) {
    e.preventDefault()
    setErr('')
    if (!address.line1 || !address.city || !address.state || !address.zip) {
      setErr('Please complete the shipping address')
      return
    }
    if (qty < 1 || qty > Number(product.stock || 0)) {
      setErr('Invalid quantity')
      return
    }
    // Create order and decrement stock
    const order = createOrder({
      productId: product.id,
      sellerId: product.sellerId || null,
      buyerId: buyer?.id || null,
      qty,
      address,
      paymentMethod,
    })
    decrementStock(product.id, qty)
    nav('/buyer', { replace: true })
  }

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <h2 className="text-2xl font-bold gradient-text">Checkout</h2>
      <form onSubmit={placeOrder} className="mt-4 grid md:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="section-title mb-3">Shipping Address</h3>
          {err && <div className="mb-3 text-sm text-rose-400">{err}</div>}
          <label className="label">Full Name</label>
          <input className="input" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
          <label className="label mt-3">Address Line 1</label>
          <input className="input" value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} />
          <label className="label mt-3">Address Line 2</label>
          <input className="input" value={address.line2} onChange={e => setAddress({ ...address, line2: e.target.value })} />
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="label">City</label>
              <input className="input" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
            </div>
            <div>
              <label className="label">State</label>
              <input className="input" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="label">ZIP</label>
              <input className="input" value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} />
            </div>
            <div>
              <label className="label">Country</label>
              <input className="input" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} />
            </div>
          </div>
        </div>
        <div>
          <div className="card p-5">
            <h3 className="section-title mb-3">Order Summary</h3>
            <div className="text-sm text-gray-300">{product.name}</div>
            <div className="text-xs text-gray-500">${Number(product.price || 0).toFixed(2)} each</div>
            <div className="flex items-center gap-3 mt-3">
              <label className="label m-0">Quantity</label>
              <input className="input w-24" type="number" min="1" max={product.stock || 1} value={qty} onChange={e => setQty(Math.max(1, Math.min(Number(e.target.value||1), Number(product.stock||1))))} />
            </div>
            <div className="mt-4 text-lg font-semibold">Total: ${total.toFixed(2)}</div>
          </div>
          <div className="card p-5 mt-4">
            <h3 className="section-title mb-3">Payment Method</h3>
            <select className="input" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option>Card</option>
              <option>UPI</option>
              <option>Cash on Delivery</option>
            </select>
            <button type="submit" className="btn btn-primary text-white mt-4 w-full">Place Order</button>
            <p className="text-xs text-gray-400 mt-2">By placing an order, the seller will be notified to pack and ship to your address.</p>
          </div>
        </div>
      </form>
    </section>
  )
}

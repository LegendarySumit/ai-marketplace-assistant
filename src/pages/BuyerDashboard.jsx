import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useOrders } from '../context/OrdersContext.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

export default function BuyerDashboard() {
  const { currentUser } = useAuth()
  const user = currentUser()
  const { orders } = useOrders()
  const { products } = useProducts()
  const myOrders = orders.filter(o => o.buyerId === user?.id)

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <h2 className="text-2xl font-bold gradient-text">Welcome, {user?.name || 'Buyer'}</h2>
      <p className="text-sm text-gray-400">Track your purchases and discover new artisan products.</p>

      <div className="mt-6 card p-5">
        <h3 className="section-title">Your Orders</h3>
        {myOrders.length === 0 ? (
          <p className="text-sm text-gray-400 mt-2">No orders yet. Explore the <Link to="/marketplace" className="text-teal-300">marketplace</Link>.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {myOrders.map(o => {
              const p = products.find(x => x.id === o.productId)
              return (
                <li key={o.id} className="border border-gray-800/60 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="font-medium">{p?.name || 'Product'}</div>
                    <div className="text-xs text-gray-400">Qty: {o.qty} • Status: {o.status.replace('_',' ')}</div>
                    <div className="text-xs text-gray-500">Ship to: {o.address?.line1}, {o.address?.city}</div>
                  </div>
                  <div className="text-sm">Paid via {o.paymentMethod}</div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

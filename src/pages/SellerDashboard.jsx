import { useAuth } from '../context/AuthContext.jsx'
import { useOrders } from '../context/OrdersContext.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

export default function SellerDashboard() {
  const { currentUser } = useAuth()
  const seller = currentUser()
  const { orders, updateOrder } = useOrders()
  const { products } = useProducts()
  const myOrders = orders.filter(o => o.sellerId === seller?.id)

  function markPacked(id) {
    updateOrder(id, { status: 'PACKED' })
  }

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <h2 className="text-2xl font-bold gradient-text">Seller Dashboard</h2>
      <p className="text-sm text-gray-400">New purchases will appear here. Pack and ship to the address provided by the buyer.</p>

      <div className="mt-6 card p-5">
        <h3 className="section-title">Orders to Fulfill</h3>
        {myOrders.length === 0 ? (
          <p className="text-sm text-gray-400 mt-2">No orders yet.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {myOrders.map(o => {
              const p = products.find(x => x.id === o.productId)
              return (
                <li key={o.id} className="border border-gray-800/60 rounded-xl p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{p?.name || 'Product'} • Qty: {o.qty}</div>
                      <div className="text-xs text-gray-400">Status: {o.status.replace('_',' ')}</div>
                      <div className="text-xs text-gray-400 mt-1">Pack and ship to:</div>
                      <div className="text-xs text-gray-300">
                        {o.address?.name}<br/>
                        {o.address?.line1}{o.address?.line2 ? `, ${o.address?.line2}` : ''}<br/>
                        {o.address?.city}, {o.address?.state} {o.address?.zip}<br/>
                        {o.address?.country}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xs text-gray-400">Payment: {o.paymentMethod}</div>
                      {o.status === 'PENDING_PACK' && (
                        <button className="btn btn-secondary" onClick={() => markPacked(o.id)}>Mark Packed</button>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

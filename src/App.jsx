import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import UploadForm from './pages/UploadForm.jsx'
import Marketplace from './pages/Marketplace.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { OrdersProvider } from './context/OrdersContext.jsx'
import { AuthProvider, RequireAuth } from './context/AuthContext.jsx'
import LoginBuyer from './pages/LoginBuyer.jsx'
import SignupBuyer from './pages/SignupBuyer.jsx'
import LoginSeller from './pages/LoginSeller.jsx'
import SignupSeller from './pages/SignupSeller.jsx'
import BuyerDashboard from './pages/BuyerDashboard.jsx'
import SellerDashboard from './pages/SellerDashboard.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Checkout from './pages/Checkout.jsx'

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <OrdersProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<RequireAuth role="seller"><UploadForm /></RequireAuth>} />
                <Route path="/marketplace" element={<Marketplace />} />

                {/* Buyer auth */}
                <Route path="/login-buyer" element={<LoginBuyer />} />
                <Route path="/signup-buyer" element={<SignupBuyer />} />

                {/* Seller auth */}
                <Route path="/login-seller" element={<LoginSeller />} />
                <Route path="/signup-seller" element={<SignupSeller />} />

                {/* Product & checkout */}
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<RequireAuth role="buyer"><Checkout /></RequireAuth>} />

                {/* Dashboards */}
                <Route path="/buyer" element={<RequireAuth role="buyer"><BuyerDashboard /></RequireAuth>} />
                <Route path="/seller" element={<RequireAuth role="seller"><SellerDashboard /></RequireAuth>} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </OrdersProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App

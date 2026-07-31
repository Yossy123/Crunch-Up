import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';

// Route Lazy Loading (Code Splitting)
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));

function App() {
  return (
    <Router>
      <CartProvider>
        <Suspense fallback={
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </Suspense>

        {/* Global Drawers & Modals */}
        <CartSidebar />
        <CheckoutModal />
        <Toast />
      </CartProvider>
    </Router>
  );
}

export default App;

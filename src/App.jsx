import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductDetailPage from './pages/ProductDetailPage';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>

        {/* Global Drawers & Modals */}
        <CartSidebar />
        <CheckoutModal />
        <Toast />
      </CartProvider>
    </Router>
  );
}

export default App;

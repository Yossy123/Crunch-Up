import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('catalog_app_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const toastTimerRef = useRef(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('catalog_app_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToastNotification = (message, type = 'success') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ show: true, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const addItem = (product, quantity = 1) => {
    if (product.price === 0 || product.isAvailable === false) {
      showToastNotification(`Produk "${product.name}" belum tersedia (Not Available)!`, 'error');
      return;
    }

    showToastNotification(`"${product.name}" ditambahkan ke keranjang!`, 'success');

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const itemInPrev = prevItems[existingIndex];
        const updated = [...prevItems];
        updated[existingIndex] = { ...itemInPrev, quantity: itemInPrev.quantity + quantity };
        return updated;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeItem = (productId) => {
    const target = cartItems.find(item => item.product.id === productId);
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    if (target) {
      showToastNotification(`Item berhasil dihapus`, 'info');
    }
  };

  const updateQty = (productId, delta) => {
    const existingItem = cartItems.find(item => item.product.id === productId);
    if (!existingItem) return;

    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItem = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalHarga = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItem,
        totalHarga,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toast,
        showToastNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

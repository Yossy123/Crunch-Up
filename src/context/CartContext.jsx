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

    const maxStock = product.stock ?? 999;

    if (maxStock <= 0) {
      showToastNotification(`Stok "${product.name}" telah habis!`, 'error');
      return;
    }

    const existingItem = cartItems.find(item => item.product.id === product.id);
    const existingQty = existingItem ? existingItem.quantity : 0;
    const targetQty = existingQty + quantity;

    if (existingQty >= maxStock) {
      showToastNotification(`Stok "${product.name}" sudah mencapai batas maksimal (${maxStock})!`, 'error');
      return;
    }

    if (targetQty > maxStock) {
      showToastNotification(`Jumlah "${product.name}" disesuaikan ke batas stok (${maxStock})!`, 'info');
    } else {
      showToastNotification(`"${product.name}" ditambahkan ke keranjang!`, 'success');
    }

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const itemInPrev = prevItems[existingIndex];
        const nextQty = Math.min(maxStock, itemInPrev.quantity + quantity);
        if (nextQty === itemInPrev.quantity) return prevItems;

        const updated = [...prevItems];
        updated[existingIndex] = { ...itemInPrev, quantity: nextQty };
        return updated;
      } else {
        const nextQty = Math.min(maxStock, quantity);
        return [...prevItems, { product, quantity: nextQty }];
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

    const maxStock = existingItem.product.stock ?? 999;
    const targetQty = existingItem.quantity + delta;

    if (delta > 0 && targetQty > maxStock) {
      showToastNotification(`Stok "${existingItem.product.name}" sudah mencapai batas maksimal (${maxStock})!`, 'error');
    }

    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const itemStock = item.product.stock ?? 999;
          const nextQty = item.quantity + delta;
          const cappedQty = Math.min(itemStock, nextQty);
          return cappedQty > 0 ? { ...item, quantity: cappedQty } : null;
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

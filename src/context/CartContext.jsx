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
    const maxStock = product.stock ?? 999;

    if (maxStock <= 0) {
      showToastNotification(`Stok "${product.name}" telah habis!`, 'error');
      return;
    }

    let isCapped = false;
    let isAlreadyAtMax = false;

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const targetQty = existingItem.quantity + quantity;
        const cappedQty = Math.min(maxStock, targetQty);

        if (existingItem.quantity >= maxStock) {
          isAlreadyAtMax = true;
          return prevItems;
        }

        if (cappedQty < targetQty) {
          isCapped = true;
        }

        const updated = [...prevItems];
        updated[existingIndex] = { ...existingItem, quantity: cappedQty };
        return updated;
      } else {
        const cappedQty = Math.min(maxStock, quantity);
        if (cappedQty < quantity) {
          isCapped = true;
        }
        return [...prevItems, { product, quantity: cappedQty }];
      }
    });

    if (isAlreadyAtMax) {
      showToastNotification(`Stok "${product.name}" sudah mencapai batas maksimal (${maxStock})!`, 'error');
    } else if (isCapped) {
      showToastNotification(`Jumlah "${product.name}" disesuaikan ke batas stok (${maxStock})!`, 'info');
    } else {
      showToastNotification(`"${product.name}" ditambahkan ke keranjang!`, 'success');
    }
  };

  const removeItem = (productId) => {
    const target = cartItems.find(item => item.product.id === productId);
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    if (target) {
      showToastNotification(`Item berhasil dihapus`, 'info');
    }
  };

  const updateQty = (productId, delta) => {
    let stockReached = false;
    let maxStock = 999;
    let productName = '';

    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const itemStock = item.product.stock ?? 999;
          const targetQty = item.quantity + delta;

          if (delta > 0 && targetQty > itemStock) {
            stockReached = true;
            maxStock = itemStock;
            productName = item.product.name;
            return { ...item, quantity: itemStock };
          }

          return targetQty > 0 ? { ...item, quantity: targetQty } : null;
        }
        return item;
      }).filter(Boolean);
    });

    if (stockReached) {
      showToastNotification(`Stok "${productName}" sudah mencapai batas maksimal (${maxStock})!`, 'error');
    }
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

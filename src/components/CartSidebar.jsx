import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { FiX, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';

const CartSidebar = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    clearCart,
    totalItem,
    totalHarga,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                <FiShoppingBag className="text-base" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Keranjang ({totalItem})
              </h3>
            </div>
            
            <div className="flex items-center space-x-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-1"
                  title="Kosongkan Keranjang"
                >
                  <FiTrash2 className="text-xs" />
                  <span>Kosongkan</span>
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                aria-label="Tutup Keranjang"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center text-3xl">
                  <FiShoppingBag />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-700 mb-1">Keranjang Masih Kosong</h4>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Jelajahi catalog produk terbaik kami dan tambahkan item impianmu!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/80 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Total Item</span>
                  <span className="font-semibold text-slate-800">{totalItem} Produk</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Perkiraan Ongkir</span>
                  <span className="font-semibold text-emerald-600">GRATIS</span>
                </div>
                <div className="pt-2 border-t border-slate-200/80 flex justify-between items-center text-base">
                  <span className="font-bold text-slate-900">Total Harga</span>
                  <span className="text-xl font-extrabold text-orange-600">
                    {formatRupiah(totalHarga)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 transition-transform transform active:scale-98 cursor-pointer"
              >
                <span>Lanjut Ke Checkout</span>
                <FiArrowRight className="text-lg" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartSidebar;

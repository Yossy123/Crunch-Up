import React from 'react';
import { useCart } from '../context/useCart';
import { formatRupiah } from '../utils/format';
import CartItem from './CartItem';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';

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

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col justify-between">
        
        {/* Header */}
        <SheetHeader className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 space-y-0 text-left shrink-0">
          <div className="flex items-center justify-between pr-8">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md shadow-orange-500/20">
                <FiShoppingBag className="text-xl" />
              </div>
              <div className="min-w-0">
                <SheetTitle className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight truncate">
                  Keranjang Belanja
                </SheetTitle>
                <div className="flex items-center space-x-2 mt-0.5">
                  <Badge variant="secondary" className="px-2 py-0 text-[10px] font-bold">
                    {totalItem} produk
                  </Badge>
                </div>
              </div>
            </div>

            {cartItems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 h-8 px-2.5"
                title="Kosongkan Keranjang"
              >
                <FiTrash2 className="mr-1 text-xs shrink-0" />
                <span>Kosongkan</span>
              </Button>
            )}
          </div>
        </SheetHeader>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
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
          <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/80 space-y-4 pb-6 shrink-0">
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Total Item</span>
                <span className="font-semibold text-slate-800">{totalItem} Produk</span>
              </div>
              <div className="pt-2.5 border-t border-slate-200/80 flex justify-between items-center text-base sm:text-lg">
                <span className="font-bold text-slate-900 shrink-0">Total Harga</span>
                <span className="text-xl sm:text-2xl font-extrabold text-orange-600 truncate ml-2 text-right">
                  {formatRupiah(totalHarga)}
                </span>
              </div>
            </div>

            <Button
              onClick={handleCheckoutClick}
              size="lg"
              className="w-full h-12 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Lanjut Ke Checkout</span>
              <FiArrowRight className="text-lg sm:text-xl" />
            </Button>
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;

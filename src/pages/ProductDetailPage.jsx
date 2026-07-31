import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { 
  FiArrowLeft, 
  FiStar, 
  FiShoppingBag, 
  FiMessageSquare, 
  FiPlus, 
  FiMinus, 
  FiCheck,
  FiShare2,
  FiPackage
} from 'react-icons/fi';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, totalItem, setIsCartOpen } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top whenever ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
  }, [id]);

  const product = productsData.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <FiPackage />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-sm text-slate-500 mb-6">Maaf, produk yang kamu cari mungkin sudah tidak tersedia.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-orange-500 text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-all shadow-md"
          >
            <FiArrowLeft />
            <span>Kembali ke Katalog</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleDirectWhatsApp = () => {
    const phoneNumber = '6281234567890';
    const text = `Halo Admin CatalogApp, saya ingin memesan:\n\n` +
      `- *${product.name}*\n` +
      `  Jumlah: ${quantity} unit\n` +
      `  Total: ${formatRupiah(product.price * quantity)}\n\n` +
      `Mohon diinfokan ketersediaannya. Terima kasih!`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get related products from the same category or flavor
  const relatedProducts = productsData
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <div className="flex-1">
        {/* Header */}
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Breadcrumb & Navigation Bar */}
        <div className="bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
            >
              <FiArrowLeft className="text-base" />
              <span>Kembali ke Katalog</span>
            </button>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Link to="/" className="hover:text-slate-600">Home</Link>
              <span>/</span>
              <span className="text-slate-600 font-medium truncate max-w-[150px] sm:max-w-xs">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {/* Product Detail Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              
              {/* Product Image Container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-900/85 text-white text-xs font-bold rounded-full backdrop-blur-md shadow-sm border border-white/10">
                    {product.category}
                  </span>
                  {product.flavor && (
                    <span className="px-3 py-1 bg-orange-500/90 text-white text-xs font-extrabold rounded-full backdrop-blur-md shadow-sm border border-white/10">
                      {product.flavor}
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  title="Bagikan Produk"
                >
                  {copied ? <FiCheck className="text-emerald-600" /> : <FiShare2 className="text-base" />}
                </button>
              </div>

              {/* Product Information Column */}
              <div className="flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Rating & Sold count */}
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 mb-3">
                    <div className="flex items-center space-x-1 px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-100">
                      <FiStar className="text-amber-500 fill-amber-400 text-sm" />
                      <span className="font-extrabold text-slate-800">{product.rating}</span>
                    </div>
                    <span>•</span>
                    <span className="font-medium text-slate-600">{product.soldCount} Produk Terjual</span>
                  </div>

                  {/* Product Title */}
                  <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-snug mb-4">
                    {product.name}
                  </h1>

                  {/* Price Banner */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 flex items-baseline space-x-2">
                    <span className="text-3xl sm:text-4xl font-black text-orange-600">
                      {formatRupiah(product.price)}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ porsi</span>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Deskripsi Produk</h3>
                    <p className="text-sm text-slate-600 leading-relaxed bg-white">
                      {product.description}
                    </p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Jumlah Pembelian</h3>
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                        <button
                          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                          className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                          disabled={quantity <= 1}
                        >
                          <FiMinus className="text-xs" />
                        </button>
                        <span className="w-12 text-center font-bold text-sm text-slate-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((prev) => prev + 1)}
                          className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                        >
                          <FiPlus className="text-xs" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-slate-500">
                        Subtotal: <strong className="text-orange-600 text-sm">{formatRupiah(product.price * quantity)}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="py-3.5 px-5 rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 transition-all transform active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <FiShoppingBag className="text-lg" />
                      <span>+ Tambah Keranjang</span>
                    </button>

                    <button
                      onClick={handleDirectWhatsApp}
                      className="py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all transform active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <FiMessageSquare className="text-lg" />
                      <span>Order via WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 sm:mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Rekomendasi Snack Serupa</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Varian lain dalam kategori {product.category}</p>
                </div>
                <Link to="/" className="text-xs font-bold text-orange-600 hover:text-orange-700">
                  Lihat Semua →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((relProduct) => (
                  <ProductCard 
                    key={relProduct.id} 
                    product={relProduct} 
                    onQuickView={(p) => navigate(`/product/${p.id}`)} 
                  />
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Sticky Cart Button */}
      {totalItem > 0 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-3 px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-900/95 hover:bg-slate-900 text-white rounded-full shadow-2xl hover:shadow-orange-500/25 border border-slate-700/80 backdrop-blur-md cursor-pointer transition-all duration-200 active:scale-95 group"
            aria-label="Buka Keranjang Belanja"
          >
            <div className="relative shrink-0">
              <FiShoppingBag className="text-lg sm:text-xl text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItem}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-tight">Keranjang</span>
          </button>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
};

export default ProductDetailPage;

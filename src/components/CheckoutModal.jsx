import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/format';
import { FiX, FiUser, FiMapPin, FiPhone, FiMessageSquare, FiAlertCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';


const CheckoutModal = () => {
  const {
    cartItems,
    isCheckoutOpen,
    setIsCheckoutOpen,
    totalHarga,
    clearCart,
    showToastNotification
  } = useCart();

  const [formData, setFormData] = useState({
    nama: '',
    noHp: '',
    alamat: '',
    catatan: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen) return null;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setErrorMessage('');
  };

  // Submit via WhatsApp
  const handleWASubmit = (e) => {
    e.preventDefault();

    if (!formData.nama.trim() || !formData.noHp.trim() || !formData.alamat.trim()) {
      setErrorMessage('Harap isi semua bidang formulir pemesanan yang wajib (*)!');
      return;
    }

    const merchantPhone = import.meta.env.VITE_WA_PHONE || '6285174103353';
    const itemsList = cartItems.map(item => {
      const lineSubtotal = item.product.price * item.quantity;
      return `- ${item.product.name} (${item.quantity}x) = ${formatRupiah(lineSubtotal)}`;
    }).join('\n');

    const catatanText = formData.catatan.trim() 
      ? `\n📝 *Catatan:* ${formData.catatan.trim()}`
      : '';

    const message = `*🛒 ORDER BARU SNACK STORE*
👤 *Nama:* ${formData.nama}
📍 *Alamat:* ${formData.alamat}
📞 *No HP:* ${formData.noHp}${catatanText}

*Pesanan:*
${itemsList}

💰 *Total: ${formatRupiah(totalHarga)}*`;

    const waUrl = `https://wa.me/${merchantPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    showToastNotification('Mengalihkan ke WhatsApp untuk konfirmasi pesanan!', 'success');
    clearCart();
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transition-all transform animate-in fade-in zoom-in duration-200">

        {/* Modal Header */}
        <div className="px-6 py-4 bg-linear-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <FaWhatsapp className="text-2xl text-emerald-200" />
            <div>
              <h3 className="text-lg font-bold leading-tight">Checkout via WhatsApp</h3>
              <p className="text-xs text-emerald-100 font-medium">Kirim Rincian Pesanan Langsung ke WhatsApp Penjual</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* FORM VIEW */}
        <form onSubmit={handleWASubmit} className="p-6 space-y-4">
          
          {/* Error banner if any */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-start space-x-2">
              <FiAlertCircle className="text-base shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Order Summary Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ringkasan Pesanan ({cartItems.length} Jenis Item)
            </h4>
            <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex justify-between text-slate-700">
                  <span className="truncate pr-2 font-medium">
                    {item.product.name} <strong className="text-orange-600">x{item.quantity}</strong>
                  </span>
                  <span className="font-semibold shrink-0">
                    {formatRupiah(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-800">Total Pembayaran</span>
              <span className="text-base font-extrabold text-emerald-600">
                {formatRupiah(totalHarga)}
              </span>
            </div>
          </div>

          {/* Input: Nama */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
              <FiUser className="text-emerald-500" />
              <span>Nama Lengkap *</span>
            </label>
            <input
              type="text"
              name="nama"
              required
              placeholder="Contoh: Budi Santoso"
              value={formData.nama}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
            />
          </div>

          {/* Input: No HP */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
              <FiPhone className="text-emerald-500" />
              <span>Nomor WhatsApp / HP *</span>
            </label>
            <input
              type="tel"
              name="noHp"
              required
              placeholder="Contoh: 081234567890"
              value={formData.noHp}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
            />
          </div>

          {/* Input: Alamat */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
              <FiMapPin className="text-emerald-500" />
              <span>Alamat Lengkap Pengiriman *</span>
            </label>
            <textarea
              name="alamat"
              required
              rows="2"
              placeholder="Contoh: Jl. Merdeka No. 45, Kecamatan Gambir, Jakarta Pusat"
              value={formData.alamat}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
            />
          </div>

          {/* Input: Catatan untuk Penjual (Opsional) */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
              <FiMessageSquare className="text-emerald-500" />
              <span>Catatan untuk Penjual (Opsional)</span>
            </label>
            <textarea
              name="catatan"
              rows="2"
              placeholder="Contoh: Tolong bungkus extra bubble wrap / rasa pedasnya minta yang ekstra pedas ya"
              value={formData.catatan}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center space-x-2 transition-transform transform active:scale-98 cursor-pointer"
            >
              <FaWhatsapp className="text-xl" />
              <span>Kirim Pesanan via WhatsApp</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CheckoutModal;

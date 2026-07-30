import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiX, FiUser, FiMapPin, FiPhone, FiCheckCircle, FiDownload, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa6';
import { generateInvoicePDF } from '../utils/pdfGenerator';
import { sendOrderToTelegram } from '../utils/telegramService';

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
    alamat: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successOrder, setSuccessOrder] = useState(null); // stores { orderId, downloadPDF, filename }

  if (!isCheckoutOpen) return null;

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setSuccessOrder(null);
    setErrorMessage('');
  };

  // Submit via Telegram (Automatic PDF)
  const handleTelegramSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama.trim() || !formData.noHp.trim() || !formData.alamat.trim()) {
      setErrorMessage('Harap isi semua bidang formulir pemesanan!');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 1. Generate Order ID
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const dateStr = new Date().toISOString().slice(0,10).replace(/-/g, '');
      const orderId = `INV-${dateStr}-${randomSuffix}`;

      // 2. Generate PDF Invoice
      const { pdfBlob, downloadPDF, filename } = generateInvoicePDF({
        orderId,
        formData,
        cartItems,
        totalHarga
      });

      // 3. Send PDF Document + Caption to Telegram Bot API
      await sendOrderToTelegram({
        orderId,
        formData,
        cartItems,
        totalHarga,
        pdfBlob,
        filename
      });

      showToastNotification('Pesanan & Invoice PDF berhasil terkirim ke Telegram!', 'success');

      // Save order info for success view
      setSuccessOrder({
        orderId,
        downloadPDF,
        filename
      });

      clearCart();
    } catch (err) {
      console.error('Error submitting order to Telegram:', err);
      setErrorMessage(err.message || 'Gagal mengirim pesanan ke Telegram. Harap pastikan Bot Token & Chat ID sudah benar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit via WhatsApp (Manual fallback)
  const handleWASubmit = () => {
    if (!formData.nama.trim() || !formData.noHp.trim() || !formData.alamat.trim()) {
      setErrorMessage('Harap isi semua bidang formulir pemesanan!');
      return;
    }

    const merchantPhone = import.meta.env.VITE_WA_PHONE || '6285174103353';
    const itemsList = cartItems.map(item => {
      const lineSubtotal = item.product.price * item.quantity;
      return `- ${item.product.name} (${item.quantity}x) = ${formatRupiah(lineSubtotal)}`;
    }).join('\n');

    const message = `*🛒 ORDER BARU*
👤 *Nama:* ${formData.nama}
📍 *Alamat:* ${formData.alamat}
📞 *No HP:* ${formData.noHp}

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
        <div className="px-6 py-4 bg-linear-to-r from-sky-600 to-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <FaTelegram className="text-2xl text-sky-200" />
            <div>
              <h3 className="text-lg font-bold leading-tight">Checkout Pesanan</h3>
              <p className="text-xs text-sky-100 font-medium">Kirim PDF Invoice Otomatis via Telegram</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* SUCCESS VIEW */}
        {successOrder ? (
          <div className="p-8 text-center space-y-5 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <FiCheckCircle className="text-4xl" />
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-slate-800">Pesanan Berhasil Dikirim!</h4>
              <p className="text-sm text-slate-500 mt-1">
                Nomor Pesanan: <strong className="text-sky-600">#{successOrder.orderId}</strong>
              </p>
              <p className="text-xs text-slate-500 mt-2 bg-sky-50 p-3 rounded-xl border border-sky-100 text-sky-800">
                Pesan notifikasi dan <strong>File PDF Invoice</strong> telah otomatis dikirimkan ke Telegram penjual melalui <strong>@KasumiNana_bot</strong>.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={successOrder.downloadPDF}
                className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-sky-600/25 flex items-center justify-center space-x-2 transition-transform active:scale-98 cursor-pointer"
              >
                <FiDownload className="text-lg" />
                <span>Download Invoice PDF Pembeli</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold text-sm transition-colors cursor-pointer"
              >
                Tutup & Kembali ke Catalog
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleTelegramSubmit} className="p-6 space-y-4">
            
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
                <span className="text-base font-extrabold text-sky-600">
                  {formatRupiah(totalHarga)}
                </span>
              </div>
            </div>

            {/* Input: Nama */}
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                <FiUser className="text-sky-500" />
                <span>Nama Lengkap *</span>
              </label>
              <input
                type="text"
                name="nama"
                required
                placeholder="Contoh: Budi Santoso"
                value={formData.nama}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
              />
            </div>

            {/* Input: No HP */}
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                <FiPhone className="text-sky-500" />
                <span>Nomor WhatsApp / HP *</span>
              </label>
              <input
                type="tel"
                name="noHp"
                required
                placeholder="Contoh: 081234567890"
                value={formData.noHp}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
              />
            </div>

            {/* Input: Alamat */}
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                <FiMapPin className="text-sky-500" />
                <span>Alamat Lengkap Pengiriman *</span>
              </label>
              <textarea
                name="alamat"
                required
                rows="3"
                placeholder="Contoh: Jl. Merdeka No. 45, Kecamatan Gambir, Jakarta Pusat"
                value={formData.alamat}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all resize-none"
              />
            </div>

            {/* Submit Actions */}
            <div className="pt-2 space-y-2.5">
              {/* Primary Telegram Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-sky-600/25 flex items-center justify-center space-x-2 transition-transform transform active:scale-98 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="text-xl animate-spin" />
                    <span>Membuat PDF & Mengirim Telegram...</span>
                  </>
                ) : (
                  <>
                    <FaTelegram className="text-xl" />
                    <span>Kirim Pesanan (PDF Otomatis via Telegram)</span>
                  </>
                )}
              </button>

              {/* Secondary WhatsApp Fallback */}
              <button
                type="button"
                onClick={handleWASubmit}
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 rounded-xl font-bold text-xs border border-slate-200/80 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <FaWhatsapp className="text-base text-emerald-600" />
                <span>Atau Kirim Manual via WhatsApp</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;

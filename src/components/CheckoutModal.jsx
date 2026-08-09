import React, { useState } from 'react';
import { useCart } from '../context/useCart';
import { formatRupiah } from '../utils/format';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FiUser, FiMapPin, FiPhone, FiMessageSquare, FiAlertCircle, FiHelpCircle } from 'react-icons/fi';
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
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setErrorMessage('');
    setShowConfirmation(false);
  };

  const handleWASubmit = (e) => {
    e.preventDefault();

    if (!formData.nama.trim() || !formData.noHp.trim() || !formData.alamat.trim()) {
      setErrorMessage('Harap isi semua bidang formulir pemesanan yang wajib (*)!');
      return;
    }

    const phonePattern = /^\+?[0-9]{9,15}$/;
    if (!phonePattern.test(formData.noHp.trim())) {
      setErrorMessage('Nomor HP tidak valid. Gunakan 9-15 digit angka, boleh diawali tanda + atau 08.');
      return;
    }

    setShowConfirmation(true);
  };

  const proceedToWhatsApp = () => {
    const merchantPhone = import.meta.env.VITE_WA_PHONE || '628128050439';
    const itemsList = cartItems.map(item => {
      const lineSubtotal = item.product.price * item.quantity;
      return `• ${item.product.name} (${item.product.weight || '250gr'}) (${item.quantity}x) = ${formatRupiah(lineSubtotal)}`;
    }).join('\n');

    const catatanText = formData.catatan.trim() 
      ? `\n📝 *Catatan:* ${formData.catatan.trim()}`
      : '';

    const message = `*📦 ORDER BARU CRUNCH UP*
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
    <Dialog open={isCheckoutOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">

        {/* Compact Modal Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-linear-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0 pr-6">
            <FaWhatsapp className="text-xl sm:text-2xl text-emerald-200 shrink-0" />
            <div className="min-w-0">
              <DialogTitle className="text-sm sm:text-base font-extrabold leading-tight text-white truncate">
                Checkout via WhatsApp
              </DialogTitle>
              <p className="text-[10px] sm:text-xs text-emerald-100 font-medium truncate">
                Rincian pesanan akan dikirim ke WhatsApp penjual
              </p>
            </div>
          </div>
        </div>

        {/* MODAL CONTENT SWITCHER */}
        {showConfirmation ? (
          /* CONFIRMATION POPUP VIEW */
          <div className="p-4 sm:p-6 space-y-4 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md ring-4 sm:ring-8 ring-emerald-500/10">
              <FiHelpCircle className="text-2xl sm:text-3xl" />
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-extrabold text-slate-800 mb-1">
                Konfirmasi Pesanan
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Apakah rincian pesanan Anda <strong className="text-emerald-700">sudah sesuai</strong>?
              </p>
            </div>

            {/* Order Details Brief Review Box */}
            <div className="bg-slate-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 text-left space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Pemesannya:</span>
                <span className="font-bold text-slate-800 truncate ml-2">{formData.nama} ({formData.noHp})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Total Item:</span>
                <span className="font-bold text-slate-800">{cartItems.length} Jenis Snack</span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-slate-500 font-medium">Total Pembayaran:</span>
                <span className="text-xs sm:text-sm font-black text-emerald-600">{formatRupiah(totalHarga)}</span>
              </div>
            </div>

            {/* Confirmation Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="flex-1 h-9 sm:h-11 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm cursor-pointer"
              >
                Batal
              </Button>
              <Button
                type="button"
                onClick={proceedToWhatsApp}
                className="flex-1 h-9 sm:h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl sm:rounded-2xl font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <FaWhatsapp className="text-base sm:text-lg" />
                <span>Lanjut ke WA</span>
              </Button>
            </div>
          </div>
        ) : (
          /* COMPACT FORM VIEW */
          <form onSubmit={handleWASubmit} className="p-4 sm:p-5 space-y-2.5 sm:space-y-3.5">
            
            {/* Error banner if any */}
            {errorMessage && (
              <div className="p-2.5 sm:p-3 bg-rose-50 border border-rose-200 rounded-xl text-[11px] sm:text-xs text-rose-700 flex items-start space-x-2">
                <FiAlertCircle className="text-sm shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Compact Order Summary Box */}
            <div className="bg-slate-50 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200/80 space-y-1.5">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Ringkasan ({cartItems.length} Item)
                </h4>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-600">
                  {formatRupiah(totalHarga)}
                </span>
              </div>
              <div className="max-h-20 sm:max-h-28 overflow-y-auto space-y-1 pr-1 text-[11px] sm:text-xs border-t border-slate-200/60 pt-1.5">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between text-slate-700">
                    <span className="truncate pr-2 font-medium">
                      {item.product.name} ({item.product.weight || '250gr'}) <strong className="text-orange-600">x{item.quantity}</strong>
                    </span>
                    <span className="font-semibold shrink-0">
                      {formatRupiah(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Input: Nama */}
            <div className="space-y-1">
              <Label className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center space-x-1">
                <FiUser className="text-emerald-500 text-xs" />
                <span>Nama Lengkap *</span>
              </Label>
              <Input
                type="text"
                name="nama"
                required
                placeholder="Contoh: Budi Santoso"
                value={formData.nama}
                onChange={handleInputChange}
                className="h-9 sm:h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-lg sm:rounded-xl px-3"
              />
            </div>

            {/* Input: No HP */}
            <div className="space-y-1">
              <Label className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center space-x-1">
                <FiPhone className="text-emerald-500 text-xs" />
                <span>Nomor WhatsApp / HP *</span>
              </Label>
              <Input
                type="tel"
                name="noHp"
                required
                placeholder="Contoh: 081234567890"
                value={formData.noHp}
                onChange={handleInputChange}
                className="h-9 sm:h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-lg sm:rounded-xl px-3"
              />
            </div>

            {/* Input: Alamat */}
            <div className="space-y-1">
              <Label className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center space-x-1">
                <FiMapPin className="text-emerald-500 text-xs" />
                <span>Alamat Pengiriman *</span>
              </Label>
              <Textarea
                name="alamat"
                required
                rows={2}
                placeholder="Contoh : Nama detail kantor, atau alamat lainnya"
                value={formData.alamat}
                onChange={handleInputChange}
                className="min-h-[52px] sm:min-h-[64px] text-xs sm:text-sm bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 resize-none rounded-lg sm:rounded-xl px-3 py-2"
              />
            </div>

            {/* Input: Catatan untuk Penjual (Opsional) */}
            <div className="space-y-1">
              <Label className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center space-x-1">
                <FiMessageSquare className="text-emerald-500 text-xs" />
                <span>Catatan (Opsional)</span>
              </Label>
              <Textarea
                name="catatan"
                rows={1}
                value={formData.catatan}
                onChange={handleInputChange}
                className="min-h-[42px] sm:min-h-[52px] text-xs sm:text-sm bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 resize-none rounded-lg sm:rounded-xl px-3 py-2"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-1.5">
              <Button
                type="submit"
                className="w-full h-10 sm:h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl sm:rounded-2xl font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FaWhatsapp className="text-base sm:text-lg" />
                <span>Kirim Pesanan via WhatsApp</span>
              </Button>
            </div>

          </form>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;

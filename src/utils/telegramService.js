/**
 * Service for sending order notifications & PDF documents to Telegram Bot API.
 */

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Automatically fetch the latest Chat ID from Telegram getUpdates if not defined in .env
 */
export const getLatestChatId = async (botToken) => {
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
    const data = await res.json();
    if (data.ok && data.result && data.result.length > 0) {
      // Find latest message or my_chat_member
      const lastUpdate = [...data.result].reverse().find(u => u.message || u.channel_post || u.my_chat_member);
      if (lastUpdate) {
        const chat = lastUpdate.message?.chat || lastUpdate.channel_post?.chat || lastUpdate.my_chat_member?.chat;
        if (chat && chat.id) {
          return chat.id;
        }
      }
    }
  } catch (error) {
    console.error('Failed to auto-detect Telegram Chat ID:', error);
  }
  return null;
};

/**
 * Send order details and PDF document to Telegram Bot.
 * @param {Object} params
 * @param {string} params.orderId
 * @param {Object} params.formData - { nama, noHp, alamat }
 * @param {Array} params.cartItems
 * @param {number} params.totalHarga
 * @param {Blob} params.pdfBlob
 * @param {string} params.filename
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const sendOrderToTelegram = async ({
  orderId,
  formData,
  cartItems,
  totalHarga,
  pdfBlob,
  filename = 'Invoice.pdf'
}) => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8516396672:AAF0DNkMVlgq-rnhO8jYLWe4USsFrl-dN0c';
  let chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken) {
    throw new Error('Telegram Bot Token belum dikonfigurasi!');
  }

  // Auto-detect Chat ID if empty in .env
  if (!chatId) {
    chatId = await getLatestChatId(botToken);
  }

  if (!chatId) {
    throw new Error('Chat ID tidak ditemukan! Harap buka Telegram, cari @KasumiNana_bot dan kirim pesan /start terlebih dahulu agar bot mengenali akun Anda.');
  }

  // 1. Format text message caption
  const itemsText = cartItems.map(item => {
    return `• *${item.product.name}* (x${item.quantity}) - ${formatRupiah(item.product.price * item.quantity)}`;
  }).join('\n');

  const caption = `🛒 *PESANAN BARU #${orderId}*
━━━━━━━━━━━━━━━━━━
👤 *Nama:* ${formData.nama}
📞 *No HP/WA:* ${formData.noHp}
📍 *Alamat:* ${formData.alamat}

📦 *Rincian Pesanan:*
${itemsText}

💰 *Total Pembayaran:* *${formatRupiah(totalHarga)}*
━━━━━━━━━━━━━━━━━━
📄 *Invoice PDF terlampir di bawah ini.*`;

  // 2. Send Document (PDF File + Caption)
  const bodyFormData = new FormData();
  bodyFormData.append('chat_id', chatId);
  bodyFormData.append('caption', caption);
  bodyFormData.append('parse_mode', 'Markdown');
  bodyFormData.append('document', pdfBlob, filename);

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
    method: 'POST',
    body: bodyFormData
  });

  const responseData = await res.json();

  if (!responseData.ok) {
    console.error('Telegram API Error:', responseData);
    throw new Error(responseData.description || 'Gagal mengirim invoice ke Telegram.');
  }

  return {
    success: true,
    message: 'Pesanan & Invoice PDF berhasil dikirim otomatis ke Telegram!'
  };
};

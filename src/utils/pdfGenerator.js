import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Generate a PDF invoice for an order.
 * @param {Object} params
 * @param {string} params.orderId
 * @param {Object} params.formData - { nama, noHp, alamat }
 * @param {Array} params.cartItems - Array of { product: { name, price, ... }, quantity }
 * @param {number} params.totalHarga
 * @returns {Object} { pdfBlob, downloadPDF, filename }
 */
export const generateInvoicePDF = ({ orderId, formData, cartItems, totalHarga }) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Colors
  const primaryColor = [16, 185, 129]; // Emerald 500
  const darkColor = [30, 41, 59]; // Slate 800
  const grayColor = [100, 116, 139]; // Slate 500

  // --- HEADER SECTION ---
  // Store Title / Brand
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...primaryColor);
  doc.text('CATALOG STORE', 14, 20);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  doc.text('Invoice Resmi Pemesanan Produk', 14, 26);

  // Invoice Number & Date (Right aligned)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...darkColor);
  doc.text('INVOICE', 196, 20, { align: 'right' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  doc.text(`No: #${orderId}`, 196, 26, { align: 'right' });
  doc.text(`Tanggal: ${currentDate}`, 196, 31, { align: 'right' });

  // Divider Line
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setLineWidth(0.5);
  doc.line(14, 36, 196, 36);

  // --- CUSTOMER DETAILS SECTION ---
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.roundedRect(14, 42, 182, 34, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryColor);
  doc.text('INFORMASI PELANGGAN & PENGIRIMAN', 18, 48);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...darkColor);
  doc.text('Nama Pemesan:', 18, 55);
  doc.text('No. WhatsApp/HP:', 18, 61);
  doc.text('Alamat Pengiriman:', 18, 67);

  doc.setFont('helvetica', 'normal');
  doc.text(formData.nama || '-', 55, 55);
  doc.text(formData.noHp || '-', 55, 61);

  // Multiline address truncation/wrap
  const splitAddress = doc.splitTextToSize(formData.alamat || '-', 135);
  doc.text(splitAddress, 55, 67);

  // --- ORDER ITEMS TABLE ---
  const tableData = cartItems.map((item, index) => [
    index + 1,
    item.product.name,
    `${item.quantity} x`,
    formatRupiah(item.product.price),
    formatRupiah(item.product.price * item.quantity)
  ]);

  autoTable(doc, {
    startY: 82,
    head: [['No', 'Nama Produk', 'Jumlah', 'Harga Satuan', 'Subtotal']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'left'
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 24, halign: 'center' },
      3: { cellWidth: 38, halign: 'right' },
      4: { cellWidth: 42, halign: 'right' }
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
      textColor: darkColor
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    }
  });

  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 130;

  // --- TOTAL SUMMARY BOX ---
  doc.setFillColor(236, 253, 245); // Emerald 50
  doc.setDrawColor(167, 243, 208); // Emerald 200
  doc.roundedRect(120, finalY + 8, 76, 20, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...darkColor);
  doc.text('TOTAL PEMBAYARAN', 125, finalY + 16);

  doc.setFontSize(13);
  doc.setTextColor(...primaryColor);
  doc.text(formatRupiah(totalHarga), 191, finalY + 23, { align: 'right' });

  // --- FOOTER ---
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...grayColor);
  doc.text('Terima kasih telah berbelanja di Catalog Store!', 105, finalY + 40, { align: 'center' });
  doc.text('Invoice ini dihasilkan secara otomatis oleh sistem.', 105, finalY + 45, { align: 'center' });

  // Output as Blob & Download Helper
  const pdfBlob = doc.output('blob');
  const filename = `Invoice_${orderId}.pdf`;

  const downloadPDF = () => {
    doc.save(filename);
  };

  return {
    pdfBlob,
    downloadPDF,
    filename
  };
};

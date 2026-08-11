<div align="center">

# 🍿 Crunch Up — Katalog Snack & WhatsApp Direct Order

<p align="center">
  <b>Aplikasi Web Katalog E-Commerce Crunch Up Modern, Fast & Ultra-Responsive dengan Checkout WhatsApp Direct</b>
</p>

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router 7](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 📌 Tentang Proyek

**Crunch Up** adalah platform e-commerce katalog makanan ringan & cemilan khas Nusantara yang dirancang dengan performa tinggi, tampilan UI/UX yang modern, serta pengalaman berbelanja yang intuitif.

Aplikasi ini memudahkan pelanggan untuk menemukan snack favorit mereka berdasarkan kategori dan varian rasa, melihat ketersediaan status secara *real-time*, serta langsung memesan melalui **WhatsApp Direct Checkout** tanpa kerumitan registrasi akun.

---

## ✨ Fitur-Fitur Utama

- 🎨 **Desain UI/UX Modern & Premium**:
  - Warna warm amber & orange yang membangkitkan selera.
  - Tampilan responsif optimal untuk semua ukuran layar (Mobile, Tablet, Desktop).
  - Animasi halus, hover effects, dan modal interaktif.

- 🛍️ **Katalog Snack Lengkap & Sinkron**:
  - Lebih dari 100+ varian snack berkualitas.
  - Penamaan produk bersih tanpa keterangan berat yang menumpuk.
  - Penanganan otomatis produk *Price Rp 0* dengan indikator status **`NOT AVAILABLE`** dan proteksi keranjang.

- 🔍 **Filter & Pencarian Cerdas**:
  - **Dropdown Kategori Rapi**: *Semua Kategori*, *Seafood & Bakso*, *Basreng & Seblak*, *Snack Modern*, *Kacang*, *Kerupuk*, *Stik & Makaroni*, *Snack Tradisional*, *Keripik*.
  - **Dropdown Varian Rasa**: *Semua Rasa*, *Asin*, *Pedas*, *Manis*, *Keju*.
  - **Dropdown Pengurutan (Sorting)**: *Harga: Terendah* & *Harga: Tertinggi* (Opsi *Paling Populer* & *Rating* di-nonaktifkan sementara).
  - **Layout Grid Responsif**: Tampilan grid 2-kolom di mobile, 3-kolom di tablet kecil (sm), 4-kolom di tablet (md), dan 5-kolom di desktop tanpa horizontal scrolling yang mengganggu.
  - **Pencarian Real-Time**: Pencarian kata kunci cepat berdasar nama, deskripsi, atau rasa produk.
  - **Pagination Interaktif**: Navigasi halaman yang cepat dan nyaman.

- 🛒 **Keranjang Belanja & Direct WhatsApp Order**:
  - Stateful cart dengan penyimpanan otomatis di `localStorage`.
  - Floating Cart Pill Button yang fleksibel.
  - Format pesan WhatsApp otomatis yang rapi dan siap kirim ke admin toko.

- ⚡ **Optimasi Performa Super Cepat**:
  - **Code-Splitting & Route Lazy Loading** via `React.lazy()` & `Suspense`.
  - Image hosting via ImgBB CDN dengan *Native HTML Lazy Loading* (`loading="lazy"` & `decoding="async"`).

---

## 🛠️ Teknologi & Library

| Kategori | Teknologi / Library |
|---|---|
| **Core Framework** | [React 19](https://react.dev/) |
| **Build Tool & Bundler** | [Vite 8](https://vitejs.dev/) |
| **Routing** | [React Router 7](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Iconography** | [React Icons](https://react-icons.github.io/react-icons/) (`react-icons/fi`) |
| **Asset CDN** | ImgBB High-Speed Cloud Storage |
| **Deployment Platform** | Vercel |

---

## ⚙️ Konfigurasi Environment (`.env`)

Untuk mengonfigurasi nomor WhatsApp admin penerima pesanan, buat file `.env` di root direktori proyek (atau salin dari `.env.example`):

```env
VITE_WA_PHONE=6281234567890
VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/YOUR_APPS_SCRIPT_DEPLOYMENT_ID/exec
```

> [!NOTE]
> - `VITE_WA_PHONE`: Masukkan nomor WhatsApp bisnis / admin toko Anda menggunakan format internasional tanpa spasi atau tanda `+` (contoh: `6281234567890`).
> - `VITE_SHEETS_WEBAPP_URL`: URL endpoint Google Apps Script Web App untuk pencatatan otomatis pesanan ke Google Sheets.

---

## 🚀 Panduan Instalasi & Pengembangan Lokal

### Prasyarat
- **Node.js**: `^20.19.0` atau `>=22.12.0`
- **Package Manager**: `npm`, `pnpm`, atau `yarn`

### Langkah Instalasi

1. **Clone Repository**:
   ```bash
   git clone https://github.com/Yossy123/Crunch-Up.git
   cd Crunch-Up
   ```

2. **Install Dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**:
   ```bash
   cp .env.example .env
   ```

4. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Akses aplikasi melalui browser di: `http://localhost:5173`

5. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

---

## 📂 Struktur Direktori Proyek

```text
Crunch-Up/
├── public/
│   ├── favicon.svg          # Favicon resmi aplikasi
│   ├── icons.svg            # Iconset SVG pendukung
│   └── logo.png             # Logo Brand Crunch Up
├── src/
│   ├── assets/
│   │   └── logo.png         # Logo Brand Crunch Up
│   ├── components/          # Komponen UI Reusable
│   │   ├── Banner.jsx       # Promo Banner Carousel
│   │   ├── CartItem.jsx     # Item Keranjang Belanja
│   │   ├── CartSidebar.jsx  # Drawer Sidebar Keranjang
│   │   ├── CategoryFilter.jsx # Panel Filter & Sorting
│   │   ├── CheckoutModal.jsx # Modal Form Checkout WhatsApp
│   │   ├── Footer.jsx       # Footer Informasi Toko
│   │   ├── Navbar.jsx       # Top Bar & Pencarian
│   │   ├── ProductCard.jsx  # Card Produk & Badge Status
│   │   ├── ProductGrid.jsx  # Grid Katalog & Pagination
│   │   ├── Toast.jsx        # Notifikasi Toast Pop-up
│   │   └── ui/              # Komponen UI Primitif (shadcn-style)
│   │       ├── accordion.jsx
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── dialog.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       ├── select.jsx
│   │       ├── sheet.jsx
│   │       ├── skeleton.jsx
│   │       └── textarea.jsx
│   ├── context/
│   │   ├── CartContext.jsx  # State Management Keranjang & Toast
│   │   └── useCart.js       # Hook & Context API Keranjang
│   ├── data/
│   │   └── products.json    # Dataset Produk Snack & Image Links
│   ├── lib/
│   │   └── utils.js         # Utility `cn()` (clsx + tailwind-merge)
│   ├── pages/
│   │   ├── Home.jsx         # Halaman Utama Katalog
│   │   └── ProductDetailPage.jsx # Halaman Detail Produk (Lazy Loaded)
│   ├── utils/
│   │   └── format.js        # Formatter Mata Uang Rupiah (IDR)
│   ├── App.jsx              # Main Router & Provider
│   ├── index.css            # Custom Styling & Tailwind v4
│   └── main.jsx             # React Entry Point
├── .env.example             # Template variabel environment
├── index.html               # Document HTML Utama
├── package.json             # Manifes Proyek & Script npm
└── README.md                # Dokumentasi Proyek
```

---

<div align="center">
  <sub>Dibuat dengan ❤️ untuk Toko Snack Indonesia • Crunch Up</sub>
</div>

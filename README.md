<div align="center">

# 🍿 CatalogApp — Snack Store & Direct WhatsApp Order

<p align="center">
  <b>Aplikasi Katalog E-Commerce Snack Ringan Modern & Super Fast dengan Checkout WhatsApp Direct</b>
</p>

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.1.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0.0-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router 7](https://img.shields.io/badge/React_Router-v7.1.5-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 📌 Tentang Project

**CatalogApp** adalah aplikasi e-commerce toko cemilan / snack ringan modern berbahasa Indonesia yang dirancang cepat, responsif, dan ramah pengguna di perangkat mobile maupun desktop. 

Aplikasi ini menggunakan teknologi web terkini seperti **React 19**, **Vite 8**, dan **Tailwind CSS v4**. Pengunjung dapat menjelajahi katalog snack, menyaring produk berdasarkan kategori dan varian rasa, mengelola keranjang belanja interaktif dengan penyimpan otomatis (`localStorage`), serta melakukan pemesanan langsung (*direct checkout*) yang terintegrasi dengan **WhatsApp API**.

---

## ✨ Fitur Utama

- 🎨 **Desain Modern & UI/UX Premium**: Antarmuka bersih, responsif, hemat energi di perangkat seluler dengan optimasi GPU 60 FPS.
- ⚡ **Images Cloud Hosted (ImgBB CDN)**: Seluruh aset gambar hosted secara eksternal via ImgBB CDN dengan *Native HTML Lazy Loading* (`loading="lazy"` & `decoding="async"`) untuk performa super cepat.
- 🔀 **Code-Splitting & Route Lazy Loading**: Menggunakan `React.lazy()` & `Suspense` untuk pemuatan bundle awal yang super cepat.
- 🔍 **Filter & Pencarian Pintar**:
  - Filter berdasarkan Kategori (`Biskuit & Cookies`, `Cokelat & Permen`, `Keripik & Macaroni`, `Snack Pedas`).
  - Filter berdasarkan Varian Rasa (`Original`, `Pedas Balado`, `Keju / Asin Gurih`, `Cokelat / Manis`, `BBQ / Savory`).
  - Pencarian kata kunci real-time dengan logika ter-memoization (`useMemo`).
  - Pengurutan (*Sorting*) berdasarkan Popularitas, Harga (Terendah/Tertinggi), dan Rating.
- 🛒 **Manajemen Keranjang Belanja**:
  - Tambah item, ubah jumlah kuantitas, dan hapus item dari keranjang.
  - Floating Cart Pill Button yang fleksibel.
  - Penyimpanan state keranjang otomatis di `localStorage`.
- 📦 **Validasi Stok Real-Time**: Pembatasan kuantitas pembelian secara dinamis sesuai ketersediaan stok produk.
- 💬 **Direct WhatsApp Checkout**: Mengirimkan draf format pesanan rapi berisi detail produk, jumlah unit, dan kalkulasi subtotal langsung ke WhatsApp Admin.

---

## 🛠️ Teknologi & Tools

| Kategori | Teknologi / Library |
|---|---|
| **Core Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Routing** | React Router 7 |
| **Styling** | Tailwind CSS v4 |
| **Icons** | React Icons (`react-icons/fi`) |
| **Asset Hosting** | ImgBB CDN (High-speed Cloud Storage) |
| **Deployment** | Vercel |

---

## ⚙️ Konfigurasi Environment (`.env`)

Untuk mengkonfigurasi nomor WhatsApp penerima pesanan, buat file `.env` di root proyek (atau salin dari `.env.example`):

```env
VITE_WA_PHONE=NO HP BUSINESS
```

> [!NOTE]
> Ganti `6281234567890` dengan nomor WhatsApp bisnis / admin Anda (gunakan format internasional tanpa tanda `+` atau spasi, contoh: `6281234567890`).

---

## 🚀 Panduan Instalasi & Pengembangan Lokal

### Prasyarat
- **Node.js**: versi `^20.19.0` atau `>=22.12.0`
- **npm** / **pnpm** / **yarn**

### Langkah-Langkah

1. **Clone Repository**:
   ```bash
   git clone https://github.com/Username/Catalog-app.git
   cd Catalog-app
   ```

2. **Install Dependensi**:
   ```bash
   npm install
   ```

3. **Buat File Environment**:
   ```bash
   cp .env.example .env
   ```

4. **Jalankan Server Pengembang Mode Dev**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:5173](http://localhost:5173) di browser Anda.

5. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

---

## 📂 Struktur Direktori Proyek

```text
Catalog-app/
├── public/
│   ├── favicon.svg          # Favicon aplikasi
│   └── icons.svg            # Ikon SVG pendukung
├── src/
│   ├── components/          # Komponen UI (Navbar, Banner, ProductCard, CartSidebar, Footer, dll)
│   ├── context/             # CartContext untuk manajemen state keranjang & toast
│   ├── data/
│   │   └── products.json    # Data produk snack (CDN image link, kategori, rasa, harga, stok)
│   ├── pages/
│   │   ├── Home.jsx         # Halaman utama katalog
│   │   └── ProductDetailPage.jsx  # Halaman detail produk (Lazy Loaded)
│   ├── utils/
│   │   └── format.js        # Utilitas format mata uang Rupiah
│   ├── App.jsx              # Routing, Suspense & Provider utama
│   ├── index.css            # Setup Tailwind CSS v4 & gaya global
│   └── main.jsx             # Entry point React
├── .env.example             # Template variabel lingkungan
├── index.html               # Entry HTML utama
├── package.json             # Konfigurasi dependensi & npm scripts
└── README.md                # Dokumentasi proyek
```

---

<div align="center">
  <sub>Dibuat dengan ❤️ untuk Toko Snack Indonesia • CatalogApp</sub>
</div>

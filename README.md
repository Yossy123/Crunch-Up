# CatalogApp - Toko Snack Online & Checkout WhatsApp

CatalogApp adalah aplikasi e-commerce toko snack ringan modern berbahasa Indonesia yang dibangun menggunakan **React 19**, **Vite 8**, **Tailwind CSS v4**, dan **React Router 7**. Aplikasi ini memungkinkan pengguna menjelajahi katalog produk snack, memfilter berdasarkan kategori dan rasa, mencari produk, mengelola keranjang belanja dengan validasi stok real-time, serta melakukan checkout pesanan langsung via WhatsApp.

---

## 🚀 Fitur Utama

- **Katalog Produk Interaktif**: Menampilkan 20 produk unggulan dari 4 kategori favorit (`Biskuit & Cookies`, `Cokelat & Permen`, `Keripik & Macaroni`, `Snack Pedas`) dengan filter kategori, varian rasa, serta pencarian kata kunci secara cepat.
- **Urutkan Produk**: Pengurutan berdasarkan popularitas, harga (terendah/tertinggi), dan rating.
- **Manajemen Keranjang Belanja**:
  - Tambah item, ubah kuantitas, dan hapus item dari keranjang.
  - Sticky floating cart button untuk akses cepat.
  - Simpan status keranjang belanja secara otomatis di `localStorage`.
- **Validasi Stok Real-Time**: Pembatasan kuantitas pembelian sesuai ketersediaan stok produk pada stepper kuantitas dan context keranjang.
- **Checkout via WhatsApp**: Pengiriman ringkasan pesanan otomatis lengkap dengan nama, nomor HP, alamat pengiriman, dan catatan penjual langsung ke WhatsApp merchant.
- **Desain Responsif & Modern**: Didesain dengan antarmuka yang intuitif dan nyaman digunakan di berbagai perangkat (Mobile & Desktop).

---

## 🛠️ Teknologi & Stack

- **Frontend**: React 19, React Router 7
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: React Icons (`react-icons`)
- **Linter**: Oxlint

---

## 📦 Konfigurasi Environment (`.env`)

Buat file `.env` di root direktori project (atau salin dari `.env.example`):

```env
VITE_WA_PHONE=6285174103353
```

- `VITE_WA_PHONE`: Nomor WhatsApp penjual/merchant (format internasional tanpa tanda `+`, contoh: `6285174103353`).

---

## 💻 Cara Install & Menjalankan Project

### Prasyarat
- Node.js (`^20.19.0 || >=22.12.0`)
- npm / yarn / pnpm

### Langkah Pemasangan

1. **Clone repository**:
   ```bash
   git clone <repository-url>
   cd Catalog-app
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Dev Mode)**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

4. **Jalankan Linter**:
   ```bash
   npm run lint
   ```

5. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

---

## 📂 Struktur Folder Project

```text
Catalog-app/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/              # Gambar produk snack
├── src/
│   ├── components/          # Komponen UI (Navbar, Banner, ProductCard, CartSidebar, Footer, dll)
│   ├── context/             # CartContext untuk manajemen state keranjang & toast
│   ├── data/
│   │   └── products.json    # Data produk snack (kategori, rasa, harga, stok, gambar, dll)
│   ├── pages/
│   │   ├── Home.jsx         # Halaman utama katalog
│   │   └── ProductDetailPage.jsx  # Halaman detail produk
│   ├── utils/
│   │   └── format.js        # Utilitas format mata uang Rupiah
│   ├── App.jsx              # Routing & Provider utama
│   ├── index.css            # Setup Tailwind v4 & style global
│   └── main.jsx             # Entry point React
├── .env.example             # Template variabel lingkungan
├── index.html               # Entry HTML & favicon setup
├── package.json             # Konfigurasi dependensi & npm scripts
└── README.md                # Dokumentasi project
```

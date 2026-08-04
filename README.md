# Tour Travel Umroh & Haji

Aplikasi web manajemen tour travel umroh dan haji menggunakan React, TypeScript, dan Vite dengan tech stack standar perusahaan.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run development server
npm run dev
```

Aplikasi berjalan di `http://localhost:3000`

## 📦 Tech Stack

- **React 18** + **TypeScript** (Strict Mode)
- **Vite** - Build tool
- **Ant Design** + **TailwindCSS** - UI Framework
- **Zustand** - State Management
- **React Router** - Routing (HashRouter)
- **React Hook Form** + **Zod** - Form & Validation
- **Axios** + **TanStack Query** - Data Fetching

## 📁 Struktur Project

```
tour-travel-umroh/
├── src/
│   ├── api/            # API endpoints
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   ├── routes/         # Route configuration
│   ├── store/          # Zustand stores
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
├── public/             # Static assets
└── ...config files
```

## ✨ Fitur

- ✅ Autentikasi (Login/Logout)
- ✅ Dashboard dengan statistik
- ✅ Manajemen Paket (Umroh & Haji)
- ✅ Manajemen Pelanggan
- ✅ Manajemen Booking
- ✅ Tracking Pembayaran
- ✅ Responsive Design

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Lint code
```

## 🔧 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 📖 Dokumentasi Lengkap

Lihat [SETUP.md](./SETUP.md) untuk dokumentasi lengkap.

## 🎯 Standar Kode

- ❌ Dilarang menggunakan `any`
- ✅ Semua variabel harus memiliki tipe eksplisit
- ✅ Kode dalam Bahasa Inggris
- ✅ UI/Teks dalam Bahasa Indonesia
- ✅ Tidak ada `console.log` di production

## 📄 License

Private - PT Company

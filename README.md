# Tour Travel Umroh & Haji

Aplikasi web manajemen tour travel umroh dan haji menggunakan React, TypeScript, dan Vite dengan tech stack standar perusahaan.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Edit .env file and set your API base URL.

# Run development server
npm run dev
Aplikasi berjalan di http://localhost:3000

📦 Tech Stack
React 18 - UI library with functional components

TypeScript - Type-safe JavaScript with strict mode

Vite - Fast build tool and dev server

Ant Design + TailwindCSS - UI Framework & Styling

Zustand - Lightweight state management

React Router - Routing (HashRouter)

React Hook Form + Zod - Form & Validation

Axios + TanStack Query - Data Fetching

dayjs - Lightweight date library

📁 Struktur Project
tour-travel-umroh/
├── public/              # Static assets
├── src/
│   ├── api/            # API client & endpoints (Axios instances)
│   ├── components/     # Reusable components & Modals
│   ├── hooks/          # Custom React hooks (TanStack Query)
│   ├── pages/          # Page components (Dashboard, Login, dll)
│   ├── routes/         # Routing configuration (AppRoutes)
│   ├── store/          # State management (Zustand)
│   ├── types/          # TypeScript interfaces & types
│   ├── utils/          # Utility & formatter functions
│   ├── index.css       # Global styles
│   └── main.tsx        # App entry point
├── .env.example        # Environment variables template
└── ...config files     # Vite, Tailwind, TypeScript, ESLint configs
✨ Fitur
✅ Autentikasi: Login system dengan JWT token, protected routes, auto-redirect.

✅ Dashboard: Statistik overview dan akses cepat.

✅ Manajemen Paket: CRUD Paket Umroh & Haji, filter, manajemen harga & kuota.

✅ Manajemen Pelanggan: CRUD pelanggan, validasi NIK/Paspor.

✅ Manajemen Booking: Pembuatan booking, tracking pembayaran, kalkulasi harga.

🔌 API Response Structure
Semua komunikasi API (Axios) WAJIB dibungkus menggunakan struktur response standar berikut, dan pesan error selalu diambil dari field message:

TypeScript
export interface IResponseEntity<T> {
  code: number;      // HTTP status
  status: boolean;   // true = sukses
  message: string;   // Pesan untuk user / error log
  data?: T;
  meta?: ImetaPagination; // { totalPages, totalData, totalDataPerPage, page, limit }
}
🎯 Standar Kode (Wajib)
❌ Dilarang menggunakan any - Gunakan tipe TypeScript yang eksplisit.

✅ Kode dalam Bahasa Inggris - Penamaan variabel, fungsi, dan tipe.

✅ UI/Teks dalam Bahasa Indonesia - Semua teks yang dibaca oleh pengguna (antarmuka).

❌ Dilarang ada console.log - Pastikan bersih sebelum commit/production.

✅ Standard Tools - Dilarang mengganti library/pattern di luar stack standar tanpa persetujuan Lead Developer.

📝 Scripts
Bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Lint code
🔧 Environment Variables
Code snippet
VITE_API_BASE_URL=http://localhost:8000/api

📄 License
Private - PT
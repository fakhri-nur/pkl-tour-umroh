# Project Structure

```
tour-travel-umroh/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   ├── authApi.ts
│   │   ├── bookingApi.ts
│   │   ├── client.ts
│   │   ├── customerApi.ts
│   │   └── packageApi.ts
│   ├── assets/
│   ├── components/
│   │   ├── BookingModal.tsx
│   │   ├── CustomerModal.tsx
│   │   ├── MainLayout.tsx
│   │   ├── PackageModal.tsx
│   │   └── ProtectedRoute.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useBookings.ts
│   │   ├── useCustomers.ts
│   │   └── usePackages.ts
│   ├── pages/
│   │   ├── BookingPage.tsx
│   │   ├── CustomerPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── PackagePage.tsx
│   ├── routes/
│   │   └── AppRoutes.tsx
│   ├── store/
│   │   └── authStore.ts
│   ├── types/
│   │   ├── api.type.ts
│   │   ├── auth.type.ts
│   │   ├── booking.type.ts
│   │   ├── customer.type.ts
│   │   └── package.type.ts
│   ├── utils/
│   │   └── formatter.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── .lintstagedrc.js
├── .prettierignore
├── .prettierrc.json
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── SETUP.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Summary

Total Files: 48
- Config Files: 16
- Source Files: 31
- Documentation: 2

## Modules

### API Layer (5 files)
- client.ts - Axios instance with interceptors
- authApi.ts - Authentication endpoints
- bookingApi.ts - Booking management
- customerApi.ts - Customer management
- packageApi.ts - Package management

### Components (5 files)
- MainLayout.tsx - Main application layout
- ProtectedRoute.tsx - Route guard for authentication
- BookingModal.tsx - Booking form modal
- CustomerModal.tsx - Customer form modal
- PackageModal.tsx - Package form modal

### Hooks (4 files)
- useAuth.ts - Authentication hooks
- useBookings.ts - Booking data hooks
- useCustomers.ts - Customer data hooks
- usePackages.ts - Package data hooks

### Pages (6 files)
- DashboardPage.tsx - Main dashboard with statistics
- LoginPage.tsx - Login form
- HomePage.tsx - Landing page
- BookingPage.tsx - Booking management page
- CustomerPage.tsx - Customer management page
- PackagePage.tsx - Package management page

### State Management (1 file)
- authStore.ts - Zustand store for authentication

### Types (5 files)
- api.type.ts - API response types
- auth.type.ts - Authentication types
- booking.type.ts - Booking types
- customer.type.ts - Customer types
- package.type.ts - Package types

### Utils (1 file)
- formatter.ts - Currency and date formatting

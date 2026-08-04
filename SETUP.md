# Tour Travel Umroh - Setup Instructions

## Prerequisites
- Node.js >= 18.x
- npm or yarn

## Installation Steps

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```
Edit `.env` file and set your API base URL.

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
tour-travel-umroh/
├── public/              # Static assets
├── src/
│   ├── api/            # API client & endpoints
│   │   ├── client.ts           # Axios instance with interceptors
│   │   ├── authApi.ts          # Auth endpoints
│   │   ├── bookingApi.ts       # Booking endpoints
│   │   ├── customerApi.ts      # Customer endpoints
│   │   └── packageApi.ts       # Package endpoints
│   ├── components/     # Reusable components
│   │   ├── MainLayout.tsx      # Main app layout
│   │   ├── ProtectedRoute.tsx  # Route guard
│   │   ├── BookingModal.tsx    # Booking form modal
│   │   ├── CustomerModal.tsx   # Customer form modal
│   │   └── PackageModal.tsx    # Package form modal
│   ├── hooks/          # Custom React hooks
│   │   ├── useAuth.ts          # Auth hooks
│   │   ├── useBookings.ts      # Booking hooks
│   │   ├── useCustomers.ts     # Customer hooks
│   │   └── usePackages.ts      # Package hooks
│   ├── pages/          # Page components
│   │   ├── DashboardPage.tsx   # Dashboard
│   │   ├── LoginPage.tsx       # Login page
│   │   ├── BookingPage.tsx     # Booking management
│   │   ├── CustomerPage.tsx    # Customer management
│   │   ├── PackagePage.tsx     # Package management
│   │   └── HomePage.tsx        # Home/Landing page
│   ├── routes/         # Routing configuration
│   │   └── AppRoutes.tsx       # Route definitions
│   ├── store/          # State management (Zustand)
│   │   └── authStore.ts        # Auth state
│   ├── types/          # TypeScript interfaces
│   │   ├── api.type.ts         # API response types
│   │   ├── auth.type.ts        # Auth types
│   │   ├── booking.type.ts     # Booking types
│   │   ├── customer.type.ts    # Customer types
│   │   └── package.type.ts     # Package types
│   ├── utils/          # Utility functions
│   │   └── formatter.ts        # Format helpers
│   ├── index.css       # Global styles
│   └── main.tsx        # App entry point
├── .env.example        # Environment variables template
├── .eslintrc.cjs       # ESLint configuration
├── .gitignore          # Git ignore rules
├── index.html          # HTML template
├── package.json        # Dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
├── tsconfig.node.json  # TypeScript config for Node
└── vite.config.ts      # Vite configuration
```

## Tech Stack

### Core
- **React 18** - UI library with functional components
- **TypeScript** - Type-safe JavaScript with strict mode
- **Vite** - Fast build tool and dev server

### UI & Styling
- **Ant Design** - Enterprise UI component library
- **TailwindCSS** - Utility-first CSS framework

### State Management & Routing
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing with HashRouter

### Forms & Validation
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation

### Data Fetching
- **Axios** - HTTP client
- **TanStack Query** - Server state management

### Date Handling
- **dayjs** - Lightweight date library

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Features Implemented

### Authentication
- Login system with JWT token
- Protected routes
- Auto-redirect on unauthorized access
- Persistent auth state with localStorage

### Dashboard
- Statistics overview
- Quick access to modules

### Package Management
- CRUD operations for Umroh & Haji packages
- Package type filtering
- Price and quota management
- Departure date scheduling

### Customer Management
- CRUD operations for customers
- Customer search functionality
- NIK and passport validation
- Gender and date of birth tracking

### Booking Management
- Create bookings with customer and package selection
- Payment tracking (unpaid/partial/paid)
- Booking status management
- Price calculation

## API Response Structure

All API responses follow this structure:

```typescript
interface IResponseEntity<T> {
  code: number;
  status: boolean;
  message: string;
  data?: T;
  meta?: {
    totalPages: number;
    totalData: number;
    totalDataPerPage: number;
    page: number;
    limit: number;
  };
}
```

## Code Standards

1. **No `any` type** - Strict TypeScript typing
2. **English for code** - Variables, functions, types
3. **Indonesian for UI** - All user-facing text
4. **No console.log** - Clean production code
5. **Explicit types** - All variables and returns typed

## Notes

- HashRouter is used for compatibility with static hosting
- Ant Design theme color: `#0ea5e9` (primary blue)
- Default API timeout: 30 seconds
- Query cache: 5 minutes stale time

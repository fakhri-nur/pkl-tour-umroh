import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type JemaahFinanceStatus = 'REGISTERED' | 'DOWN PAYMENT' | 'FULLY PAID';

export interface IJemaahRecord {
  id: string;
  name: string;
  phone: string;
  packageName: string;
  registrationDate: string;
  financeStatus: JemaahFinanceStatus;
}

export interface ICommissionRecord {
  id: string;
  description: string;
  date: string;
  amount: number;
  status: 'PENDING' | 'PAID';
}

export interface IAgenPackage {
  id: string;
  category: 'haji-umrah' | 'visa-dokumen' | 'tour-wisata' | 'corporate-transport';
  name: string;
  price: number;
  duration: string;
  active: boolean;
}

export interface IAgenMaterial {
  id: string;
  type: 'FLYER' | 'BANNER IG' | 'PRICELIST';
  title: string;
}

interface AgenState {
  jemaah: IJemaahRecord[];
  commissions: ICommissionRecord[];
  packages: IAgenPackage[];
  addJemaah: (record: Omit<IJemaahRecord, 'id' | 'registrationDate' | 'financeStatus'>) => IJemaahRecord;
  togglePackageActive: (id: string) => void;
  markCommissionPaid: (id: string) => void;
}

const initialJemaah: IJemaahRecord[] = [
  {
    id: 'JG-001',
    name: 'Siti Nurhaliza',
    phone: '+62 812-3456-7890',
    packageName: 'Umrah Reguler 9 Hari',
    registrationDate: '2026-08-01',
    financeStatus: 'REGISTERED',
  },
  {
    id: 'JG-002',
    name: 'Ahmad Yusuf',
    phone: '+62 813-9876-5432',
    packageName: 'Haji Plus 2026',
    registrationDate: '2026-08-02',
    financeStatus: 'DOWN PAYMENT',
  },
  {
    id: 'JG-003',
    name: 'Fatimah Azzahra',
    phone: '+62 814-1111-2222',
    packageName: 'Umrah Plus Dubai',
    registrationDate: '2026-08-03',
    financeStatus: 'FULLY PAID',
  },
];

const initialCommissions: ICommissionRecord[] = [
  {
    id: 'KMS-001',
    description: 'Komisi penjualan Umrah Reguler 9 Hari',
    date: '2026-08-01',
    amount: 2500000,
    status: 'PENDING',
  },
  {
    id: 'KMS-002',
    description: 'Komisi penjualan Haji Plus 2026',
    date: '2026-08-02',
    amount: 3000000,
    status: 'PENDING',
  },
  {
    id: 'KMS-003',
    description: 'Komisi penjualan Umrah Plus Dubai',
    date: '2026-08-03',
    amount: 1500000,
    status: 'PAID',
  },
];

const initialPackages: IAgenPackage[] = [
  {
    id: 'PKG-1',
    category: 'haji-umrah',
    name: 'Umrah Reguler 9 Hari',
    price: 28000000,
    duration: '9 Hari',
    active: true,
  },
  {
    id: 'PKG-2',
    category: 'haji-umrah',
    name: 'Haji Plus 2026',
    price: 85000000,
    duration: '40 Hari',
    active: true,
  },
  {
    id: 'PKG-3',
    category: 'haji-umrah',
    name: 'Umrah Plus Dubai',
    price: 35000000,
    duration: '12 Hari',
    active: true,
  },
  {
    id: 'PKG-4',
    category: 'tour-wisata',
    name: 'Wisata Halal Turki 8 Hari',
    price: 22000000,
    duration: '8 Hari',
    active: false,
  },
  {
    id: 'PKG-5',
    category: 'visa-dokumen',
    name: 'Pengurusan Visa Umrah',
    price: 2500000,
    duration: '7-14 Hari',
    active: false,
  },
  {
    id: 'PKG-6',
    category: 'corporate-transport',
    name: 'Paket Meeting Corporate (50 Pax)',
    price: 25000000,
    duration: 'Custom',
    active: false,
  },
];

export const useAgenStore = create<AgenState>()(
  persist(
    (set) => ({
      jemaah: initialJemaah,
      commissions: initialCommissions,
      packages: initialPackages,

      addJemaah: (record) => {
        const newRecord: IJemaahRecord = {
          ...record,
          id: `JG-${Date.now().toString().slice(-6)}`,
          registrationDate: new Date().toISOString().slice(0, 10),
          financeStatus: 'REGISTERED',
        };
        set((state) => ({ jemaah: [newRecord, ...state.jemaah] }));
        return newRecord;
      },

      togglePackageActive: (id) => {
        set((state) => ({
          packages: state.packages.map((pkg) =>
            pkg.id === id ? { ...pkg, active: !pkg.active } : pkg
          ),
        }));
      },

      markCommissionPaid: (id) => {
        set((state) => ({
          commissions: state.commissions.map((rec) =>
            rec.id === id ? { ...rec, status: 'PAID' } : rec
          ),
        }));
      },
    }),
    {
      name: 'agen-storage',
    }
  )
);
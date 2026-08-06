import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CampaignStatus = 'Active' | 'Paused';
export type CampaignPlatform =
  | 'Facebook Ads'
  | 'Google Search'
  | 'Instagram'
  | 'Referral'
  | 'WhatsApp'
  | 'Website';

export type LeadSource =
  | 'Facebook Ads'
  | 'Google Search'
  | 'Instagram'
  | 'Referral'
  | 'WhatsApp'
  | 'Website';

export type LeadStatus = 'New' | 'Contacted' | 'Converted' | 'Lost';

export type VerificationUrgency = 'High' | 'Medium' | 'Low';
export type VerificationStatus = 'PENDING' | 'REVIEWED' | 'APPROVED' | 'REJECTED';

export type TransactionType = 'IN' | 'OUT';

export interface IMarketingCampaign {
  id: string;
  name: string;
  platform: CampaignPlatform;
  status: CampaignStatus;
  budget: number;
  spent: number;
  revenue: number;
  conversions: number;
  startDate: string;
  endDate: string;
}

export interface IMarketingLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  status: LeadStatus;
  packageInterest: string;
  createdAt: string;
}

export interface IPaymentVerification {
  id: string;
  jemaahName: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  urgency: VerificationUrgency;
  status: VerificationStatus;
}

export interface IRefundRequest {
  id: string;
  description: string;
  amount: number;
  priority: VerificationUrgency;
  status: VerificationStatus;
}

export interface IFinanceTransaction {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
  type: TransactionType;
}

export interface IFinanceSummary {
  totalInflowMtd: number;
  inflowGrowthPercent: number;
  pendingPayments: number;
  outstandingReceivables: number;
}

interface MarketingState {
  campaigns: IMarketingCampaign[];
  leads: IMarketingLead[];
  verifications: IPaymentVerification[];
  refundRequests: IRefundRequest[];
  transactions: IFinanceTransaction[];
  financeSummary: IFinanceSummary;
  addCampaign: (campaign: Omit<IMarketingCampaign, 'id' | 'revenue'>) => void;
  updateCampaign: (id: string, campaign: Omit<IMarketingCampaign, 'id' | 'revenue'>) => void;
  addLead: (lead: Omit<IMarketingLead, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  removeLead: (id: string) => void;
  reviewVerification: (id: string) => void;
  reviewRefund: (id: string) => void;
}

const initialCampaigns: IMarketingCampaign[] = [
  {
    id: 'CMP-001',
    name: 'Promo Haji 2025',
    platform: 'Facebook Ads',
    status: 'Active',
    budget: 25000000,
    spent: 5000000,
    revenue: 18500000,
    conversions: 23,
    startDate: '2026-01-15',
    endDate: '2026-06-30',
  },
  {
    id: 'CMP-002',
    name: 'Umrah Ramadhan',
    platform: 'Google Search',
    status: 'Active',
    budget: 20000000,
    spent: 4500000,
    revenue: 16300000,
    conversions: 21,
    startDate: '2026-02-01',
    endDate: '2026-04-15',
  },
  {
    id: 'CMP-003',
    name: 'Umrah Plus Dubai',
    platform: 'Instagram',
    status: 'Paused',
    budget: 15000000,
    spent: 3200000,
    revenue: 9800000,
    conversions: 14,
    startDate: '2026-03-10',
    endDate: '2026-05-10',
  },
  {
    id: 'CMP-004',
    name: 'Alumni Referral Program',
    platform: 'Referral',
    status: 'Paused',
    budget: 10000000,
    spent: 1800000,
    revenue: 6200000,
    conversions: 9,
    startDate: '2026-04-01',
    endDate: '2026-06-30',
  },
];

const initialLeads: IMarketingLead[] = [
  {
    id: 'LD-001',
    name: 'Rizky Pratama',
    phone: '+62 812-3456-7890',
    email: 'rizky.pratama@gmail.com',
    source: 'Facebook Ads',
    status: 'New',
    packageInterest: 'Haji Plus 2026',
    createdAt: '2026-08-06T09:12:00',
  },
  {
    id: 'LD-002',
    name: 'Siti Rahmawati',
    phone: '+62 813-1111-2222',
    email: 'siti.rahmawati@gmail.com',
    source: 'Google Search',
    status: 'New',
    packageInterest: 'Umrah Ramadhan',
    createdAt: '2026-08-06T08:45:00',
  },
  {
    id: 'LD-003',
    name: 'Andi Saputra',
    phone: '+62 821-9876-5432',
    email: 'andi.saputra@yahoo.com',
    source: 'Instagram',
    status: 'Contacted',
    packageInterest: 'Umrah Plus Dubai',
    createdAt: '2026-08-05T14:20:00',
  },
  {
    id: 'LD-004',
    name: 'Budi Hartono',
    phone: '+62 856-7777-8888',
    email: 'budi.hartono@gmail.com',
    source: 'Referral',
    status: 'Converted',
    packageInterest: 'Haji Plus 2026',
    createdAt: '2026-08-04T10:05:00',
  },
  {
    id: 'LD-005',
    name: 'Dewi Anggraini',
    phone: '+62 857-3333-4444',
    email: 'dewi.anggraini@gmail.com',
    source: 'Facebook Ads',
    status: 'Lost',
    packageInterest: 'Umrah Reguler 9 Hari',
    createdAt: '2026-08-03T16:40:00',
  },
];

const initialVerifications: IPaymentVerification[] = [
  {
    id: 'VFY-001',
    jemaahName: 'Siti Nurhaliza',
    invoiceNumber: 'INV-2026-00912',
    amount: 32500000,
    dueDate: '2026-08-08',
    urgency: 'High',
    status: 'PENDING',
  },
  {
    id: 'VFY-002',
    jemaahName: 'Ahmad Yusuf',
    invoiceNumber: 'INV-2026-00913',
    amount: 85000000,
    dueDate: '2026-08-07',
    urgency: 'High',
    status: 'PENDING',
  },
  {
    id: 'VFY-003',
    jemaahName: 'Fatimah Azzahra',
    invoiceNumber: 'INV-2026-00914',
    amount: 28000000,
    dueDate: '2026-08-12',
    urgency: 'Medium',
    status: 'PENDING',
  },
  {
    id: 'VFY-004',
    jemaahName: 'Hendra Gunawan',
    invoiceNumber: 'INV-2026-00915',
    amount: 27500000,
    dueDate: '2026-08-15',
    urgency: 'Low',
    status: 'PENDING',
  },
  {
    id: 'VFY-005',
    jemaahName: 'Rina Susanti',
    invoiceNumber: 'INV-2026-00916',
    amount: 80000000,
    dueDate: '2026-08-10',
    urgency: 'Medium',
    status: 'PENDING',
  },
];

const initialRefundRequests: IRefundRequest[] = [
  {
    id: 'RFD-001',
    description: 'Permintaan Refund - Pembatalan Umrah (Dewi Anggraini)',
    amount: 25000000,
    priority: 'High',
    status: 'PENDING',
  },
];

const initialTransactions: IFinanceTransaction[] = [
  {
    id: 'TRX-2026-0901',
    description: 'Pelunasan Umrah - Siti Nurhaliza',
    category: 'Pembayaran Jemaah',
    date: '2026-08-06',
    amount: 32500000,
    type: 'IN',
  },
  {
    id: 'TRX-2026-0900',
    description: 'DP Haji Plus 2026 - Ahmad Yusuf',
    category: 'Pembayaran Jemaah',
    date: '2026-08-05',
    amount: 25000000,
    type: 'IN',
  },
  {
    id: 'TRX-2026-0899',
    description: 'Biaya Iklan Facebook Ads - Agustus',
    category: 'Biaya Marketing',
    date: '2026-08-05',
    amount: 5000000,
    type: 'OUT',
  },
  {
    id: 'TRX-2026-0898',
    description: 'Pelunasan Umrah - Fatimah Azzahra',
    category: 'Pembayaran Jemaah',
    date: '2026-08-04',
    amount: 28000000,
    type: 'IN',
  },
  {
    id: 'TRX-2026-0897',
    description: 'Biaya Iklan Google Search - Agustus',
    category: 'Biaya Marketing',
    date: '2026-08-03',
    amount: 4500000,
    type: 'OUT',
  },
  {
    id: 'TRX-2026-0896',
    description: 'Refund - Pembatalan Umrah (Dewi Anggraini)',
    category: 'Refund',
    date: '2026-08-02',
    amount: 25000000,
    type: 'OUT',
  },
  {
    id: 'TRX-2026-0895',
    description: 'Pelunasan Haji Plus - Bambang Setiawan',
    category: 'Pembayaran Jemaah',
    date: '2026-08-01',
    amount: 85000000,
    type: 'IN',
  },
];

export const useMarketingStore = create<MarketingState>()(
  persist(
    (set) => ({
      campaigns: initialCampaigns,
      leads: initialLeads,
      verifications: initialVerifications,
      refundRequests: initialRefundRequests,
      transactions: initialTransactions,
      financeSummary: {
        totalInflowMtd: 14500000000,
        inflowGrowthPercent: 12.5,
        pendingPayments: 45,
        outstandingReceivables: 850200000,
      },

      addCampaign: (campaign) => {
        set((state) => ({
          campaigns: [
            {
              ...campaign,
              id: `CMP-${Date.now().toString().slice(-6)}`,
              revenue: campaign.conversions * 4000000,
            },
            ...state.campaigns,
          ],
        }));
      },

      updateCampaign: (id, campaign) => {
        set((state) => ({
          campaigns: state.campaigns.map((item) =>
            item.id === id
              ? { ...item, ...campaign, revenue: campaign.conversions * 4000000 }
              : item
          ),
        }));
      },

      addLead: (lead) => {
        set((state) => ({
          leads: [
            {
              ...lead,
              id: `LD-${Date.now().toString().slice(-6)}`,
              createdAt: new Date().toISOString(),
            },
            ...state.leads,
          ],
        }));
      },

      updateLeadStatus: (id, status) => {
        set((state) => ({
          leads: state.leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
        }));
      },

      removeLead: (id) => {
        set((state) => ({ leads: state.leads.filter((lead) => lead.id !== id) }));
      },

      reviewVerification: (id) => {
        set((state) => ({
          verifications: state.verifications.map((item) =>
            item.id === id ? { ...item, status: 'REVIEWED' } : item
          ),
        }));
      },

      reviewRefund: (id) => {
        set((state) => ({
          refundRequests: state.refundRequests.map((item) =>
            item.id === id ? { ...item, status: 'REVIEWED' } : item
          ),
        }));
      },
    }),
    {
      name: 'marketing-storage',
    }
  )
);

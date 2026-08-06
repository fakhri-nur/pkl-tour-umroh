import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AgendaCategory = 'Ibadah' | 'Transportasi' | 'Makan' | 'Kegiatan' | 'Umum';
export type DocumentStatus = 'VERIFIED' | 'MISSING' | 'PENDING REVIEW';
export type PaymentStatus = 'SUCCESS' | 'PENDING' | 'FAILED';
export type PackageCategory =
  | 'corporate-transport'
  | 'haji-umrah'
  | 'tour-wisata'
  | 'visa-dokumen';

export interface ITourLeaderJemaah {
  id: string;
  name: string;
  initials: string;
  gender: 'L' | 'P';
  age: number;
  seat: string;
  phone: string;
  packageName: string;
  isLansia: boolean;
  isWheelchair: boolean;
  checkedIn: boolean;
}

export interface IAgendaActivity {
  id: string;
  time: string;
  title: string;
  location: string;
  category: AgendaCategory;
  done: boolean;
}

export interface IAgendaDay {
  id: string;
  dayLabel: string;
  dateLabel: string;
  activities: IAgendaActivity[];
}

export interface IPaymentRecord {
  id: string;
  jemaahName: string;
  packageName: string;
  amount: number;
  time: string;
  status: PaymentStatus;
}

export interface ITourLeaderPackage {
  id: string;
  category: PackageCategory;
  name: string;
  duration: string;
  quotaLeft: number;
  quotaTotal: number;
  price: number;
  description: string;
}

export interface IJemaahDocument {
  id: string;
  jemaahName: string;
  docType: 'Buku Kuning' | 'KK' | 'Passport' | 'Visa';
  uploadedAt: string;
  status: DocumentStatus;
}

export interface ITourLeaderProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  certification: string;
}

export interface INotificationPrefs {
  email: boolean;
  whatsapp: boolean;
  scheduleReminder: boolean;
}

export interface ITripSummary {
  totalJamaah: number;
  checkedIn: number;
  lansia60plus: number;
  wheelchair: number;
}

interface TourLeaderState {
  manifest: ITourLeaderJemaah[];
  agendaDays: IAgendaDay[];
  payments: IPaymentRecord[];
  packages: ITourLeaderPackage[];
  documents: IJemaahDocument[];
  profile: ITourLeaderProfile;
  notificationPrefs: INotificationPrefs;
  tripSummary: ITripSummary;
  emergency: {
    active: boolean;
    description: string;
  };
  checkInJemaah: (id: string) => void;
  toggleActivityDone: (dayId: string, activityId: string) => void;
  triggerEmergency: (description: string) => void;
  resolveEmergency: () => void;
  toggleNotification: (key: keyof INotificationPrefs) => void;
  updateProfile: (profile: ITourLeaderProfile) => void;
}

const initialManifest: ITourLeaderJemaah[] = [
  {
    id: 'M-01',
    name: 'Ahmad Wijaya',
    initials: 'AW',
    gender: 'L',
    age: 54,
    seat: '8A',
    phone: '+62 811-2222-3301',
    packageName: 'Umrah Akbar Oktober 2026',
    isLansia: false,
    isWheelchair: false,
    checkedIn: true,
  },
  {
    id: 'M-02',
    name: 'Budi Hartono',
    initials: 'BH',
    gender: 'L',
    age: 62,
    seat: '12C',
    phone: '+62 811-2222-3302',
    packageName: 'Umrah Akbar Oktober 2026',
    isLansia: true,
    isWheelchair: false,
    checkedIn: true,
  },
  {
    id: 'M-03',
    name: 'Bambang Sutrisno',
    initials: 'BS',
    gender: 'L',
    age: 58,
    seat: '10B',
    phone: '+62 811-2222-3303',
    packageName: 'Umrah Akbar Oktober 2026',
    isLansia: false,
    isWheelchair: false,
    checkedIn: true,
  },
  {
    id: 'M-04',
    name: 'Dewi Lestari',
    initials: 'DL',
    gender: 'P',
    age: 47,
    seat: '9D',
    phone: '+62 811-2222-3304',
    packageName: 'Umrah Akbar Oktober 2026',
    isLansia: false,
    isWheelchair: false,
    checkedIn: true,
  },
  {
    id: 'M-05',
    name: 'Hj. Aminah',
    initials: 'HA',
    gender: 'P',
    age: 68,
    seat: '14B',
    phone: '+62 811-2222-3305',
    packageName: 'Umrah Akbar Oktober 2026',
    isLansia: true,
    isWheelchair: false,
    checkedIn: true,
  },
  {
    id: 'M-06',
    name: 'Ibu Fatimah',
    initials: 'IF',
    gender: 'P',
    age: 64,
    seat: '15A',
    phone: '+62 811-2222-3306',
    packageName: 'Umrah Akbar Oktober 2026',
    isLansia: true,
    isWheelchair: false,
    checkedIn: true,
  },
  {
    id: 'M-07',
    name: 'Ibu Rina',
    initials: 'IR',
    gender: 'P',
    age: 55,
    seat: '11C',
    phone: '+62 811-2222-3307',
    packageName: 'Umrah Akbar Oktober 2026',
    isLansia: false,
    isWheelchair: true,
    checkedIn: true,
  },
  {
    id: 'M-08',
    name: 'Muhammad Fauzi',
    initials: 'MF',
    gender: 'L',
    age: 39,
    seat: '7A',
    phone: '+62 811-2222-3308',
    packageName: 'Umrah Akbar Oktober 2026',
    isLansia: false,
    isWheelchair: false,
    checkedIn: true,
  },
  {
    id: 'M-09',
    name: 'Siti Maemunah',
    initials: 'SM',
    gender: 'P',
    age: 59,
    seat: '13B',
    phone: '+62 811-2222-3309',
    packageName: 'Umrah Akbar Oktober 2026',
    isLansia: false,
    isWheelchair: false,
    checkedIn: true,
  },
  {
    id: 'M-10',
    name: 'Usman Rahmad',
    initials: 'UR',
    gender: 'L',
    age: 45,
    seat: '16C',
    phone: '+62 811-2222-3310',
    packageName: 'Umrah Akbar Oktober 2026',
    isLansia: false,
    isWheelchair: false,
    checkedIn: false,
  },
];

const initialAgendaDays: IAgendaDay[] = [
  {
    id: 'DAY-1',
    dayLabel: 'KAM',
    dateLabel: '30',
    activities: [
      { id: 'A1-1', time: '04:00', title: 'Shalat Subuh & Taqbil', location: 'Hotel Makkah', category: 'Ibadah', done: true },
      { id: 'A1-2', time: '07:30', title: 'Breakfast Hotel', location: 'Restoran Hotel', category: 'Makan', done: true },
      { id: 'A1-3', time: '09:00', title: 'Umrah Pertama - Thawaf & Sa\'i', location: 'Masjidil Haram', category: 'Ibadah', done: true },
      { id: 'A1-4', time: '13:00', title: 'Istirahat & Free Time', location: 'Hotel Makkah', category: 'Kegiatan', done: false },
      { id: 'A1-5', time: '19:00', title: 'Shalat Isya & Dinner', location: 'Masjidil Haram', category: 'Ibadah', done: false },
    ],
  },
  {
    id: 'DAY-2',
    dayLabel: 'JUM',
    dateLabel: '31',
    activities: [
      { id: 'A2-1', time: '06:00', title: 'Shalat Subuh & Dzikir', location: 'Hotel Makkah', category: 'Ibadah', done: true },
      { id: 'A2-2', time: '08:30', title: 'Ziarah Makkah', location: 'Jabal Nur / Mina', category: 'Kegiatan', done: true },
      { id: 'A2-3', time: '12:30', title: 'Shalat Jumat', location: 'Masjidil Haram', category: 'Ibadah', done: true },
      { id: 'A2-4', time: '14:00', title: 'Free Time / Belanja', location: 'Area Sekitar Hotel', category: 'Kegiatan', done: false },
      { id: 'A2-5', time: '20:00', title: 'Makan Malam', location: 'Restoran Hotel', category: 'Makan', done: false },
    ],
  },
  {
    id: 'DAY-3',
    dayLabel: 'SAB',
    dateLabel: '1',
    activities: [
      { id: 'A3-1', time: '05:00', title: 'Shalat Subuh & Doa', location: 'Hotel Makkah', category: 'Ibadah', done: true },
      { id: 'A3-2', time: '08:00', title: 'Umrah Kedua - Thawaf', location: 'Masjidil Haram', category: 'Ibadah', done: true },
      { id: 'A3-3', time: '12:00', title: 'Lunch', location: 'Restoran Hotel', category: 'Makan', done: false },
      { id: 'A3-4', time: '16:00', title: 'Shopping / Ziarah', location: 'Area Sekitar Hotel', category: 'Kegiatan', done: false },
      { id: 'A3-5', time: '21:00', title: 'Briefing Perjalanan Besok', location: 'Lobby Hotel', category: 'Umum', done: false },
    ],
  },
  {
    id: 'DAY-4',
    dayLabel: 'MIN',
    dateLabel: '2',
    activities: [
      { id: 'A4-1', time: '06:00', title: 'Keberangkatan ke Madinah', location: 'Hotel Makkah', category: 'Transportasi', done: true },
      { id: 'A4-2', time: '14:00', title: 'Tiba Madinah', location: 'Madinah', category: 'Transportasi', done: true },
      { id: 'A4-3', time: '17:00', title: 'Check-in Hotel', location: 'Swissôtel Madinah', category: 'Umum', done: false },
      { id: 'A4-4', time: '20:00', title: 'Shalat Isya & Makan Malam', location: 'Masjid Nabawi', category: 'Ibadah', done: false },
    ],
  },
  {
    id: 'DAY-5',
    dayLabel: 'SEN',
    dateLabel: '3',
    activities: [
      { id: 'A5-1', time: '05:30', title: 'Shalat Subuh & Ziarah Masjid Nabawi', location: 'Masjid Nabawi', category: 'Ibadah', done: false },
      { id: 'A5-2', time: '09:00', title: 'Raudhah & Ziarah Baqi', location: 'Masjid Nabawi', category: 'Ibadah', done: false },
      { id: 'A5-3', time: '13:00', title: 'Lunch', location: 'Restoran Hotel', category: 'Makan', done: false },
      { id: 'A5-4', time: '15:00', title: 'Free Time Madinah', location: 'Area Sekitar Hotel', category: 'Kegiatan', done: false },
      { id: 'A5-5', time: '20:30', title: 'Makan Malam & Briefing', location: 'Restoran Hotel', category: 'Umum', done: false },
    ],
  },
];

const initialPayments: IPaymentRecord[] = [
  { id: 'PAY-001', jemaahName: 'Ahmad Wijaya', packageName: 'Umrah Akbar Oktober 2026', amount: 28500000, time: '2026-10-02 09:15', status: 'SUCCESS' },
  { id: 'PAY-002', jemaahName: 'Budi Hartono', packageName: 'Umrah Akbar Oktober 2026', amount: 28500000, time: '2026-10-02 08:40', status: 'SUCCESS' },
  { id: 'PAY-003', jemaahName: 'Bambang Sutrisno', packageName: 'Umrah Akbar Oktober 2026', amount: 28500000, time: '2026-10-01 20:12', status: 'SUCCESS' },
  { id: 'PAY-004', jemaahName: 'Dewi Lestari', packageName: 'Umrah Akbar Oktober 2026', amount: 28500000, time: '2026-10-01 18:05', status: 'PENDING' },
  { id: 'PAY-005', jemaahName: 'Hj. Aminah', packageName: 'Umrah Akbar Oktober 2026', amount: 28500000, time: '2026-10-01 15:48', status: 'SUCCESS' },
  { id: 'PAY-006', jemaahName: 'Ibu Fatimah', packageName: 'Umrah Akbar Oktober 2026', amount: 28500000, time: '2026-10-01 11:30', status: 'PENDING' },
  { id: 'PAY-007', jemaahName: 'Ibu Rina', packageName: 'Umrah Akbar Oktober 2026', amount: 28500000, time: '2026-09-30 21:00', status: 'SUCCESS' },
  { id: 'PAY-008', jemaahName: 'Muhammad Fauzi', packageName: 'Umrah Akbar Oktober 2026', amount: 28500000, time: '2026-09-30 19:22', status: 'FAILED' },
  { id: 'PAY-009', jemaahName: 'Siti Maemunah', packageName: 'Umrah Akbar Oktober 2026', amount: 28500000, time: '2026-09-30 17:10', status: 'SUCCESS' },
  { id: 'PAY-010', jemaahName: 'Usman Rahmad', packageName: 'Umrah Akbar Oktober 2026', amount: 28500000, time: '2026-09-29 14:45', status: 'PENDING' },
];

const initialPackages: ITourLeaderPackage[] = [
  { id: 'PKG-TL-01', category: 'corporate-transport', name: 'Outbond', duration: '3 Hari', quotaLeft: 12, quotaTotal: 20, price: 1250000, description: 'Paket outbond tim korporasi dengan kegiatan team building.' },
  { id: 'PKG-TL-02', category: 'corporate-transport', name: 'Kunjungan Kerja', duration: 'Custom', quotaLeft: 5, quotaTotal: 10, price: 4500000, description: 'Rangkaian kunjungan kerja bisnis dengan transportasi eksklusif.' },
  { id: 'PKG-TL-03', category: 'corporate-transport', name: 'MICE', duration: '2-4 Hari', quotaLeft: 8, quotaTotal: 30, price: 7500000, description: 'Meeting, incentive, convention, dan exhibition corporate.' },
  { id: 'PKG-TL-04', category: 'corporate-transport', name: 'Sewa Unit Hiace/Bus', duration: 'Harian', quotaLeft: 3, quotaTotal: 6, price: 1500000, description: 'Sewa unit Hiace, Elf, atau Bus pariwisata lengkap dengan sopir.' },
  { id: 'PKG-TL-05', category: 'haji-umrah', name: 'Haji Khusus', duration: '40 Hari', quotaLeft: 0, quotaTotal: 50, price: 185000000, description: 'Program haji khusus dengan pembimbingan muthawwif profesional.' },
  { id: 'PKG-TL-06', category: 'haji-umrah', name: 'Haji Mandiri', duration: 'Custom', quotaLeft: 2, quotaTotal: 10, price: 155000000, description: 'Pendampingan haji mandiri sesuai kebutuhan jemaah.' },
  { id: 'PKG-TL-07', category: 'haji-umrah', name: 'Paket Umrah', duration: '9-12 Hari', quotaLeft: 7, quotaTotal: 45, price: 28500000, description: 'Paket umrah reguler maupun plus dengan hotel bintang 5.' },
  { id: 'PKG-TL-08', category: 'tour-wisata', name: 'Paket Tour', duration: '5-8 Hari', quotaLeft: 15, quotaTotal: 30, price: 18000000, description: 'Wisata halal domestik dan internasional bersama travel expert.' },
  { id: 'PKG-TL-09', category: 'visa-dokumen', name: 'Visa All Country', duration: '7-21 Hari', quotaLeft: 50, quotaTotal: 100, price: 2500000, description: 'Pengurusan visa berbagai negara dengan proses cepat.' },
  { id: 'PKG-TL-10', category: 'visa-dokumen', name: 'Dokumen Perjalanan', duration: '1-7 Hari', quotaLeft: 20, quotaTotal: 50, price: 500000, description: 'Pengurusan paspor, buku kuning, dan dokumen perjalanan lain.' },
];

const initialDocuments: IJemaahDocument[] = [
  { id: 'DOC-01', jemaahName: 'Ahmad Wijaya', docType: 'Passport', uploadedAt: '2026-08-12', status: 'VERIFIED' },
  { id: 'DOC-02', jemaahName: 'Budi Hartono', docType: 'Buku Kuning', uploadedAt: '2026-08-14', status: 'VERIFIED' },
  { id: 'DOC-03', jemaahName: 'Bambang Sutrisno', docType: 'KK', uploadedAt: '2026-08-10', status: 'PENDING REVIEW' },
  { id: 'DOC-04', jemaahName: 'Dewi Lestari', docType: 'Visa', uploadedAt: '2026-08-15', status: 'VERIFIED' },
  { id: 'DOC-05', jemaahName: 'Hj. Aminah', docType: 'Passport', uploadedAt: '2026-08-11', status: 'VERIFIED' },
  { id: 'DOC-06', jemaahName: 'Ibu Fatimah', docType: 'Buku Kuning', uploadedAt: '2026-08-13', status: 'MISSING' },
  { id: 'DOC-07', jemaahName: 'Ibu Rina', docType: 'Visa', uploadedAt: '2026-08-12', status: 'PENDING REVIEW' },
  { id: 'DOC-08', jemaahName: 'Muhammad Fauzi', docType: 'KK', uploadedAt: '2026-08-09', status: 'VERIFIED' },
];

export const useTourLeaderStore = create<TourLeaderState>()(
  persist(
    (set) => ({
      manifest: initialManifest,
      agendaDays: initialAgendaDays,
      payments: initialPayments,
      packages: initialPackages,
      documents: initialDocuments,
      profile: {
        name: 'Ustadz Reza Pahlevi',
        role: 'Senior Tour Leader',
        email: 'ustadz.reza@intantravel.com',
        phone: '+62 812-3456-7890',
        certification: 'Muthawwif Profesional BNSP',
      },
      notificationPrefs: {
        email: true,
        whatsapp: true,
        scheduleReminder: true,
      },
      tripSummary: {
        totalJamaah: 45,
        checkedIn: 9,
        lansia60plus: 3,
        wheelchair: 1,
      },
      emergency: {
        active: false,
        description: '',
      },

      checkInJemaah: (id) => {
        set((state) => ({
          manifest: state.manifest.map((jemaah) =>
            jemaah.id === id ? { ...jemaah, checkedIn: true } : jemaah
          ),
        }));
      },

      toggleActivityDone: (dayId, activityId) => {
        set((state) => ({
          agendaDays: state.agendaDays.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  activities: day.activities.map((activity) =>
                    activity.id === activityId ? { ...activity, done: !activity.done } : activity
                  ),
                }
              : day
          ),
        }));
      },

      triggerEmergency: (description) => {
        set({ emergency: { active: true, description } });
      },

      resolveEmergency: () => {
        set({ emergency: { active: false, description: '' } });
      },

      toggleNotification: (key) => {
        set((state) => ({
          notificationPrefs: { ...state.notificationPrefs, [key]: !state.notificationPrefs[key] },
        }));
      },

      updateProfile: (profile) => {
        set({ profile });
      },
    }),
    {
      name: 'tour-leader-storage',
    }
  )
);

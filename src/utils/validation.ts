import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 angka').regex(/^[0-9]+$/, 'Hanya angka'),
  email: z.string().email('Format email tidak valid'),
  service: z.string().min(1, 'Pilih layanan yang diminati'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const agenRegistrationSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  phone: z
    .string()
    .min(10, 'Nomor telepon minimal 10 angka')
    .regex(/^[0-9+]+$/, 'Hanya angka dan tanda +'),
  initialStatus: z.string().min(1, 'Pilih status awal'),
  packageId: z.string().min(1, 'Pilih paket perjalanan'),
});

export type AgenRegistrationFormData = z.infer<typeof agenRegistrationSchema>;

export const bookingFormSchema = z.object({
  customerId: z.string().min(1, 'Pelanggan wajib dipilih'),
  packageId: z.string().min(1, 'Paket wajib dipilih'),
  totalPrice: z.number({ invalid_type_error: 'Total harga wajib diisi' }).min(1, 'Total harga wajib diisi'),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
  paidAmount: z.number().optional(),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export const customerFormSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().min(1, 'Telepon wajib diisi'),
  identityNumber: z.string().length(16, 'NIK harus 16 digit'),
  passportNumber: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Tanggal lahir wajib diisi'),
  gender: z.enum(['L', 'P'], { required_error: 'Jenis kelamin wajib dipilih' }),
  address: z.string().min(1, 'Alamat wajib diisi'),
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;

export const packageFormSchema = z.object({
  name: z.string().min(1, 'Nama paket wajib diisi'),
  type: z.enum(['umroh', 'haji'], { required_error: 'Tipe wajib dipilih' }),
  price: z.number({ invalid_type_error: 'Harga wajib diisi' }).min(1, 'Harga wajib diisi'),
  duration: z.number({ invalid_type_error: 'Durasi wajib diisi' }).min(1, 'Durasi wajib diisi'),
  quota: z.number({ invalid_type_error: 'Kuota wajib diisi' }).min(1, 'Kuota wajib diisi'),
  departureDate: z.string().min(1, 'Tanggal keberangkatan wajib diisi'),
  returnDate: z.string().min(1, 'Tanggal kepulangan wajib diisi'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  imageUrl: z.string().optional(),
});

export type PackageFormData = z.infer<typeof packageFormSchema>;

const marketingPlatformEnum = z.enum(
  ['Facebook Ads', 'Google Search', 'Instagram', 'Referral', 'WhatsApp', 'Website'],
  { required_error: 'Pilih platform iklan' }
);

export const campaignFormSchema = z.object({
  name: z.string().min(3, 'Nama kampanye minimal 3 karakter'),
  platform: marketingPlatformEnum,
  status: z.enum(['Active', 'Paused'], { required_error: 'Pilih status kampanye' }),
  budget: z.coerce
    .number({ invalid_type_error: 'Anggaran wajib diisi' })
    .positive('Anggaran harus lebih dari 0'),
  spent: z.coerce
    .number({ invalid_type_error: 'Terpakai wajib diisi' })
    .nonnegative('Terpakai tidak boleh negatif'),
  conversions: z.coerce
    .number({ invalid_type_error: 'Konversi wajib diisi' })
    .nonnegative('Konversi tidak boleh negatif'),
  startDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
  endDate: z.string().min(1, 'Tanggal selesai wajib diisi'),
});

export type CampaignFormData = z.infer<typeof campaignFormSchema>;

export const leadFormSchema = z.object({
  name: z.string().min(3, 'Nama prospek minimal 3 karakter'),
  phone: z
    .string()
    .min(10, 'Nomor telepon minimal 10 karakter')
    .regex(/^[0-9+\-\s]+$/, 'Format nomor tidak valid'),
  email: z.string().email('Format email tidak valid'),
  source: marketingPlatformEnum,
  status: z.enum(['New', 'Contacted', 'Converted', 'Lost'], {
    required_error: 'Pilih status leads',
  }),
  packageInterest: z.string().min(1, 'Pilih paket yang diminati'),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const tourLeaderProfileSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  phone: z
    .string()
    .min(10, 'Nomor telepon minimal 10 karakter')
    .regex(/^[0-9+\-\s]+$/, 'Format nomor tidak valid'),
  certification: z.string().min(1, 'Sertifikasi wajib diisi'),
});

export type TourLeaderProfileFormData = z.infer<typeof tourLeaderProfileSchema>;

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

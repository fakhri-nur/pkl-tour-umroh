import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DocumentStatus = 'validated' | 'pending' | 'missing';

export interface IJemaahDocument {
  id: string;
  name: string;
  description: string;
  status: DocumentStatus;
  fileName?: string;
}

export interface ITransactionRecord {
  id: string;
  amount: number;
  date: string;
  status: 'BERHASIL' | 'PENDING';
  note: string;
}

interface JemaahState {
  documents: IJemaahDocument[];
  transactions: ITransactionRecord[];
  uploadDocument: (id: string) => void;
}

const initialDocuments: IJemaahDocument[] = [
  {
    id: 'DOC-PASPOR',
    name: 'Paspor',
    description: 'Masa Aktif Min. 7 Bulan',
    status: 'missing',
  },
  {
    id: 'DOC-KTP',
    name: 'Kartu Tanda Penduduk (KTP)',
    description: 'Sesuai data registrasi',
    status: 'validated',
    fileName: 'ktp-ahmad.pdf',
  },
  {
    id: 'DOC-KK',
    name: 'Kartu Keluarga (KK)',
    description: 'Foto/scanner terbaru',
    status: 'pending',
  },
  {
    id: 'DOC-VAKSIN',
    name: 'Sertifikat Vaksin Meningitis (Buku Kuning)',
    description: 'Vaksinasi minimal 14 hari sebelum keberangkatan',
    status: 'pending',
  },
];

const initialTransactions: ITransactionRecord[] = [
  {
    id: 'TRX-001',
    amount: 10000000,
    date: '2026-08-01',
    status: 'BERHASIL',
    note: 'Uang Muka (DP) Umrah Reguler - Paket Sakinah 9 Hari',
  },
  {
    id: 'TRX-002',
    amount: 25000000,
    date: '2026-08-04',
    status: 'PENDING',
    note: 'Transfer pelunasan - Menunggu konfirmasi bank',
  },
];

export const useJemaahStore = create<JemaahState>()(
  persist(
    (set) => ({
      documents: initialDocuments,
      transactions: initialTransactions,

      uploadDocument: (id) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id
              ? {
                  ...doc,
                  status: 'pending',
                  fileName: `unggahan-${doc.id.toLowerCase()}.pdf`,
                }
              : doc
          ),
        }));
      },
    }),
    {
      name: 'jemaah-storage',
    }
  )
);
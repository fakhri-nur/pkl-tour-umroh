import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IAuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface IAuthStore {
  user: IAuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: IAuthUser, token: string) => void;
  clearAuth: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        localStorage.setItem('auth_token', token);
        set({ user, token, isAuthenticated: true });
      },

      clearAuth: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      login: async (email: string, _password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const dummyUser: IAuthUser = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          role: email.includes('superadmin')
            ? 'Super Admin'
            : email.includes('admin')
            ? 'Administrator'
            : email.includes('marketing')
            ? 'Marketing'
            : email.includes('agen')
            ? 'Agen Cabang'
            : email.includes('keuangan')
            ? 'Keuangan'
            : email.includes('tourleader')
            ? 'Tour Leader'
            : email.includes('pembimbing')
            ? 'Pembimbing'
            : email.includes('nasabah')
            ? 'Nasabah'
            : 'User',
        };

        const dummyToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        localStorage.setItem('auth_token', dummyToken);
        set({ user: dummyUser, token: dummyToken, isAuthenticated: true });

        return { success: true, message: 'Login berhasil!' };
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

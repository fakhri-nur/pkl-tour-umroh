import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import PackagePage from '@/pages/PackagePage';
import PackagesPage from '@/pages/PackagesPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import CustomerPage from '@/pages/CustomerPage';
import BookingPage from '@/pages/BookingPage';
import MainLayout from '@/components/MainLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paket" element={<PackagesPage />} />
        <Route path="/tentang-kami" element={<AboutPage />} />
        <Route path="/kontak" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/packages"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PackagePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CustomerPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BookingPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;

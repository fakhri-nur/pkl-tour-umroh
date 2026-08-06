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
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import SuperAdminDashboard from '@/pages/super-admin/DashboardPage';
import UserRolesPage from '@/pages/super-admin/UserRolesPage';
import GlobalSettingsPage from '@/pages/super-admin/GlobalSettingsPage';
import AuditLogsPage from '@/pages/super-admin/AuditLogsPage';
import SystemHealthPage from '@/pages/super-admin/SystemHealthPage';
import AdminLayout from '@/layouts/AdminLayout';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import JemaahRecordsPage from '@/pages/admin/JemaahRecordsPage';
import PaymentsPage from '@/pages/admin/PaymentsPage';
import AdminPackagesPage from '@/pages/admin/PackagesPage';
import SchedulesPage from '@/pages/admin/SchedulesPage';
import DocumentsPage from '@/pages/admin/DocumentsPage';
import NewsPage from '@/pages/admin/NewsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import AgenLayout from '@/layouts/AgenLayout';
import AgenDashboardPage from '@/pages/agen/AgenDashboardPage';
import MyJemaahPage from '@/pages/agen/MyJemaahPage';
import AgenRegistrationPage from '@/pages/agen/AgenRegistrationPage';
import CommissionsPage from '@/pages/agen/CommissionsPage';
import AgenPackagesPage from '@/pages/agen/AgenPackagesPage';
import MaterialsPage from '@/pages/agen/MaterialsPage';
import NasabahLayout from '@/layouts/NasabahLayout';
import NasabahDashboardPage from '@/pages/jemaah/NasabahDashboardPage';
import JemaahDocumentsPage from '@/pages/jemaah/DocumentsPage';
import JemaahPaymentsPage from '@/pages/jemaah/PaymentsPage';
import ItineraryPage from '@/pages/jemaah/ItineraryPage';
import GuidesPage from '@/pages/jemaah/GuidesPage';
import ProfilePage from '@/pages/jemaah/ProfilePage';
import MarketingFinanceLayout from '@/layouts/MarketingFinanceLayout';
import MarketingDashboardPage from '@/pages/marketing/MarketingDashboardPage';
import CampaignsPage from '@/pages/marketing/CampaignsPage';
import LeadsPipelinePage from '@/pages/marketing/LeadsPipelinePage';
import AnalyticsPage from '@/pages/marketing/AnalyticsPage';
import FinancePage from '@/pages/marketing/FinancePage';
import TourLeaderLayout from '@/layouts/TourLeaderLayout';
import TourLeaderDashboardPage from '@/pages/tour-leader/TourLeaderDashboardPage';
import TourLeaderJemaahRecordsPage from '@/pages/tour-leader/JemaahRecordsPage';
import TourLeaderPaymentsPage from '@/pages/tour-leader/TourLeaderPaymentsPage';
import TourLeaderPackagesPage from '@/pages/tour-leader/TourLeaderPackagesPage';
import TourLeaderDocumentsPage from '@/pages/tour-leader/TourLeaderDocumentsPage';
import TourLeaderSettingsPage from '@/pages/tour-leader/TourLeaderSettingsPage';

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paket" element={<PackagesPage />} />
        <Route path="/tentang-kami" element={<AboutPage />} />
        <Route path="/kontak" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Super Admin Routes */}
        <Route
          path="/super-admin/dashboard"
          element={
            <ProtectedRoute>
              <SuperAdminLayout>
                <SuperAdminDashboard />
              </SuperAdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/users"
          element={
            <ProtectedRoute>
              <SuperAdminLayout>
                <UserRolesPage />
              </SuperAdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/settings"
          element={
            <ProtectedRoute>
              <SuperAdminLayout>
                <GlobalSettingsPage />
              </SuperAdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/audit"
          element={
            <ProtectedRoute>
              <SuperAdminLayout>
                <AuditLogsPage />
              </SuperAdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/health"
          element={
            <ProtectedRoute>
              <SuperAdminLayout>
                <SystemHealthPage />
              </SuperAdminLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboardPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jemaah"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <JemaahRecordsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <PaymentsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/packages"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPackagesPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/schedules"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <SchedulesPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/documents"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <DocumentsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/news"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <NewsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminSettingsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Agen Routes */}
        <Route
          path="/agen/dashboard"
          element={
            <ProtectedRoute>
              <AgenLayout>
                <AgenDashboardPage />
              </AgenLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agen/jemaah"
          element={
            <ProtectedRoute>
              <AgenLayout>
                <MyJemaahPage />
              </AgenLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agen/registrations"
          element={
            <ProtectedRoute>
              <AgenLayout>
                <AgenRegistrationPage />
              </AgenLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agen/commissions"
          element={
            <ProtectedRoute>
              <AgenLayout>
                <CommissionsPage />
              </AgenLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agen/packages"
          element={
            <ProtectedRoute>
              <AgenLayout>
                <AgenPackagesPage />
              </AgenLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agen/materials"
          element={
            <ProtectedRoute>
              <AgenLayout>
                <MaterialsPage />
              </AgenLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Nasabah / Jamaah Routes */}
        <Route
          path="/jemaah/dashboard"
          element={
            <ProtectedRoute>
              <NasabahLayout>
                <NasabahDashboardPage />
              </NasabahLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jemaah/documents"
          element={
            <ProtectedRoute>
              <NasabahLayout>
                <JemaahDocumentsPage />
              </NasabahLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jemaah/payments"
          element={
            <ProtectedRoute>
              <NasabahLayout>
                <JemaahPaymentsPage />
              </NasabahLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jemaah/itinerary"
          element={
            <ProtectedRoute>
              <NasabahLayout>
                <ItineraryPage />
              </NasabahLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jemaah/guides"
          element={
            <ProtectedRoute>
              <NasabahLayout>
                <GuidesPage />
              </NasabahLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jemaah/profile"
          element={
            <ProtectedRoute>
              <NasabahLayout>
                <ProfilePage />
              </NasabahLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Marketing & Keuangan Routes */}
        <Route
          path="/marketing/dashboard"
          element={
            <ProtectedRoute>
              <MarketingFinanceLayout>
                <MarketingDashboardPage />
              </MarketingFinanceLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketing/campaigns"
          element={
            <ProtectedRoute>
              <MarketingFinanceLayout>
                <CampaignsPage />
              </MarketingFinanceLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketing/leads"
          element={
            <ProtectedRoute>
              <MarketingFinanceLayout>
                <LeadsPipelinePage />
              </MarketingFinanceLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketing/analytics"
          element={
            <ProtectedRoute>
              <MarketingFinanceLayout>
                <AnalyticsPage />
              </MarketingFinanceLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketing/finance"
          element={
            <ProtectedRoute>
              <MarketingFinanceLayout>
                <FinancePage />
              </MarketingFinanceLayout>
            </ProtectedRoute>
          }
        />

        {/* Tour Leader & Pembimbing Routes */}
        <Route
          path="/tour-leader/dashboard"
          element={
            <ProtectedRoute>
              <TourLeaderLayout>
                <TourLeaderDashboardPage />
              </TourLeaderLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tour-leader/jemaah"
          element={
            <ProtectedRoute>
              <TourLeaderLayout>
                <TourLeaderJemaahRecordsPage />
              </TourLeaderLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tour-leader/payments"
          element={
            <ProtectedRoute>
              <TourLeaderLayout>
                <TourLeaderPaymentsPage />
              </TourLeaderLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tour-leader/packages"
          element={
            <ProtectedRoute>
              <TourLeaderLayout>
                <TourLeaderPackagesPage />
              </TourLeaderLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tour-leader/documents"
          element={
            <ProtectedRoute>
              <TourLeaderLayout>
                <TourLeaderDocumentsPage />
              </TourLeaderLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tour-leader/settings"
          element={
            <ProtectedRoute>
              <TourLeaderLayout>
                <TourLeaderSettingsPage />
              </TourLeaderLayout>
            </ProtectedRoute>
          }
        />

        {/* Default Dashboard Routes */}
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

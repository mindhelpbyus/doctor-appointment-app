import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { 
  HomePage, 
  NotFound, 
  SearchPage, 
  LoginPage, 
  RegisterPage, 
  AppointmentsPage, 
  AgencyPage, 
  DoctorProfilePage, 
  AdminPage, 
  BookingPage,
  ProviderLoginPage,
  AgencyDashboardPage,
  PatientDashboardPage,
  ProviderOnboardingPage,
  MessagesPage,
  DoctorDashboardPage,
  AgenciesPage,
  AboutUsPage,
  ContactPage,
  SchedulingFeaturePage,
  PaymentsFeaturePage,
  MarketingFeaturePage,
  ReportingFeaturePage,
  StaffManagementFeaturePage,
} from "./pages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Routes that use the MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="provider-login" element={<ProviderLoginPage />} />
            <Route path="onboard-provider" element={<ProviderOnboardingPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="a/:agencySlug/*" element={<AgencyPage />} />
            <Route path="doctor/:doctorId" element={<DoctorProfilePage />} />
            <Route path="book/:doctorId" element={<BookingPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:conversationId" element={<MessagesPage />} />
            <Route path="agencies" element={<AgenciesPage />} />
            <Route path="about" element={<AboutUsPage />} />
            <Route path="contact" element={<ContactPage />} />
            {/* New Feature Pages */}
            <Route path="features/scheduling" element={<SchedulingFeaturePage />} />
            <Route path="features/payments" element={<PaymentsFeaturePage />} />
            <Route path="features/marketing" element={<MarketingFeaturePage />} />
            <Route path="features/reporting" element={<ReportingFeaturePage />} />
            <Route path="features/staff-management" element={<StaffManagementFeaturePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Dashboard routes that manage their own layout/header */}
          <Route path="dashboard" element={<PatientDashboardPage />} />
          <Route path="dashboard/messages/:conversationId" element={<PatientDashboardPage />} />
          <Route path="agency-dashboard/:agencyId" element={<AgencyDashboardPage />} />
          <Route path="doctor-dashboard" element={<DoctorDashboardPage />} />
          <Route path="doctor-dashboard/messages/:conversationId" element={<DoctorDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
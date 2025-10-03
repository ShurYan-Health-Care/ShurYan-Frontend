import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorSearchPage from './pages/doctor/DoctorSearchPage';
import DoctorDetailsPage from './pages/doctor/DoctorDetailsPage';
import PatientAppointmentsPage from './pages/patient/PatientAppointmentsPage';
import DoctorAppointmentsPage from './pages/doctor/DoctorAppointmentsPage';
import PatientPrescriptionsPage from './pages/patient/PatientPrescriptionsPage';
import DoctorPrescriptionsPage from './pages/doctor/DoctorPrescriptionsPage';
import PatientProfilePage from './pages/patient/PatientProfilePage';
import DoctorProfilePageWithSidebar from './pages/doctor/DoctorProfilePageWithSidebar';
import DoctorPatientsPage from './pages/doctor/DoctorPatientsPage';
import DoctorReviewsPage from './pages/doctor/DoctorReviewsPage';
import DoctorReportsPage from './pages/doctor/DoctorReportsPage';
import MedicationOrderPage from './pages/MedicationOrderPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import './theme.css'; // Import our new global theme

// Component to conditionally render Header based on current route
const ConditionalHeader = () => {
  const location = useLocation();
  
  // Don't show header on homepage, login page, register page
  // Doctor dashboard and profile pages now have their own navbar
  if (location.pathname === '/' || 
      location.pathname === '/login' || 
      location.pathname === '/register' ||
      location.pathname === '/doctor/dashboard' ||
      location.pathname === '/doctor/profile') {
    return null;
  }
  
  return <Header />;
};

// Component to conditionally apply padding and background based on current route
const ConditionalMain = ({ children }) => {
  const location = useLocation();
  
  // Don't apply top padding on homepage since it has its own navbar
  // Doctor dashboard and profile pages have their own navbar with fixed positioning
  const mainClasses = location.pathname === '/' 
    ? "flex-grow overflow-x-hidden max-w-full" 
    : "flex-grow overflow-x-hidden max-w-full pt-16"; // Reduced padding since we fixed the navbar height
    
  // Use light background for doctor pages, dark background for others
  const backgroundColor = location.pathname.startsWith('/doctor/') 
    ? "bg-[#f8fafc]"  // Light background for doctor pages
    : "bg-[#0f172a]"; // Dark background for other pages
  
  return <main className={`${mainClasses} ${backgroundColor}`}>{children}</main>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0f172a] flex flex-col overflow-x-hidden max-w-full">
          <ConditionalHeader />
          <ConditionalMain>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              {/* Redirect /doctor to /doctor/dashboard */}
              <Route 
                path="/doctor" 
                element={<Navigate to="/doctor/dashboard" replace />}
              />
              <Route 
                path="/doctor/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <PatientDashboard />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/appointments" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <DoctorAppointmentsPage />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/appointments" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <PatientAppointmentsPage />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/prescriptions" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <DoctorPrescriptionsPage />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/prescriptions" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <PatientPrescriptionsPage />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/profile" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <PatientProfilePage />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/profile" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <DoctorProfilePageWithSidebar />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/patients" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <DoctorPatientsPage />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/reviews" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <DoctorReviewsPage />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/reports" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <DoctorReportsPage />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/order-medication" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix">
                      <MedicationOrderPage />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route path="/search" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix"><DoctorSearchPage /></div>} />
              <Route path="/doctor/:id" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 container-fix"><DoctorDetailsPage /></div>} />
            </Routes>
          </ConditionalMain>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
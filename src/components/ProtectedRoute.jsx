import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">جاري التحقق من البيانات...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Check if doctor has completed profile
  if (currentUser.role === 'doctor') {
    // Check localStorage for doctorProfile completion
    const doctorProfile = localStorage.getItem('doctorProfile');
    // Allow access to profile page for doctors who haven't completed their profile
    if (!doctorProfile && window.location.pathname !== '/doctor/profile') {
      // For any other route, redirect to dashboard if profile is not completed
      // But don't redirect if we're already on the dashboard
      if (window.location.pathname !== '/doctor/dashboard') {
        return <Navigate to="/doctor/dashboard" />;
      }
    }
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to appropriate dashboard based on user role
    return <Navigate to={currentUser.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'} />;
  }

  return children;
};

export default ProtectedRoute;
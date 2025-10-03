import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import DoctorDashboard from '../DoctorDashboard';

// Mock the useAuth hook
jest.mock('../../../context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: {
      id: 'doctor1',
      firstName: 'أحمد',
      lastName: 'محمد',
      role: 'doctor',
      profileCompleted: false
    }
  })
}));

// Mock the Button component
jest.mock('../../../components/Button', () => {
  return function MockButton({ children, onClick, variant }) {
    return (
      <button 
        onClick={onClick} 
        data-variant={variant}
      >
        {children}
      </button>
    );
  };
});

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaCalendarAlt: () => <div>Calendar Icon</div>,
  FaPrescription: () => <div>Prescription Icon</div>,
  FaUserMd: () => <div>User Icon</div>,
  FaUserInjured: () => <div>Patient Icon</div>,
  FaStethoscope: () => <div>Stethoscope Icon</div>,
  FaClipboardList: () => <div>Clipboard Icon</div>,
  FaExclamationTriangle: () => <div>Warning Icon</div>
}));

describe('DoctorDashboard Warning Banner', () => {
  test('shows warning banner for doctors with incomplete profiles', () => {
    render(
      <BrowserRouter>
        <DoctorDashboard />
      </BrowserRouter>
    );

    // Check that the warning banner is rendered
    expect(screen.getByText('⚠️ لا يمكنك استخدام المنصة حتى تكمل معلومات ملفك الشخصي.')).toBeInTheDocument();
    
    // Check that the "Complete Profile" button is rendered
    expect(screen.getByText('إكمال الملف')).toBeInTheDocument();
    
    // Check that the welcome message is rendered
    expect(screen.getByText('مرحباً، دكتور أحمد محمد')).toBeInTheDocument();
  });
});
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

// Mock the ProfileCompletionModal component
jest.mock('../../../components/ProfileCompletionModal', () => {
  return function MockProfileCompletionModal() {
    return <div data-testid="profile-completion-modal">Profile Completion Modal</div>;
  };
});

// Mock the Button component
jest.mock('../../../components/Button', () => {
  return function MockButton({ children }) {
    return <div>{children}</div>;
  };
});

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaCalendarAlt: () => <div>Calendar Icon</div>,
  FaPrescription: () => <div>Prescription Icon</div>,
  FaUserMd: () => <div>User Icon</div>,
  FaUserInjured: () => <div>Patient Icon</div>,
  FaStethoscope: () => <div>Stethoscope Icon</div>,
  FaClipboardList: () => <div>Clipboard Icon</div>
}));

describe('DoctorDashboard', () => {
  test('shows profile completion modal for doctors with incomplete profiles', () => {
    render(
      <BrowserRouter>
        <DoctorDashboard />
      </BrowserRouter>
    );

    // Check that the profile completion modal is rendered
    expect(screen.getByTestId('profile-completion-modal')).toBeInTheDocument();
    
    // Check that the welcome message is rendered
    expect(screen.getByText('مرحباً، دكتور أحمد محمد')).toBeInTheDocument();
  });
});
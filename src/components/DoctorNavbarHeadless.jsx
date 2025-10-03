import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaSignOutAlt, FaHome, FaCalendarAlt, FaPrescription, FaUserInjured, FaCog, FaExclamationTriangle, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DoctorNavbarHeadless = () => {
  const { logout, currentUser } = useAuth();
  const [showProfileWarning, setShowProfileWarning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check profile completion status
  useEffect(() => {
    if (currentUser && currentUser.role === 'doctor') {
      const doctorProfile = localStorage.getItem('doctorProfile');
      setShowProfileWarning(!doctorProfile);
    }
  }, [currentUser]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate('/login');
  };

  const handleCompleteProfile = () => {
    setProfileMenuOpen(false);
    navigate('/doctor/profile');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setProfileMenuOpen(!profileMenuOpen);
  };

  const navigation = [
    { name: 'الرئيسية', href: '/', icon: <FaHome className="ml-2" /> },
    { name: 'المواعيد', href: '/doctor/appointments', icon: <FaCalendarAlt className="ml-2" /> },
    { name: 'الروشتات', href: '/doctor/prescriptions', icon: <FaPrescription className="ml-2" /> },
    { name: 'المرضى', href: '/doctor/patients', icon: <FaUserInjured className="ml-2" /> },
  ];

  return (
    <nav className="bg-white shadow-sm w-full z-50 h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Mobile menu button - hidden on large screens and visible only on small screens */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => navigate('/')} 
              className="text-2xl font-bold text-[#1ebdb2] bg-transparent border-none cursor-pointer"
            >
              شُريان
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 md:space-x-reverse">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`transition-colors flex items-center py-1 px-4 rounded bg-transparent border-none cursor-pointer ${
                  location.pathname === item.href
                    ? 'text-[#1ebdb2] font-medium'
                    : 'text-gray-600 hover:text-[#1ebdb2]'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>

          {/* Right side - Profile and Warning */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {showProfileWarning && (
              <button
                onClick={handleCompleteProfile}
                className="hidden md:flex items-center bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg transition-colors border-none cursor-pointer"
              >
                <FaExclamationTriangle className="ml-2" />
                <span>إكمال الملف الشخصي</span>
              </button>
            )}

            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button 
                className="flex items-center space-x-2 space-x-reverse focus:outline-none cursor-pointer"
                onClick={toggleProfileMenu}
              >
                <div className="h-10 w-10 rounded-full bg-[#f0f9f8] flex items-center justify-center">
                  <FaUser className="text-[#1ebdb2]" />
                </div>
              </button>

              {profileMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <button
                    onClick={handleCompleteProfile}
                    className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-end"
                  >
                    <FaUser className="ml-2" />
                    الملف الشخصي
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate('/doctor/settings');
                    }}
                    className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-end"
                  >
                    <FaCog className="ml-2" />
                    الإعدادات
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-end"
                  >
                    <FaSignOutAlt className="ml-2" />
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center text-base font-medium w-full text-right px-3 py-2 rounded ${
                  location.pathname === item.href
                    ? 'text-[#1ebdb2] font-medium'
                    : 'text-gray-600 hover:text-[#1ebdb2]'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
            {showProfileWarning && (
              <button
                onClick={() => {
                  handleCompleteProfile();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full text-base font-medium text-yellow-800 bg-yellow-100 hover:bg-yellow-200 px-3 py-2 rounded-lg"
              >
                <FaExclamationTriangle className="ml-2" />
                إكمال الملف الشخصي
              </button>
            )}
            <div className="border-t border-gray-200 pt-2">
              <button
                onClick={() => {
                  handleCompleteProfile();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full text-base font-medium text-gray-900 px-3 py-2"
              >
                <FaUser className="ml-2" />
                الملف الشخصي
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/doctor/settings');
                }}
                className="flex items-center w-full text-base font-medium text-gray-900 px-3 py-2"
              >
                <FaCog className="ml-2" />
                الإعدادات
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full text-base font-medium text-gray-900 px-3 py-2"
              >
                <FaSignOutAlt className="ml-2" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DoctorNavbarHeadless;
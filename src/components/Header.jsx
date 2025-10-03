import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Logo.jpg';
import { FaUser, FaSignOutAlt, FaHome, FaSearch, FaCalendarAlt, FaPrescription, FaUserInjured, FaBars, FaTimes, FaCog } from 'react-icons/fa';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setProfileMenuOpen(!profileMenuOpen);
  };

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

  // Close dropdown when pressing escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold text-[#1ebdb2] flex items-center group">
              <img src={logo} alt="Shuryan Logo" className="w-12 h-12 object-contain mr-3 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">شُريان</span>
            </Link>
          </div>

          {currentUser ? (
            <div className="flex items-center space-x-6">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-4">
                <Link to="/" className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-[#f0f9f8]">
                  <FaHome className="mr-2 text-lg" />
                  <span>الرئيسية</span>
                </Link>
                
                {currentUser.role === 'patient' && (
                  <>
                    <Link to="/search" className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-[#f0f9f8]">
                      <FaSearch className="mr-2 text-lg" />
                      <span>البحث</span>
                    </Link>
                    <Link to="/patient/appointments" className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-[#f0f9f8]">
                      <FaCalendarAlt className="mr-2 text-lg" />
                      <span>المواعيد</span>
                    </Link>
                    <Link to="/patient/prescriptions" className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-[#f0f9f8]">
                      <FaPrescription className="mr-2 text-lg" />
                      <span>الروشتات</span>
                    </Link>
                  </>
                )}
                
                {currentUser.role === 'doctor' && (
                  <>
                    <Link to="/doctor/appointments" className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-[#f0f9f8]">
                      <FaCalendarAlt className="mr-2 text-lg" />
                      <span>المواعيد</span>
                    </Link>
                    <Link to="/doctor/prescriptions" className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-[#f0f9f8]">
                      <FaPrescription className="mr-2 text-lg" />
                      <span>الروشتات</span>
                    </Link>
                    <Link to="/doctor/patients" className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-[#f0f9f8]">
                      <FaUserInjured className="mr-2 text-lg" />
                      <span>المرضى</span>
                    </Link>
                  </>
                )}
              </nav>

              {/* Mobile menu button */}
              <button 
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>

              {/* Profile dropdown */}
              <div className="relative" ref={profileMenuRef}>
                <button 
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 bg-[#f0f9f8] rounded-full p-2 hover:bg-[#d1eeeb] transition-all duration-300 transform hover:scale-105 shadow-md focus:outline-none"
                >
                  <FaUser className="text-[#1ebdb2] text-lg" />
                  <span className="hidden md:inline text-[#1ebdb2] font-semibold text-sm mr-1">{currentUser.firstName}</span>
                </button>
                
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 transform transition-all duration-300 ease-out">
                    <Link 
                      to={currentUser.role === 'patient' ? '/patient/profile' : '/doctor/profile'} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1ebdb2] transition-colors flex items-center"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <FaCog className="mr-2 text-sm flex-shrink-0 text-[#1ebdb2]" />
                      <span className="truncate">الإعدادات</span>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ef4444] transition-colors flex items-center"
                    >
                      <FaSignOutAlt className="mr-2 text-sm flex-shrink-0 text-[#ef4444]" />
                      <span className="truncate">تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="px-5 py-2 text-sm font-semibold text-[#1ebdb2] hover:text-[#14716a] transition-all duration-300 border border-[#1ebdb2] rounded-lg hover:bg-[#1ebdb2] hover:text-white">
                تسجيل الدخول
              </Link>
              <Link to="/register" className="px-5 py-2 text-sm font-semibold text-white bg-[#1ebdb2] rounded-lg hover:bg-[#14716a] transition-all duration-300 shadow-lg transform hover:scale-105">
                إنشاء حساب
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && currentUser && (
          <nav className="lg:hidden mt-4 pb-4 space-y-2">
            <Link 
              to="/" 
              className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-[#f0f9f8] w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHome className="mr-3 text-lg" />
              <span>الرئيسية</span>
            </Link>
            
            {currentUser.role === 'patient' && (
              <>
                <Link 
                  to="/search" 
                  className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-[#f0f9f8] w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaSearch className="mr-3 text-lg" />
                  <span>البحث</span>
                </Link>
                <Link 
                  to="/patient/appointments" 
                  className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-[#f0f9f8] w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaCalendarAlt className="mr-3 text-lg" />
                  <span>المواعيد</span>
                </Link>
                <Link 
                  to="/patient/prescriptions" 
                  className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-[#f0f9f8] w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaPrescription className="mr-3 text-lg" />
                  <span>الروشتات</span>
                </Link>
              </>
            )}
            
            {currentUser.role === 'doctor' && (
              <>
                <Link 
                  to="/doctor/appointments" 
                  className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-[#f0f9f8] w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaCalendarAlt className="mr-3 text-lg" />
                  <span>المواعيد</span>
                </Link>
                <Link 
                  to="/doctor/prescriptions" 
                  className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-[#f0f9f8] w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaPrescription className="mr-3 text-lg" />
                  <span>الروشتات</span>
                </Link>
                <Link 
                  to="/doctor/patients" 
                  className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-[#f0f9f8] w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUserInjured className="mr-3 text-lg" />
                  <span>المرضى</span>
                </Link>
              </>
            )}
            
            {/* Settings link in mobile menu */}
            <Link 
              to={currentUser.role === 'patient' ? '/patient/profile' : '/doctor/profile'} 
              className="flex items-center text-gray-700 hover:text-[#1ebdb2] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-[#f0f9f8] w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaCog className="mr-3 text-lg" />
              <span>الإعدادات</span>
            </Link>
            
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center text-gray-700 hover:text-[#ef4444] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-gray-100 w-full text-right"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              <span>تسجيل الخروج</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
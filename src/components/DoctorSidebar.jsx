import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaSignOutAlt, FaHome, FaCalendarAlt, FaPrescription, FaUserInjured, FaCog, FaExclamationTriangle, FaBars, FaTimes, FaStethoscope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DoctorSidebar = () => {
  const { logout, currentUser } = useAuth();
  const [showProfileWarning, setShowProfileWarning] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setProfileMenuOpen(!profileMenuOpen);
  };

  const navigation = [
    { name: 'الرئيسية', href: '/doctor/dashboard', icon: <FaHome className="text-xl" /> },
    { name: 'المواعيد', href: '/doctor/appointments', icon: <FaCalendarAlt className="text-xl" /> },
    { name: 'الروشتات', href: '/doctor/prescriptions', icon: <FaPrescription className="text-xl" /> },
    { name: 'المرضى', href: '/doctor/patients', icon: <FaUserInjured className="text-xl" /> },
    { name: 'التقييمات', href: '/doctor/reviews', icon: <FaStethoscope className="text-xl" /> },
  ];

  return (
    <>
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between p-4 border-b border-gray-200 ${collapsed ? 'justify-center' : ''}`}>
            {!collapsed && (
              <button 
                onClick={() => navigate('/')} 
                className="text-2xl font-bold text-[#1ebdb2] bg-transparent border-none cursor-pointer"
              >
                شُريان
              </button>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            >
              {collapsed ? <FaBars className="text-xl" /> : <FaTimes className="text-xl" />}
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center rounded-lg px-4 py-3 text-right transition-colors ${
                    location.pathname === item.href
                      ? 'bg-[#e6f7f5] text-[#1ebdb2] font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${collapsed ? 'justify-center' : 'justify-start'}`}
                >
                  <span className={collapsed ? '' : 'ml-3'}>
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.name}</span>}
                </button>
              ))}
            </nav>
          </div>

          {/* Profile Warning */}
          {showProfileWarning && (
            <div className={`px-4 mb-4 ${collapsed ? 'text-center' : ''}`}>
              <button
                onClick={handleCompleteProfile}
                className={`flex items-center w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-3 rounded-lg transition-colors border-none cursor-pointer ${
                  collapsed ? 'justify-center' : 'justify-start'
                }`}
              >
                <FaExclamationTriangle className={collapsed ? 'text-xl' : 'text-xl ml-3'} />
                {!collapsed && <span>إكمال الملف الشخصي</span>}
              </button>
            </div>
          )}

          {/* Profile Section */}
          <div className={`p-4 border-t border-gray-200 ${collapsed ? 'text-center' : ''}`}>
            <div className="relative" ref={profileMenuRef}>
              <button 
                className="flex items-center w-full focus:outline-none cursor-pointer"
                onClick={toggleProfileMenu}
              >
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-[#f0f9f8] flex items-center justify-center">
                    <FaUser className="text-[#1ebdb2]" />
                  </div>
                </div>
                {!collapsed && (
                  <div className="mr-3 text-right flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      دكتور {currentUser?.firstName} {currentUser?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">الطبيب</p>
                  </div>
                )}
              </button>

              {profileMenuOpen && !collapsed && (
                <div className="absolute bottom-full right-0 mb-2 w-48 origin-bottom-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
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

      {/* Overlay for mobile - only show when sidebar is expanded on mobile */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default DoctorSidebar;
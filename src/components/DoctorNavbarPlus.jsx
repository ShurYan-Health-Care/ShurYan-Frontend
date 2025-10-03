import React, { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, UserIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DoctorNavbarPlus = () => {
  const { logout, currentUser } = useAuth();
  const [showProfileWarning, setShowProfileWarning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check profile completion status
  useEffect(() => {
    if (currentUser && currentUser.role === 'doctor') {
      const doctorProfile = localStorage.getItem('doctorProfile');
      setShowProfileWarning(!doctorProfile);
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCompleteProfile = () => {
    navigate('/doctor/profile');
  };

  const navigation = [
    { name: 'الرئيسية', href: '/doctor/dashboard', current: location.pathname === '/doctor/dashboard' },
    { name: 'المرضى', href: '/doctor/patients', current: location.pathname === '/doctor/patients' },
    { name: 'المواعيد', href: '/doctor/appointments', current: location.pathname === '/doctor/appointments' },
    { name: 'التقييمات', href: '/doctor/reviews', current: location.pathname === '/doctor/reviews' },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Left side - Brand name */}
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')} 
              className="text-3xl font-bold text-[#1ebdb2] bg-transparent border-none cursor-pointer"
            >
              شُريان
            </button>
          </div>

          {/* Center - Navigation items */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-[#f0f9f8] text-[#1ebdb2] font-medium' : 'text-gray-700 hover:bg-[#f0f9f8] hover:text-[#1ebdb2]',
                    'rounded-md px-4 py-3 text-base font-medium border-none bg-transparent cursor-pointer'
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Profile and Notifications */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="relative rounded-full p-2 text-gray-700 hover:text-[#1ebdb2] focus:outline-none focus:ring-2 focus:ring-[#1ebdb2] focus:ring-offset-2"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-[#1ebdb2] focus:ring-offset-2">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <div className="size-10 rounded-full bg-[#f0f9f8] flex items-center justify-center">
                  <UserIcon className="text-[#1ebdb2] size-6" />
                </div>
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
              >
                <MenuItem>
                  <button
                    onClick={handleCompleteProfile}
                    className="block w-full text-right px-4 py-3 text-base text-gray-700 data-[focus]:bg-[#f0f9f8] data-[focus]:text-[#1ebdb2] data-[focus]:outline-hidden flex items-center justify-end border-none bg-transparent cursor-pointer"
                  >
                    <UserIcon className="ml-2 size-5" />
                    الملف الشخصي
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => navigate('/doctor/settings')}
                    className="block w-full text-right px-4 py-3 text-base text-gray-700 data-[focus]:bg-[#f0f9f8] data-[focus]:text-[#1ebdb2] data-[focus]:outline-hidden flex items-center justify-end border-none bg-transparent cursor-pointer"
                  >
                    <Cog6ToothIcon className="ml-2 size-5" />
                    الإعدادات
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-right px-4 py-3 text-base text-gray-700 data-[focus]:bg-[#f0f9f8] data-[focus]:text-[#1ebdb2] data-[focus]:outline-hidden flex items-center justify-end border-none bg-transparent cursor-pointer"
                  >
                    <ArrowRightOnRectangleIcon className="ml-2 size-5" />
                    تسجيل الخروج
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-3 pb-4">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="button"
              onClick={() => navigate(item.href)}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-[#f0f9f8] text-[#1ebdb2] font-medium' : 'text-gray-700 hover:bg-[#f0f9f8] hover:text-[#1ebdb2]',
                'block rounded-md px-4 py-3 text-base font-medium w-full text-right'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          
          {showProfileWarning && (
            <DisclosureButton
              as="button"
              onClick={handleCompleteProfile}
              className="flex items-center w-full text-base font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-4 py-3 rounded-md justify-end"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-2 size-5">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
              إكمال الملف الشخصي
            </DisclosureButton>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default DoctorNavbarPlus;
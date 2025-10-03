import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
import Button from '../../components/Button';
import { FaCalendarAlt, FaPrescription, FaUserMd, FaUserInjured, FaStethoscope, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';

const DoctorDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showWarningBanner, setShowWarningBanner] = useState(false);
  const [showReviewBanner, setShowReviewBanner] = useState(false);

  // Check if doctor has completed profile on first load
  useEffect(() => {
    if (currentUser && currentUser.role === 'doctor') {
      // Check profile completion status from localStorage
      const doctorProfile = localStorage.getItem('doctorProfile');
      if (doctorProfile) {
        try {
          const profileData = JSON.parse(doctorProfile);
          
          // Check if all required sections are completed
          const isPersonalComplete = profileData.firstName && profileData.lastName && profileData.email && profileData.phone;
          const isProfessionalComplete = profileData.specialty && profileData.experience && profileData.education &&
            profileData.nationalIdPhoto && profileData.medicalLicensePhoto && 
            profileData.syndicateMembershipPhoto && profileData.graduationCertificatePhoto;
          const isClinicComplete = profileData.clinicName;
          
          // Show review message if all sections are completed, otherwise show warning
          if (isPersonalComplete && isProfessionalComplete && isClinicComplete) {
            setShowWarningBanner(false); // Hide warning
            setShowReviewBanner(true);   // Show review message
          } else {
            setShowWarningBanner(true);  // Show warning
            setShowReviewBanner(false);  // Hide review message
          }
        } catch (error) {
          console.error('Error parsing profile data:', error);
          setShowWarningBanner(true);
          setShowReviewBanner(false);
        }
      } else {
        setShowWarningBanner(true);
        setShowReviewBanner(false);
      }
    }
  }, [currentUser]);

  const handleCompleteProfile = () => {
    navigate('/doctor/profile');
  };

  const features = [
    {
      title: 'المرضى',
      description: 'إدارة ملفات المرضى',
      icon: <FaUserInjured className="text-primary text-xl" />,
      link: '/doctor/patients',
      color: 'bg-purple-50'
    },
    {
      title: 'المواعيد',
      description: 'إدارة المواعيد المحجوزة',
      icon: <FaCalendarAlt className="text-primary text-xl" />,
      link: '/doctor/appointments',
      color: 'bg-blue-50'
    },
    {
      title: 'الروشتات',
      description: 'كتابة وإدارة الروشتات الطبية',
      icon: <FaPrescription className="text-primary text-xl" />,
      link: '/doctor/prescriptions',
      color: 'bg-green-50'
    },
    {
      title: 'التقييمات',
      description: 'عرض تقييمات المرضى',
      icon: <FaStethoscope className="text-primary text-xl" />,
      link: '/doctor/reviews',
      color: 'bg-pink-50'
    },
    {
      title: 'الملف الشخصي',
      description: 'إدارة معلوماتك المهنية',
      icon: <FaUserMd className="text-primary text-xl" />,
      link: '/doctor/profile',
      color: 'bg-yellow-50'
    }
  ];

  // Updated stats to show 0 for new doctors
  const stats = [
    { value: '0', label: 'مواعيد اليوم', color: 'text-blue-600', bg: 'bg-blue-100' },
    { value: '0', label: 'مواعيد هذا الأسبوع', color: 'text-green-600', bg: 'bg-green-100' },
    { value: '0', label: 'المرضى المسجلون', color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorNavbarPlus />
      <div className="pt-16">
        {/* Warning Banner */}
        {showWarningBanner && (
          <div className="max-w-4xl mx-auto bg-gradient-to-l from-amber-50 to-yellow-50 border-r-4 border-amber-400 p-5 mb-6 shadow-sm rounded-lg mx-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <FaExclamationTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div className="mr-4">
                  <p className="text-base font-medium text-amber-800 text-center md:text-right">
                    لا يمكنك استخدام المنصة حتى تكمل معلومات ملفك الشخصي.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  type="button" 
                  className="rounded-lg font-medium px-5 py-2.5 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-300 transform hover:scale-105 shadow-sm"
                  onClick={handleCompleteProfile}
                >
                  إكمال الملف
                </button>
                <button 
                  type="button" 
                  className="rounded-full p-2 text-amber-500 hover:text-amber-700 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors"
                  onClick={() => setShowWarningBanner(false)}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Profile Review Banner */}
        {showReviewBanner && (
          <div className="max-w-4xl mx-auto bg-gradient-to-l from-blue-50 to-indigo-50 border-r-4 border-blue-400 p-5 mb-6 shadow-sm rounded-lg mx-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <FaExclamationTriangle className="h-6 w-6 text-blue-500" />
                </div>
                <div className="mr-4">
                  <p className="text-base font-medium text-blue-800 text-center md:text-right">
                    طلبك الآن قيد المراجعة من الإدارة وسيتم التحقق من المعلومات خلال 3 إلى 5 أيام عمل
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto pt-6 px-4">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  مرحباً، دكتور {currentUser?.firstName} {currentUser?.lastName}
                </h1>
                <p className="text-gray-600">مرحباً بك في لوحة تحكم الطبيب الخاصة بك</p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUserMd className="text-blue-600 text-2xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {features.map((feature, index) => (
              <button 
                key={index} 
                onClick={() => navigate(feature.link)} 
                className="group bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full text-left w-full"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ملخص النشاط</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="border border-gray-100 rounded-2xl p-6 text-center hover:shadow-sm transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bg} rounded-full mb-4`}>
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
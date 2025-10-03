import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import { FaSearch, FaCalendarAlt, FaPrescription, FaUserMd, FaHeart, FaCapsules, FaUserInjured } from 'react-icons/fa';

const PatientDashboard = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      title: 'البحث عن الأطباء',
      description: 'ابحث عن أفضل الأطباء بالقرب منك',
      icon: <FaSearch className="text-primary text-xl" />,
      link: '/search',
      color: 'bg-blue-50'
    },
    {
      title: 'المواعيد',
      description: 'إدارة مواعيدك المحجوزة',
      icon: <FaCalendarAlt className="text-primary text-xl" />,
      link: '/patient/appointments',
      color: 'bg-green-50'
    },
    {
      title: 'الروشتات',
      description: 'عرض الروشتات الطبية السابقة',
      icon: <FaPrescription className="text-primary text-xl" />,
      link: '/patient/prescriptions',
      color: 'bg-purple-50'
    },
    {
      title: 'طلب الأدوية',
      description: 'اطلب أدويتك أونلاين وتوصيلها إلى منزلك',
      icon: <FaCapsules className="text-primary text-xl" />,
      link: '/patient/order-medication',
      color: 'bg-yellow-50'
    },
    {
      title: 'الملف الشخصي',
      description: 'إدارة معلوماتك الشخصية',
      icon: <FaUserMd className="text-primary text-xl" />,
      link: '/patient/profile',
      color: 'bg-pink-50'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'ابحث عن طبيب',
      description: 'ابحث عن الطبيب المناسب لك باستخدام معايير البحث المتقدمة',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      number: '2',
      title: 'احجز موعد',
      description: 'اختر الوقت المناسب لك واحجز موعدك مع الطبيب',
      color: 'bg-green-100 text-green-600'
    },
    {
      number: '3',
      title: 'احصل على الكشف',
      description: 'توجه إلى موعدك واحصل على الكشف الطبي',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      number: '4',
      title: 'احصل على الروشتة',
      description: 'احصل على الروشتة الرقمية من الطبيب',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      number: '5',
      title: 'اطلب الدواء',
      description: 'اطلب أدويتك أونلاين واحصل عليها توصيل إلى باب منزلك',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                مرحباً، {currentUser?.firstName} {currentUser?.lastName}
              </h1>
              <p className="text-gray-600">مرحباً بك في لوحة تحكم المريض الخاصة بك</p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <FaUserInjured className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="group">
              <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full">
                <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">الخطوات التالية</h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className={`flex-shrink-0 w-10 h-10 ${step.color} rounded-full flex items-center justify-center ml-4`}>
                  <span className="font-bold">{step.number}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
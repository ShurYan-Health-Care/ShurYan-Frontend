import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaVenusMars, FaSignOutAlt } from 'react-icons/fa';

const PatientProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    birthDate: currentUser?.birthDate || '',
    gender: currentUser?.gender || '',
    address: currentUser?.address || '',
    governorate: currentUser?.governorate || '',
    drugAllergies: currentUser?.drugAllergies || '',
    chronicDiseases: currentUser?.chronicDiseases || '',
    currentMedications: currentUser?.currentMedications || '',
    previousSurgeries: currentUser?.previousSurgeries || '',
    insurance: currentUser?.insurance || ''
  });

  const handleSave = () => {
    // In a real app, this would save to localStorage or backend
    console.log('Saving profile:', formData);
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">الملف الشخصي</h1>
            <p className="text-gray-600">إدارة معلوماتك الشخصية والطبية</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button onClick={() => setEditing(!editing)} variant="outline">
              {editing ? 'إلغاء التعديل' : 'تعديل الملف'}
            </Button>
            <Button onClick={handleLogout} variant="outline" className="flex items-center">
              <FaSignOutAlt className="ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaUser className="ml-2 text-blue-600" />
              المعلومات الشخصية
            </h2>
            
            {editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الأول</label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الأخير</label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الميلاد</label>
                  <input
                    type="date"
                    name="birthDate"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الجنس</label>
                  <select
                    name="gender"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">اختر الجنس</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                  <input
                    type="text"
                    name="address"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="العنوان الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المحافظة</label>
                  <input
                    type="text"
                    name="governorate"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.governorate}
                    onChange={handleChange}
                    placeholder="المحافظة"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <FaUser className="text-gray-400 ml-3" />
                  <div>
                    <p className="text-sm text-gray-500">الاسم</p>
                    <p className="font-medium">{currentUser?.firstName} {currentUser?.lastName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 ml-3" />
                  <div>
                    <p className="text-sm text-gray-500">تاريخ الميلاد</p>
                    <p className="font-medium">{currentUser?.birthDate || 'غير محدد'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaVenusMars className="text-gray-400 ml-3" />
                  <div>
                    <p className="text-sm text-gray-500">الجنس</p>
                    <p className="font-medium">{currentUser?.gender === 'male' ? 'ذكر' : currentUser?.gender === 'female' ? 'أنثى' : 'غير محدد'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 ml-3" />
                  <div>
                    <p className="text-sm text-gray-500">العنوان</p>
                    <p className="font-medium">{currentUser?.address || 'غير محدد'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 ml-3" />
                  <div>
                    <p className="text-sm text-gray-500">المحافظة</p>
                    <p className="font-medium">{currentUser?.governorate || 'غير محدد'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Medical Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaNotesMedical className="ml-2 text-blue-600" />
              المعلومات الطبية
            </h2>
            
            {editing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الحساسية من الأدوية</label>
                  <textarea
                    name="drugAllergies"
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.drugAllergies}
                    onChange={handleChange}
                    placeholder="اذكر أي أدوية تسبب حساسية"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الأمراض المزمنة</label>
                  <textarea
                    name="chronicDiseases"
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.chronicDiseases}
                    onChange={handleChange}
                    placeholder="اذكر أي أمراض مزمنة تعاني منها"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الأدوية الحالية</label>
                  <textarea
                    name="currentMedications"
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.currentMedications}
                    onChange={handleChange}
                    placeholder="اذكر الأدوية التي تتناولها حالياً"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العمليات الجراحية السابقة</label>
                  <textarea
                    name="previousSurgeries"
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.previousSurgeries}
                    onChange={handleChange}
                    placeholder="اذكر أي عمليات جراحية خضعت لها"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">معلومات التأمين</label>
                  <input
                    type="text"
                    name="insurance"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.insurance}
                    onChange={handleChange}
                    placeholder="شركة التأمين ومعلوماتها"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaAllergies className="text-gray-400 ml-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">الحساسية من الأدوية</p>
                    <p className="font-medium">{currentUser?.drugAllergies || 'لا توجد معلومات'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaBriefcaseMedical className="text-gray-400 ml-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">الأمراض المزمنة</p>
                    <p className="font-medium">{currentUser?.chronicDiseases || 'لا توجد معلومات'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaPills className="text-gray-400 ml-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">الأدوية الحالية</p>
                    <p className="font-medium">{currentUser?.currentMedications || 'لا توجد معلومات'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaHospital className="text-gray-400 ml-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">العمليات الجراحية السابقة</p>
                    <p className="font-medium">{currentUser?.previousSurgeries || 'لا توجد معلومات'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaNotesMedical className="text-gray-400 ml-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">معلومات التأمين</p>
                    <p className="font-medium">{currentUser?.insurance || 'لا توجد معلومات'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">إكمال الملف</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-shuryan-primary h-2.5 rounded-full" style={{width: '75%'}}></div>
            </div>
            <p className="text-sm text-gray-600">75% مكتمل</p>
            <p className="text-xs text-gray-500 mt-2">أكمل معلوماتك الطبية للحصول على تجربة أفضل</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                إكمال الملف الآن
              </Button>
            </div>
          </div>

          {editing && (
            <Button onClick={handleSave} className="w-full">
              حفظ التغييرات
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
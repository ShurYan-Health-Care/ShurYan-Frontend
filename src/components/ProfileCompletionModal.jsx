import React, { useState } from 'react';
import Button from './Button';

const ProfileCompletionModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nationalIdPhoto: null,
    medicalLicensePhoto: null,
    syndicateMembershipPhoto: null,
    graduationCertificatePhoto: null,
    specializationCertificatePhoto: null,
    yearsOfExperience: '',
    profilePicture: null,
    bio: '',
    dateOfBirth: '',
    gender: '',
    additionalCertificates: '',
    awards: '',
    researchPapers: '',
    professionalMemberships: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateRequiredFields = () => {
    const newErrors = {};
    
    if (!formData.nationalIdPhoto) {
      newErrors.nationalIdPhoto = 'صورة الهوية الوطنية مطلوبة';
    }
    
    if (!formData.medicalLicensePhoto) {
      newErrors.medicalLicensePhoto = 'صورة رخصة مزاولة المهنة مطلوبة';
    }
    
    if (!formData.syndicateMembershipPhoto) {
      newErrors.syndicateMembershipPhoto = 'صورة عضوية النقابة الطبية مطلوبة';
    }
    
    if (!formData.graduationCertificatePhoto) {
      newErrors.graduationCertificatePhoto = 'صورة شهادة التخرج مطلوبة';
    }
    
    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = 'سنوات الخبرة مطلوبة';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateRequiredFields();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">إكمال الملف الشخصي</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            لضمان جودة الخدمة وحماية المرضى، نحتاج إلى التحقق من معلوماتك المهنية.
            <br />
            الحقول المميزة بـ * مطلوبة لإكمال التسجيل.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Required Fields */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">المعلومات المطلوبة للتحقق *</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  صورة الهوية الوطنية *
                </label>
                <input
                  type="file"
                  name="nationalIdPhoto"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.nationalIdPhoto && <p className="text-red-500 text-sm mt-1">{errors.nationalIdPhoto}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  صورة رخصة مزاولة المهنة *
                </label>
                <input
                  type="file"
                  name="medicalLicensePhoto"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.medicalLicensePhoto && <p className="text-red-500 text-sm mt-1">{errors.medicalLicensePhoto}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  صورة عضوية النقابة الطبية *
                </label>
                <input
                  type="file"
                  name="syndicateMembershipPhoto"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.syndicateMembershipPhoto && <p className="text-red-500 text-sm mt-1">{errors.syndicateMembershipPhoto}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  صورة شهادة التخرج *
                </label>
                <input
                  type="file"
                  name="graduationCertificatePhoto"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.graduationCertificatePhoto && <p className="text-red-500 text-sm mt-1">{errors.graduationCertificatePhoto}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  صورة شهادة التخصص (إن وجدت)
                </label>
                <input
                  type="file"
                  name="specializationCertificatePhoto"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سنوات الخبرة *
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل عدد سنوات الخبرة"
                />
                {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
              </div>
              
              {/* Optional Fields */}
              <div className="md:col-span-2 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">معلومات إضافية (اختيارية)</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الصورة الشخصية
                </label>
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ الميلاد
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الجنس
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">اختر الجنس</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المؤهلات الإضافية
                </label>
                <textarea
                  name="additionalCertificates"
                  value={formData.additionalCertificates}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل أي مؤهلات إضافية"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الجوائز والتقديرات
                </label>
                <textarea
                  name="awards"
                  value={formData.awards}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل الجوائز والتقديرات"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الأوراق البحثية المنشورة
                </label>
                <textarea
                  name="researchPapers"
                  value={formData.researchPapers}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل الأوراق البحثية المنشورة"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  العضويات المهنية
                </label>
                <textarea
                  name="professionalMemberships"
                  value={formData.professionalMemberships}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل العضويات المهنية الأخرى"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نبذة عنك
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أخبر المرضى المزيد عن نفسك"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit" className="px-6">
                إرسال للمراجعة
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;
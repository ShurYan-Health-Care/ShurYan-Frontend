import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
import ProfileSuccessModal from '../../components/ProfileSuccessModal';
import { FaUserMd, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStethoscope, FaGraduationCap, FaAward, FaSignOutAlt, FaUpload, FaClock, FaHospital, FaCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';

const DoctorProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Required docs, 2: Optional credibility, 3: Review & Save
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    specialty: currentUser?.specialty || '',
    bio: currentUser?.bio || '',
    experience: currentUser?.experience || '',
    education: currentUser?.education || '',
    awards: currentUser?.awards || '',
    address: currentUser?.address || '',
    workingHours: currentUser?.workingHours || '',
    hospitalAffiliations: currentUser?.hospitalAffiliations || '',
    // Required verification fields
    nationalIdPhoto: null,
    medicalLicensePhoto: null,
    syndicateMembershipPhoto: null,
    graduationCertificatePhoto: null,
    specializationCertificatePhoto: null,
    // Optional fields
    profilePicture: null,
    dateOfBirth: '',
    gender: '',
    additionalCertificates: '',
    researchPapers: '',
    professionalMemberships: ''
  });

  useEffect(() => {
    // Load existing profile data from localStorage if available
    const savedProfile = localStorage.getItem('doctorProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setFormData(prev => ({
        ...prev,
        ...profileData
      }));
    } else {
      setFormData({
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        specialty: currentUser?.specialty || '',
        bio: currentUser?.bio || '',
        experience: currentUser?.experience || '',
        education: currentUser?.education || '',
        awards: currentUser?.awards || '',
        address: currentUser?.address || '',
        workingHours: currentUser?.workingHours || '',
        hospitalAffiliations: currentUser?.hospitalAffiliations || '',
        // Required verification fields
        nationalIdPhoto: null,
        medicalLicensePhoto: null,
        syndicateMembershipPhoto: null,
        graduationCertificatePhoto: null,
        specializationCertificatePhoto: null,
        // Optional fields
        profilePicture: null,
        dateOfBirth: '',
        gender: '',
        additionalCertificates: '',
        researchPapers: '',
        professionalMemberships: ''
      });
    }
  }, [currentUser]);

  const handleSave = async () => {
    try {
      setLoading(true);
      // Check if required fields are filled
      if (!formData.experience || 
          !formData.nationalIdPhoto || 
          !formData.medicalLicensePhoto || 
          !formData.syndicateMembershipPhoto || 
          !formData.graduationCertificatePhoto) {
        Swal.fire({
          icon: 'warning',
          title: 'تنبيه',
          text: 'يرجى ملء جميع الحقول المطلوبة',
          confirmButtonColor: '#00A89C'
        });
        setLoading(false);
        return;
      }

      // Create profile data object to store in localStorage
      const profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        specialty: formData.specialty,
        bio: formData.bio,
        experience: formData.experience,
        education: formData.education,
        awards: formData.awards,
        address: formData.address,
        workingHours: formData.workingHours,
        hospitalAffiliations: formData.hospitalAffiliations,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        additionalCertificates: formData.additionalCertificates,
        researchPapers: formData.researchPapers,
        professionalMemberships: formData.professionalMemberships,
        // Store file names for reference (in a real app, you would store URLs)
        nationalIdPhoto: formData.nationalIdPhoto ? formData.nationalIdPhoto.name : null,
        medicalLicensePhoto: formData.medicalLicensePhoto ? formData.medicalLicensePhoto.name : null,
        syndicateMembershipPhoto: formData.syndicateMembershipPhoto ? formData.syndicateMembershipPhoto.name : null,
        graduationCertificatePhoto: formData.graduationCertificatePhoto ? formData.graduationCertificatePhoto.name : null,
        specializationCertificatePhoto: formData.specializationCertificatePhoto ? formData.specializationCertificatePhoto.name : null,
        profilePicture: formData.profilePicture ? formData.profilePicture.name : null,
      };

      // Save to localStorage
      localStorage.setItem('doctorProfile', JSON.stringify(profileData));
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/doctor/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ أثناء حفظ الملف الشخصي. يرجى المحاولة مرة أخرى.',
        confirmButtonColor: '#00A89C'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    
    if (type === 'file' && files) {
      // For file inputs
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      // For regular inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const nextStep = () => {
    // Validate required fields before moving to next step
    if (step === 1) {
      if (!formData.experience || 
          !formData.nationalIdPhoto || 
          !formData.medicalLicensePhoto || 
          !formData.syndicateMembershipPhoto || 
          !formData.graduationCertificatePhoto) {
        Swal.fire({
          icon: 'warning',
          title: 'تنبيه',
          text: 'يرجى ملء جميع الحقول المطلوبة',
          confirmButtonColor: '#00A89C'
        });
        return;
      }
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Render step 1: Required documentation
  const renderStep1 = () => (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <FaUserMd className="ml-2 text-yellow-600" />
        معلومات التحقق المطلوبة *
      </h2>
      <p className="text-yellow-700 mb-4">
        ⚠️ يجب ملء الحقول التالية للتحقق من هويتك المهنية:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            صورة الهوية الوطنية *
          </label>
          <div className="flex items-center">
            <input
              type="file"
              name="nationalIdPhoto"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="nationalIdPhoto"
            />
            <div className="flex flex-col w-full">
              <label 
                htmlFor="nationalIdPhoto"
                className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <FaUpload className="ml-2" />
                <span>{formData.nationalIdPhoto ? formData.nationalIdPhoto.name : 'اختر ملف'}</span>
              </label>
              {formData.nationalIdPhoto && (
                <span className="text-xs text-green-600 mt-1">تم اختيار الملف: {formData.nationalIdPhoto.name}</span>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            صورة رخصة مزاولة المهنة *
          </label>
          <div className="flex items-center">
            <input
              type="file"
              name="medicalLicensePhoto"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="medicalLicensePhoto"
            />
            <div className="flex flex-col w-full">
              <label 
                htmlFor="medicalLicensePhoto"
                className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <FaUpload className="ml-2" />
                <span>{formData.medicalLicensePhoto ? formData.medicalLicensePhoto.name : 'اختر ملف'}</span>
              </label>
              {formData.medicalLicensePhoto && (
                <span className="text-xs text-green-600 mt-1">تم اختيار الملف: {formData.medicalLicensePhoto.name}</span>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            صورة عضوية النقابة الطبية *
          </label>
          <div className="flex items-center">
            <input
              type="file"
              name="syndicateMembershipPhoto"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="syndicateMembershipPhoto"
            />
            <div className="flex flex-col w-full">
              <label 
                htmlFor="syndicateMembershipPhoto"
                className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <FaUpload className="ml-2" />
                <span>{formData.syndicateMembershipPhoto ? formData.syndicateMembershipPhoto.name : 'اختر ملف'}</span>
              </label>
              {formData.syndicateMembershipPhoto && (
                <span className="text-xs text-green-600 mt-1">تم اختيار الملف: {formData.syndicateMembershipPhoto.name}</span>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            صورة شهادة التخرج *
          </label>
          <div className="flex items-center">
            <input
              type="file"
              name="graduationCertificatePhoto"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="graduationCertificatePhoto"
            />
            <div className="flex flex-col w-full">
              <label 
                htmlFor="graduationCertificatePhoto"
                className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <FaUpload className="ml-2" />
                <span>{formData.graduationCertificatePhoto ? formData.graduationCertificatePhoto.name : 'اختر ملف'}</span>
              </label>
              {formData.graduationCertificatePhoto && (
                <span className="text-xs text-green-600 mt-1">تم اختيار الملف: {formData.graduationCertificatePhoto.name}</span>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            صورة شهادة التخصص (إن وجدت)
          </label>
          <div className="flex items-center">
            <input
              type="file"
              name="specializationCertificatePhoto"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="specializationCertificatePhoto"
            />
            <div className="flex flex-col w-full">
              <label 
                htmlFor="specializationCertificatePhoto"
                className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <FaUpload className="ml-2" />
                <span>{formData.specializationCertificatePhoto ? formData.specializationCertificatePhoto.name : 'اختر ملف'}</span>
              </label>
              {formData.specializationCertificatePhoto && (
                <span className="text-xs text-green-600 mt-1">تم اختيار الملف: {formData.specializationCertificatePhoto.name}</span>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            سنوات الخبرة *
          </label>
          <input
            type="number"
            name="experience"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.experience}
            onChange={handleChange}
            placeholder="أدخل عدد سنوات الخبرة"
          />
        </div>
      </div>
    </div>
  );

  // Render step 2: Optional credibility information
  const renderStep2 = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <FaUserMd className="ml-2 text-blue-600" />
        معلومات إضافية لتعزيز المصداقية (اختيارية)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الصورة الشخصية
          </label>
          <div className="flex items-center">
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="profilePicture"
            />
            <label 
              htmlFor="profilePicture"
              className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <FaUpload className="ml-2" />
              <span>{formData.profilePicture ? formData.profilePicture.name : 'اختر ملف'}</span>
            </label>
            {formData.profilePicture && (
              <span className="text-xs text-green-600 mt-1">تم اختيار الملف: {formData.profilePicture.name}</span>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            تاريخ الميلاد
          </label>
          <input
            type="date"
            name="dateOfBirth"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الجنس
          </label>
          <select
            name="gender"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.gender}
            onChange={handleChange}
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
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.additionalCertificates}
            onChange={handleChange}
            placeholder="أدخل أي مؤهلات إضافية"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الجوائز والتقديرات
          </label>
          <textarea
            name="awards"
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.awards}
            onChange={handleChange}
            placeholder="أدخل الجوائز والتقديرات"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الأوراق البحثية المنشورة
          </label>
          <textarea
            name="researchPapers"
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.researchPapers}
            onChange={handleChange}
            placeholder="أدخل الأوراق البحثية المنشورة"
          ></textarea>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            العضويات المهنية
          </label>
          <textarea
            name="professionalMemberships"
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.professionalMemberships}
            onChange={handleChange}
            placeholder="أدخل العضويات المهنية الأخرى"
          ></textarea>
        </div>
      </div>
    </div>
  );

  // Render step 3: Review and save
  const renderStep3 = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FaUserMd className="ml-2 text-blue-600" />
        مراجعة المعلومات
      </h2>
      
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-bold text-lg text-gray-800 mb-3">المعلومات المطلوبة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaCheck className="text-green-500 ml-2" />
              <div>
                <p className="text-sm text-gray-500">صورة الهوية الوطنية</p>
                <p className="font-medium">{formData.nationalIdPhoto ? formData.nationalIdPhoto.name : 'غير مرفق'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-green-500 ml-2" />
              <div>
                <p className="text-sm text-gray-500">صورة رخصة مزاولة المهنة</p>
                <p className="font-medium">{formData.medicalLicensePhoto ? formData.medicalLicensePhoto.name : 'غير مرفق'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-green-500 ml-2" />
              <div>
                <p className="text-sm text-gray-500">صورة عضوية النقابة الطبية</p>
                <p className="font-medium">{formData.syndicateMembershipPhoto ? formData.syndicateMembershipPhoto.name : 'غير مرفق'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-green-500 ml-2" />
              <div>
                <p className="text-sm text-gray-500">صورة شهادة التخرج</p>
                <p className="font-medium">{formData.graduationCertificatePhoto ? formData.graduationCertificatePhoto.name : 'غير مرفق'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-green-500 ml-2" />
              <div>
                <p className="text-sm text-gray-500">صورة شهادة التخصص</p>
                <p className="font-medium">{formData.specializationCertificatePhoto ? formData.specializationCertificatePhoto.name : 'غير مرفق'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-green-500 ml-2" />
              <div>
                <p className="text-sm text-gray-500">سنوات الخبرة</p>
                <p className="font-medium">{formData.experience || 'غير محدد'} سنوات</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-bold text-lg text-gray-800 mb-3">معلومات إضافية لتعزيز المصداقية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-500">الصورة الشخصية</p>
                <p className="font-medium">{formData.profilePicture ? formData.profilePicture.name : 'غير مرفق'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-500">تاريخ الميلاد</p>
                <p className="font-medium">{formData.dateOfBirth || 'غير محدد'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-500">الجنس</p>
                <p className="font-medium">{formData.gender || 'غير محدد'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-500">المؤهلات الإضافية</p>
                <p className="font-medium">{formData.additionalCertificates || 'غير محدد'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-500">الجوائز والتقديرات</p>
                <p className="font-medium">{formData.awards || 'غير محدد'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-500">الأوراق البحثية المنشورة</p>
                <p className="font-medium">{formData.researchPapers || 'غير محدد'}</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <div>
                <p className="text-sm text-gray-500">العضويات المهنية</p>
                <p className="font-medium">{formData.professionalMemberships || 'غير محدد'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorNavbarPlus />
      {/* Success Modal */}
      {showSuccessModal && (
        <ProfileSuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 mt-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">الملف المهني</h1>
            <p className="text-gray-600">إدارة معلوماتك المهنية والشخصية</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button onClick={handleLogout} variant="outline" className="flex items-center">
              <FaSignOutAlt className="ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {/* Sidebar - Stepper */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-6">خطوات إكمال الملف</h2>
            <div className="space-y-4">
              {/* Step 1: Required Documentation */}
              <div 
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                  step === 1 
                    ? 'bg-[#e6f7f5] border-r-4 border-[#00A89C]' 
                    : step > 1 
                      ? 'bg-gray-50' 
                      : 'bg-gray-50'
                }`}
                onClick={() => step > 1 && setStep(1)}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  step === 1 
                    ? 'bg-[#00A89C] text-white' 
                    : step > 1 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {step > 1 ? <FaCheck /> : '1'}
                </div>
                <div>
                  <h3 className={`font-medium ${
                    step === 1 
                      ? 'text-[#00A89C]' 
                      : step > 1 
                        ? 'text-green-600' 
                        : 'text-gray-600'
                  }`}>
                    مهم للتوثيق
                  </h3>
                  <p className="text-sm text-gray-500">المستندات المطلوبة</p>
                </div>
              </div>
              
              {/* Step 2: Optional Credibility */}
              <div 
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                  step === 2 
                    ? 'bg-[#e6f7f5] border-r-4 border-[#00A89C]' 
                    : step > 2 
                      ? 'bg-gray-50' 
                      : step < 2 
                        ? 'bg-gray-50 opacity-50' 
                        : 'bg-gray-50'
                }`}
                onClick={() => step > 2 && setStep(2)}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  step === 2 
                    ? 'bg-[#00A89C] text-white' 
                    : step > 2 
                      ? 'bg-green-500 text-white' 
                      : step < 2 
                        ? 'bg-gray-300 text-gray-600' 
                        : 'bg-gray-300 text-gray-600'
                }`}>
                  {step > 2 ? <FaCheck /> : '2'}
                </div>
                <div>
                  <h3 className={`font-medium ${
                    step === 2 
                      ? 'text-[#00A89C]' 
                      : step > 2 
                        ? 'text-green-600' 
                        : 'text-gray-600'
                  }`}>
                    اختياري للمصداقية
                  </h3>
                  <p className="text-sm text-gray-500">معلومات إضافية</p>
                </div>
              </div>
              
              {/* Step 3: Review and Save */}
              <div 
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                  step === 3 
                    ? 'bg-[#e6f7f5] border-r-4 border-[#00A89C]' 
                    : step < 3 
                      ? 'bg-gray-50 opacity-50' 
                      : 'bg-gray-50'
                }`}
                onClick={() => step === 3 && setStep(3)}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  step === 3 
                    ? 'bg-[#00A89C] text-white' 
                    : step < 3 
                      ? 'bg-gray-300 text-gray-600' 
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {step === 3 ? '3' : '3'}
                </div>
                <div>
                  <h3 className={`font-medium ${
                    step === 3 
                      ? 'text-[#00A89C]' 
                      : 'text-gray-600'
                  }`}>
                    مراجعة وحفظ
                  </h3>
                  <p className="text-sm text-gray-500">عرض وتأكيد المعلومات</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Render current step */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button 
              onClick={prevStep} 
              variant="outline" 
              disabled={step === 1}
              className="flex items-center"
            >
              السابق
            </Button>
            {step < 3 ? (
              <Button 
                onClick={nextStep} 
                className="flex items-center bg-[#00A89C] hover:bg-[#00938A]"
              >
                التالي
              </Button>
            ) : (
              <Button 
                onClick={handleSave} 
                className="flex items-center bg-[#00A89C] hover:bg-[#00938A]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري الحفظ...
                  </>
                ) : 'حفظ الملف الشخصي'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
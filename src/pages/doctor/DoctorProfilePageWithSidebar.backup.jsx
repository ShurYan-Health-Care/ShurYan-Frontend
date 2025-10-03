import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';

import { FaUserMd, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStethoscope, FaGraduationCap, FaAward, FaSignOutAlt, FaUpload, FaClock, FaHospital, FaCheck, FaBars, FaTimes, FaBell, FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const DoctorProfilePageWithSidebar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personal');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWarningBanner, setShowWarningBanner] = useState(true);
  const [showReviewBanner, setShowReviewBanner] = useState(false);

  const [loading, setLoading] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [equipmentImage1Preview, setEquipmentImage1Preview] = useState(null);
  const [equipmentImage2Preview, setEquipmentImage2Preview] = useState(null);
  const [equipmentImage3Preview, setEquipmentImage3Preview] = useState(null);
  const [exteriorImage1Preview, setExteriorImage1Preview] = useState(null);
  const [exteriorImage2Preview, setExteriorImage2Preview] = useState(null);
  const [exteriorImage3Preview, setExteriorImage3Preview] = useState(null);
  const [waitingRoomImagePreview, setWaitingRoomImagePreview] = useState(null);
  const [examinationRoomImagePreview, setExaminationRoomImagePreview] = useState(null);
  const [additionalClinicImagePreview, setAdditionalClinicImagePreview] = useState(null);

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
    // New clinic fields
    clinicName: '',
    street: '',
    area: '',
    city: '',
    clinicPhones: '',
    services: [],
    equipment: '',
    // New personal fields
    dateOfBirth: '',
    gender: '',
    // New professional fields
    additionalCertificates: '',
    researchPapers: '',
    professionalMemberships: '',
    // Required verification fields
    nationalIdPhoto: null,
    medicalLicensePhoto: null,
    syndicateMembershipPhoto: null,
    graduationCertificatePhoto: null,
    specializationCertificatePhoto: null,
    // Optional fields
    profilePicture: null,
    equipmentImage1: null,
    equipmentImage2: null,
    equipmentImage3: null,
    exteriorImage1: null,
    exteriorImage2: null,
    exteriorImage3: null,
    waitingRoomImage: null,
    examinationRoomImage: null,
    additionalClinicImage: null
  });

  useEffect(() => {
    // Load existing profile data from localStorage if available
    const savedProfile = localStorage.getItem('doctorProfile');
    if (savedProfile) {
      try {
        const profileData = JSON.parse(savedProfile);
        
        // Convert data URLs back to a format that can be used for previews
        // For profile picture, we'll use the data URL directly for preview
        if (profileData.profilePicture && profileData.profilePicture.data) {
          setProfileImagePreview(profileData.profilePicture.data);
        }
        
        // For clinic images, we'll use the data URLs directly for previews
        if (profileData.equipmentImage1 && profileData.equipmentImage1.data) {
          setEquipmentImage1Preview(profileData.equipmentImage1.data);
        }
        if (profileData.equipmentImage2 && profileData.equipmentImage2.data) {
          setEquipmentImage2Preview(profileData.equipmentImage2.data);
        }
        if (profileData.equipmentImage3 && profileData.equipmentImage3.data) {
          setEquipmentImage3Preview(profileData.equipmentImage3.data);
        }
        if (profileData.exteriorImage1 && profileData.exteriorImage1.data) {
          setExteriorImage1Preview(profileData.exteriorImage1.data);
        }
        if (profileData.exteriorImage2 && profileData.exteriorImage2.data) {
          setExteriorImage2Preview(profileData.exteriorImage2.data);
        }
        if (profileData.exteriorImage3 && profileData.exteriorImage3.data) {
          setExteriorImage3Preview(profileData.exteriorImage3.data);
        }
        if (profileData.waitingRoomImage && profileData.waitingRoomImage.data) {
          setWaitingRoomImagePreview(profileData.waitingRoomImage.data);
        }
        if (profileData.examinationRoomImage && profileData.examinationRoomImage.data) {
          setExaminationRoomImagePreview(profileData.examinationRoomImage.data);
        }
        if (profileData.additionalClinicImage && profileData.additionalClinicImage.data) {
          setAdditionalClinicImagePreview(profileData.additionalClinicImage.data);
        }
        
        setFormData(prev => ({
          ...prev,
          ...profileData,
          // Ensure arrays are properly initialized
          services: Array.isArray(profileData.services) ? profileData.services : []
        }));
      } catch (error) {
        console.error('Error parsing saved profile data:', error);
        // Initialize with default values if parsing fails
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
          // New clinic fields
          clinicName: '',
          street: '',
          area: '',
          city: '',
          clinicPhones: '',
          services: [],
          equipment: '',
          // New personal fields
          dateOfBirth: '',
          gender: '',
          // New professional fields
          additionalCertificates: '',
          researchPapers: '',
          professionalMemberships: '',
          // Required verification fields
          nationalIdPhoto: null,
          medicalLicensePhoto: null,
          syndicateMembershipPhoto: null,
          graduationCertificatePhoto: null,
          specializationCertificatePhoto: null,
          // Optional fields
          profilePicture: null,
          equipmentImage1: null,
          equipmentImage2: null,
          equipmentImage3: null,
          exteriorImage1: null,
          exteriorImage2: null,
          exteriorImage3: null,
          waitingRoomImage: null,
          examinationRoomImage: null,
          additionalClinicImage: null
        });
      }
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
        // New clinic fields
        clinicName: '',
        street: '',
        area: '',
        city: '',
        clinicPhones: '',
        services: [],
        equipment: '',
        // New personal fields
        dateOfBirth: '',
        gender: '',
        // New professional fields
        additionalCertificates: '',
        researchPapers: '',
        professionalMemberships: '',
        // Required verification fields
        nationalIdPhoto: null,
        medicalLicensePhoto: null,
        syndicateMembershipPhoto: null,
        graduationCertificatePhoto: null,
        specializationCertificatePhoto: null,
        // Optional fields
        profilePicture: null,
        equipmentImage1: null,
        equipmentImage2: null,
        equipmentImage3: null,
        exteriorImage1: null,
        exteriorImage2: null,
        exteriorImage3: null,
        waitingRoomImage: null,
        examinationRoomImage: null,
        additionalClinicImage: null
      });
    }
  }, [currentUser]);
      }
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
        // New clinic fields
        clinicName: '',
        street: '',
        area: '',
        city: '',
        latitude: '',
        longitude: '',
        clinicPhones: '',
        services: [],
        equipment: '',
        // New personal fields
        dateOfBirth: '',
        gender: '',
        // New professional fields
        additionalCertificates: '',
        researchPapers: '',
        professionalMemberships: '',
        // Required verification fields
        nationalIdPhoto: null,
        medicalLicensePhoto: null,
        syndicateMembershipPhoto: null,
        graduationCertificatePhoto: null,
        specializationCertificatePhoto: null,
        // Optional fields
        profilePicture: null,
        equipmentImage1: null,
        equipmentImage2: null,
        equipmentImage3: null,
        exteriorImage1: null,
        exteriorImage2: null,
        exteriorImage3: null,
        waitingRoomImage: null,
        examinationRoomImage: null,
        additionalClinicImage: null
      });
    }
  }, [currentUser]);

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Clean up profile image preview
      if (profileImagePreview) {
        URL.revokeObjectURL(profileImagePreview);
      }
      
      // Clean up clinic image previews
      if (equipmentImage1Preview) URL.revokeObjectURL(equipmentImage1Preview);
      if (equipmentImage2Preview) URL.revokeObjectURL(equipmentImage2Preview);
      if (equipmentImage3Preview) URL.revokeObjectURL(equipmentImage3Preview);
      if (exteriorImage1Preview) URL.revokeObjectURL(exteriorImage1Preview);
      if (exteriorImage2Preview) URL.revokeObjectURL(exteriorImage2Preview);
      if (exteriorImage3Preview) URL.revokeObjectURL(exteriorImage3Preview);
      if (waitingRoomImagePreview) URL.revokeObjectURL(waitingRoomImagePreview);
      if (examinationRoomImagePreview) URL.revokeObjectURL(examinationRoomImagePreview);
      if (additionalClinicImagePreview) URL.revokeObjectURL(additionalClinicImagePreview);
    };
  }, [profileImagePreview, 
      equipmentImage1Preview, equipmentImage2Preview, equipmentImage3Preview,
      exteriorImage1Preview, exteriorImage2Preview, exteriorImage3Preview,
      waitingRoomImagePreview, examinationRoomImagePreview, additionalClinicImagePreview]);

  // Check if doctor has completed profile on first load
  useEffect(() => {
    const savedProfile = localStorage.getItem('doctorProfile');
    if (savedProfile) {
      try {
        const profileData = JSON.parse(savedProfile);
        
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
        console.error('Error parsing saved profile data:', error);
        setShowWarningBanner(true);
        setShowReviewBanner(false);
      }
    } else {
      setShowWarningBanner(true);
      setShowReviewBanner(false);
    }
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Load existing profile data
      const savedProfile = localStorage.getItem('doctorProfile');
      const profileData = savedProfile ? JSON.parse(savedProfile) : {};
      
      // Function to convert file to data URL
      const fileToDataUrl = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };
      
      // Check if personal info section is complete and save it
      let personalInfoComplete = false;
      if (formData.firstName && formData.lastName && formData.email && formData.phone) {
        personalInfoComplete = true;
        profileData.firstName = formData.firstName;
        profileData.lastName = formData.lastName;
        profileData.email = formData.email;
        profileData.phone = formData.phone;
        profileData.dateOfBirth = formData.dateOfBirth;
        profileData.gender = formData.gender;
        profileData.bio = formData.bio;
        
        // Save profile picture as data URL if it exists
        if (formData.profilePicture) {
          try {
            profileData.profilePicture = {
              name: formData.profilePicture.name,
              type: formData.profilePicture.type,
              data: await fileToDataUrl(formData.profilePicture)
            };
          } catch (error) {
            console.error('Error converting profile picture:', error);
            profileData.profilePicture = null;
          }
        } else {
          profileData.profilePicture = null;
        }
      }
      
      // Check if professional info section is complete and save it
      let professionalInfoComplete = false;
      if (formData.specialty && formData.experience && formData.education &&
          formData.nationalIdPhoto && formData.medicalLicensePhoto && 
          formData.syndicateMembershipPhoto && formData.graduationCertificatePhoto) {
        professionalInfoComplete = true;
        profileData.specialty = formData.specialty;
        profileData.experience = formData.experience;
        profileData.education = formData.education;
        profileData.awards = formData.awards;
        profileData.additionalCertificates = formData.additionalCertificates;
        profileData.researchPapers = formData.researchPapers;
        profileData.professionalMemberships = formData.professionalMemberships;
        
        // Save document files as data URLs
        try {
          if (formData.nationalIdPhoto) {
            profileData.nationalIdPhoto = {
              name: formData.nationalIdPhoto.name,
              type: formData.nationalIdPhoto.type,
              data: await fileToDataUrl(formData.nationalIdPhoto)
            };
          }
          if (formData.medicalLicensePhoto) {
            profileData.medicalLicensePhoto = {
              name: formData.medicalLicensePhoto.name,
              type: formData.medicalLicensePhoto.type,
              data: await fileToDataUrl(formData.medicalLicensePhoto)
            };
          }
          if (formData.syndicateMembershipPhoto) {
            profileData.syndicateMembershipPhoto = {
              name: formData.syndicateMembershipPhoto.name,
              type: formData.syndicateMembershipPhoto.type,
              data: await fileToDataUrl(formData.syndicateMembershipPhoto)
            };
          }
          if (formData.graduationCertificatePhoto) {
            profileData.graduationCertificatePhoto = {
              name: formData.graduationCertificatePhoto.name,
              type: formData.graduationCertificatePhoto.type,
              data: await fileToDataUrl(formData.graduationCertificatePhoto)
            };
          }
          if (formData.specializationCertificatePhoto) {
            profileData.specializationCertificatePhoto = {
              name: formData.specializationCertificatePhoto.name,
              type: formData.specializationCertificatePhoto.type,
              data: await fileToDataUrl(formData.specializationCertificatePhoto)
            };
          }
        } catch (error) {
          console.error('Error converting professional documents:', error);
        }
      }
      
      // Check if clinic info section is complete and save it
      let clinicInfoComplete = false;
      if (formData.clinicName) {
        clinicInfoComplete = true;
        profileData.clinicName = formData.clinicName;
        profileData.street = formData.street;
        profileData.area = formData.area;
        profileData.city = formData.city;
        profileData.clinicPhones = formData.clinicPhones;
        profileData.services = formData.services;
        profileData.equipment = formData.equipment;
        profileData.address = formData.address;
        profileData.hospitalAffiliations = formData.hospitalAffiliations;
        
        // Save clinic images as data URLs
        try {
          if (formData.equipmentImage1) {
            profileData.equipmentImage1 = {
              name: formData.equipmentImage1.name,
              type: formData.equipmentImage1.type,
              data: await fileToDataUrl(formData.equipmentImage1)
            };
          }
          if (formData.equipmentImage2) {
            profileData.equipmentImage2 = {
              name: formData.equipmentImage2.name,
              type: formData.equipmentImage2.type,
              data: await fileToDataUrl(formData.equipmentImage2)
            };
          }
          if (formData.equipmentImage3) {
            profileData.equipmentImage3 = {
              name: formData.equipmentImage3.name,
              type: formData.equipmentImage3.type,
              data: await fileToDataUrl(formData.equipmentImage3)
            };
          }
          if (formData.exteriorImage1) {
            profileData.exteriorImage1 = {
              name: formData.exteriorImage1.name,
              type: formData.exteriorImage1.type,
              data: await fileToDataUrl(formData.exteriorImage1)
            };
          }
          if (formData.exteriorImage2) {
            profileData.exteriorImage2 = {
              name: formData.exteriorImage2.name,
              type: formData.exteriorImage2.type,
              data: await fileToDataUrl(formData.exteriorImage2)
            };
          }
          if (formData.exteriorImage3) {
            profileData.exteriorImage3 = {
              name: formData.exteriorImage3.name,
              type: formData.exteriorImage3.type,
              data: await fileToDataUrl(formData.exteriorImage3)
            };
          }
          if (formData.waitingRoomImage) {
            profileData.waitingRoomImage = {
              name: formData.waitingRoomImage.name,
              type: formData.waitingRoomImage.type,
              data: await fileToDataUrl(formData.waitingRoomImage)
            };
          }
          if (formData.examinationRoomImage) {
            profileData.examinationRoomImage = {
              name: formData.examinationRoomImage.name,
              type: formData.examinationRoomImage.type,
              data: await fileToDataUrl(formData.examinationRoomImage)
            };
          }
          if (formData.additionalClinicImage) {
            profileData.additionalClinicImage = {
              name: formData.additionalClinicImage.name,
              type: formData.additionalClinicImage.type,
              data: await fileToDataUrl(formData.additionalClinicImage)
            };
          }
        } catch (error) {
          console.error('Error converting clinic images:', error);
        }
      }
      
      // Save appointment settings (always saved if present)
      profileData.workingHours = formData.workingHours;
      
      // Check if at least one section is complete
      if (!personalInfoComplete && !professionalInfoComplete && !clinicInfoComplete) {
        Swal.fire({
          icon: 'warning',
          title: 'تنبيه',
          text: 'يرجى ملء جميع الحقول المطلوبة في أي قسم على الأقل',
          confirmButtonColor: '#00A89C'
        });
        setLoading(false);
        return;
      }

      // Save to localStorage
      localStorage.setItem('doctorProfile', JSON.stringify(profileData));
      
      // Hide warning banner and show review banner since profile is now complete
      setShowWarningBanner(false);
      setShowReviewBanner(true);
      
      // Show success message based on which sections were saved
      let successMessage = 'تم حفظ الملف الشخصي بنجاح';
      if (personalInfoComplete && professionalInfoComplete && clinicInfoComplete) {
        successMessage = 'تم حفظ جميع الأقسام بنجاح';
      } else {
        const savedSections = [];
        if (personalInfoComplete) savedSections.push('المعلومات الشخصية');
        if (professionalInfoComplete) savedSections.push('المعلومات المهنية');
        if (clinicInfoComplete) savedSections.push('معلومات العيادة');
        successMessage = `تم حفظ الأقسام التالية بنجاح: ${savedSections.join('، ')}`;
      }
      
      Swal.fire({
        icon: 'success',
        title: 'تم الحفظ',
        text: successMessage,
        confirmButtonColor: '#00A89C'
      }).then(() => {
        navigate('/doctor/dashboard');
      });
      
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
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Create preview for profile picture
      if (name === 'profilePicture' && file) {
        // Clean up previous preview URL if it exists
        if (profileImagePreview) {
          URL.revokeObjectURL(profileImagePreview);
        }
        
        // Create new preview URL
        const previewUrl = URL.createObjectURL(file);
        setProfileImagePreview(previewUrl);
      } else if (name === 'profilePicture' && !file) {
        // Clean up preview URL if file is removed
        if (profileImagePreview) {
          URL.revokeObjectURL(profileImagePreview);
          setProfileImagePreview(null);
        }
      }
      
      // Create previews for clinic images
      const clinicImagePreviews = {
        'equipmentImage1': { preview: equipmentImage1Preview, setPreview: setEquipmentImage1Preview },
        'equipmentImage2': { preview: equipmentImage2Preview, setPreview: setEquipmentImage2Preview },
        'equipmentImage3': { preview: equipmentImage3Preview, setPreview: setEquipmentImage3Preview },
        'exteriorImage1': { preview: exteriorImage1Preview, setPreview: setExteriorImage1Preview },
        'exteriorImage2': { preview: exteriorImage2Preview, setPreview: setExteriorImage2Preview },
        'exteriorImage3': { preview: exteriorImage3Preview, setPreview: setExteriorImage3Preview },
        'waitingRoomImage': { preview: waitingRoomImagePreview, setPreview: setWaitingRoomImagePreview },
        'examinationRoomImage': { preview: examinationRoomImagePreview, setPreview: setExaminationRoomImagePreview },
        'additionalClinicImage': { preview: additionalClinicImagePreview, setPreview: setAdditionalClinicImagePreview }
      };
      
      if (clinicImagePreviews[name] && file) {
        // Clean up previous preview URL if it exists
        if (clinicImagePreviews[name].preview) {
          URL.revokeObjectURL(clinicImagePreviews[name].preview);
        }
        
        // Create new preview URL
        const previewUrl = URL.createObjectURL(file);
        clinicImagePreviews[name].setPreview(previewUrl);
      } else if (clinicImagePreviews[name] && !file) {
        // Clean up preview URL if file is removed
        if (clinicImagePreviews[name].preview) {
          URL.revokeObjectURL(clinicImagePreviews[name].preview);
          clinicImagePreviews[name].setPreview(null);
        }
      }
    } else {
      // For regular inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  const sections = [
    { id: 'personal', name: 'المعلومات الشخصية', icon: <FaUserMd /> },
    { id: 'professional', name: 'المعلومات المهنية', icon: <FaStethoscope /> },
    { id: 'clinic', name: 'معلومات العيادة', icon: <FaHospital /> },
    { id: 'appointment', name: 'إعدادات المواعيد', icon: <FaClock /> }
  ];

  // Render personal information section
  const renderPersonalInfo = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <FaUserMd className="ml-2 text-blue-600" />
          المعلومات الشخصية
        </h2>

      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Picture Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الصورة الشخصية
          </label>
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-6">
              {profileImagePreview ? (
                <img 
                  className="h-24 w-24 rounded-full object-cover border-2 border-gray-300" 
                  src={profileImagePreview} 
                  alt="Profile Preview" 
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                  <FaUserMd className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">انقر لتحميل الصورة</span> أو اسحب وأفلت
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF حتى 10MB</p>
                </div>
                <input 
                  type="file" 
                  name="profilePicture" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              {formData.profilePicture && (
                <p className="text-sm text-gray-500 mt-2">
                  الملف المحدد: {formData.profilePicture.name}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الاسم الأول *
          </label>
          <input
            type="text"
            name="firstName"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="أدخل الاسم الأول"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الاسم الأخير *
          </label>
          <input
            type="text"
            name="lastName"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="أدخل الاسم الأخير"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            البريد الإلكتروني *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={handleChange}
              placeholder="أدخل البريد الإلكتروني"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            رقم الهاتف *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaPhone className="text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.phone}
              onChange={handleChange}
              placeholder="أدخل رقم الهاتف"
            />
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
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            نبذة تعريفية
          </label>
          <textarea
            name="bio"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.bio}
            onChange={handleChange}
            placeholder="أدخل نبذة تعريفية عن نفسك"
          ></textarea>
        </div>
      </div>
    </div>
  );

  // Render professional information section
  const renderProfessionalInfo = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 flex items-center">
        <FaStethoscope className="ml-2 text-blue-600" />
        المعلومات المهنية
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            التخصص *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaStethoscope className="text-gray-400" />
            </div>
            <input
              type="text"
              name="specialty"
              className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="أدخل التخصص"
            />
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
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            المؤهلات التعليمية *
          </label>
          <textarea
            name="education"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.education}
            onChange={handleChange}
            placeholder="أدخل التفاصيل الكاملة للمؤهلات التعليمية"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الجوائز والشهادات
          </label>
          <textarea
            name="awards"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.awards}
            onChange={handleChange}
            placeholder="أدخل الجوائز والشهادات المهنية"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            العضويات المهنية
          </label>
          <input
            type="text"
            name="professionalMemberships"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.professionalMemberships}
            onChange={handleChange}
            placeholder="أدخل العضويات المهنية (مثلاً: عضو الجمعية الطبية المصرية)"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الأوراق البحثية
          </label>
          <textarea
            name="researchPapers"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.researchPapers}
            onChange={handleChange}
            placeholder="أدخل تفاصيل الأوراق البحثية والمنشورات"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الشهادات الإضافية
          </label>
          <textarea
            name="additionalCertificates"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.additionalCertificates}
            onChange={handleChange}
            placeholder="أدخل تفاصيل الشهادات الإضافية"
          />
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">المستندات المطلوبة *</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة البطاقة الشخصية *
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">انقر لتحميل الملف</span> أو اسحب وأفلت
                  </p>
                </div>
                <input 
                  type="file" 
                  name="nationalIdPhoto" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*,.pdf"
                />
              </label>
            </div>
            {formData.nationalIdPhoto && (
              <p className="text-sm text-gray-500 mt-2">
                الملف المحدد: {formData.nationalIdPhoto.name}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة رخصة مزاولة المهنة *
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">انقر لتحميل الملف</span> أو اسحب وأفلت
                  </p>
                </div>
                <input 
                  type="file" 
                  name="medicalLicensePhoto" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*,.pdf"
                />
              </label>
            </div>
            {formData.medicalLicensePhoto && (
              <p className="text-sm text-gray-500 mt-2">
                الملف المحدد: {formData.medicalLicensePhoto.name}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة عضوية النقابة *
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">انقر لتحميل الملف</span> أو اسحب وأفلت
                  </p>
                </div>
                <input 
                  type="file" 
                  name="syndicateMembershipPhoto" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*,.pdf"
                />
              </label>
            </div>
            {formData.syndicateMembershipPhoto && (
              <p className="text-sm text-gray-500 mt-2">
                الملف المحدد: {formData.syndicateMembershipPhoto.name}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة شهادة التخرج *
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">انقر لتحميل الملف</span> أو اسحب وأفلت
                  </p>
                </div>
                <input 
                  type="file" 
                  name="graduationCertificatePhoto" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*,.pdf"
                />
              </label>
            </div>
            {formData.graduationCertificatePhoto && (
              <p className="text-sm text-gray-500 mt-2">
                الملف المحدد: {formData.graduationCertificatePhoto.name}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة شهادة التخصص
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">انقر لتحميل الملف</span> أو اسحب وأفلت
                  </p>
                </div>
                <input 
                  type="file" 
                  name="specializationCertificatePhoto" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*,.pdf"
                />
              </label>
            </div>
            {formData.specializationCertificatePhoto && (
              <p className="text-sm text-gray-500 mt-2">
                الملف المحدد: {formData.specializationCertificatePhoto.name}
              </p>
            )}
          </div>
        </div>
        

      </div>
    </div>
  );

  // Render clinic information section
  const renderClinicInfo = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FaHospital className="ml-2 text-blue-600" />
        معلومات العيادة
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            اسم العيادة *
          </label>
          <input
            type="text"
            name="clinicName"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.clinicName || ''}
            onChange={handleChange}
            placeholder="أدخل اسم العيادة"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            العنوان الكامل
          </label>
          <input
            type="text"
            name="address"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.address || ''}
            onChange={handleChange}
            placeholder="أدخل العنوان الكامل للعيادة"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الشارع
          </label>
          <input
            type="text"
            name="street"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.street || ''}
            onChange={handleChange}
            placeholder="أدخل اسم الشارع"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            المنطقة
          </label>
          <input
            type="text"
            name="area"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.area || ''}
            onChange={handleChange}
            placeholder="أدخل اسم المنطقة"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            المدينة
          </label>
          <input
            type="text"
            name="city"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.city || ''}
            onChange={handleChange}
            placeholder="أدخل اسم المدينة"
          />
        </div>
      </div>
      
      <div className="md:col-span-2 mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          أرقام هاتف العيادة
        </label>
        <input
          type="text"
          name="clinicPhones"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.clinicPhones || ''}
          onChange={handleChange}
          placeholder="أدخل أرقام الهاتف مفصولة بفاصلة (مثال: 0123456789, 0198765432)"
        />
      </div>
      
      <div className="md:col-span-2 mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          الخدمات المتاحة
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: 'examination', label: 'كشف' },
            { id: 'ultrasound', label: 'سونار' },
            { id: 'ecg', label: 'رسم قلب' },
            { id: 'xray', label: 'أشعة' },
            { id: 'analysis', label: 'تحاليل' },
            { id: 'vaccination', label: 'تطعيم' },
            { id: 'consultation', label: 'استشارة' },
            { id: 'emergency', label: 'طوارئ' }
          ].map((service) => (
            <div key={service.id} className="flex items-center">
              <input
                type="checkbox"
                id={`service-${service.id}`}
                name="services"
                value={service.id}
                checked={formData.services?.includes(service.id) || false}
                onChange={(e) => {
                  const services = formData.services || [];
                  let newServices;
                  if (e.target.checked) {
                    newServices = [...services, service.id];
                  } else {
                    newServices = services.filter(s => s !== service.id);
                  }
                  handleChange({
                    target: {
                      name: 'services',
                      value: newServices
                    }
                  });
                }}
                className="h-4 w-4 text-[#00A89C] focus:ring-[#00A89C] border-gray-300 rounded"
              />
              <label htmlFor={`service-${service.id}`} className="mr-2 text-sm text-gray-700">
                {service.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="md:col-span-2 mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          المعدات المتاحة
        </label>
        <textarea
          name="equipment"
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.equipment || ''}
          onChange={handleChange}
          placeholder="أدخل تفاصيل المعدات المتاحة في العيادة"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          صور العيادة
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة خارجية 1
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {exteriorImage1Preview ? (
                    <img 
                      src={exteriorImage1Preview} 
                      alt=" Exterior Preview" 
                      className="max-h-32 max-w-full object-contain rounded-lg"
                    />
                  ) : (
                    <>
                      <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">انقر لتحميل الصورة</span> أو اسحب وأفلت
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  name="exteriorImage1" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              {formData.exteriorImage1 && (
                <p className="text-sm text-gray-500 mt-2">
                  الملف المحدد: {formData.exteriorImage1.name}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة خارجية 2
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {exteriorImage2Preview ? (
                    <img 
                      src={exteriorImage2Preview} 
                      alt=" Exterior Preview" 
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">انقر لتحميل الصورة</span> أو اسحب وأفلت
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  name="exteriorImage2" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              {formData.exteriorImage2 && (
                <p className="text-sm text-gray-500 mt-2">
                  الملف المحدد: {formData.exteriorImage2.name}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة خارجية 3
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {exteriorImage3Preview ? (
                    <img 
                      src={exteriorImage3Preview} 
                      alt=" Exterior Preview" 
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">انقر لتحميل الصورة</span> أو اسحب وأفلت
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  name="exteriorImage3" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              {formData.exteriorImage3 && (
                <p className="text-sm text-gray-500 mt-2">
                  الملف المحدد: {formData.exteriorImage3.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          صور المعدات
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة معدات 1
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {equipmentImage1Preview ? (
                    <img 
                      src={equipmentImage1Preview} 
                      alt=" Equipment Preview" 
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">انقر لتحميل الصورة</span> أو اسحب وأفلت
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  name="equipmentImage1" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              {formData.equipmentImage1 && (
                <p className="text-sm text-gray-500 mt-2">
                  الملف المحدد: {formData.equipmentImage1.name}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة معدات 2
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {equipmentImage2Preview ? (
                    <img 
                      src={equipmentImage2Preview} 
                      alt=" Equipment Preview" 
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">انقر لتحميل الصورة</span> أو اسحب وأفلت
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  name="equipmentImage2" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              {formData.equipmentImage2 && (
                <p className="text-sm text-gray-500 mt-2">
                  الملف المحدد: {formData.equipmentImage2.name}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة معدات 3
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {equipmentImage3Preview ? (
                    <img 
                      src={equipmentImage3Preview} 
                      alt=" Equipment Preview" 
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">انقر لتحميل الصورة</span> أو اسحب وأفلت
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  name="equipmentImage3" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              {formData.equipmentImage3 && (
                <p className="text-sm text-gray-500 mt-2">
                  الملف المحدد: {formData.equipmentImage3.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          صور أخرى
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة غرفة الانتظار
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {waitingRoomImagePreview ? (
                    <img 
                      src={waitingRoomImagePreview} 
                      alt=" Waiting Room Preview" 
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">انقر لتحميل الصورة</span> أو اسحب وأفلت
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  name="waitingRoomImage" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              {formData.waitingRoomImage && (
                <p className="text-sm text-gray-500 mt-2">
                  الملف المحدد: {formData.waitingRoomImage.name}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة غرفة الفحص
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {examinationRoomImagePreview ? (
                    <img 
                      src={examinationRoomImagePreview} 
                      alt=" Examination Room Preview" 
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">انقر لتحميل الصورة</span> أو اسحب وأفلت
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  name="examinationRoomImage" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              {formData.examinationRoomImage && (
                <p className="text-sm text-gray-500 mt-2">
                  الملف المحدد: {formData.examinationRoomImage.name}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة أخرى
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {additionalClinicImagePreview ? (
                    <img 
                      src={additionalClinicImagePreview} 
                      alt=" Additional Clinic Preview" 
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">انقر لتحميل الصورة</span> أو اسحب وأفلت
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  name="additionalClinicImage" 
                  className="hidden" 
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
              {formData.additionalClinicImage && (
                <p className="text-sm text-gray-500 mt-2">
                  الملف المحدد: {formData.additionalClinicImage.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render appointment settings section
  const renderAppointmentSettings = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FaClock className="ml-2 text-blue-600" />
        إعدادات المواعيد
      </h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ساعات العمل
          </label>
          <textarea
            name="workingHours"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.workingHours}
            onChange={handleChange}
            placeholder="أدخل ساعات العمل (مثلاً: الأحد-الخميس: 9:00 صباحاً - 5:00 مساءً)"
          ></textarea>
        </div>
      </div>
    </div>
  );



  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorNavbarPlus />
      <div className="pt-20">
        {/* Warning Banner */}
        {showWarningBanner && (
          <div className="max-w-4xl mx-auto bg-gradient-to-l from-amber-50 to-yellow-50 border-r-4 border-amber-400 p-5 mb-6 shadow-sm rounded-lg mx-4 mt-0">
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
                  onClick={() => navigate('/doctor/profile')}
                >
                  إكمال الملف
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Profile Review Banner */}
        {!showWarningBanner && (
          <div className="max-w-4xl mx-auto bg-gradient-to-l from-blue-50 to-indigo-50 border-r-4 border-blue-400 p-5 mb-6 shadow-sm rounded-lg mx-4 mt-0">
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
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile menu button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md"
              >
                <FaBars className="ml-2" />
                القائمة
              </button>
            </div>

            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block lg:w-64`}>
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">الأقسام</h2>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden"
                  >
                    <FaTimes />
                  </button>
                </div>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center p-3 rounded-lg text-right transition-colors ${
                        activeSection === section.id
                          ? 'bg-[#e6f7f5] text-[#00A89C] font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{section.icon}</span>
                      <span>{section.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {sections.find(section => section.id === activeSection)?.name || 'الملف الشخصي'}
                  </h1>
                  <p className="text-gray-600">إدارة معلوماتك المهنية والشخصية</p>
                </div>
              </div>

              {/* Render active section */}
              {activeSection === 'personal' && renderPersonalInfo()}
              {activeSection === 'professional' && renderProfessionalInfo()}
              {activeSection === 'clinic' && renderClinicInfo()}
              {activeSection === 'appointment' && renderAppointmentSettings()}

              {/* Save Button */}
              <div className="flex justify-end mt-6">
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
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePageWithSidebar;

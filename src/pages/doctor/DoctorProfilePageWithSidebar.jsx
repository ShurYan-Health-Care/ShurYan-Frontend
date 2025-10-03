import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
import CircularProfileImage from '../../components/CircularProfileImage';
import { Combobox, ComboboxLabel, ComboboxOption, Field, Label } from '../../components/Combobox';

import { FaUserMd, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStethoscope, FaGraduationCap, FaAward, FaSignOutAlt, FaUpload, FaClock, FaHospital, FaCheck, FaBars, FaTimes, FaBell, FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const DoctorProfilePageWithSidebar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personal');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWarningBanner, setShowWarningBanner] = useState(true);
  const [showReviewBanner, setShowReviewBanner] = useState(false);
  const clinicImagesRef = useRef(null);

  // Define options for comboboxes
  const specialtyOptions = [
    { name: "الجراحة العامة" },
    { name: "جراحة العظام" },
    { name: "جراحة المخ والأعصاب" },
    { name: "جراحة القلب والصدر" },
    { name: "جراحة المسالك البولية" },
    { name: "جراحة العيون" },
    { name: "جراحة الأنف والأذن والحنجرة" },
    { name: "جراحة التجميل والحروق" },
    { name: "جراحة الوجه والفكين" },
    { name: "الباطنة العامة" },
    { name: "أمراض القلب والأوعية الدموية" },
    { name: "أمراض الصدر" },
    { name: "أمراض الجهاز الهضمي والكبد" },
    { name: "أمراض الكلى" },
    { name: "أمراض الدم" },
    { name: "أمراض الغدد الصماء والسكر" },
    { name: "أمراض الروماتيزم والمناعة" },
    { name: "الأمراض المعدية" },
    { name: "طب الأطفال وحديثي الولادة" },
    { name: "أمراض النساء والتوليد" },
    { name: "طب الأعصاب" },
    { name: "الطب النفسي" },
    { name: "الأمراض الجلدية والتناسلية" },
    { name: "الرمد (أمراض العيون)" },
    { name: "الأنف والأذن والحنجرة" },
    { name: "طب الطوارئ" },
    { name: "التخدير والعناية المركزة" },
    { name: "العلاج الطبيعي والتأهيل" },
    { name: "طب الأسنان" },
    { name: "التحاليل الطبية (الباثولوجيا الإكلينيكية)" },
    { name: "الأشعة التشخيصية والعلاجية" },
    { name: "الطب الرياضي" },
    { name: "طب السموم" },
    { name: "الصحة العامة والطب الوقائي" }
  ];

  const governorateOptions = [
    { name: "القاهرة" },
    { name: "الإسكندرية" },
    { name: "الجيزة" },
    { name: "الدقهلية" },
    { name: "الشرقية" },
    { name: "المنوفية" },
    { name: "القليوبية" },
    { name: "البحيرة" },
    { name: "الغربية" },
    { name: "الفيوم" },
    { name: "المنيا" },
    { name: "أسيوط" },
    { name: "سوهاج" },
    { name: "قنا" },
    { name: "الأقصر" },
    { name: "البحر الأحمر" },
    { name: "الوادي الجديد" },
    { name: "مطروح" },
    { name: "شمال سيناء" },
    { name: "جنوب سيناء" },
    { name: "الإسماعيلية" },
    { name: "السويس" },
    { name: "بورسعيد" },
    { name: "دمياط" },
    { name: "كفر الشيخ" }
  ];

  const genderOptions = [
    { name: "ذكر" },
    { name: "أنثى" }
  ];

  const serviceOptions = [
    { name: "كشف" },
    { name: "سونار" },
    { name: "رسم قلب" },
    { name: "أشعة" },
    { name: "تحاليل" },
    { name: "تطعيم" },
    { name: "استشارة" },
    { name: "طوارئ" }
  ];

  const [loading, setLoading] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [clinicImages, setClinicImages] = useState([]);
  const [awardsImages, setAwardsImages] = useState([]);
  const [researchPapersImages, setResearchPapersImages] = useState([]);
  const [nationalIdPreview, setNationalIdPreview] = useState(null);
  const [medicalLicensePreview, setMedicalLicensePreview] = useState(null);
  const [syndicateMembershipPreview, setSyndicateMembershipPreview] = useState(null);
  const [graduationCertificatePreview, setGraduationCertificatePreview] = useState(null);
  const [specializationCertificatePreview, setSpecializationCertificatePreview] = useState(null);
  const [workingHours, setWorkingHours] = useState([]);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.firstName || '',
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
    clinicPhone1: '',
    clinicPhone2: '',
    clinicLandline: '',
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
        
        // Load clinic images if they exist
        if (profileData.clinicImages && Array.isArray(profileData.clinicImages)) {
          const loadedImages = profileData.clinicImages.map(img => ({
            file: new File([], img.name, { type: img.type }),
            preview: img.data
          }));
          setClinicImages(loadedImages);
        }
        
        // Load awards images if they exist
        if (profileData.awardsImages && Array.isArray(profileData.awardsImages)) {
          const loadedImages = profileData.awardsImages.map(img => ({
            file: new File([], img.name, { type: img.type }),
            preview: img.data
          }));
          setAwardsImages(loadedImages);
        }
        
        // Load research papers images if they exist
        if (profileData.researchPapersImages && Array.isArray(profileData.researchPapersImages)) {
          const loadedImages = profileData.researchPapersImages.map(img => ({
            file: new File([], img.name, { type: img.type }),
            preview: img.data
          }));
          setResearchPapersImages(loadedImages);
        }
        
        // Load previews for required documents if they exist
        if (profileData.nationalIdPhoto?.data) {
          setNationalIdPreview(profileData.nationalIdPhoto.data);
        }
        if (profileData.medicalLicensePhoto?.data) {
          setMedicalLicensePreview(profileData.medicalLicensePhoto.data);
        }
        if (profileData.syndicateMembershipPhoto?.data) {
          setSyndicateMembershipPreview(profileData.syndicateMembershipPhoto.data);
        }
        if (profileData.graduationCertificatePhoto?.data) {
          setGraduationCertificatePreview(profileData.graduationCertificatePhoto.data);
        }
        if (profileData.specializationCertificatePhoto?.data) {
          setSpecializationCertificatePreview(profileData.specializationCertificatePhoto.data);
        }
        
        // Load working hours if they exist
        if (profileData.workingHours && Array.isArray(profileData.workingHours)) {
          setWorkingHours(profileData.workingHours);
        }
        
        // Parse clinic phones if they exist in the old format
        let clinicPhone1 = '';
        let clinicPhone2 = '';
        let clinicLandline = '';
        
        if (profileData.clinicPhones) {
          const phones = profileData.clinicPhones.split(',').map(p => p.trim());
          clinicPhone1 = phones[0] || '';
          clinicPhone2 = phones[1] || '';
          clinicLandline = phones[2] || '';
        }
        
        setFormData(prev => ({
          ...prev,
          ...profileData,
          clinicPhone1: profileData.clinicPhone1 || clinicPhone1 || '',
          clinicPhone2: profileData.clinicPhone2 || clinicPhone2 || '',
          clinicLandline: profileData.clinicLandline || clinicLandline || '',
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
        clinicPhone1: '',
        clinicPhone2: '',
        clinicLandline: '',
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
      if (profileImagePreview) {
        URL.revokeObjectURL(profileImagePreview);
      }
      // Clean up clinic image previews
      clinicImages.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
      // Clean up awards image previews
      awardsImages.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
      // Clean up research papers image previews
      researchPapersImages.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
      // Clean up required documents previews
      if (nationalIdPreview) URL.revokeObjectURL(nationalIdPreview);
      if (medicalLicensePreview) URL.revokeObjectURL(medicalLicensePreview);
      if (syndicateMembershipPreview) URL.revokeObjectURL(syndicateMembershipPreview);
      if (graduationCertificatePreview) URL.revokeObjectURL(graduationCertificatePreview);
      if (specializationCertificatePreview) URL.revokeObjectURL(specializationCertificatePreview);
    };
  }, [profileImagePreview, clinicImages, awardsImages, researchPapersImages, nationalIdPreview, medicalLicensePreview, syndicateMembershipPreview, graduationCertificatePreview, specializationCertificatePreview]);

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

  const handleClinicImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 6 - clinicImages.length;
    const filesToAdd = files.slice(0, remainingSlots);
    
    const newImages = filesToAdd.map(file => {
      const preview = URL.createObjectURL(file);
      return { file, preview };
    });
    
    setClinicImages(prev => [...prev, ...newImages]);
  };

  const removeClinicImage = (index) => {
    setClinicImages(prev => {
      const newImages = [...prev];
      const removed = newImages.splice(index, 1)[0];
      if (removed.preview) {
        URL.revokeObjectURL(removed.preview);
      }
      return newImages;
    });
  };

  const handleAwardsImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 3 - awardsImages.length;
    const filesToAdd = files.slice(0, remainingSlots);
    
    const newImages = filesToAdd.map(file => {
      const preview = URL.createObjectURL(file);
      return { file, preview };
    });
    
    setAwardsImages(prev => [...prev, ...newImages]);
  };

  const removeAwardsImage = (index) => {
    setAwardsImages(prev => {
      const newImages = [...prev];
      const removed = newImages.splice(index, 1)[0];
      if (removed.preview) {
        URL.revokeObjectURL(removed.preview);
      }
      return newImages;
    });
  };

  const handleResearchPapersImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 3 - researchPapersImages.length;
    const filesToAdd = files.slice(0, remainingSlots);
    
    const newImages = filesToAdd.map(file => {
      const preview = URL.createObjectURL(file);
      return { file, preview };
    });
    
    setResearchPapersImages(prev => [...prev, ...newImages]);
  };

  const removeResearchPapersImage = (index) => {
    setResearchPapersImages(prev => {
      const newImages = [...prev];
      const removed = newImages.splice(index, 1)[0];
      if (removed.preview) {
        URL.revokeObjectURL(removed.preview);
      }
      return newImages;
    });
  };

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
        profileData.clinicPhone1 = formData.clinicPhone1;
        profileData.clinicPhone2 = formData.clinicPhone2;
        profileData.clinicLandline = formData.clinicLandline;
        // For backward compatibility, also save as clinicPhones
        profileData.clinicPhones = [formData.clinicPhone1, formData.clinicPhone2, formData.clinicLandline]
          .filter(phone => phone)
          .join(', ');
        profileData.services = formData.services;
        profileData.equipment = formData.equipment;
        profileData.address = formData.address;
        profileData.hospitalAffiliations = formData.hospitalAffiliations;
        
        // Save clinic images as data URLs
        try {
          profileData.clinicImages = [];
          for (let i = 0; i < clinicImages.length; i++) {
            const image = clinicImages[i];
            profileData.clinicImages.push({
              name: image.file.name,
              type: image.file.type,
              data: await fileToDataUrl(image.file)
            });
          }
          
          // Save awards images as data URLs
          profileData.awardsImages = [];
          for (let i = 0; i < awardsImages.length; i++) {
            const image = awardsImages[i];
            profileData.awardsImages.push({
              name: image.file.name,
              type: image.file.type,
              data: await fileToDataUrl(image.file)
            });
          }
          
          // Save research papers images as data URLs
          profileData.researchPapersImages = [];
          for (let i = 0; i < researchPapersImages.length; i++) {
            const image = researchPapersImages[i];
            profileData.researchPapersImages.push({
              name: image.file.name,
              type: image.file.type,
              data: await fileToDataUrl(image.file)
            });
          }
        } catch (error) {
          console.error('Error converting clinic images:', error);
        }
      }
      
      // Save appointment settings (always saved if present)
      profileData.workingHours = workingHours;
      
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
    
    // Handle combobox changes
    if (e.hasOwnProperty('target') && e.target.hasOwnProperty('name') && e.target.hasOwnProperty('value')) {
      // For combobox inputs
      if (name === 'specialty' || name === 'area' || name === 'gender') {
        setFormData(prev => ({
          ...prev,
          [name]: value?.name || value || ''
        }));
        return;
      }
      // For services (now single selection)
      if (name === 'services') {
        setFormData(prev => ({
          ...prev,
          [name]: value || []
        }));
        return;
      }
    }
    
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
      
      // Create previews for required documents
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        switch (name) {
          case 'nationalIdPhoto':
            if (nationalIdPreview) URL.revokeObjectURL(nationalIdPreview);
            setNationalIdPreview(previewUrl);
            break;
          case 'medicalLicensePhoto':
            if (medicalLicensePreview) URL.revokeObjectURL(medicalLicensePreview);
            setMedicalLicensePreview(previewUrl);
            break;
          case 'syndicateMembershipPhoto':
            if (syndicateMembershipPreview) URL.revokeObjectURL(syndicateMembershipPreview);
            setSyndicateMembershipPreview(previewUrl);
            break;
          case 'graduationCertificatePhoto':
            if (graduationCertificatePreview) URL.revokeObjectURL(graduationCertificatePreview);
            setGraduationCertificatePreview(previewUrl);
            break;
          case 'specializationCertificatePhoto':
            if (specializationCertificatePreview) URL.revokeObjectURL(specializationCertificatePreview);
            setSpecializationCertificatePreview(previewUrl);
            break;
          default:
            break;
        }
      } else {
        // Clean up preview URLs if files are removed
        switch (name) {
          case 'nationalIdPhoto':
            if (nationalIdPreview) {
              URL.revokeObjectURL(nationalIdPreview);
              setNationalIdPreview(null);
            }
            break;
          case 'medicalLicensePhoto':
            if (medicalLicensePreview) {
              URL.revokeObjectURL(medicalLicensePreview);
              setMedicalLicensePreview(null);
            }
            break;
          case 'syndicateMembershipPhoto':
            if (syndicateMembershipPreview) {
              URL.revokeObjectURL(syndicateMembershipPreview);
              setSyndicateMembershipPreview(null);
            }
            break;
          case 'graduationCertificatePhoto':
            if (graduationCertificatePreview) {
              URL.revokeObjectURL(graduationCertificatePreview);
              setGraduationCertificatePreview(null);
            }
            break;
          case 'specializationCertificatePhoto':
            if (specializationCertificatePreview) {
              URL.revokeObjectURL(specializationCertificatePreview);
              setSpecializationCertificatePreview(null);
            }
            break;
          default:
            break;
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Picture Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الصورة الشخصية
          </label>
          <CircularProfileImage 
            name="profilePicture"
            onImageChange={handleChange}
            initialImage={profileImagePreview}
            initialFileName={formData.profilePicture?.name}
          />
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
          <Field>
            <Label>الجنس</Label>
            <Combobox 
              name="gender" 
              options={genderOptions} 
              displayValue={(option) => option?.name || ''} 
              defaultValue={genderOptions.find(opt => opt.name === formData.gender) || null}
              onChange={handleChange}
            >
              {(option) => (
                <ComboboxOption value={option}>
                  <ComboboxLabel>{option.name}</ComboboxLabel>
                </ComboboxOption>
              )}
            </Combobox>
          </Field>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Field className="max-w-md">
            <Label>التخصص *</Label>
            <Combobox 
              name="specialty" 
              options={specialtyOptions} 
              displayValue={(option) => option?.name || ''} 
              defaultValue={specialtyOptions.find(opt => opt.name === formData.specialty) || null}
              onChange={handleChange}
            >
              {(option) => (
                <ComboboxOption value={option}>
                  <ComboboxLabel>{option.name}</ComboboxLabel>
                </ComboboxOption>
              )}
            </Combobox>
          </Field>
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
            الجوائز والشهادات
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            {/* Hidden file input */}
            <input
              type="file"
              className="hidden"
              onChange={handleAwardsImageChange}
              accept="image/*"
              multiple
            />
            
            {/* Add image button */}
            <button
              type="button"
              onClick={(e) => e.target.previousElementSibling.click()}
              disabled={awardsImages.length >= 3}
              className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg ${
                awardsImages.length >= 3 
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                  : 'border-gray-300 hover:border-[#00A89C] bg-white hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                {awardsImages.length >= 3 
                  ? 'تم الوصول للحد الأقصى (3 صور)' 
                  : 'انقر لإضافة صور الجوائز والشهادات (بحد أقصى 3 صور)'}
              </p>
            </button>
            
            {/* Preview images */}
            {awardsImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {awardsImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={image.preview} 
                        alt={`صورة الجائزة ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAwardsImage(index)}
                      className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">{image.file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الأوراق البحثية
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            {/* Hidden file input */}
            <input
              type="file"
              className="hidden"
              onChange={handleResearchPapersImageChange}
              accept="image/*"
              multiple
            />
            
            {/* Add image button */}
            <button
              type="button"
              onClick={(e) => e.target.previousElementSibling.click()}
              disabled={researchPapersImages.length >= 3}
              className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg ${
                researchPapersImages.length >= 3 
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                  : 'border-gray-300 hover:border-[#00A89C] bg-white hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                {researchPapersImages.length >= 3 
                  ? 'تم الوصول للحد الأقصى (3 صور)' 
                  : 'انقر لإضافة صور الأوراق البحثية (بحد أقصى 3 صور)'}
              </p>
            </button>
            
            {/* Preview images */}
            {researchPapersImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {researchPapersImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={image.preview} 
                        alt={`صورة الورقة البحثية ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeResearchPapersImage(index)}
                      className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">{image.file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
      </div>
      
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">المستندات المطلوبة *</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة البطاقة الشخصية *
            </label>
            {!nationalIdPreview ? (
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
            ) : (
              <div className="relative group">
                <div className="rounded-lg overflow-hidden border border-gray-200 w-full h-48">
                  <img 
                    src={nationalIdPreview} 
                    alt="معاينة البطاقة الشخصية"
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Clear the file input and preview
                    const input = document.querySelector('input[name="nationalIdPhoto"]');
                    if (input) input.value = '';
                    setFormData(prev => ({ ...prev, nationalIdPhoto: null }));
                    if (nationalIdPreview) {
                      URL.revokeObjectURL(nationalIdPreview);
                      setNationalIdPreview(null);
                    }
                  }}
                  className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة رخصة مزاولة المهنة *
            </label>
            {!medicalLicensePreview ? (
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
            ) : (
              <div className="relative group">
                <div className="rounded-lg overflow-hidden border border-gray-200 w-full h-48">
                  <img 
                    src={medicalLicensePreview} 
                    alt="معاينة رخصة مزاولة المهنة"
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Clear the file input and preview
                    const input = document.querySelector('input[name="medicalLicensePhoto"]');
                    if (input) input.value = '';
                    setFormData(prev => ({ ...prev, medicalLicensePhoto: null }));
                    if (medicalLicensePreview) {
                      URL.revokeObjectURL(medicalLicensePreview);
                      setMedicalLicensePreview(null);
                    }
                  }}
                  className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة عضوية النقابة *
            </label>
            {!syndicateMembershipPreview ? (
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
            ) : (
              <div className="relative group">
                <div className="rounded-lg overflow-hidden border border-gray-200 w-full h-48">
                  <img 
                    src={syndicateMembershipPreview} 
                    alt="معاينة عضوية النقابة"
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Clear the file input and preview
                    const input = document.querySelector('input[name="syndicateMembershipPhoto"]');
                    if (input) input.value = '';
                    setFormData(prev => ({ ...prev, syndicateMembershipPhoto: null }));
                    if (syndicateMembershipPreview) {
                      URL.revokeObjectURL(syndicateMembershipPreview);
                      setSyndicateMembershipPreview(null);
                    }
                  }}
                  className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة شهادة التخرج *
            </label>
            {!graduationCertificatePreview ? (
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
            ) : (
              <div className="relative group">
                <div className="rounded-lg overflow-hidden border border-gray-200 w-full h-48">
                  <img 
                    src={graduationCertificatePreview} 
                    alt="معاينة شهادة التخرج"
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Clear the file input and preview
                    const input = document.querySelector('input[name="graduationCertificatePhoto"]');
                    if (input) input.value = '';
                    setFormData(prev => ({ ...prev, graduationCertificatePhoto: null }));
                    if (graduationCertificatePreview) {
                      URL.revokeObjectURL(graduationCertificatePreview);
                      setGraduationCertificatePreview(null);
                    }
                  }}
                  className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة شهادة التخصص
            </label>
            {!specializationCertificatePreview ? (
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
            ) : (
              <div className="relative group">
                <div className="rounded-lg overflow-hidden border border-gray-200 w-full h-48">
                  <img 
                    src={specializationCertificatePreview} 
                    alt="معاينة شهادة التخصص"
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Clear the file input and preview
                    const input = document.querySelector('input[name="specializationCertificatePhoto"]');
                    if (input) input.value = '';
                    setFormData(prev => ({ ...prev, specializationCertificatePhoto: null }));
                    if (specializationCertificatePreview) {
                      URL.revokeObjectURL(specializationCertificatePreview);
                      setSpecializationCertificatePreview(null);
                    }
                  }}
                  className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        

      </div>
    </div>
  );

  // Render clinic information section
  const renderClinicInfo = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        
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
              رقم المبنى
            </label>
            <input
              type="text"
              name="address"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.address || ''}
              onChange={handleChange}
              placeholder="أدخل رقم المبنى"
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
            <Field>
              <Label>المحافظة</Label>
              <Combobox 
                name="area" 
                options={governorateOptions} 
                displayValue={(option) => option?.name || ''} 
                defaultValue={governorateOptions.find(opt => opt.name === formData.area) || null}
                onChange={handleChange}
              >
                {(option) => (
                  <ComboboxOption value={option}>
                    <ComboboxLabel>{option.name}</ComboboxLabel>
                  </ComboboxOption>
                )}
              </Combobox>
            </Field>
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
          
          <div>
            <Field>
              <Label>الخدمات المتاحة</Label>
              <Combobox 
                name="services" 
                options={serviceOptions} 
                displayValue={(option) => option?.name || ''} 
                defaultValue={serviceOptions.find(opt => formData.services?.includes(opt.name)) || null}
                onChange={(selected) => {
                  // For single selection, we store the selected service name
                  const newServices = selected.target.value ? [selected.target.value.name] : [];
                  handleChange({
                    target: {
                      name: 'services',
                      value: newServices
                    }
                  });
                }}
              >
                {(option) => (
                  <ComboboxOption value={option}>
                    <ComboboxLabel>{option.name}</ComboboxLabel>
                  </ComboboxOption>
                )}
              </Combobox>
            </Field>
          </div>
        </div>
        
        <div className="md:col-span-2 mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            أرقام هاتف العيادة
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="tel"
                name="clinicPhone1"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                value={formData.clinicPhone1 || ''}
                onChange={handleChange}
                placeholder="أدخل رقم الهاتف الأول"
              />
            </div>
            <div>
              <input
                type="tel"
                name="clinicPhone2"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                value={formData.clinicPhone2 || ''}
                onChange={handleChange}
                placeholder="أدخل رقم الهاتف الثاني"
              />
            </div>
            <div>
              <input
                type="tel"
                name="clinicLandline"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                value={formData.clinicLandline || ''}
                onChange={handleChange}
                placeholder="أدخل رقم الأرضي"
              />
            </div>
          </div>
        </div>
        

        
        <div className="md:col-span-2 mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            صور العيادة
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            {/* Hidden file input */}
            <input
              type="file"
              ref={clinicImagesRef}
              className="hidden"
              onChange={handleClinicImageChange}
              accept="image/*"
              multiple
            />
            
            {/* Add image button */}
            <button
              type="button"
              onClick={() => clinicImagesRef.current?.click()}
              disabled={clinicImages.length >= 6}
              className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg ${
                clinicImages.length >= 6 
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                  : 'border-gray-300 hover:border-[#00A89C] bg-white hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <FaUpload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                {clinicImages.length >= 6 
                  ? 'تم الوصول للحد الأقصى (6 صور)' 
                  : 'انقر لإضافة صور العيادة (بحد أقصى 6 صور)'}
              </p>
            </button>
            
            {/* Preview images */}
            {clinicImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {clinicImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={image.preview} 
                        alt={`صورة العيادة ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeClinicImage(index)}
                      className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">{image.file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render appointment settings section
  const renderAppointmentSettings = () => {
    // Days of the week options
    const daysOptions = [
      { name: 'السبت' },
      { name: 'الأحد' },
      { name: 'الاثنين' },
      { name: 'الثلاثاء' },
      { name: 'الأربعاء' },
      { name: 'الخميس' },
      { name: 'الجمعة' }
    ];
    
    // Time period options
    const periodOptions = [
      { name: 'صباحاً' },
      { name: 'مساءاً' }
    ];
    
    // Function to add a new working hour entry
    const addWorkingHour = () => {
      setWorkingHours(prev => [...prev, {
        id: Date.now(),
        day: '',
        fromHour: '',
        fromPeriod: 'صباحاً',
        toHour: '',
        toPeriod: 'مساءاً'
      }]);
    };
    
    // Function to update a working hour entry
    const updateWorkingHour = (id, field, value) => {
      setWorkingHours(prev => prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    };
    
    // Function to remove a working hour entry
    const removeWorkingHour = (id) => {
      setWorkingHours(prev => prev.filter(item => item.id !== id));
    };
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ساعات العمل
            </label>
            
            {/* Add button */}
            <button
              type="button"
              onClick={addWorkingHour}
              className="mb-4 py-2.5 px-4 border border-[#00A89C] text-[#00A89C] rounded-md hover:bg-[#e6f7f5] transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              إضافة مواعيد عمل
            </button>
            
            {/* Working hours entries */}
            {workingHours.map((entry, index) => (
              <div key={entry.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4 items-end">
                <div className="md:col-span-3">
                  <Field>
                    <Label>اليوم</Label>
                    <Combobox 
                      options={daysOptions} 
                      displayValue={(option) => option?.name || ''} 
                      defaultValue={daysOptions.find(opt => opt.name === entry.day) || null}
                      onChange={(selected) => updateWorkingHour(entry.id, 'day', selected.target.value?.name || '')}
                    >
                      {(option) => (
                        <ComboboxOption value={option}>
                          <ComboboxLabel>{option.name}</ComboboxLabel>
                        </ComboboxOption>
                      )}
                    </Combobox>
                  </Field>
                </div>
                
                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">من</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="12:00"
                      maxLength="5"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                      value={entry.fromHour}
                      onChange={(e) => {
                        // Format time input to HH:MM
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 3) {
                          value = value.substring(0, 2) + ':' + value.substring(2, 4);
                        }
                        updateWorkingHour(entry.id, 'fromHour', value);
                      }}
                    />
                    <Field>
                      <Combobox 
                        options={periodOptions} 
                        displayValue={(option) => option?.name || ''} 
                        defaultValue={periodOptions.find(opt => opt.name === entry.fromPeriod) || periodOptions[0]}
                        onChange={(selected) => updateWorkingHour(entry.id, 'fromPeriod', selected.target.value?.name || 'صباحاً')}
                      >
                        {(option) => (
                          <ComboboxOption value={option}>
                            <ComboboxLabel>{option.name}</ComboboxLabel>
                          </ComboboxOption>
                        )}
                      </Combobox>
                    </Field>
                  </div>
                </div>
                
                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">إلى</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="12:00"
                      maxLength="5"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                      value={entry.toHour}
                      onChange={(e) => {
                        // Format time input to HH:MM
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 3) {
                          value = value.substring(0, 2) + ':' + value.substring(2, 4);
                        }
                        updateWorkingHour(entry.id, 'toHour', value);
                      }}
                    />
                    <Field>
                      <Combobox 
                        options={periodOptions} 
                        displayValue={(option) => option?.name || ''} 
                        defaultValue={periodOptions.find(opt => opt.name === entry.toPeriod) || periodOptions[1]}
                        onChange={(selected) => updateWorkingHour(entry.id, 'toPeriod', selected.target.value?.name || 'مساءاً')}
                      >
                        {(option) => (
                          <ComboboxOption value={option}>
                            <ComboboxLabel>{option.name}</ComboboxLabel>
                          </ComboboxOption>
                        )}
                      </Combobox>
                    </Field>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Display selected working hours with delete buttons */}
            {workingHours.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">المواعيد المحددة:</h3>
                <div className="space-y-2">
                  {workingHours.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-gray-700">
                        {entry.day}: {entry.fromHour} {entry.fromPeriod} - {entry.toHour} {entry.toPeriod}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeWorkingHour(entry.id)}
                        className="py-1 px-3 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorNavbarPlus />
      <div className="pt-16">
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
                <div className="text-center">
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

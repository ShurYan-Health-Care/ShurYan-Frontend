// Utility functions for managing data in localStorage
const STORAGE_KEYS = {
  USERS: 'shuryan_users',
  DOCTORS: 'shuryan_doctors',
  APPOINTMENTS: 'shuryan_appointments',
  PRESCRIPTIONS: 'shuryan_prescriptions',
  PHARMACIES: 'shuryan_pharmacies',
  ORDERS: 'shuryan_orders'
};

const initializeData = () => {
  // Sample users data
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const sampleUsers = [
      {
        id: 'patient1',
        firstName: 'محمد',
        lastName: 'أحمد',
        email: 'mohamed.patient@example.com',
        phone: '01234567890',
        role: 'patient',
        password: '123456',
        birthDate: '1990-05-15',
        address: 'القاهرة، المعادي',
        gender: 'ذكر',
        emergencyContact: 'سارة أحمد - 01123456789'
      },
      {
        id: 'patient2',
        firstName: 'فاطمة',
        lastName: 'علي',
        email: 'fatima.patient@example.com',
        phone: '01123456789',
        role: 'patient',
        password: '123456',
        birthDate: '1988-12-20',
        address: 'القاهرة، الزمالك',
        gender: 'أنثى',
        emergencyContact: 'أحمد علي - 01234567890'
      },
      {
        id: 'patient3',
        firstName: 'سارة',
        lastName: 'محمد',
        email: 'sara.patient@example.com',
        phone: '01098765432',
        role: 'patient',
        password: '123456',
        birthDate: '1995-03-10',
        address: 'الإسكندرية، سموحة',
        gender: 'أنثى',
        emergencyContact: 'محمد محمد - 01555566677'
      },
      {
        id: 'doctor1',
        firstName: 'أحمد',
        lastName: 'محمد',
        email: 'ahmed.doctor@example.com',
        phone: '01211122233',
        role: 'doctor',
        password: '123456',
        specialty: 'قلب',
        address: 'القاهرة، المعادي',
        experience: 10,
        licenseNumber: 'MED-001-2025',
        clinicName: 'عيادة د. أحمد محمد',
        profileCompleted: false // Add profile completion status
      },
      {
        id: 'doctor2',
        firstName: 'فاطمة',
        lastName: 'علي',
        email: 'fatima.doctor@example.com',
        phone: '01111122233',
        role: 'doctor',
        password: '123456',
        specialty: 'جلدية',
        address: 'القاهرة، Downtown',
        experience: 8,
        licenseNumber: 'MED-002-2025',
        clinicName: 'عيادة د. فاطمة علي',
        profileCompleted: false // Add profile completion status
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(sampleUsers));
  }

  // Sample doctors data
  if (!localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
    const sampleDoctors = [
      {
        id: 'doctor1',
        firstName: 'أحمد',
        lastName: 'محمد',
        email: 'ahmed@example.com',
        specialty: 'قلب',
        address: 'القاهرة، المعادي',
        price: 300,
        rating: 4.8,
        bio: 'دكتور قلب بخبرة 10 سنوات في علاج أمراض القلب',
        experience: 10,
        languages: ['العربية', 'الإنجليزية'],
        verified: true,
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        id: 'doctor2',
        firstName: 'فاطمة',
        lastName: 'علي',
        email: 'fatima@example.com',
        specialty: 'جلدية',
        address: 'القاهرة، Downtown',
        price: 250,
        rating: 4.9,
        bio: 'أخصائية جلدية وتن beautician بخبرة 8 سنوات',
        experience: 8,
        languages: ['العربية', 'الفرنسية'],
        verified: true,
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        id: 'doctor3',
        firstName: 'محمد',
        lastName: 'حسين',
        email: 'mohamed@example.com',
        specialty: 'عظام',
        address: 'الإسكندرية، سموحة',
        price: 200,
        rating: 4.5,
        bio: 'أخصائي عظام و جراحة بخبرة 12 سنة',
        experience: 12,
        languages: ['العربية', 'الإنجليزية'],
        verified: false,
        image: 'https://randomuser.me/api/portraits/men/67.jpg'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(sampleDoctors));
  }

  // Sample pharmacies data
  if (!localStorage.getItem(STORAGE_KEYS.PHARMACIES)) {
    const samplePharmacies = [
      {
        id: '1',
        name: 'صيدلية النيل',
        address: 'القاهرة، المعادي',
        rating: 4.7,
        deliveryTime: '30-45 دقيقة'
      },
      {
        id: '2',
        name: 'صيدلية الحياة',
        address: 'القاهرة، Downtown',
        rating: 4.5,
        deliveryTime: '20-30 دقيقة'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.PHARMACIES, JSON.stringify(samplePharmacies));
  }

  // Sample appointments data
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    const sampleAppointments = [
      {
        id: '1',
        patientId: 'patient1',
        doctorId: '1',
        patientName: 'محمد أحمد',
        patientPhone: '0123456789',
        date: '2025-09-25',
        time: '10:00 ص',
        type: 'عادي',
        status: 'confirmed',
        insurance: 'لا يوجد'
      },
      {
        id: '2',
        patientId: 'patient1',
        doctorId: '2',
        patientName: 'محمد أحمد',
        patientPhone: '0123456789',
        date: '2025-09-28',
        time: '2:00 م',
        type: 'استشارة',
        status: 'pending',
        insurance: 'شركة التأمين'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(sampleAppointments));
  }

  // Sample prescriptions data
  if (!localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS)) {
    const samplePrescriptions = [
      {
        id: '1',
        patientId: 'patient1',
        doctorId: '1',
        doctorName: 'دكتور أحمد محمد',
        date: '2025-09-15',
        expiryDate: '2025-12-15',
        status: 'pending',
        medications: [
          {
            name: 'بنادول إكسترا',
            dosage: '500mg',
            frequency: '2 حبة صباحاً ومساءً',
            duration: '7 أيام'
          },
          {
            name: 'أوميغا 3',
            dosage: '1 كبسولة',
            frequency: 'يومياً',
            duration: '30 يوم'
          }
        ]
      }
    ];
    localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(samplePrescriptions));
  }
};

// Get all items from a storage key
const getAllItems = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Get item by ID from a storage key
const getItemById = (key, id) => {
  const items = getAllItems(key);
  return items.find(item => item.id === id);
};

// Add new item to a storage key
const addItem = (key, item) => {
  const items = getAllItems(key);
  items.push(item);
  localStorage.setItem(key, JSON.stringify(items));
  return item;
};

// Update item in a storage key
const updateItem = (key, id, updatedData) => {
  const items = getAllItems(key);
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedData };
    localStorage.setItem(key, JSON.stringify(items));
    return items[index];
  }
  return null;
};

// Delete item from a storage key
const deleteItem = (key, id) => {
  const items = getAllItems(key);
  const filteredItems = items.filter(item => item.id !== id);
  localStorage.setItem(key, JSON.stringify(filteredItems));
};

// Get users
const getUsers = () => getAllItems(STORAGE_KEYS.USERS);

// Get patients (users with role 'patient')
const getPatients = () => {
  const users = getUsers();
  return users.filter(user => user.role === 'patient');
};

// Get user by email
const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

// Add new user
const addUser = (user) => {
  // Check if user already exists
  const existingUser = getUserByEmail(user.email);
  if (existingUser) {
    throw new Error('المستخدم موجود بالفعل');
  }
  
  // Validate Egyptian phone number
  const validateEgyptianPhone = (phone) => {
    const egyptianPhoneRegex = /^01[0-2]\d{8}$/;
    return egyptianPhoneRegex.test(phone);
  };
  
  if (user.phone && !validateEgyptianPhone(user.phone)) {
    throw new Error('رقم الهاتف غير صحيح. يجب أن يبدأ بـ 010 أو 011 أو 012 يتبعها 8 أرقام');
  }
  
  return addItem(STORAGE_KEYS.USERS, user);
};

// Get doctors
const getDoctors = () => getAllItems(STORAGE_KEYS.DOCTORS);

// Get doctor by ID
const getDoctorById = (id) => getItemById(STORAGE_KEYS.DOCTORS, id);

// Search doctors by criteria
const searchDoctors = (criteria) => {
  let doctors = getDoctors();
  
  if (criteria.name) {
    const searchTerm = criteria.name.toLowerCase();
    doctors = doctors.filter(doctor => 
      doctor.firstName.toLowerCase().includes(searchTerm) || 
      doctor.lastName.toLowerCase().includes(searchTerm) ||
      doctor.specialty.toLowerCase().includes(searchTerm)
    );
  }
  
  if (criteria.specialty) {
    doctors = doctors.filter(doctor => 
      doctor.specialty.includes(criteria.specialty)
    );
  }
  
  if (criteria.location) {
    doctors = doctors.filter(doctor => 
      doctor.address.includes(criteria.location)
    );
  }
  
  if (criteria.maxPrice) {
    doctors = doctors.filter(doctor => 
      doctor.price <= criteria.maxPrice
    );
  }
  
  if (criteria.minRating) {
    doctors = doctors.filter(doctor => 
      doctor.rating >= criteria.minRating
    );
  }
  
  return doctors;
};

// Get appointments
const getAppointments = () => getAllItems(STORAGE_KEYS.APPOINTMENTS);

// Get appointments by user ID
const getAppointmentsByUserId = (userId) => {
  const appointments = getAppointments();
  return appointments.filter(app => app.patientId === userId || app.doctorId === userId);
};

// Add new appointment
const addAppointment = (appointment) => {
  return addItem(STORAGE_KEYS.APPOINTMENTS, appointment);
};

// Update appointment
const updateAppointment = (id, updatedData) => {
  return updateItem(STORAGE_KEYS.APPOINTMENTS, id, updatedData);
};

// Delete appointment
const deleteAppointment = (id) => {
  return deleteItem(STORAGE_KEYS.APPOINTMENTS, id);
};

// Get prescriptions
const getPrescriptions = () => getAllItems(STORAGE_KEYS.PRESCRIPTIONS);

// Get prescriptions by patient ID
const getPrescriptionsByPatientId = (patientId) => {
  const prescriptions = getPrescriptions();
  return prescriptions.filter(prescription => prescription.patientId === patientId);
};

// Add new prescription
const addPrescription = (prescription) => {
  return addItem(STORAGE_KEYS.PRESCRIPTIONS, prescription);
};

// Get pharmacies
const getPharmacies = () => getAllItems(STORAGE_KEYS.PHARMACIES);

// Get orders
const getOrders = () => getAllItems(STORAGE_KEYS.ORDERS);

// Add new order
const addOrder = (order) => {
  return addItem(STORAGE_KEYS.ORDERS, order);
};

// Initialize data on first load
initializeData();

export {
  STORAGE_KEYS,
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  getUsers,
  getPatients,
  getUserByEmail,
  addUser,
  getDoctors,
  getDoctorById,
  searchDoctors,
  getAppointments,
  getAppointmentsByUserId,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getPrescriptions,
  getPrescriptionsByPatientId,
  addPrescription,
  getPharmacies,
  getOrders,
  addOrder
};
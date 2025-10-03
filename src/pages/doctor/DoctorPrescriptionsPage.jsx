import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getPatients, addPrescription, getPrescriptions, getPharmacies } from '../../utils/dataManager';
import Button from '../../components/Button';
import PrintCard from '../../components/PrintCard';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
import { FaPrescription, FaPlus, FaTrash, FaSave, FaPrint, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';

const DoctorPrescriptionsPage = () => {
  const { currentUser } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    selectedPatientId: '',
    selectedPharmacyId: '',
    medications: [
      { name: '', dosage: '', frequency: '', duration: '', available: true, alternative: '' }
    ],
    notes: ''
  });

  const [pharmacies, setPharmacies] = useState([]);
  const [medicationAvailability, setMedicationAvailability] = useState({});
  
  useEffect(() => {
    const loadData = () => {
      try {
        // Load patients
        const allPatients = getPatients();
        setPatients(allPatients);
        
        // Load pharmacies
        const allPharmacies = getPharmacies();
        setPharmacies(allPharmacies);

        // Load doctor's prescriptions
        if (currentUser?.id) {
          const doctorPrescriptions = getPrescriptions().filter(prescription => 
            prescription.doctorId === currentUser.id
          );
          setPrescriptions(doctorPrescriptions);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, [currentUser]);
  
  const printRef = useRef();

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        { name: '', dosage: '', frequency: '', duration: '' }
      ]
    });
  };

  const removeMedication = (index) => {
    if (formData.medications.length > 1) {
      const newMedications = [...formData.medications];
      newMedications.splice(index, 1);
      setFormData({
        ...formData,
        medications: newMedications
      });
    }
  };

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...formData.medications];
    newMedications[index][field] = value;
    setFormData({
      ...formData,
      medications: newMedications
    });
  };

  // Egyptian phone number validation (starts with 01, followed by 0-2, total 11 digits)
  const validateEgyptianPhone = (phone) => {
    const egyptianPhoneRegex = /^01[0-2]\d{8}$/;
    return egyptianPhoneRegex.test(phone);
  };

  // Check medication availability at selected pharmacy
  const checkMedicationAvailability = (medicationName) => {
    // Simulate API call to pharmacy inventory
    // In real implementation, this would call pharmacy API
    const availabilityData = {
      'بنادول إكسترا': { available: true, stock: 50, alternative: null },
      'باراسيتامول': { available: false, stock: 0, alternative: 'بنادول إكسترا' },
      'أوميغا 3': { available: true, stock: 30, alternative: null },
      'فيتامين D': { available: false, stock: 0, alternative: 'فيتامين D3' },
      'أموكسيسيلين': { available: true, stock: 25, alternative: null },
      'إيبوبروفين': { available: false, stock: 0, alternative: 'بروفين' },
      'لوراتادين': { available: true, stock: 40, alternative: null },
      'سيتريزين': { available: true, stock: 35, alternative: null },
      'أسيكول': { available: false, stock: 0, alternative: 'أوميبرازول' }
    };

    return availabilityData[medicationName] || { available: true, stock: 10, alternative: null };
  };

  const handleMedicationNameChange = (index, value) => {
    const newMedications = [...formData.medications];
    newMedications[index].name = value;
    
    // Check availability if pharmacy selected
    if (formData.selectedPharmacyId && value) {
      const availability = checkMedicationAvailability(value);
      newMedications[index].available = availability.available;
      newMedications[index].alternative = availability.alternative || '';
      
      // Update availability state
      setMedicationAvailability(prev => ({
        ...prev,
        [index]: availability
      }));
      
      if (!availability.available) {
        alert(`تحذير: الدواء "${value}" غير متوفر في الصيدلية المختارة.`);
        
        if (availability.alternative) {
          if (confirm(`هل تريد استبدال "${value}" بـ "${availability.alternative}"؟`)) {
            newMedications[index].name = availability.alternative;
            newMedications[index].available = true;
            newMedications[index].alternative = '';
          }
        }
      }
    }
    
    setFormData({
      ...formData,
      medications: newMedications
    });
  };

  const handlePharmacyChange = (e) => {
    const pharmacyId = e.target.value;
    setFormData(prev => ({
      ...prev,
      selectedPharmacyId: pharmacyId
    }));

    // Check availability for all medications in selected pharmacy
    if (pharmacyId && formData.medications.some(med => med.name)) {
      const newMedications = [...formData.medications];
      const newAvailability = {};
      
      newMedications.forEach((med, index) => {
        if (med.name) {
          const availability = checkMedicationAvailability(med.name);
          newMedications[index].available = availability.available;
          newMedications[index].alternative = availability.alternative || '';
          newAvailability[index] = availability;
          
          if (!availability.available && availability.alternative) {
            alert(`الدواء "${med.name}" غير متوفر. البديل المقترح: "${availability.alternative}"`);
          }
        }
      });
      
      setMedicationAvailability(newAvailability);
      setFormData({
        ...formData,
        selectedPharmacyId: pharmacyId,
        medications: newMedications
      });
    }
  };

  const handlePatientChange = (e) => {
    const patientId = e.target.value;
    setFormData(prev => ({
      ...prev,
      selectedPatientId: patientId
    }));
    
    if (patientId) {
      const selectedPatient = patients.find(p => p.id === patientId);
      if (selectedPatient) {
        // Validate patient's phone number
        if (!validateEgyptianPhone(selectedPatient.phone)) {
          alert(`تحذير: رقم هاتف المريض ${selectedPatient.phone} غير صحيح. يجب أن يبدأ برقم 01 متبوعاً بـ0-2 ثم 8 أرقام.`);
        }
        console.log('Selected patient:', selectedPatient);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.selectedPatientId) {
      alert('يرجى اختيار المريض');
      return;
    }

    // Validate selected patient's phone
    const selectedPatient = patients.find(p => p.id === formData.selectedPatientId);
    if (selectedPatient && !validateEgyptianPhone(selectedPatient.phone)) {
      alert(`رقم هاتف المريض ${selectedPatient.phone} غير صحيح. يجب أن يبدأ برقم 01 متبوعاً بـ0-2 ثم 8 أرقام.`);
      return;
    }

    if (formData.medications.some(med => !med.name || !med.dosage || !med.frequency || !med.duration)) {
      alert('يرجى ملء جميع بيانات الأدوية');
      return;
    }

    // Validate medication dosages (should contain numbers)
    const invalidDosage = formData.medications.find(med => 
      !med.dosage.match(/\d/) // No digits in dosage
    );
    if (invalidDosage) {
      alert(`الجرعة "${invalidDosage.dosage}" يجب أن تحتوي على أرقام. مثال: "1 قرص" أو "500 مجم"`);
      return;
    }

    const newPrescription = {
      id: 'RX-' + Date.now().toString().slice(-6),
      patientId: formData.selectedPatientId,
      doctorId: currentUser.id,
      doctorName: `${currentUser.firstName} ${currentUser.lastName}`,
      date: new Date().toLocaleDateString('ar-EG'),
      expiryDate: new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString('ar-EG'),
      status: 'pending',
      medications: formData.medications.filter(med => med.name), // Remove empty medications
      notes: formData.notes,
      patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
      patientPhone: selectedPatient.phone
    };

    // Save prescription using dataManager
    try {
      addPrescription(newPrescription);
      
      // Add to local state
      setPrescriptions(prev => [...prev, newPrescription]);
      
      // Reset form
      setShowForm(false);
      setFormData({
        selectedPatientId: '',
        medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
        notes: ''
      });
      
      alert('تم حفظ الروشتة بنجاح');
    } catch (error) {
      console.error('Error saving prescription:', error);
      alert('حدث خطأ في حفظ الروشتة');
    }
  };

  const handlePrintPrescription = (prescription) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    // Get patient info
    const patient = patients.find(p => p.id === prescription.patientId);
    
    // Create HTML content for printing
    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl">
        <head>
          <title>طباعة الروشتة</title>
          <style>
            @media print {
              @page { size: A4; margin: 0; }
              body { margin: 0; padding: 20mm; font-family: 'Tajawal', Arial, sans-serif; }
            }
            @media screen {
              body { font-family: 'Tajawal', Arial, sans-serif; padding: 20px; }
            }
            .prescription-card {
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              padding: 20mm;
              background: white;
            }
            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 2px solid #105e58;
              padding-bottom: 16px;
              margin-bottom: 24px;
            }
            .logo-section {
              display: flex;
              align-items: center;
            }
            .logo-placeholder {
              width: 64px;
              height: 64px;
              margin-left: 16px;
              background: #105e58;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
            }
            .logo-text h1 {
              font-size: 24px;
              font-weight: bold;
              color: #105e58;
            }
            .logo-text p {
              color: #6b7280;
            }
            .info-section {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 32px;
              margin-bottom: 32px;
            }
            .info-card {
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 16px;
            }
            .info-card h2 {
              font-size: 18px;
              font-weight: bold;
              color: #105e58;
              margin-bottom: 12px;
              padding-bottom: 8px;
              border-bottom: 1px solid #e5e7eb;
            }
            .medications-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 32px;
            }
            .medications-table th {
              background: #a5f0e7;
              border: 1px solid #d1d5db;
              padding: 12px;
              text-align: right;
              font-weight: bold;
            }
            .medications-table td {
              border: 1px solid #d1d5db;
              padding: 12px;
            }
            .signature-section {
              margin-top: 48px;
              padding-top: 32px;
              border-top: 1px solid #d1d5db;
            }
            .signature-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 32px;
            }
            .important-notes {
              background: #fef3c7;
              padding: 16px;
              border-radius: 8px;
              border: 1px solid #fde68a;
            }
            .signature-line {
              margin-top: 32px;
              width: 192px;
              height: 1px;
              border-top: 2px solid #9ca3af;
              margin-left: auto;
              margin-right: auto;
            }
            .footer {
              margin-top: 48px;
              padding-top: 16px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              font-size: 14px;
              color: #6b7280;
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <div class="prescription-card">
            <div class="header">
              <div class="logo-section">
                <div class="logo-placeholder">ش</div>
                <div class="logo-text">
                  <h1>شُريان</h1>
                  <p>المنصة الرقمية للرعاية الصحية</p>
                </div>
              </div>
              <div style="text-align: left;">
                <p style="font-size: 14px; color: #6b7280;">تاريخ الروشتة: ${prescription.date}</p>
                <p style="font-size: 14px; color: #6b7280;">رقم الروشتة: #${prescription.id}</p>
              </div>
            </div>

            <div class="info-section">
              <div class="info-card">
                <h2>معلومات الطبيب</h2>
                <div>
                  <p><span style="font-weight: 500;">الاسم:</span> دكتور ${prescription.doctorName}</p>
                  <p><span style="font-weight: 500;">التخصص:</span> ${currentUser.specialty || 'غير محدد'}</p>
                  <p><span style="font-weight: 500;">رقم الهاتف:</span> ${currentUser.phone || 'غير محدد'}</p>
                  <p><span style="font-weight: 500;">العنوان:</span> ${currentUser.address || 'غير محدد'}</p>
                </div>
              </div>
              <div class="info-card">
                <h2>معلومات المريض</h2>
                <div>
                  <p><span style="font-weight: 500;">الاسم:</span> ${prescription.patientName}</p>
                  <p><span style="font-weight: 500;">رقم الهاتف:</span> ${prescription.patientPhone}</p>
                  <p><span style="font-weight: 500;">العنوان:</span> ${patient ? patient.address : 'غير محدد'}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 style="font-size: 18px; font-weight: bold; color: #105e58; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #105e58;">الأدوية الموصوفة</h2>
              <table class="medications-table">
                <thead>
                  <tr>
                    <th>اسم الدواء</th>
                    <th>الجرعة</th>
                    <th>التكرار</th>
                    <th>المدة</th>
                  </tr>
                </thead>
                <tbody>
                  ${prescription.medications.map(med => `
                    <tr>
                      <td style="font-weight: 500;">${med.name}</td>
                      <td>${med.dosage}</td>
                      <td>${med.frequency}</td>
                      <td>${med.duration}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="signature-section">
              <div class="signature-grid">
                <div>
                  <p style="font-weight: bold; color: #105e58; margin-bottom: 8px;">ملاحظات الطبيب:</p>
                  <div style="background: #f9fafb; padding: 16px; border-radius: 8px; min-height: 80px;">
                    <p style="color: #374151;">${prescription.notes || 'لا توجد ملاحظات'}</p>
                  </div>
                </div>
                <div>
                  <p style="font-weight: bold; color: #105e58; margin-bottom: 8px;">تعليمات مهمة:</p>
                  <div class="important-notes">
                    <ul style="list-style-type: disc; padding-right: 20px; color: #374151; font-size: 14px;">
                      <li>تناول الأدوية حسب الجرعة المحددة</li>
                      <li>في حالة ظهور أي أعراض جانبية، تواصل مع الطبيب فوراً</li>
                      <li>احتفظ بهذه الروشتة للرجوع إليها</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div style="margin-top: 32px; text-align: center;">
                <p style="font-weight: bold;">توقيع الطبيب</p>
                <div class="signature-line"></div>
                <p style="margin-top: 8px; color: #6b7280;">دكتور ${prescription.doctorName}</p>
              </div>
            </div>

            <div class="footer">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p>هذه الروشتة رقمية ومرخصة من قبل وزارة الصحة - شُريان © 2025</p>
                  <p style="margin-top: 4px;">للاستعلام: www.shuryan.com | support@shuryan.com</p>
                </div>
                <div>
                  <p>رقم الترخيص: MED-2025-001</p>
                </div>
              </div>
              <div style="margin-top: 16px; font-size: 12px;">
                <p>الروشتة صالحة لمدة 30 يوماً من تاريخ الإصدار</p>
                <p style="margin-top: 4px;">تاريخ انتهاء الصلاحية: ${prescription.expiryDate}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <DoctorNavbarPlus />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">الروشتات الطبية</h1>
              <p className="text-gray-600">إنشاء وإدارة الروشتات الطبية للمرضى</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={() => setShowForm(!showForm)} className="flex items-center">
                <FaPlus className="ml-2" />
                {showForm ? 'إلغاء' : 'روشتة جديدة'}
              </Button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">إنشاء روشتة جديدة</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اختيار المريض *
                  </label>
                  <select
                    value={formData.selectedPatientId}
                    onChange={handlePatientChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">اختر المريض</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.firstName} {patient.lastName} - {patient.phone}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اختيار الصيدلية (اختياري)
                  </label>
                  <select
                    value={formData.selectedPharmacyId}
                    onChange={handlePharmacyChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">اختر الصيدلية</option>
                    {pharmacies.map((pharmacy) => (
                      <option key={pharmacy.id} value={pharmacy.id}>
                        {pharmacy.name} - {pharmacy.location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">الأدوية</h3>
                  <Button type="button" onClick={addMedication} variant="outline" className="flex items-center">
                    <FaPlus className="ml-2" />
                    إضافة دواء
                  </Button>
                </div>
                
                {formData.medications.map((medication, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">اسم الدواء</label>
                        <input
                          type="text"
                          value={medication.name}
                          onChange={(e) => handleMedicationNameChange(index, e.target.value)}
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            medication.available === false ? 'border-red-500 bg-red-50' : ''
                          }`}
                          placeholder="مثال: بنادول إكسترا"
                          required
                        />
                        {medication.available === false && (
                          <p className="text-red-500 text-sm mt-1">غير متوفر في الصيدلية المختارة</p>
                        )}
                      </div>
                    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">الجرعة</label>
                        <input
                          type="text"
                          value={medication.dosage}
                          onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="مثال: 500mg"
                          required
                        />
                      </div>
                    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">عدد المرات</label>
                        <input
                          type="text"
                          value={medication.frequency}
                          onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="مثال: 3 مرات يومياً"
                          required
                        />
                      </div>
                    
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">المدة</label>
                        <input
                          type="text"
                          value={medication.duration}
                          onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="مثال: 7 أيام"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-2">
                      <Button 
                        type="button" 
                        onClick={() => removeMedication(index)} 
                        variant="danger" 
                        size="sm"
                        disabled={formData.medications.length === 1}
                      >
                        <FaTrash className="ml-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات إضافية</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أدخل أي ملاحظات إضافية للروشتة"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 space-x-reverse">
                <Button type="button" onClick={() => setShowForm(false)} variant="outline">
                  إلغاء
                </Button>
                <Button type="submit" className="flex items-center">
                  <FaSave className="ml-2" />
                  حفظ الروشتة
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">الروشتات السابقة</h2>
          
          {prescriptions.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-gray-600">لا يوجد لديك روشتات سابقة حالياً.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        روشتة لـ {prescription.patientName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        تاريخ الإنشاء: {prescription.date}
                      </p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse mt-2 md:mt-0">
                      <Button 
                        onClick={() => window.print()} 
                        variant="outline" 
                        className="flex items-center"
                      >
                        <FaPrint className="ml-2" />
                        طباعة
                      </Button>
                      {prescription.pharmacy && (
                        <Button variant="outline" className="flex items-center">
                          <FaShoppingCart className="ml-2" />
                          شراء عبر الإنترنت
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">الأدوية:</h4>
                    <div className="space-y-2">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 rounded">
                          <span className="font-medium">{med.name}</span>
                          <span className="text-gray-600">({med.dosage})</span>
                          <span className="text-gray-600">- {med.frequency}</span>
                          <span className="text-gray-600">- {med.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {prescription.notes && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">ملاحظات:</h4>
                      <p className="text-gray-600">{prescription.notes}</p>
                    </div>
                  )}
                
                  {prescription.pharmacy && (
                    <div className="flex items-center p-3 bg-blue-50 rounded">
                      <FaMapMarkerAlt className="text-blue-600 ml-2" />
                      <span className="text-blue-800">
                        سيتم شحن الروشتة إلى صيدلية {prescription.pharmacy.name} - {prescription.pharmacy.location}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <PrintCard ref={printRef} prescription={formData} patient={patients.find(p => p.id === formData.selectedPatientId)} />
    </div>
  );
};

export default DoctorPrescriptionsPage;

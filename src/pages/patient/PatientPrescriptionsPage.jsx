import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getPrescriptionsByPatientId } from '../../utils/dataManager';
import PrintCard from '../../components/PrintCard';
import Button from '../../components/Button';
import { FaPrescription, FaPrint, FaCalendarAlt, FaPills, FaTruck, FaSearch } from 'react-icons/fa';

const PatientPrescriptionsPage = () => {
  const { currentUser } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    if (currentUser) {
      try {
        // Get patient prescriptions
        const patientPrescriptions = getPrescriptionsByPatientId(currentUser.id);
        setPrescriptions(patientPrescriptions);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [currentUser]);

  const getStatusText = (status) => {
    switch (status) {
      case 'filled': return 'تم صرف الدواء';
      case 'pending': return 'قيد الانتظار';
      case 'ordered': return 'تم الطلب';
      case 'delivered': return 'تم التوصيل';
      default: return 'جديد';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'filled': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'ordered': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePrint = (prescription) => {
    setSelectedPrescription(prescription);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">جاري تحميل الروشتات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">الروشتات الطبية</h1>
        <p className="text-gray-600">إدارة جميع الروشتات الطبية الخاصة بك</p>
      </div>

      {/* Print Preview - Hidden by default, shown when printing */}
      {selectedPrescription && (
        <div className="hidden print:block">
          <PrintCard 
            ref={printRef}
            prescription={selectedPrescription}
            doctor={{ firstName: selectedPrescription.doctorName || 'أحمد', lastName: 'محمد' }}
            patient={currentUser}
          />
        </div>
      )}

      {prescriptions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FaPrescription className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">لا توجد روشتات</h3>
          <p className="text-gray-600 mb-6">لم تحصل على أي روشتات طبية بعد</p>
          <Button onClick={() => window.location.href='/search'}>البحث عن طبيب</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      روشتة طبية #{prescription.id.substring(0, 8)}
                    </h3>
                    <p className="text-gray-600">من دكتور {prescription.doctorName || 'أحمد محمد'}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(prescription.status)}`}>
                      {getStatusText(prescription.status)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-gray-800 mb-3">الأدوية:</h4>
                  <div className="space-y-3">
                    {prescription.medications && prescription.medications.map((med, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <FaPills className="text-shuryan-primary ml-2" />
                        <div className="flex-1">
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                        </div>
                        <span className="text-gray-500 text-sm">{med.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-400 ml-2" />
                    <div>
                      <p className="text-sm text-gray-500">تاريخ الروشتة</p>
                      <p className="font-medium">{prescription.date || '2025-09-15'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaTruck className="text-gray-400 ml-2" />
                    <div>
                      <p className="text-sm text-gray-500">تاريخ الانتهاء</p>
                      <p className="font-medium">{prescription.expiryDate || '2025-12-15'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {prescription.status === 'pending' && (
                    <Button>
                      طلب الدواء
                    </Button>
                  )}
                  {prescription.status === 'ordered' && (
                    <Button variant="outline">
                      تتبع الطلب
                    </Button>
                  )}
                  <Button variant="secondary" onClick={() => handlePrint(prescription)}>
                    <FaPrint className="ml-2" />
                    طباعة الروشتة
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptionsPage;
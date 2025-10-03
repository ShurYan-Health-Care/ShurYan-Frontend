import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getPatients } from '../../utils/dataManager';
import Button from '../../components/Button';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
import { FaUserInjured, FaSearch, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const DoctorPatientsPage = () => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  // Sample patient data
  useEffect(() => {
    const samplePatients = [
      {
        id: '1',
        firstName: 'محمد',
        lastName: 'أحمد',
        email: 'mohamed@example.com',
        phone: '0123456789',
        lastVisit: '2025-09-15',
        nextAppointment: '2025-09-25',
        conditions: ['ضغط الدم', 'سكري']
      },
      {
        id: '2',
        firstName: 'فاطمة',
        lastName: 'علي',
        email: 'fatima@example.com',
        phone: '0123456780',
        lastVisit: '2025-09-10',
        nextAppointment: '2025-09-30',
        conditions: ['حساسية', 'عظام']
      },
      {
        id: '3',
        firstName: 'أحمد',
        lastName: 'حسين',
        email: 'ahmedh@example.com',
        phone: '0123456781',
        lastVisit: '2025-09-05',
        nextAppointment: null,
        conditions: ['قلب']
      }
    ];
    
    setPatients(samplePatients);
    setFilteredPatients(samplePatients);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = patients.filter(patient => 
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <DoctorNavbarPlus />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">مروري المرضى</h1>
              <p className="text-gray-600">إدارة جميع المرضى المسجلين معك</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="البحث عن مريض..."
                  className="w-full md:w-64 p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shuryan-primary focus:border-shuryan-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="">
          {filteredPatients.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FaUserInjured className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-600">لا توجد مرضى مطابقين لمعايير البحث</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div className="mr-4">
                        <h3 className="text-lg font-bold text-gray-800">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {patient.conditions.map((condition, index) => (
                            <span key={index} className="bg-shuryan-secondary text-shuryan-primary text-xs px-2 py-1 rounded-full">
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <FaEnvelope className="text-gray-400 ml-2" />
                        <span className="text-gray-600">{patient.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FaPhone className="text-gray-400 ml-2" />
                        <span className="text-gray-600">{patient.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FaCalendarAlt className="text-gray-400 ml-2" />
                        <span className="text-gray-600">
                          آخر زيارة: {patient.lastVisit}
                        </span>
                      </div>
                      {patient.nextAppointment && (
                        <div className="flex items-center text-sm">
                          <FaCalendarAlt className="text-shuryan-primary ml-2" />
                          <span className="text-shuryan-primary font-medium">
                            الموعد القادم: {patient.nextAppointment}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">
                        عرض الملف
                      </Button>
                      <Button size="sm">
                        كتابة روشتة
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientsPage;
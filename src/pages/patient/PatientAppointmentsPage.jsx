import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAppointmentsByUserId, getDoctorById } from '../../utils/dataManager';
import Button from '../../components/Button';
import { FaCalendarAlt, FaCheck, FaTimes, FaClock, FaUserMd, FaStethoscope, FaMapMarkerAlt } from 'react-icons/fa';

const PatientAppointmentsPage = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      try {
        // Get patient appointments
        const patientAppointments = getAppointmentsByUserId(currentUser.id);
        
        // Enrich appointments with doctor details
        const enrichedAppointments = patientAppointments.map(appointment => {
          const doctor = getDoctorById(appointment.doctorId);
          return {
            ...appointment,
            doctor
          };
        });
        
        setAppointments(enrichedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [currentUser]);

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'مؤكد';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغى';
      default: return 'قيد الانتظار';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">جاري تحميل المواعيد...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">مواعيدي</h1>
        <p className="text-gray-600">إدارة جميع مواعيدك المحجوزة</p>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FaCalendarAlt className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">لا توجد مواعيد</h3>
          <p className="text-gray-600 mb-6">لم تقم بحجز أي مواعيد بعد</p>
          <Button onClick={() => window.location.href='/search'}>حجز موعد جديد</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start">
                    <img
                      src={appointment.doctor?.image || 'https://randomuser.me/api/portraits/men/32.jpg'}
                      alt={appointment.doctor?.firstName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="mr-4">
                      <h3 className="text-lg font-bold text-gray-800">
                        دكتور {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                      </h3>
                      <p className="text-blue-600 font-medium">{appointment.doctor?.specialty}</p>
                      <div className="flex items-center mt-1">
                        <FaStethoscope className="text-gray-400 ml-1" />
                        <span className="text-gray-600 text-sm">كشف {appointment.type || 'عادي'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-600 ml-2" />
                    <div>
                      <p className="text-sm text-gray-500">التاريخ</p>
                      <p className="font-medium">{appointment.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaClock className="text-blue-600 ml-2" />
                    <div>
                      <p className="text-sm text-gray-500">الوقت</p>
                      <p className="font-medium">{appointment.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-600 ml-2" />
                    <div>
                      <p className="text-sm text-gray-500">الموقع</p>
                      <p className="font-medium">{appointment.doctor?.address || 'القاهرة'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    تعديل الموعد
                  </Button>
                  <Button size="sm" variant="danger">
                    إلغاء الموعد
                  </Button>
                  {appointment.status === 'completed' && (
                    <Button size="sm">
                      طلب الدواء
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientAppointmentsPage;
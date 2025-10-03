import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAppointmentsByUserId, updateAppointment } from '../../utils/dataManager';
import Button from '../../components/Button';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
import { FaCalendarAlt, FaCheck, FaTimes, FaClock, FaUserInjured, FaStethoscope, FaUser } from 'react-icons/fa';

const DoctorAppointmentsPage = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      try {
        // Get doctor appointments
        const doctorAppointments = getAppointmentsByUserId(currentUser.id);
        setAppointments(doctorAppointments);
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

  const handleConfirmAppointment = (appointmentId) => {
    // In a real app, this would update the appointment status
    updateAppointment(appointmentId, { status: 'confirmed' })
      .then(() => {
        setAppointments((prevAppointments) => prevAppointments.map((appointment) => 
          appointment.id === appointmentId ? { ...appointment, status: 'confirmed' } : appointment
        ));
      })
      .catch((error) => {
        console.error('Error confirming appointment:', error);
      });
  };

  const handleCompleteAppointment = (appointmentId) => {
    // In a real app, this would update the appointment status
    updateAppointment(appointmentId, { status: 'completed' })
      .then(() => {
        setAppointments((prevAppointments) => prevAppointments.map((appointment) => 
          appointment.id === appointmentId ? { ...appointment, status: 'completed' } : appointment
        ));
      })
      .catch((error) => {
        console.error('Error completing appointment:', error);
      });
  };

  const handleCancelAppointment = (appointmentId) => {
    // In a real app, this would update the appointment status
    updateAppointment(appointmentId, { status: 'cancelled' })
      .then(() => {
        setAppointments((prevAppointments) => prevAppointments.map((appointment) => 
          appointment.id === appointmentId ? { ...appointment, status: 'cancelled' } : appointment
        ));
      })
      .catch((error) => {
        console.error('Error cancelling appointment:', error);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <DoctorNavbarPlus />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">جاري تحميل المواعيد...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <DoctorNavbarPlus />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">مواعيدي</h1>
          <p className="text-gray-600">إدارة جميع المواعيد المحجوزة</p>
        </div>

        <div className="">
          {appointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FaCalendarAlt className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">لا توجد مواعيد</h3>
              <p className="text-gray-600">لا توجد مواعيد محجوزة حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="mr-4">
                          <h3 className="text-lg font-bold text-gray-800">
                            {appointment.patientName || 'محمد أحمد'}
                          </h3>
                          <p className="text-blue-600 font-medium">كشف {appointment.type || 'عادي'}</p>
                          <div className="flex items-center mt-1">
                            <FaStethoscope className="text-gray-400 ml-1" />
                            <span className="text-gray-600 text-sm">التأمين: {appointment.insurance || 'لا يوجد'}</span>
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
                        <FaUser className="text-blue-600 ml-2" />
                        <div>
                          <p className="text-sm text-gray-500">رقم الهاتف</p>
                          <p className="font-medium">{appointment.patientPhone || '0123456789'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      {appointment.status === 'pending' && (
                        <Button size="sm" onClick={() => handleConfirmAppointment(appointment.id)}>
                          تأكيد الموعد
                        </Button>
                      )}
                      {appointment.status === 'confirmed' && (
                        <Button size="sm" variant="outline" onClick={() => handleCompleteAppointment(appointment.id)}>
                          إنهاء الكشف
                        </Button>
                      )}
                      <Button size="sm" variant="danger" onClick={() => handleCancelAppointment(appointment.id)}>
                        إلغاء الموعد
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

export default DoctorAppointmentsPage;
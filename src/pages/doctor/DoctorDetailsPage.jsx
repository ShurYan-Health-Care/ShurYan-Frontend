import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoctorById } from '../../utils/dataManager';
import Button from '../../components/Button';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
import { FaStar, FaMapMarkerAlt, FaStethoscope, FaGraduationCap, FaAward, FaUserMd, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaHospital, FaCheckCircle, FaLanguage } from 'react-icons/fa';

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = () => {
      try {
        const doctorData = getDoctorById(id);
        setDoctor(doctorData);
      } catch (error) {
        console.error('Error fetching doctor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <DoctorNavbarPlus />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">جاري تحميل بيانات الطبيب...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <DoctorNavbarPlus />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">الطبيب غير موجود</p>
          </div>
        </div>
      </div>
    );
  }

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <DoctorNavbarPlus />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Doctor Header */}
          <div className="bg-gradient-to-r from-[#1ebdb2] to-[#14716a] p-6 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={doctor.image}
                alt={`${doctor.firstName} ${doctor.lastName}`}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <div className="md:mr-6 mt-4 md:mt-0 text-center md:text-right">
                <div className="flex flex-col md:flex-row md:items-center">
                  <h1 className="text-2xl font-bold">
                    دكتور {doctor.firstName} {doctor.lastName}
                  </h1>
                  {doctor.verified && (
                    <span className="mt-2 md:mt-0 md:mr-3 bg-white text-[#19978e] text-sm font-medium px-3 py-1 rounded-full flex items-center">
                      <FaCheckCircle className="ml-1" />
                      معتمد
                    </span>
                  )}
                </div>
                <p className="text-[#d1eeeb] mt-1">{doctor.specialty}</p>
                <div className="flex flex-wrap justify-center md:justify-start mt-2">
                  <div className="flex items-center ml-4">
                    <div className="flex ml-2">
                      {renderStars(doctor.rating)}
                    </div>
                    <span>{doctor.rating}</span>
                  </div>
                  <div className="flex items-center ml-4">
                    <FaClock className="ml-1" />
                    <span>{doctor.experience} سنوات خبرة</span>
                  </div>
                  <div className="flex items-center">
                    <FaGraduationCap className="ml-1" />
                    <span>{doctor.specialty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* About */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">عن الطبيب</h2>
                  <p className="text-gray-600">{doctor.bio}</p>
                </div>

                {/* Languages */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">اللغات</h2>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages && doctor.languages.map((language, index) => (
                      <span key={index} className="bg-[#d1eeeb] text-[#0f4b46] px-3 py-1 rounded-full flex items-center">
                        <FaLanguage className="ml-1" />
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaGraduationCap className="ml-2 text-[#1ebdb2]" />
                    التعليم والمؤهلات
                  </h2>
                  <div className="space-y-4">
                    {doctor.education && doctor.education.map((edu, index) => (
                      <div key={index} className="border-r-4 border-[#1ebdb2] pl-4">
                        <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-gray-500 text-sm">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaAward className="ml-2 text-[#1ebdb2]" />
                    الخبرات
                  </h2>
                  <div className="space-y-4">
                    {doctor.experienceDetails && doctor.experienceDetails.map((exp, index) => (
                      <div key={index} className="border-r-4 border-[#1ebdb2] pl-4">
                        <h3 className="font-bold text-gray-800">{exp.position}</h3>
                        <p className="text-gray-600">{exp.hospital}</p>
                        <p className="text-gray-500 text-sm">{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FaUserMd className="ml-2 text-[#1ebdb2]" />
                    معلومات التواصل
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaPhone className="text-[#1ebdb2] ml-2" />
                      <span className="text-gray-600">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-[#1ebdb2] ml-2" />
                      <span className="text-gray-600">{doctor.email}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-[#1ebdb2] ml-2" />
                      <span className="text-gray-600">{doctor.address}</span>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FaClock className="ml-2 text-[#1ebdb2]" />
                    أوقات العمل
                  </h3>
                  <div className="space-y-2">
                    {doctor.workingHours && doctor.workingHours.map((slot, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{slot.day}</span>
                        <span className="text-gray-800 font-medium">{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Appointment Button */}
                <Link to={`/doctor/${id}/book`}>
                  <Button className="w-full bg-[#1ebdb2] hover:bg-[#19978e] text-white py-3">
                    <FaCalendarAlt className="ml-2" />
                    حجز موعد
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
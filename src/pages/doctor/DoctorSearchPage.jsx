import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaMap, FaUserMd, FaStethoscope, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Button from '../../components/Button';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';

const DoctorSearchPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const mapCenter = {
    lat: 30.0444, // Cairo coordinates as default
    lng: 31.2357
  };

  // Mock data for doctors
  useEffect(() => {
    const mockDoctors = [
      {
        id: 1,
        firstName: 'أحمد',
        lastName: 'محمد',
        specialty: 'قلب',
        location: 'القاهرة',
        rating: 4.8,
        price: 500,
        lat: 30.0444,
        lng: 31.2357
      },
      {
        id: 2,
        firstName: 'سارة',
        lastName: 'علي',
        specialty: 'جلدية',
        location: 'الإسكندرية',
        rating: 4.5,
        price: 400,
        lat: 31.2001,
        lng: 29.9187
      },
      {
        id: 3,
        firstName: 'محمد',
        lastName: 'حسن',
        specialty: 'عظام',
        location: 'الجيزة',
        rating: 4.9,
        price: 600,
        lat: 30.0131,
        lng: 31.2089
      },
      {
        id: 4,
        firstName: 'فاطمة',
        lastName: 'عبدالله',
        specialty: 'أسنان',
        location: 'القاهرة',
        rating: 4.7,
        price: 350,
        lat: 30.0444,
        lng: 31.2357
      },
      {
        id: 5,
        firstName: 'يوسف',
        lastName: 'إبراهيم',
        specialty: 'عيون',
        location: 'المنصورة',
        rating: 4.6,
        price: 450,
        lat: 31.0349,
        lng: 31.3677
      },
      {
        id: 6,
        firstName: 'نادية',
        lastName: 'محمود',
        specialty: 'نساء وولادة',
        location: 'القاهرة',
        rating: 4.9,
        price: 700,
        lat: 30.0444,
        lng: 31.2357
      }
    ];
    setDoctors(mockDoctors);
    setFilteredDoctors(mockDoctors);
  }, []);

  const handleSearch = () => {
    let results = doctors;

    // Filter by search term (name or specialty)
    if (searchTerm) {
      results = results.filter(doctor => 
        `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by specialty
    if (specialty) {
      results = results.filter(doctor => doctor.specialty === specialty);
    }

    // Filter by location
    if (location) {
      results = results.filter(doctor => doctor.location.toLowerCase().includes(location.toLowerCase()));
    }

    // Filter by max price
    if (maxPrice) {
      results = results.filter(doctor => doctor.price <= parseInt(maxPrice));
    }

    // Filter by min rating
    if (minRating) {
      results = results.filter(doctor => doctor.rating >= parseFloat(minRating));
    }

    setFilteredDoctors(results);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSpecialty('');
    setLocation('');
    setMaxPrice('');
    setMinRating('');
    setFilteredDoctors(doctors);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <DoctorNavbarPlus />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">البحث عن الأطباء</h1>
          
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن طبيب بالاسم أو التخصص..."
                className="w-full p-4 pr-12 border-2 border-[#ccfbf1] rounded-lg focus:ring-2 focus:ring-[#1ebdb2] focus:border-[#1ebdb2]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <FaFilter className="ml-2" />
              {showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
            </Button>
            
            <div className="flex space-x-2">
              <Button onClick={handleReset} variant="secondary">
                إعادة تعيين
              </Button>
              <Button onClick={handleSearch} className="bg-[#1ebdb2] hover:bg-[#19978e]">
                تطبيق الفلاتر
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">التخصص</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="">جميع التخصصات</option>
                  <option value="قلب">قلب</option>
                  <option value="جلدية">جلدية</option>
                  <option value="عظام">عظام</option>
                  <option value="أسنان">أسنان</option>
                  <option value="عيون">عيون</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
                <input
                  type="text"
                  placeholder="المدينة أو المنطقة"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">أقصى سعر</label>
                <input
                  type="number"
                  placeholder="أدخل السعر"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">أدنى تقييم</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                >
                  <option value="">أي تقييم</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.0">4.0+</option>
                  <option value="3.5">3.5+</option>
                  <option value="3.0">3.0+</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => setShowMap(!showMap)}
                  className="w-full flex items-center justify-center"
                >
                  <FaMap className="mr-2" />
                  {showMap ? 'إخفاء الخريطة' : 'عرض على الخريطة'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {showMap && filteredDoctors.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">موقع الأطباء على الخريطة</h3>
              <Button 
                variant="outline" 
                onClick={() => setShowMap(false)}
                size="sm"
              >
                إخفاء الخريطة
              </Button>
            </div>
            
            {/* Google Map */}
            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'} // Replace with actual API key in .env file
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={10}
                onLoad={(map) => {
                  // Calculate bounds to fit all markers
                  const bounds = new window.google.maps.LatLngBounds();
                  filteredDoctors.forEach(doctor => {
                    if (doctor.lat && doctor.lng) {
                      bounds.extend(new window.google.maps.LatLng(doctor.lat, doctor.lng));
                    }
                  });
                  if (!bounds.isEmpty()) {
                    map.fitBounds(bounds);
                  }
                }}
              >
                {filteredDoctors.map((doctor) => (
                  doctor.lat && doctor.lng && (
                    <Marker
                      key={doctor.id}
                      position={{ lat: doctor.lat, lng: doctor.lng }}
                      onClick={() => setSelectedDoctor(doctor)}
                    />
                  )
                ))}
                
                {selectedDoctor && selectedDoctor.lat && selectedDoctor.lng && (
                  <InfoWindow
                    position={{ lat: selectedDoctor.lat, lng: selectedDoctor.lng }}
                    onCloseClick={() => setSelectedDoctor(null)}
                  >
                    <div className="p-2">
                      <h3 className="font-bold text-gray-800">{selectedDoctor.firstName} {selectedDoctor.lastName}</h3>
                      <p className="text-gray-600 text-sm">{selectedDoctor.specialty}</p>
                      <Link 
                        to={`/doctor/${selectedDoctor.id}`}
                        className="text-[#1ebdb2] hover:underline text-sm"
                      >
                        عرض التفاصيل
                      </Link>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        ) : null}

        <div className="">
          {filteredDoctors.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <FaUserMd className="mx-auto text-5xl text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">لم يتم العثور على أطباء</h3>
              <p className="text-gray-600 mb-6">حاول تعديل معايير البحث أو الفلاتر</p>
              <Button onClick={handleReset} variant="outline">
                إعادة تعيين الفلاتر
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div className="mr-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">
                              دكتور {doctor.firstName} {doctor.lastName}
                            </h3>
                            <div className="flex items-center mt-1">
                              <FaStethoscope className="text-gray-400 ml-1" />
                              <span className="text-gray-600 text-sm">{doctor.specialty}</span>
                            </div>
                          </div>
                          <span className="bg-[#1ebdb2] text-white text-xs font-medium px-2 py-1 rounded-full">
                            {doctor.price} ج.م
                          </span>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-gray-400 ml-1" />
                            <span className="text-gray-600 text-sm">{doctor.location}</span>
                          </div>
                          
                          <div className="flex items-center mt-1">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.floor(doctor.rating) ? 'fill-current' : 'text-gray-300'} />
                              ))}
                            </div>
                            <span className="text-gray-600 text-sm ml-2">{doctor.rating} تقييم</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <span className="text-2xl font-bold text-[#1ebdb2]">{doctor.price} ج.م</span>
                          <Link 
                            to={`/doctor/${doctor.id}`}
                            className="bg-[#1ebdb2] hover:bg-[#19978e] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                          >
                            عرض التفاصيل
                          </Link>
                        </div>
                      </div>
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

export default DoctorSearchPage;
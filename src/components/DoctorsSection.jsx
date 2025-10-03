import React, { useState, useEffect, useRef } from 'react';

const DoctorsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const doctorsData = [
    { 
      id: 1,
      name: 'د. نورهان السيد', 
      specialty: 'طبيبة نساء وتوليد', 
      rating: 4.7, 
      reviews: 88, 
      bio: 'تقدم رعاية متكاملة لصحة المرأة، ومتابعة الحمل والولادة بأحدث التقنيات.', 
      experience: '9+ سنوات خبرة', 
      location: 'القاهرة - التجمع الخامس', 
      imageSrc: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&fit=crop' 
    },
    { 
      id: 2,
      name: 'د. يوسف حمدي', 
      specialty: 'طبيب عام', 
      rating: 4.9, 
      reviews: 120, 
      bio: "طبيب عام بخبرة واسعة في تشخيص وعلاج الحالات الطارئة والمزمنة، يهتم بتقديم رعاية صحية متكاملة.", 
      experience: '12+ سنة خبرة', 
      location: 'الجيزة - المهندسين', 
      imageSrc: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&fit=crop' 
    },
    { 
      id: 3,
      name: 'د. علياء المصري', 
      specialty: 'طبيبة أطفال', 
      rating: 4.8, 
      reviews: 95, 
      bio: 'متخصصة في طب الأطفال وحديثي الولادة، تقدم متابعة شاملة لنمو الطفل وصحته.', 
      experience: '10+ سنوات خبرة', 
      location: 'القاهرة - مدينة نصر', 
      imageSrc: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&fit=crop' 
    },
    { 
      id: 4,
      name: 'د. أحمد الشريف', 
      specialty: 'جراح عظام', 
      rating: 4.9, 
      reviews: 210, 
      bio: 'استشاري جراحة العظام متخصص في الإصابات الرياضية وتغيير المفاصل.', 
      experience: '18+ سنة خبرة', 
      location: 'الإسكندرية - سموحة', 
      imageSrc: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&fit=crop' 
    },
    { 
      id: 5,
      name: 'د. سارة إبراهيم', 
      specialty: 'طبيبة جلدية', 
      rating: 4.8, 
      reviews: 150, 
      bio: 'متخصصة في علاج الأمراض الجلدية والتجميل والليزر، عضو الجمعية المصرية للأمراض الجلدية.', 
      experience: '11+ سنة خبرة', 
      location: 'الجيزة - الشيخ زايد', 
      imageSrc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&fit=crop' 
    },
    { 
      id: 6,
      name: 'د. كريم عبد العزيز', 
      specialty: 'طبيب قلب وأوعية دموية', 
      rating: 5.0, 
      reviews: 300, 
      bio: 'استشاري أمراض القلب والقسطرة العلاجية، حاصل على الزمالة البريطانية لأمراض القلب.', 
      experience: '20+ سنة خبرة', 
      location: 'القاهرة - المعادي', 
      imageSrc: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&fit=crop' 
    }
  ];

  const totalDoctors = doctorsData.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalDoctors);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalDoctors) % totalDoctors);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const StarIcon = ({ filled }) => (
    <svg
      className={`w-5 h-5 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(<StarIcon key={i} filled={i < fullStars} />);
    }
    return stars;
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <section dir="rtl" className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">تعرف على نخبة من أطبائنا</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center">
          اختر من بين أفضل الأطباء والمتخصصين في مصر لبدء رحلتك الصحية.
        </p>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: `${totalDoctors * 100}%` }}
            >
              {doctorsData.map((doctor) => (
                <div key={doctor.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden grid md:grid-cols-2 min-h-[450px]">
                    <div className="relative bg-gradient-to-b from-teal-50 to-teal-100 p-6 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-teal-500/5"></div>
                      <img
                        src={doctor.imageSrc}
                        alt={doctor.name}
                        className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const placeholder = document.createElement('div');
                          placeholder.className = 'w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm font-medium';
                          placeholder.textContent = 'صورة الطبيب';
                          e.target.parentNode.insertBefore(placeholder, e.target);
                        }}
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between text-right">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-bold text-gray-800">{doctor.name}</h3>
                          <div className="flex items-center space-x-1 ml-4">
                            <span className="text-teal-500 font-semibold">{doctor.rating}</span>
                            <div className="flex">{renderStars(doctor.rating)}</div>
                            <span className="text-gray-500 text-sm">({doctor.reviews} تقييم)</span>
                          </div>
                        </div>
                        <p className="text-teal-500 font-semibold">{doctor.specialty}</p>
                        <p className="text-gray-600 text-sm leading-relaxed mt-2">{doctor.bio}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600 text-sm">{doctor.experience}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-gray-600 text-sm">{doctor.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3 mt-4">
                        <button className="flex-1 border border-teal-500 text-teal-500 hover:bg-teal-50 font-semibold py-2.5 px-4 rounded-lg transition-colors">
                          الملف الشخصي
                        </button>
                        <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors">
                          احجز الآن
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 z-10 border border-gray-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 z-10 border border-gray-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2 rtl:space-x-reverse">
          {doctorsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;

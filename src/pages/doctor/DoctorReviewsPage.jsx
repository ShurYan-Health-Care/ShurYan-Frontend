import React, { useState } from 'react';
import Button from '../../components/Button';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUser } from 'react-icons/fa';

const DoctorReviewsPage = () => {
  // Sample reviews data
  const [reviews] = useState([
    {
      id: 1,
      patientName: 'محمد أحمد',
      rating: 5,
      date: '2025-09-15',
      comment: 'دكتور ممتاز، استمع لي بعناية ووصف علاجاً فعالاً لحالتي. أنصح به بشدة.',
      verified: true
    },
    {
      id: 2,
      patientName: 'فاطمة علي',
      rating: 4,
      date: '2025-09-10',
      comment: 'تجربة جيدة جداً، الدكتور محترف ومتعاون. أشعر بتحسن ملحوظ بعد العلاج.',
      verified: true
    },
    {
      id: 3,
      patientName: 'أحمد حسن',
      rating: 5,
      date: '2025-09-05',
      comment: 'دكتور متخصص وواثق في عمله. أجاب على جميع أسئلتي بتفصيل ووضوح.',
      verified: true
    },
    {
      id: 4,
      patientName: 'سارة محمد',
      rating: 4,
      date: '2025-08-28',
      comment: 'خدمة ممتازة وتعامل لطيف. استمتعت بتجربة طبية مريحة وغير مرهقة.',
      verified: true
    }
  ]);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          if (i < rating - 1) {
            return <FaStar key={i} className="text-yellow-400" />;
          } else if (i === rating - 1) {
            return <FaStarHalfAlt key={i} className="text-yellow-400" />;
          } else {
            return <FaRegStar key={i} className="text-gray-300" />;
          }
        })}
      </div>
    );
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <DoctorNavbarPlus />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">تقييمات المرضى</h1>
          <p className="text-gray-600">مراجعة جميع تقييمات المرضى لخدماتك الطبية</p>
        </div>

        <div className="">
          {/* Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center mb-6 md:mb-0">
                <div className="text-5xl font-bold text-shuryan-primary">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mt-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-gray-600 mt-2">{reviews.length} تقييم</div>
              </div>
              
              <div className="w-full md:w-1/2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter(review => review.rating === star).length;
                  const percentage = (count / reviews.length) * 100;
                  
                  return (
                    <div key={star} className="flex items-center mb-2">
                      <div className="w-10 text-gray-600">{star} نجوم</div>
                      <div className="flex-1 mx-2">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-8 text-gray-600 text-left">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">أحدث التقييمات</h2>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-shuryan-secondary rounded-full flex items-center justify-center mr-3">
                        <FaUser className="text-shuryan-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{review.patientName}</h3>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                          <span className="text-gray-500 text-sm mr-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        مؤكد
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mt-3">{review.comment}</p>
                  
                  <div className="flex mt-4 space-x-2">
                    <Button variant="outline" size="sm">
                      رد على التقييم
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorReviewsPage;
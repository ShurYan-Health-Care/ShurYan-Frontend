import React from 'react';
import { FaStar } from 'react-icons/fa';
import Button from './Button';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor, onBookNow }) => {
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
    <div className="card h-full flex flex-col">
      <div className="relative">
        <img 
          src={doctor.image} 
          alt={`${doctor.firstName} ${doctor.lastName}`} 
          className="w-full h-48 object-cover"
        />
        {doctor.verified && (
          <div className="absolute top-2 left-2 bg-[#1ebdb2] text-white text-xs font-bold px-2 py-1 rounded-full">
            موثوق
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-[#1ebdb2]">
            د. {doctor.firstName} {doctor.lastName}
          </h3>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 flex-grow">
          {doctor.bio}
        </p>
        
        <div className="flex items-center mb-4">
          <div className="flex ml-2">
            {renderStars(doctor.rating)}
          </div>
          <span className="text-sm font-bold text-[#1ebdb2]">{doctor.rating}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#1ebdb2]">{doctor.price} ج.م</span>
          <div className="flex space-x-2">
            <Link to={`/doctor/${doctor.id}`}>
              <Button 
                variant="outline" 
                size="sm"
              >
                التفاصيل
              </Button>
            </Link>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => onBookNow(doctor)}
            >
              احجز الآن
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
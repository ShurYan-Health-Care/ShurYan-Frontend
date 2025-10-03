import React from 'react';
import { Link } from 'react-router-dom';

const DoctorJoinCard = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        className="teal-grid-background rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        style={{
          backgroundColor: '#115e59',
          backgroundImage: `
            linear-gradient(rgba(20, 210, 197, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 210, 197, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-right">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              هل أنت طبيب؟
            </h3>
            <p className="text-[#4FD1C5] text-lg md:text-xl max-w-2xl">
              انضم إلى شبكة شُريان الطبية وابدأ في تقديم الرعاية الصحية للمرضى عبر الإنترنت
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link 
              to="/register?type=doctor"
              className="inline-block bg-white text-[#2D3748] font-bold px-8 py-3 rounded-lg hover:bg-[#E2E8F0] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              انضم كطبيب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorJoinCard;
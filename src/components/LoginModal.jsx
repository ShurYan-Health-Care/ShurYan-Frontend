import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-primary">تسجيل الدخول مطلوب</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        
        <p className="text-gray-700 mb-6">
          يجب عليك تسجيل الدخول لحجز موعد مع الطبيب أو مشاهدة التفاصيل.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/login" className="flex-1">
            <Button variant="primary" className="w-full">
              تسجيل الدخول
            </Button>
          </Link>
          <Link to="/register" className="flex-1">
            <Button variant="outline" className="w-full">
              إنشاء حساب
            </Button>
          </Link>
        </div>
        
        <div className="mt-4 text-center">
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-primary font-medium"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
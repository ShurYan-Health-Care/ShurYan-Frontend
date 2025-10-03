import React from 'react';
import Button from './Button';

const ProfileSuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">تم استلام طلبك بنجاح</h2>
            
            <div className="text-gray-600 mb-6 text-right">
              <p className="mb-4">
                طلبك الآن قيد المراجعة من قبل الإدارة.
              </p>
              <p className="mb-4">
                ستستغرق عملية التحقق 3-5 أيام عمل. سنقوم بإعلامك عبر البريد الإلكتروني بمجرد اكتمال المراجعة.
              </p>
              <p className="text-sm text-gray-500">
                ملاحظة: قد نتصل بك لطلب مستندات إضافية إذا لزم الأمر لضمان أعلى معايير الثقة والأمان.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800 font-medium">
                  ✅ في الوقت الحالي، تم قبول طلبك تلقائيًا حتى يصبح API الإداري جاهزًا.
                </p>
              </div>
            </div>
            
            <Button onClick={onClose} className="w-full">
              إغلاق
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSuccessModal;
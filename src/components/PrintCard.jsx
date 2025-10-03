import React, { forwardRef } from 'react';
import logo from '../assets/Logo.jpg';

const PrintCard = forwardRef(({ prescription, doctor, patient }, ref) => {
  return (
    <div ref={ref} className="p-8 bg-white print:p-4" style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}>
      {/* Header with Logo */}
      <div className="flex items-center justify-between border-b-2 border-shuryan-primary pb-4 mb-6 print:pb-2 print:mb-4">
        <div className="flex items-center">
          <img src={logo} alt="Shuryan Logo" className="w-16 h-16 object-contain ml-4 print:w-12 print:h-12" />
          <div>
            <h1 className="text-2xl font-bold text-shuryan-primary print:text-xl">شُريان</h1>
            <p className="text-gray-600 print:text-sm">المنصة الرقمية للرعاية الصحية</p>
          </div>
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-600 print:text-xs">تاريخ الروشتة: {prescription?.date || new Date().toLocaleDateString('ar-EG')}</p>
          <p className="text-sm text-gray-600 print:text-xs">رقم الروشتة: #{prescription?.id?.substring(0, 8) || 'RX-0001'}</p>
        </div>
      </div>

      {/* Doctor and Patient Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print:gap-4 print:mb-4">
        <div className="border border-gray-200 rounded-lg p-4 print:p-2">
          <h2 className="text-lg font-bold text-shuryan-primary mb-3 pb-2 flex items-center print:text-base print:mb-2 print:pb-1">
            <svg className="w-5 h-5 ml-2 print:w-4 print:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
            معلومات الطبيب
          </h2>
          <div className="space-y-2 print:space-y-1">
            <p className="print:text-sm"><span className="font-medium">الاسم:</span> دكتور {doctor?.firstName} {doctor?.lastName}</p>
            <p className="print:text-sm"><span className="font-medium">التخصص:</span> {doctor?.specialty || 'غير محدد'}</p>
            <p className="print:text-sm"><span className="font-medium">رقم الهاتف:</span> {doctor?.phone || 'غير محدد'}</p>
            <p className="print:text-sm"><span className="font-medium">العنوان:</span> {doctor?.address || 'غير محدد'}</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 print:p-2">
          <h2 className="text-lg font-bold text-shuryan-primary mb-3 pb-2 flex items-center print:text-base print:mb-2 print:pb-1">
            <svg className="w-5 h-5 ml-2 print:w-4 print:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
            معلومات المريض
          </h2>
          <div className="space-y-2 print:space-y-1">
            <p className="print:text-sm"><span className="font-medium">الاسم:</span> {patient?.firstName} {patient?.lastName}</p>
            <p className="print:text-sm"><span className="font-medium">تاريخ الميلاد:</span> {patient?.birthDate || 'غير محدد'}</p>
            <p className="print:text-sm"><span className="font-medium">رقم الهاتف:</span> {patient?.phone || 'غير محدد'}</p>
            <p className="print:text-sm"><span className="font-medium">العنوان:</span> {patient?.address || 'غير محدد'}</p>
          </div>
        </div>
      </div>

      {/* Prescription Medications */}
      <div className="mb-8 print:mb-4">
        <h2 className="text-lg font-bold text-shuryan-primary mb-4 pb-2 flex items-center border-b-2 border-shuryan-primary print:text-base print:mb-2 print:pb-1">
          <svg className="w-5 h-5 ml-2 print:w-4 print:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path></svg>
          الأدوية الموصوفة
        </h2>
        <table className="w-full border-collapse print:text-sm">
          <thead>
            <tr className="bg-shuryan-secondary">
              <th className="border border-gray-300 p-3 text-right font-bold print:p-2">اسم الدواء</th>
              <th className="border border-gray-300 p-3 text-right font-bold print:p-2">الجرعة</th>
              <th className="border border-gray-300 p-3 text-right font-bold print:p-2">التكرار</th>
              <th className="border border-gray-300 p-3 text-right font-bold print:p-2">المدة</th>
            </tr>
          </thead>
          <tbody>
            {prescription?.medications && prescription.medications.length > 0 ? (
              prescription.medications.map((med, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 p-3 font-medium print:p-2">{med.name}</td>
                  <td className="border border-gray-300 p-3 print:p-2">{med.dosage}</td>
                  <td className="border border-gray-300 p-3 print:p-2">{med.frequency}</td>
                  <td className="border border-gray-300 p-3 print:p-2">{med.duration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 p-3 text-center text-gray-500 print:p-2">
                  لا توجد أدوية موصوفة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Doctor Signature and Notes */}
      <div className="mt-12 pt-8 border-t border-gray-300 print:mt-8 print:pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4">
          <div>
            <p className="font-bold text-shuryan-primary mb-2 print:text-base print:mb-1">ملاحظات الطبيب:</p>
            <div className="bg-gray-50 p-4 rounded-lg min-h-20 print:p-2 print:min-h-10">
              <p className="text-gray-700 print:text-sm">{prescription?.notes || 'لا توجد ملاحظات'}</p>
            </div>
          </div>
          <div>
            <p className="font-bold text-shuryan-primary mb-2 print:text-base print:mb-1">تعليمات مهمة:</p>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 print:p-2 print:bg-yellow-100">
              <ul className="list-disc pr-5 text-gray-700 space-y-1 text-sm print:text-xs print:space-y-0">
                <li>تناول الأدوية حسب الجرعة المحددة</li>
                <li>في حالة ظهور أي أعراض جانبية، تواصل مع الطبيب فوراً</li>
                <li>احتفظ بهذه الروشتة للرجوع إليها</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center print:mt-4">
          <p className="font-bold print:text-sm">توقيع الطبيب</p>
          <div className="mt-8 w-48 h-1 border-t-2 border-gray-400 mx-auto print:mt-4 print:w-32"></div>
          <p className="mt-2 text-gray-600 print:text-sm print:mt-1">دكتور {doctor?.firstName} {doctor?.lastName}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-gray-200 text-center text-sm text-gray-500 print:mt-8 print:pt-2 print:text-xs">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p>هذه الروشتة رقمية ومرخصة من قبل وزارة الصحة - شُريان © 2025</p>
            <p className="mt-1 print:mt-0">للاستعلام: www.shuryan.com | support@shuryan.com</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p>رقم الترخيص: MED-2025-001</p>
          </div>
        </div>
        <div className="mt-4 text-xs print:mt-2">
          <p>الروشتة صالحة لمدة 30 يوماً من تاريخ الإصدار</p>
          <p className="mt-1 print:mt-0">تاريخ انتهاء الصلاحية: {prescription?.expiryDate || new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString('ar-EG')}</p>
        </div>
      </div>
    </div>
  );
});

export default PrintCard;
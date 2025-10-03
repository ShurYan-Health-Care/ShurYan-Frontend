import React from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
import { FaChartBar, FaFileMedical, FaCalendarAlt, FaUserInjured } from 'react-icons/fa';

const DoctorReportsPage = () => {
  const navigate = useNavigate();

  const reportTypes = [
    {
      title: 'تقارير المرضى',
      description: 'عرض تقارير المرضى وسجلاتهم الطبية',
      icon: <FaUserInjured className="text-primary text-xl" />,
      link: '#',
      color: 'bg-blue-50'
    },
    {
      title: 'تقارير المواعيد',
      description: 'تحليل إحصائيات المواعيد والحضور',
      icon: <FaCalendarAlt className="text-primary text-xl" />,
      link: '#',
      color: 'bg-green-50'
    },
    {
      title: 'تقارير المالية',
      description: 'تقارير الدخل والمصروفات',
      icon: <FaFileMedical className="text-primary text-xl" />,
      link: '#',
      color: 'bg-purple-50'
    },
    {
      title: 'تقارير الأداء',
      description: 'تحليل أداء الطبيب والإحصائيات',
      icon: <FaChartBar className="text-primary text-xl" />,
      link: '#',
      color: 'bg-yellow-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorNavbarPlus />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto pt-6 px-4">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">التقارير</h1>
                <p className="text-gray-600">عرض وتحليل التقارير الطبية والإحصائيات</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {reportTypes.map((report, index) => (
              <button 
                key={index} 
                onClick={() => navigate(report.link)} 
                className="group bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full text-left w-full"
              >
                <div className={`w-12 h-12 ${report.color} rounded-full flex items-center justify-center mb-4`}>
                  {report.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{report.title}</h3>
                <p className="text-gray-600 text-sm">{report.description}</p>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">التقارير الأخيرة</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نوع التقرير</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-09-30</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">تقرير المرضى الشهري</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">مكتمل</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1ebdb2]">
                      <button className="font-medium">عرض</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-09-25</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">تقرير المواعيد الأسبوعي</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">مكتمل</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1ebdb2]">
                      <button className="font-medium">عرض</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-09-20</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">تقرير الأداء الشهري</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">قيد المعالجة</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1ebdb2]">
                      <button className="font-medium">عرض</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorReportsPage;
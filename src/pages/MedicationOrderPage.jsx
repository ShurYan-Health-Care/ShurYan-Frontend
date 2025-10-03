import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPharmacies, addOrder } from '../utils/dataManager';
import Button from '../components/Button';
import Swal from 'sweetalert2';
import { FaShoppingCart, FaMapMarkerAlt, FaClock, FaPrescription, FaCheck, FaStar, FaTruck, FaCheckCircle } from 'react-icons/fa';

const MedicationOrderPage = () => {
  const { currentUser } = useAuth();
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [orderStatus, setOrderStatus] = useState('selecting'); // selecting, confirming, ordered, delivered
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Get available pharmacies
      const availablePharmacies = getPharmacies();
      setPharmacies(availablePharmacies);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setOrderStatus('confirming');
  };

  const handleConfirmOrder = () => {
    // In a real app, this would create an order
    setOrderStatus('ordered');
    
    // Simulate delivery after 3 seconds
    setTimeout(() => {
      setOrderStatus('delivered');
    }, 3000);
  };

  const handleNewOrder = () => {
    setSelectedPharmacy(null);
    setOrderStatus('selecting');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">جاري تحميل الصيدليات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">طلب الأدوية</h1>
        <p className="text-gray-600">اختر صيدلية لطلب أدويتك</p>
      </div>

      {orderStatus === 'selecting' && (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">الروشتة الطبية</h2>
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">الأدوية المطلوبة</h3>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  روشتة #RX-789456
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                  <div className="mr-4 flex-1">
                    <p className="font-medium">بنادول إكسترا</p>
                    <p className="text-sm text-gray-600">500mg - 2 حبة صباحاً ومساءً</p>
                  </div>
                  <span className="text-gray-500 text-sm">7 أيام</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                  <div className="mr-4 flex-1">
                    <p className="font-medium">أوميغا 3</p>
                    <p className="text-sm text-gray-600">1 كبسولة يومياً</p>
                  </div>
                  <span className="text-gray-500 text-sm">30 يوم</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">اختر صيدلية</h2>
            {pharmacies.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">لا توجد صيدليات متاحة حالياً</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pharmacies.map((pharmacy) => (
                  <div 
                    key={pharmacy.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleSelectPharmacy(pharmacy)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{pharmacy.name}</h3>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                        <FaCheckCircle className="ml-1" />
                        متوفر
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <FaMapMarkerAlt className="ml-1" />
                      <span>{pharmacy.address}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <FaStar className="text-yellow-400 ml-1" />
                      <span>{pharmacy.rating} تقييم</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="ml-1" />
                      <span>وقت التوصيل: {pharmacy.deliveryTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {orderStatus === 'confirming' && selectedPharmacy && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">تأكيد الطلب</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold mb-4">تفاصيل الطلب</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                    <div className="mr-4 flex-1">
                      <p className="font-medium">بنادول إكسترا</p>
                      <p className="text-sm text-gray-600">500mg - 2 حبة صباحاً ومساءً</p>
                    </div>
                    <span className="text-gray-500 text-sm">7 أيام</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                    <div className="mr-4 flex-1">
                      <p className="font-medium">أوميغا 3</p>
                      <p className="text-sm text-gray-600">1 كبسولة يومياً</p>
                    </div>
                    <span className="text-gray-500 text-sm">30 يوم</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold mb-4">معلومات الصيدلية</h3>
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="mr-4">
                    <h4 className="font-bold">{selectedPharmacy.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="ml-1" />
                      <span>{selectedPharmacy.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm">
                    <FaStar className="text-yellow-400 ml-1" />
                    <span>{selectedPharmacy.rating} تقييم</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaClock className="ml-1" />
                    <span>وقت التوصيل: {selectedPharmacy.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold mb-4">ملخص الطلب</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>عدد الأدوية</span>
                    <span>2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تكلفة الأدوية</span>
                    <span>120 ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تكلفة التوصيل</span>
                    <span>25 ج.م</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-bold text-lg">
                    <span>الإجمالي</span>
                    <span className="text-shuryan-primary">145 ج.م</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button onClick={handleConfirmOrder} className="bg-shuryan-primary hover:bg-shuryan-accent">
                  تأكيد الطلب ودفع 145 ج.م
                </Button>
                <Button variant="secondary" onClick={() => setOrderStatus('selecting')}>
                  اختيار صيدلية أخرى
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {orderStatus === 'ordered' && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTruck className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">جارٍ تجهيز طلبك</h2>
          <p className="text-gray-600 mb-6">طلبك قيد المعالجة وسيتم توصيله في أقرب وقت ممكن</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '50%'}}></div>
          </div>
          <p className="text-sm text-gray-500">قيد التجهيز - جارٍ التوصيل</p>
        </div>
      )}

      {orderStatus === 'delivered' && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تم توصيل طلبك</h2>
          <p className="text-gray-600 mb-6">تم توصيل طلبك بنجاح إلى عنوانك</p>
          <Button onClick={handleNewOrder}>
            طلب دواء آخر
          </Button>
        </div>
      )}
    </div>
  );
};

export default MedicationOrderPage;
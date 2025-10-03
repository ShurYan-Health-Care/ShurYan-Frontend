import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../components/Button';
import logo from '../assets/Logo.jpg';
import { FaLock } from 'react-icons/fa';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور وتأكيد كلمة المرور غير متطابقين';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      // Simulate password reset
      // In a real app, this would update the user's password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Swal.fire({
        icon: 'success',
        title: 'تم تغيير كلمة المرور بنجاح',
        text: 'يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة',
        confirmButtonText: 'تسجيل الدخول'
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في تغيير كلمة المرور',
        text: 'حدث خطأ أثناء تغيير كلمة المرور',
        confirmButtonText: 'حسناً'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src={logo} alt="Shuryan Logo" className="w-16 h-16 object-contain" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          تعيين كلمة مرور جديدة
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          أو{' '}
          <Link to="/login" className="font-medium text-shuryan-primary hover:text-shuryan-accent">
            تسجيل الدخول
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور الجديدة
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pr-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-shuryan-primary focus:border-shuryan-primary`}
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                تأكيد كلمة المرور الجديدة
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`block w-full pr-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-shuryan-primary focus:border-shuryan-primary`}
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center"
              >
                {loading ? 'جاري تغيير كلمة المرور...' : 'تغيير كلمة المرور'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">متطلبات كلمة المرور:</h3>
            <ul className="mt-2 text-sm text-gray-600 list-disc pr-5 space-y-1">
              <li>يجب أن تكون 8 أحرف على الأقل</li>
              <li>يجب أن تحتوي على أحرف وأرقام</li>
              <li>يجب أن تحتوي على أحرف كبيرة وصغيرة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../components/Button';
import logo from '../assets/Logo.jpg';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
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
      // Simulate password reset request
      // In a real app, this would send a reset link to the email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Swal.fire({
        icon: 'success',
        title: 'تم إرسال رابط إعادة تعيين كلمة المرور',
        text: 'يرجى التحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور',
        confirmButtonText: 'حسناً'
      });
      
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في إرسال الرابط',
        text: 'حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور',
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
          إعادة تعيين كلمة المرور
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pr-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-shuryan-primary focus:border-shuryan-primary`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center"
              >
                {loading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              سيتم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
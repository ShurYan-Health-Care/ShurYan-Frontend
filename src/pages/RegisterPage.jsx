import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaUserMd, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const handleGoogleLogin = () => {
    // TODO: تنفيذ تسجيل الدخول عبر جوجل
    console.log('تم النقر على تسجيل الدخول عبر جوجل');
  };

  const [userType, setUserType] = useState('patient');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: ''
  });
  const [error, setError] = useState('');
  const canvasRef = useRef(null);
  const particlesArray = useRef([]);
  const animationFrameId = useRef(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Particle effect setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fill();
      }
      
      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }
    
    // Initialize particles
    const initParticles = () => {
      particlesArray.current = [];
      const numberOfParticles = (canvas.height * canvas.width) / 9000;
      const colors = ['#00A89C', '#5FCBAF', '#1FBDB1'];
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 2) + 1;
        const x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
        const y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
        const directionX = (Math.random() * 0.4) - 0.2;
        const directionY = (Math.random() * 0.4) - 0.2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particlesArray.current.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };
    
    // Animation loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.current.length; i++) {
        particlesArray.current[i].update();
      }
    };
    
    initParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }
    
    if (userType === 'doctor' && !formData.specialty) {
      setError('الرجاء اختيار التخصص');
      return;
    }
    
    try {
      // Prepare user data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: userType,
        ...(userType === 'doctor' && { specialty: formData.specialty })
      };
      
      // Register user
      await register(userData);
      
      // Navigate to appropriate dashboard
      if (userType === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء إنشاء الحساب');
    }
  };

  return (
    <div className="register-page min-h-screen flex items-center justify-center p-4 bg-[#0f172a] font-['Tajawal']">
      {/* Particle Canvas Background */}
      <canvas 
        ref={canvasRef} 
        id="particle-canvas" 
        className="fixed top-0 left-0 w-full h-full z-0"
      />

      <main className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative z-10 mx-auto my-8">
        {/* Form Section */}
        <div className="p-8 md:p-12 order-1 lg:order-1 flex flex-col justify-center lg:rounded-r-2xl">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-3xl font-bold text-center text-[#1A2B32]">إنشاء حساب جديد</h1>
            <p className="text-lg text-center text-[#4A5B62] mt-3 mb-6">شُريان منصة الرعاية الصحية</p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Buttons */}
              <div className="max-w-sm mx-auto grid grid-cols-2 gap-3 mb-6">
                <div>
                  <input 
                    type="radio" 
                    id="patient" 
                    name="userType" 
                    value="patient" 
                    className="hidden" 
                    checked={userType === 'patient'}
                    onChange={() => setUserType('patient')}
                  />
                  <label 
                    htmlFor="patient" 
                    className={`flex items-center justify-center gap-2 w-full p-2.5 rounded-full cursor-pointer transition-colors border-2 ${
                      userType === 'patient' 
                        ? 'bg-[#00A89C] text-white border-[#00A89C] shadow-lg' 
                        : 'bg-white text-[#1A2B32] border-gray-300 hover:border-[#00A89C] hover:bg-gray-50'
                    }`}
                  >
                    <FaUser className="w-5 h-5" />
                    <span className="font-semibold text-base">مريض</span>
                  </label>
                </div>
                <div>
                  <input 
                    type="radio" 
                    id="doctor" 
                    name="userType" 
                    value="doctor" 
                    className="hidden"
                    checked={userType === 'doctor'}
                    onChange={() => setUserType('doctor')}
                  />
                  <label 
                    htmlFor="doctor" 
                    className={`flex items-center justify-center gap-2 w-full p-2.5 rounded-full cursor-pointer transition-colors border-2 ${
                      userType === 'doctor' 
                        ? 'bg-[#00A89C] text-white border-[#00A89C] shadow-lg' 
                        : 'bg-white text-[#1A2B32] border-gray-300 hover:border-[#00A89C] hover:bg-gray-50'
                    }`}
                  >
                    <FaUserMd className="w-5 h-5" />
                    <span className="font-semibold text-base">طبيب</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  placeholder="الاسم الأول" 
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00A89C] focus:shadow-[0_0_0_3px_rgba(0,168,156,0.2)] transition-all duration-200 placeholder-gray-500" 
                  required 
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  placeholder="الاسم الأخير" 
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00A89C] focus:shadow-[0_0_0_3px_rgba(0,168,156,0.2)] transition-all duration-200 placeholder-gray-500" 
                  required 
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="البريد الإلكتروني" 
                className="w-full px-4 py-3 bg-white border-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00A89C] focus:shadow-[0_0_0_3px_rgba(0,168,156,0.2)] transition-all duration-200 placeholder-gray-500" 
                required 
                value={formData.email}
                onChange={handleInputChange}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="كلمة المرور" 
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00A89C] focus:shadow-[0_0_0_3px_rgba(0,168,156,0.2)] transition-all duration-200 placeholder-gray-500" 
                  required 
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  placeholder="تأكيد كلمة المرور" 
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00A89C] focus:shadow-[0_0_0_3px_rgba(0,168,156,0.2)] transition-all duration-200 placeholder-gray-500" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              
              {userType === 'doctor' && (
                <div className="relative">
                  <select 
                    id="specialty" 
                    name="specialty" 
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00A89C] focus:shadow-[0_0_0_3px_rgba(0,168,156,0.2)] appearance-none transition-all duration-200 text-[#1A2B32]"
                    required
                    value={formData.specialty}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>اختر التخصص</option>
                    <option value="طب عام">طب عام</option>
                    <option value="باطنة">باطنة</option>
                    <option value="طب أطفال">طب أطفال</option>
                    <option value="جلدية">جلدية</option>
                    <option value="طب وجراحة العيون">طب وجراحة العيون</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-400">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="pt-3">
                <button 
                  type="submit" 
                  className="w-full text-white font-bold px-8 py-3 rounded-xl text-lg bg-gradient-to-r from-[#00A89C] via-[#00C4B6] to-[#1FBDB1] hover:from-[#008B82] hover:to-[#009B8F] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  إنشاء حساب
                </button>
              </div>

              <div className="flex items-center py-1">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-sm text-gray-500">أو</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              <button 
                type="button" 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-md font-bold google-btn"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                <span>المتابعة باستخدام جوجل</span>
              </button>
            </form>

            <p className="text-center text-sm text-[#4A5B62] mt-6">
              لديك حساب بالفعل؟ 
              <Link to="/login" className="font-bold text-[#00A89C] hover:underline">
                سجل الدخول
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Welcome Section */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 text-[#1A2B32] order-1 lg:order-2 bg-white lg:rounded-l-2xl">
          <div className="text-center">
            <h2 className="font-black text-[#00A89C] text-5xl">شُريان</h2>
            <p className="font-normal mt-4 text-[#4A5B62] text-3xl">منصة الرعاية الصحية</p>
            <div className="mt-8 opacity-90">
              <svg width="350" height="350" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#5FCBAF', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#1FBDB1', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path fill="url(#grad1)" d="M47.2,-69.5C61.4,-61.7,73.4,-48,77.7,-32.5C82,-17,78.6,0.2,71.5,15.1C64.4,30,53.5,42.6,40.7,53.4C27.9,64.2,13.9,73.1,0.1,73.1C-13.8,73,-27.6,64,-40.3,54.1C-53,44.2,-64.6,33.4,-70.5,19.9C-76.4,6.4,-76.6,-9.8,-69.9,-23.1C-63.2,-36.5,-49.6,-47,-36.5,-55.9C-23.4,-64.7,-11.7,-71.8,2.1,-74.6C15.9,-77.3,31.9,-77.3,47.2,-69.5Z" transform="translate(100 100)" />
              </svg>
            </div>
            <p className="mt-8 text-[#4A5B62] text-lg">
              احجز موعدك مع أفضل الأطباء بكل سهولة ويسر<br />
              من خلال منصتنا المتطورة.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;

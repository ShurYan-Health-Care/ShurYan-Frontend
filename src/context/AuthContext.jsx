import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserByEmail, addUser } from '../utils/dataManager';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Egyptian phone number validation (starts with 01, followed by 0-2, total 11 digits)
  const validateEgyptianPhone = (phone) => {
    const egyptianPhoneRegex = /^01[0-2]\d{8}$/;
    return egyptianPhoneRegex.test(phone);
  };

  // Check if user is already logged in on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('shuryan_currentUser');
    const loginTime = localStorage.getItem('shuryan_loginTime');
    
    if (storedUser && loginTime) {
      const now = new Date().getTime();
      const loginTimestamp = parseInt(loginTime);
      
      // Check if session is still valid (24 hours = 86400000 milliseconds)
      if (now - loginTimestamp < 86400000) {
        const user = JSON.parse(storedUser);
        // Ensure doctors have a profileCompleted property
        if (user.role === 'doctor' && user.profileCompleted === undefined) {
          user.profileCompleted = false;
        }
        setCurrentUser(user);
      } else {
        // Session expired, logout user
        localStorage.removeItem('shuryan_currentUser');
        localStorage.removeItem('shuryan_loginTime');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    const user = getUserByEmail(email);
    
    if (!user) {
      throw new Error('المستخدم غير موجود');
    }
    
    if (user.password !== password) {
      throw new Error('كلمة المرور غير صحيحة');
    }
    
    // Ensure doctors have a profileCompleted property
    const loggedInUser = { ...user };
    if (user.role === 'doctor' && user.profileCompleted === undefined) {
      loggedInUser.profileCompleted = false;
    }
    
    setCurrentUser(loggedInUser);
    localStorage.setItem('shuryan_currentUser', JSON.stringify(loggedInUser));
    localStorage.setItem('shuryan_loginTime', new Date().getTime().toString());
    return loggedInUser;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('shuryan_currentUser');
    localStorage.removeItem('shuryan_loginTime');
    localStorage.removeItem('doctorProfile'); // Also remove doctor profile data on logout
  };

  // Register function
  const register = async (userData) => {
    try {
      // Validate phone number for Egyptian format if provided
      if (userData.phone && !validateEgyptianPhone(userData.phone)) {
        throw new Error('رقم الهاتف غير صحيح. يجب أن يبدأ بـ 010 أو 011 أو 012 يتبعها 8 أرقام');
      }
      
      // Add user to localStorage using dataManager
      const newUser = {
        ...userData,
        id: `user_${Date.now()}`, // Generate unique ID
        role: userData.role && userData.role !== '' ? userData.role : 'patient',
        // For doctors, initialize profile completion status
        profileCompleted: userData.role === 'doctor' ? false : undefined
      };
      
      // Save user to localStorage
      addUser(newUser);
      
      setCurrentUser(newUser);
      localStorage.setItem('shuryan_currentUser', JSON.stringify(newUser));
      localStorage.setItem('shuryan_loginTime', new Date().getTime().toString());
      return newUser;
    } catch (error) {
      throw new Error(error.message || 'حدث خطأ أثناء إنشاء الحساب');
    }
  };

  // Update user profile completion status
  const updateProfileCompletion = (userId, profileData) => {
    const updatedUser = {
      ...currentUser,
      ...profileData,
      profileCompleted: true
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('shuryan_currentUser', JSON.stringify(updatedUser));
    
    // Update in the users list as well
    const users = JSON.parse(localStorage.getItem('shuryan_users') || '[]');
    const updatedUsers = users.map(user => 
      user.id === userId ? updatedUser : user
    );
    localStorage.setItem('shuryan_users', JSON.stringify(updatedUsers));
  };

  // New function to handle doctor profile completion
  const completeDoctorProfile = (profileData) => {
    if (currentUser && currentUser.role === 'doctor') {
      const updatedUser = {
        ...currentUser,
        ...profileData,
        profileCompleted: true
      };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('shuryan_currentUser', JSON.stringify(updatedUser));
      
      // Update in the users list as well
      const users = JSON.parse(localStorage.getItem('shuryan_users') || '[]');
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? { ...user, ...profileData, profileCompleted: true } : user
      );
      localStorage.setItem('shuryan_users', JSON.stringify(updatedUsers));
      
      // Also remove the doctorProfile from localStorage as it's now part of the user object
      localStorage.removeItem('doctorProfile');
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    updateProfileCompletion,
    completeDoctorProfile, // Add the new function to the context value
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
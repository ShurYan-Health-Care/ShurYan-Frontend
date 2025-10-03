import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variantClasses = {
    primary: 'bg-[#1ebdb2] hover:bg-[#19978e] text-white focus:ring-[#1ebdb2] transform transition-all duration-300 hover:scale-105',
    secondary: 'bg-[#14d1b3] hover:bg-[#0fb99d] text-white focus:ring-[#14d1b3] transform transition-all duration-300 hover:scale-105',
    danger: 'bg-[#ef4444] hover:bg-[#dc2626] text-white focus:ring-[#ef4444] transform transition-all duration-300 hover:scale-105',
    outline: 'border border-[#1ebdb2] text-[#1ebdb2] hover:bg-[#1ebdb2] hover:text-white focus:ring-[#1ebdb2] transform transition-all duration-300 hover:scale-105',
    success: 'bg-[#10b981] hover:bg-[#059669] text-white focus:ring-[#10b981] transform transition-all duration-300 hover:scale-105'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
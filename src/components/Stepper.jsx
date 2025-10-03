import React from 'react';

const Stepper = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className="w-full py-6">
      <div className="flex justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 right-0 left-0 h-2 bg-gray-200 z-0 rounded-full">
          <div 
            className="h-full bg-shuryan-primary transition-all duration-500 rounded-full"
            style={{ width: `${steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0}%` }}
          ></div>
        </div>
        
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center z-10">
            <button
              onClick={() => onStepChange(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                index <= currentStep 
                  ? 'bg-shuryan-primary text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-500'
              } ${
                index === currentStep 
                  ? 'ring-4 ring-shuryan-secondary animate-pulse' 
                  : ''
              }`}
              disabled={index > currentStep}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </button>
            <span className={`mt-2 text-sm font-medium text-center transition-colors duration-300 ${
              index <= currentStep ? 'text-shuryan-primary font-bold' : 'text-gray-500'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
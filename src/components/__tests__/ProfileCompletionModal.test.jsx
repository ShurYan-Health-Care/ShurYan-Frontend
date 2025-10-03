import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileCompletionModal from '../ProfileCompletionModal';

// Mock the Button component since it's imported
jest.mock('../Button', () => {
  return function MockButton({ children, onClick, type, variant, className }) {
    return (
      <button 
        onClick={onClick} 
        type={type}
        className={className}
        data-variant={variant}
      >
        {children}
      </button>
    );
  };
});

describe('ProfileCompletionModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal with required fields', () => {
    render(
      <ProfileCompletionModal 
        onClose={mockOnClose} 
        onSubmit={mockOnSubmit} 
      />
    );

    // Check that modal title is rendered
    expect(screen.getByText('إكمال الملف الشخصي')).toBeInTheDocument();
    
    // Check that required fields are rendered
    expect(screen.getByText('صورة الهوية الوطنية *')).toBeInTheDocument();
    expect(screen.getByText('صورة رخصة مزاولة المهنة *')).toBeInTheDocument();
    expect(screen.getByText('صورة عضوية النقابة الطبية *')).toBeInTheDocument();
    expect(screen.getByText('صورة شهادة التخرج *')).toBeInTheDocument();
    expect(screen.getByText('سنوات الخبرة *')).toBeInTheDocument();
    
    // Check that optional fields are rendered
    expect(screen.getByText('الصورة الشخصية')).toBeInTheDocument();
    expect(screen.getByText('تاريخ الميلاد')).toBeInTheDocument();
    expect(screen.getByText('الجنس')).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', () => {
    render(
      <ProfileCompletionModal 
        onClose={mockOnClose} 
        onSubmit={mockOnSubmit} 
      />
    );

    const submitButton = screen.getByText('إرسال للمراجعة');
    fireEvent.click(submitButton);

    // Check that validation errors are shown for required fields
    expect(screen.getByText('صورة الهوية الوطنية مطلوبة')).toBeInTheDocument();
    expect(screen.getByText('صورة رخصة مزاولة المهنة مطلوبة')).toBeInTheDocument();
    expect(screen.getByText('صورة عضوية النقابة الطبية مطلوبة')).toBeInTheDocument();
    expect(screen.getByText('صورة شهادة التخرج مطلوبة')).toBeInTheDocument();
    expect(screen.getByText('سنوات الخبرة مطلوبة')).toBeInTheDocument();
    
    // onSubmit should not be called when validation fails
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('calls onSubmit when form is valid', () => {
    render(
      <ProfileCompletionModal 
        onClose={mockOnClose} 
        onSubmit={mockOnSubmit} 
      />
    );

    // Fill in required text field
    const experienceInput = screen.getByPlaceholderText('أدخل عدد سنوات الخبرة');
    fireEvent.change(experienceInput, { target: { value: '10' } });

    // Create mock files for required file inputs
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    
    const nationalIdInput = screen.getByLabelText('صورة الهوية الوطنية *');
    fireEvent.change(nationalIdInput, { target: { files: [file] } });

    const licenseInput = screen.getByLabelText('صورة رخصة مزاولة المهنة *');
    fireEvent.change(licenseInput, { target: { files: [file] } });

    const syndicateInput = screen.getByLabelText('صورة عضوية النقابة الطبية *');
    fireEvent.change(syndicateInput, { target: { files: [file] } });

    const graduationInput = screen.getByLabelText('صورة شهادة التخرج *');
    fireEvent.change(graduationInput, { target: { files: [file] } });

    const submitButton = screen.getByText('إرسال للمراجعة');
    fireEvent.click(submitButton);

    // onSubmit should be called with form data
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
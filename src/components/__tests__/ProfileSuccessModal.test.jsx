import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileSuccessModal from '../ProfileSuccessModal';

// Mock the Button component
jest.mock('../Button', () => {
  return function MockButton({ children, onClick }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  };
});

describe('ProfileSuccessModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders success modal with correct content', () => {
    render(<ProfileSuccessModal onClose={mockOnClose} />);

    // Check that modal title is rendered
    expect(screen.getByText('تم استلام طلبك بنجاح')).toBeInTheDocument();
    
    // Check that success message is rendered
    expect(screen.getByText('طلبك الآن قيد المراجعة من قبل الإدارة.')).toBeInTheDocument();
    
    // Check that time estimate is rendered
    expect(screen.getByText('ستستغرق عملية التحقق 3-5 أيام عمل. سنقوم بإعلامك عبر البريد الإلكتروني بمجرد اكتمال المراجعة.')).toBeInTheDocument();
    
    // Check that note is rendered
    expect(screen.getByText('ملاحظة: قد نتصل بك لطلب مستندات إضافية إذا لزم الأمر لضمان أعلى معايير الثقة والأمان.')).toBeInTheDocument();
    
    // Check that auto-accept message is rendered
    expect(screen.getByText('✅ في الوقت الحالي، تم قبول طلبك تلقائيًا حتى يصبح API الإداري جاهزًا.')).toBeInTheDocument();
    
    // Check that close button is rendered
    expect(screen.getByText('إغلاق')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<ProfileSuccessModal onClose={mockOnClose} />);
    
    const closeButton = screen.getByText('إغلاق');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
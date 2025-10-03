import React, { useState, useRef, useEffect } from 'react';

export const Combobox = ({ 
  name, 
  options, 
  displayValue, 
  defaultValue, 
  onChange,
  children,
  className = '',
  multiple = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [selectedValues, setSelectedValues] = useState(defaultValue || []);
  const [filterValue, setFilterValue] = useState('');
  const comboboxRef = useRef(null);

  // Filter options based on input
  const filteredOptions = options.filter(option => 
    filterValue === '' || 
    (option?.name && option.name.toLowerCase().includes(filterValue.toLowerCase()))
  );

  // Handle selection
  const handleSelect = (value) => {
    if (multiple) {
      // For multi-select, toggle the selected value
      const newSelectedValues = selectedValues.some(v => v.name === value.name)
        ? selectedValues.filter(v => v.name !== value.name)
        : [...selectedValues, value];
      
      setSelectedValues(newSelectedValues);
      if (onChange) {
        onChange({ target: { name, value: newSelectedValues } });
      }
    } else {
      // For single select
      setSelectedValue(value);
      setIsOpen(false);
      setFilterValue('');
      if (onChange) {
        onChange({ target: { name, value } });
      }
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
    setIsOpen(true);
  };

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Display value for multi-select
  const displayMultiValue = () => {
    if (selectedValues.length === 0) return "اختر من القائمة";
    if (selectedValues.length === 1) return displayValue(selectedValues[0]);
    return `${selectedValues.length} عناصر محددة`;
  };

  return (
    <div ref={comboboxRef} className={`relative ${className}`}>
      <div className="relative w-full">
        <input
          type="text"
          value={multiple ? filterValue : (filterValue || (selectedValue ? displayValue(selectedValue) : ''))}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          placeholder={multiple ? displayMultiValue() : (selectedValue ? displayValue(selectedValue) : "اختر من القائمة")}
          readOnly={multiple}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-400">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
          <div className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = multiple 
                  ? selectedValues.some(v => v.name === option.name)
                  : selectedValue?.name === option.name;
                
                return (
                  <div 
                    key={index}
                    className={`px-4 py-2 cursor-pointer flex items-center ${isSelected ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
                    onClick={() => handleSelect(option)}
                  >
                    {multiple && (
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // Handled by parent div click
                        className="mr-2 h-4 w-4 text-[#00A89C] focus:ring-[#00A89C] border-gray-300 rounded"
                      />
                    )}
                    {children ? children(option) : option.name}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-2 text-gray-500">لا توجد نتائج</div>
            )}
          </div>
        </div>
      )}
      
      {multiple ? (
        <input 
          type="hidden" 
          name={name} 
          value={selectedValues.map(v => v.name).join(',')} 
        />
      ) : (
        <input 
          type="hidden" 
          name={name} 
          value={selectedValue ? selectedValue.name : ''} 
        />
      )}
    </div>
  );
};

export const ComboboxOption = ({ value, children }) => {
  return children;
};

export const ComboboxLabel = ({ children }) => {
  return <span>{children}</span>;
};

export const Field = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};

export const Label = ({ children, className = '' }) => {
  return <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>{children}</label>;
};
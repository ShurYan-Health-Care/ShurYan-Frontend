import React, { useState, useRef } from 'react';

const CircularProfileImage = ({ name, onImageChange, initialImage, initialFileName }) => {
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);
  const hasImage = initialImage || initialFileName;

  const handleFileChange = (e) => {
    // Pass the event directly to the parent handler
    onImageChange(e);
    setShowPopup(false);
  };

  const handleRemoveImage = () => {
    // Create a mock event object to simulate removing a file
    const mockEvent = {
      target: {
        name: name,
        files: []
      }
    };
    onImageChange(mockEvent);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowPopup(false);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* Circular image container */}
      <div 
        className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={(e) => {
          // Prevent triggering when clicking on the popup itself
          if (!e.target.closest('.popup-menu')) {
            if (hasImage) {
              setShowPopup(!showPopup);
            } else {
              triggerFileInput();
            }
          }
        }}
      >
        {initialImage ? (
          <img 
            src={initialImage} 
            alt="Profile Preview" 
            className="w-full h-full object-cover"
          />
        ) : initialFileName ? (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="text-xs text-center px-2">صورة موجودة</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="text-xs text-center px-2">اضغط لإضافة صورة</span>
          </div>
        )}
      </div>

      {/* Popup menu */}
      {showPopup && hasImage && (
        <div className="popup-menu absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <div className="py-1">
            <button
              onClick={triggerFileInput}
              className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-end"
            >
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              إضافة صورة جديدة
            </button>
            <button
              onClick={handleRemoveImage}
              className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center justify-end"
            >
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              حذف الصورة
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-end border-t border-gray-100 mt-1"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        name={name}
      />

      {/* Click outside to close popup */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowPopup(false)}
        ></div>
      )}
    </div>
  );
};

export default CircularProfileImage;
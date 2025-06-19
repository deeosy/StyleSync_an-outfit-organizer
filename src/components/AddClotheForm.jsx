import React, { useState, useRef } from 'react';
import useThemeStore from '../store/themeStore';

// Component to handle adding a new clothing item with a form
function AddClotheForm({ onSave }) {
  // Theme store integration
  const { getTheme } = useThemeStore();
  const theme = getTheme();

  // State to manage all form inputs in a single object
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'tops', // Default category
    color: '#000000', // Default color
    imageUrl: null, // Store the uploaded image URL
    notes: '',
  });
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [originalImage, setOriginalImage] = useState(null); // State for original image before bg removal
  const [isProcessing, setIsProcessing] = useState(false); // State to track background removal process
  const [processingError, setProcessingError] = useState(null); // State to track errors
  const [validationErrors, setValidationErrors] = useState({}); // State for validation errors
  const [showValidationPrompt, setShowValidationPrompt] = useState(false); // State to show validation prompt
  const fileInputRef = useRef(); // Ref for the file input to clear it
  const cameraInputRef = useRef(); // Ref for camera input
  const galleryInputRef = useRef(); // Ref for gallery input

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    if (!newItem.name.trim()) {
      errors.name = 'Item name is required';
    }
    
    if (!newItem.category) {
      errors.category = 'Please select a category';
    }
    
    if (!newItem.color || newItem.color === '') {
      errors.color = 'Please choose a color';
    }
    
    if (!newItem.imageUrl && !imagePreview) {
      errors.image = 'Please add a photo of the item';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle file change for image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsProcessing(true);
      setProcessingError(null);
      setValidationErrors(prev => ({ ...prev, image: null })); // Clear image error
      
      // First, create a preview of the original image
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      try {
        // Call remove.bg API to remove the background
        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('size', 'auto');
        
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': 'MqTdnab5jsQNbgRbzt2mhQCn', // Replace with your actual API key
          },
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`Background removal failed with status: ${response.status}`);
        }
        
        // Get the processed image with removed background
        const data = await response.blob();
        const processedImageUrl = URL.createObjectURL(data);
        
        setImagePreview(processedImageUrl);
        setNewItem({ ...newItem, imageUrl: new File([data], file.name, { type: 'image/png' }) });
      } catch (error) {
        console.error('Error removing background:', error);
        setProcessingError('Failed to remove background. Using original image.');
        
        // Fall back to the original image if background removal fails
        setImagePreview(originalImage);
        setNewItem({ ...newItem, imageUrl: file });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Handle camera capture
  const handleCameraCapture = () => {
    cameraInputRef.current.click();
  };

  // Handle gallery selection
  const handleGallerySelection = () => {
    galleryInputRef.current.click();
  };

  // Handle removing the uploaded image
  const handleRemoveImage = () => {
    setImagePreview(null); // Clear image preview
    setOriginalImage(null); // Clear original image
    setNewItem({ ...newItem, imageUrl: null }); // Clear image URL in state
    if (cameraInputRef.current) cameraInputRef.current.value = ''; // Reset camera input
    if (galleryInputRef.current) galleryInputRef.current.value = ''; // Reset gallery input
    setProcessingError(null); // Clear any error messages
  };

  // Toggle between original and background-removed images
  const toggleImageView = () => {
    if (processingError) return; // Don't toggle if there was an error
    
    if (imagePreview === originalImage) {
      // If showing original, switch to processed
      setImagePreview(URL.createObjectURL(newItem.imageUrl));
    } else {
      // If showing processed, switch to original
      setImagePreview(originalImage);
    }
  };

  // Handle input changes with validation clearing
  const handleInputChange = (field, value) => {
    setNewItem({ ...newItem, [field]: value });
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setShowValidationPrompt(true);
      return;
    }

    setShowValidationPrompt(false);

    if (newItem.name.trim()) { // Validate that the name field is not empty
      let imageUrl = null;
      if (newItem.imageUrl) {  //upload image to Imgur
        setIsProcessing(true);
        const formData = new FormData();
        formData.append('image', newItem.imageUrl);
        
        try {
          const response = await fetch('https://api.imgur.com/3/upload', {
            method: 'POST',
            headers: {
              'Authorization': 'Client-ID 387ee19ec8efbf6',
              'Accept': 'application/json'
            },
            body: formData
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Imgur response:', data);
          
          if (data.success) {
            imageUrl = data.data.link;
            console.log('Image URL:', imageUrl);
          } else {
            console.error('Imgur upload failed:', data);
            setProcessingError('Failed to upload image to Imgur.');
          }
        } catch (error) {
          console.error('Error uploading to Imgur:', error);
          setProcessingError('Error uploading image. Please try again.');
        } finally {
          setIsProcessing(false);
        }
      }
      
      // Create the item data with all required fields
      const itemData = {
        name: newItem.name.trim(),
        category: newItem.category,
        color: newItem.color,
        imageUrl: imageUrl || '',
        notes: newItem.notes || '',
        lastWorn: 'Never',
        createdAt: new Date()
      };

      // Call onSave with the properly structured data
      if (onSave) {
        onSave(itemData);
      }

      // Reset form after submission
      setNewItem({
        name: '',
        category: 'tops',
        color: '#000000',
        imageUrl: null,
        notes: '',
      });
      setImagePreview(null);
      setOriginalImage(null);
      setProcessingError(null);
      setValidationErrors({});
      setShowValidationPrompt(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:px-20">
      {/* Validation Prompt */}
      {showValidationPrompt && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center mb-2">
            <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h4 className="text-red-800 font-medium">Please complete all required fields:</h4>
          </div>
          <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
            {Object.values(validationErrors).map((error, index) => 
              error && <li key={index}>{error}</li>
            )}
          </ul>
        </div>
      )}

      {/* Photo Section */}
      <div className="mb-6">
        {/* Section label*/}
        <h3 className={`font-medium mb-2 ${theme.textPrimary} flex items-center`}>
          Photo 
          <span className="text-red-500 ml-1">*</span>
          {validationErrors.image && (
            <span className="text-red-500 text-sm ml-2">({validationErrors.image})</span>
          )}
        </h3>
        {/* Upload area*/}
        <div className={`border-2 border-dashed ${validationErrors.image ? 'border-red-300' : theme.border} ${theme.backgroundSecondary || theme.light} rounded-lg p-4 flex flex-col items-center justify-center h-[200px] transition-colors duration-200`}>
          {!imagePreview ? (
            isProcessing ? (
              <div className="flex flex-col items-center">
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme.primary.replace('bg-', 'border-')} mb-2`}></div>
                <p className={`text-sm ${theme.textSecondary}`}>Processing your image...</p>
              </div>
            ) : (
                 <div className="w-full">
                {/* Upload options */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  {/* Camera Button */}
                  <button
                    type="button"
                    onClick={handleCameraCapture}
                    className={`flex flex-col items-center justify-center px-6 py-3 ${theme.backgroundSecondary || theme.light}  ${theme.textPrimary} rounded-lg transition-transform duration-200 hover:scale-105 w-full max-w-[200px]`}
                  >
                    <svg className="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium">Take Photo</span>
                  </button>

                  {/* Gallery Button */}
                  <button
                    type="button"
                    onClick={handleGallerySelection}
                    className={`flex flex-col items-center justify-center px-6 py-3 ${theme.backgroundSecondary || theme.light}  ${theme.textPrimary} rounded-lg transition-transform duration-200 hover:scale-105 w-full max-w-[200px]`}
                  >
                    <svg className="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Choose from Gallery</span>
                  </button>
                </div>
                
                
                {/* Upload instructions */}
                <p className={`text-xs ${theme.textSecondary} text-center mt-4`}>
                  PNG, JPG or GIF (MAX. 5MB)
                </p>

                {/* Hidden file inputs */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  capture="environment" // This suggests using the back camera on mobile devices
                  onChange={handleFileChange}
                />
                <input
                  ref={galleryInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            )
          ) : (
            // Display uploaded image with remove button
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Item preview"
                className="w-full h-full object-contain rounded-lg"
              />
              {originalImage && !processingError && (
                <button
                  type="button"
                  onClick={toggleImageView}
                  className={`absolute top-2 left-2 ${theme.secondary} ${theme.secondaryHover} text-white p-1 rounded-full flex items-center justify-center w-8 h-8 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm`}
                  title="Toggle between original and background-removed image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
                title="Remove image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        {processingError && (
          <p className="text-sm text-red-500 mt-1">{processingError}</p>
        )}
        {imagePreview && !processingError && (
          <p className={`text-xs ${theme.textMuted} mt-1`}>
            Click the swap icon to toggle between original and background-removed image.
          </p>
        )}
      </div>

      {/* About Section */}
      <div className="mb-6">
        {/* Section label*/}
        <h3 className={`font-medium mb-2 ${theme.textPrimary}`}>About</h3>
        {/* Form fields container*/}
        <div className={`flex flex-col gap-4 ${theme.backgroundSecondary || theme.light} border ${theme.border} p-4 rounded-sm transition-colors duration-200`}>
          {/* Item Name field */}
          <div>
            <label className={`block text-sm font-medium ${theme.textSecondary} mb-1 flex items-center`}>
              Item Name 
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Brown T-Shirt"
              className={`w-full border-b ${validationErrors.name ? 'border-red-500' : theme.border} ${theme.ring.replace('focus:ring', 'focus:border')} outline-none py-1 ${theme.surface} ${theme.textPrimary} placeholder:${theme.textMuted} transition-colors duration-200`}
            />
            {validationErrors.name && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
            )}
          </div>
          {/* Category field (dropdown) */}
          <div>
            <label className={`block text-sm font-medium ${theme.textSecondary} mb-1 flex items-center`}>
              Category 
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={newItem.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full border-b ${validationErrors.category ? 'border-red-500' : theme.border} ${theme.ring.replace('focus:ring', 'focus:border')} outline-none py-1 ${theme.surface} ${theme.textPrimary} transition-colors duration-200`}
            >
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="outerwear">Outerwear</option>
              <option value="shoes">Shoes</option>
              <option value="jump suit">Jump suit</option>
              <option value="accessories">Accessories</option>
            </select>
            {validationErrors.category && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>
            )}
          </div>
          {/* Color field */}
          <div>
            <label className={`block text-sm font-medium ${theme.textSecondary} mb-1 flex items-center`}>
              Color 
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={newItem.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className={`w-10 h-10 border-none rounded cursor-pointer ${validationErrors.color ? 'ring-2 ring-red-500' : ''}`}
              />
              <input
                type="text"
                value={newItem.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                placeholder="Choose a color"
                className={`w-full placeholder:${theme.textMuted} outline-none py-1 ${theme.surface} ${theme.textPrimary} transition-colors duration-200`}
              />
            </div>
            {validationErrors.color && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.color}</p>
            )}
          </div>
          {/* Notes field */}
          <div>
            <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>Notes (Optional)</label>
            <textarea
              value={newItem.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add more details about this item, brand, fabric type, size."
              className={`w-full border ${theme.border} ${theme.ring.replace('focus:ring', 'focus:border')} outline-none py-1 px-3 text-sm md:text-md resize-none ${theme.surface} ${theme.textPrimary} placeholder:${theme.textMuted} transition-colors duration-200`}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mb-6">
        <h3 className={`font-medium mb-2 ${theme.textPrimary}`}>Preview</h3>
        {/* Preview card*/}
        <div className={`flex items-center gap-4 ${theme.backgroundSecondary || theme.light} rounded-sm p-4 border ${theme.border} transition-colors duration-200`}>
          <div
            className={`w-30 h-30 ${theme.backgroundSecondary || theme.light} rounded-sm flex items-center justify-center border ${theme.border}`}
            style={{ backgroundColor: newItem.color }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Item preview"
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              // Display item name or fallback
              <span className={`text-xs text-center px-1 ${theme.textPrimary}`}>{newItem.name || 'Item'}</span>
            )}
          </div>
          {/* Item details: flex column layout */}
          <div className="flex flex-col">
            <p className={`text-sm font-medium ${theme.textPrimary}`}>{newItem.name || 'Brown T-Shirt'}</p>
            <p className={`text-xs ${theme.textSecondary}`}>{newItem.category || 'Tops'}</p>
            {processingError && (
              <p className="text-xs text-yellow-600 mt-1">Using original image (background removal failed)</p>
            )}
            {!processingError && imagePreview && (
              <p className="text-xs text-green-600 mt-1">Background removed</p>
            )}
          </div>
        </div>
      </div>

      {/* Save Button: theme colors, white text, full-width, rounded, 2-unit padding, 10-unit horizontal margin */}
      <button
        type="submit"
        disabled={isProcessing}
        className={`${
          isProcessing 
            ? `${theme.backgroundSecondary || theme.light} ${theme.textMuted} cursor-not-allowed` 
            : `${theme.primary} ${theme.primaryHover} text-white`
        } font-medium mx-10 py-2 rounded transition-all duration-200 flex justify-center items-center transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md disabled:transform-none`}
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          'Save Item'
        )}
      </button>
    </form>
  );
}

export default AddClotheForm;
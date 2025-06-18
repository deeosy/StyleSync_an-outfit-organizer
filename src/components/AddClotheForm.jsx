import React, { useState, useRef } from 'react';
import useThemeStore from '../store/themeStore';
import addPic from '../icons/add-picture-icon.png';

// Component to handle adding a new clothing item with a form
function AddClotheForm({ onSave }) {
  // Theme store integration
  const { getTheme } = useThemeStore();
  const theme = getTheme();

  // State to manage all form inputs in a single object
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'tops', // Default category
    color: '', // Default color
    imageUrl: null, // Store the uploaded image URL
    notes: '',
  });
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [originalImage, setOriginalImage] = useState(null); // State for original image before bg removal
  const [isProcessing, setIsProcessing] = useState(false); // State to track background removal process
  const [processingError, setProcessingError] = useState(null); // State to track errors
  const [showCamera, setShowCamera] = useState(false); // State to show camera interface
  const [capturedPhoto, setCapturedPhoto] = useState(null); // State for captured photo preview
  const [cameraError, setCameraError] = useState(null); // State for camera errors
  const fileInputRef = useRef(); // Ref for the file input to clear it
  const videoRef = useRef(); // Ref for camera video stream
  const canvasRef = useRef(); // Ref for capturing photo from video

  // Handle file change for image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsProcessing(true);
      setProcessingError(null);
      
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

  // Handle removing the uploaded image
  const handleRemoveImage = () => {
    stopCamera(); // Stop camera if running
    setCapturedPhoto(null); // Clear captured photo
    setImagePreview(null); // Clear image preview
    setOriginalImage(null); // Clear original image
    setNewItem({ ...newItem, imageUrl: null }); // Clear image URL in state
    fileInputRef.current.value = ''; // Reset file input
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

  // Start camera for taking photos
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Unable to access camera. Please check permissions or use file upload instead.');
    }
  };

  // Stop camera and clean up
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setCapturedPhoto(null);
    setCameraError(null);
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      // Get the captured image as data URL for preview
      const capturedImageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedPhoto(capturedImageDataUrl);
      
      // Stop the camera since we have the photo
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };

  // Process the captured photo (called after user confirms)
  const processCapturedPhoto = async () => {
    if (capturedPhoto && canvasRef.current) {
      // Convert the captured photo to a blob/file
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
          
          // Hide camera interface and captured photo preview
          setShowCamera(false);
          setCapturedPhoto(null);
          
          // Process the captured image the same way as uploaded files
          setIsProcessing(true);
          setProcessingError(null);
          
          // Create preview of original image
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
                'X-Api-Key': 'MqTdnab5jsQNbgRbzt2mhQCn',
              },
              body: formData,
            });
            
            if (!response.ok) {
              throw new Error(`Background removal failed with status: ${response.status}`);
            }
            
            const data = await response.blob();
            const processedImageUrl = URL.createObjectURL(data);
            
            setImagePreview(processedImageUrl);
            setNewItem({ ...newItem, imageUrl: new File([data], file.name, { type: 'image/png' }) });
          } catch (error) {
            console.error('Error removing background:', error);
            setProcessingError('Failed to remove background. Using original image.');
            
            // Fall back to the original image
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setNewItem({ ...newItem, imageUrl: file });
          } finally {
            setIsProcessing(false);
          }
        }
      }, 'image/jpeg', 0.9);
    }
  };

  // Retake photo (go back to camera)
  const retakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        category: newItem.category || 'tops',
        color: newItem.color || '#000000',
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
        color: '',
        imageUrl: null,
        notes: '',
      });
      setImagePreview(null);
      setOriginalImage(null);
      setProcessingError(null);
      setCapturedPhoto(null);
      stopCamera(); // Stop camera if running
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:px-20">
      {/* Photo Section */}
      <div className="mb-6">
        {/* Section label*/}
        <h3 className={`font-medium mb-2 ${theme.textPrimary}`}>Photo</h3>
        {/* Upload area*/}
        <div className={`border-2 border-dashed ${theme.border} ${theme.backgroundSecondary || theme.light} rounded-lg p-4 flex flex-col items-center justify-center h-[200px] transition-colors duration-200`}>
          {!imagePreview && !showCamera && !capturedPhoto ? (
            isProcessing ? (
              <div className="flex flex-col items-center">
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme.primary.replace('bg-', 'border-')} mb-2`}></div>
                <p className={`text-sm ${theme.textSecondary}`}>Processing your image...</p>
              </div>
            ) : (
              <div className="w-full">
                {/* Upload options */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-4">
                  {/* File Upload */}
                  <label className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105">
                    <img src={addPic} alt="Upload icon" className="h-[30px] mb-2" />
                    <span className={`text-sm font-semibold ${theme.textPrimary}`}>Upload Photo</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  
                  {/* Camera Option */}
                  <div className={`w-px h-12 ${theme.border} hidden sm:block`}></div>
                  <div className={`w-12 h-px ${theme.border} sm:hidden`}></div>
                  
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
                  >
                    <svg className="h-[30px] w-[30px] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className={`text-sm font-semibold ${theme.textPrimary}`}>Take Photo</span>
                  </button>
                </div>
                
                {/* Upload instructions */}
                <p className={`text-xs ${theme.textSecondary} text-center`}>
                  PNG, JPG or GIF (MAX. 5MB)
                </p>
              </div>
            )
          ) : showCamera ? (
            // Camera interface with live preview
            <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
              {/* Live camera preview */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Camera viewfinder overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-2 border-white border-dashed rounded-lg w-3/4 h-3/4 flex items-center justify-center">
                  <p className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                    📷 Position clothing item in frame
                  </p>
                </div>
              </div>
              
              {/* Camera status indicator */}
              <div className="absolute top-2 left-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                  LIVE
                </span>
              </div>
              
              {/* Camera controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className={`${theme.primary} ${theme.primaryHover} text-white p-4 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-xl border-4 border-white`}
                  title="Take Photo"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full border-2 border-white transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-xl"
                  title="Cancel"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Instructions */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                <p className="text-white text-xs text-center bg-black bg-opacity-50 px-3 py-1 rounded-full">
                  Tap the shutter button to capture
                </p>
              </div>
            </div>
          ) : capturedPhoto ? (
            // Captured photo preview - let user confirm or retake
            <div className="relative w-full h-full">
              <img
                src={capturedPhoto}
                alt="Captured photo preview"
                className="w-full h-full object-contain rounded-lg"
              />
              
              {/* Preview overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-lg p-4 text-center">
                  <p className={`text-sm font-medium ${theme.textPrimary} mb-3`}>
                    📷 Photo captured! How does it look?
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={retakePhoto}
                      className={`px-4 py-2 ${theme.backgroundSecondary || theme.light} ${theme.textSecondary} rounded border ${theme.border} transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm`}
                    >
                      📸 Retake
                    </button>
                    <button
                      type="button"
                      onClick={processCapturedPhoto}
                      className={`px-4 py-2 ${theme.primary} ${theme.primaryHover} text-white rounded transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm`}
                    >
                      ✓ Use Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
        {cameraError && (
          <p className="text-sm text-red-500 mt-1">{cameraError}</p>
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
            <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>Item Name</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Brown T-Shirt"
              className={`w-full border-b ${theme.border} ${theme.ring.replace('focus:ring', 'focus:border')} outline-none py-1 ${theme.surface} ${theme.textPrimary} placeholder:${theme.textMuted} transition-colors duration-200`}
            />
          </div>
          {/* Category field (dropdown) */}
          <div>
            <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>Category</label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className={`w-full border-b ${theme.border} ${theme.ring.replace('focus:ring', 'focus:border')} outline-none py-1 ${theme.surface} ${theme.textPrimary} transition-colors duration-200`}
            >
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="outerwear">Outerwear</option>
              <option value="shoes">Shoes</option>
              <option value="jump suit">Jump suit</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          {/* Color field */}
          <div>
            <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                className={`w-10 h-10 border-none rounded cursor-pointer`}
              />
              <input
                type="text"
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                placeholder="Choose a color"
                className={`w-full placeholder:${theme.textMuted} outline-none py-1 ${theme.surface} ${theme.textPrimary} transition-colors duration-200`}
              />
            </div>
          </div>
          {/* Notes field */}
          <div>
            <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>Notes (Optional)</label>
            <textarea
              value={newItem.notes}
              onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
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
          'Save'
        )}
      </button>
    </form>
  );
}

export default AddClotheForm;
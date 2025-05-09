// // components/AddClotheForm.jsx
// import React, { useState, useRef } from 'react';
// import addPic from '../icons/add-picture-icon.png';


// // Component to handle adding a new clothing item with a form
// function AddClotheForm({ onSave }) {
//   // State to manage all form inputs in a single object
//   const [newItem, setNewItem] = useState({
//     name: '',
//     category: 'tops', // Default category
//     color: '', // Default color ()
//     imageUrl: null, // Store the uploaded image URL
//     notes: '',
//   });
//   const [imagePreview, setImagePreview] = useState(null); // State for image preview
//   const fileInputRef = useRef(); // Ref for the file input to clear it

//   // Handle file change for image upload
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result); // Update image preview
//         setNewItem({ ...newItem, imageUrl: file }); // Update image URL in state
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle removing the uploaded image
//   const handleRemoveImage = () => {
//     setImagePreview(null); // Clear image preview
//     setNewItem({ ...newItem, imageUrl: null }); // Clear image URL in state
//     fileInputRef.current.value = ''; // Reset file input
//   };

//   // Handle form submission with validation
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newItem.name.trim()) { // Validate that the name field is not empty
//       let imageUrl = null;
//       if (newItem.imageUrl) {  //upload image to Imgur
//         const formData = new FormData();
//         formData.append('image', newItem.imageUrl);
        
//         try {
//           const response = await fetch('https://api.imgur.com/3/upload', {
//             method: 'POST',
//             headers: {
//               'Authorization': 'Client-ID 387ee19ec8efbf6',
//               'Accept': 'application/json'
//             },
//             body: formData
//           });
          
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
          
//           const data = await response.json();
//           console.log('Imgur response:', data);
          
//           if (data.success) {
//             imageUrl = data.data.link;
//             console.log('Image URL:', imageUrl);
//           } else {
//             console.error('Imgur upload failed:', data);
//           }
//         } catch (error) {
//           console.error('Error uploading to Imgur:', error);
//         }
//       }
      
//       // Create the item data with all required fields
//       const itemData = {
//         name: newItem.name.trim(),
//         category: newItem.category || 'tops',
//         color: newItem.color || '#000000',
//         imageUrl: imageUrl || '',
//         notes: newItem.notes || '',
//         lastWorn: 'Never',
//         createdAt: new Date()
//       };

//       // Call onSave with the properly structured data
//       if (onSave) {
//         onSave(itemData);
//       }

//       // Reset form after submission
//       setNewItem({
//         name: '',
//         category: 'tops',
//         color: '',
//         imageUrl: null,
//         notes: '',
//       });
//       setImagePreview(null);
      
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col md:px-20">
//       {/* Photo Section */}
//       <div className="mb-6">
//         {/* Section label*/}
//         <h3 className="font-medium mb-2">Photo</h3>
//         {/* Upload area*/}
//         <div className="border-2 border-dashed border-gray-300 bg-[#F5F5F5] rounded-lg p-4 flex flex-col items-center justify-center h-[200px]">
//           {!imagePreview ? (
//             <>
//               {/* Cloud icon and upload text */}
//               <label className="flex flex-col items-center justify-center cursor-pointer">
//                 <img src={addPic} alt="Upload icon" className="h-[30px] mb-2" />
//                 {/* Upload text*/}
//                 <p className="text-sm text-gray-600 text-center">
//                   <span className="font-semibold">Click to upload</span> or drag and drop
//                   <br />
//                   <br />
//                   PNG, JPG or GIF (MAX. 5MB)
//                 </p>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//               </label>
//             </>
//           ) : (
//             // Display uploaded image with remove button
//             <div className="relative w-full h-full">
//               <img
//                 src={imagePreview}
//                 alt="Item preview"
//                 className="w-full h-full object-contain rounded-lg"
//               />
//               <button
//                 type="button"
//                 onClick={handleRemoveImage}
//                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* About Section */}
//       <div className="mb-6">
//         {/* Section label*/}
//         <h3 className="font-medium mb-2">About</h3>
//         {/* Form fields container*/}
//         <div className="flex flex-col gap-4 bg-[#F5F5F5] border border-[#21252933] p-4 rounded-sm">
//           {/* Item Name field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
//             <input
//               type="text"
//               value={newItem.name}
//               onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//               placeholder="Brown T-Shirt"
//               className="w-full border-b border-gray-400 focus:border-black outline-none py-1"
//             />
//           </div>
//           {/* Category field (dropdown) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//             <select
//               value={newItem.category}
//               onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//               className="w-full border-b border-gray-400 focus:border-black outline-none py-1"
//             >
//               <option value="tops">Tops</option>
//               <option value="bottoms">Bottoms</option>
//               <option value="outerwear">Outerwear</option>
//               <option value="shoes">Shoes</option>
//               <option value="jump suit">Jump suit</option>
//               <option value="accessories">Accessories</option>
//             </select>
//           </div>
//           {/* Color field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
//             <div className="flex items-center gap-2">
//               <input
//                 type="color"
//                 value={newItem.color}
//                 onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
//                 className="w-10 h-10 border-none"
//               />
//               <input
//                 type="text"
//                 value={newItem.color}
//                 onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
//                 placeholder="Choose a color"
//                 className="w-full placeholder:text-gray-300 outline-none py-1"
//               />
//             </div>
//           </div>
//           {/* Notes field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
//             <textarea
//               value={newItem.notes}
//               onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
//               placeholder="Add more details about this item, brand, fabric type, size."
//               className="w-full border border-gray-300 focus:border-black outline-none py-1 px-3 text-sm md:text-md resize-none"
//               rows={3}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Preview Section */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Preview</h3>
//         {/* Preview card*/}
//         <div className="flex items-center gap-4 bg-[#F5F5F5] rounded-sm p-4">
//           <div
//             className="w-30 h-30 bg-[#D9D9D9] rounded-sm flex items-center justify-center"
//             style={{ backgroundColor: newItem.color }}
//           >
//             {imagePreview ? (
//               <img
//                 src={imagePreview}
//                 alt="Item preview"
//                 className="w-full h-full object-cover rounded-sm"
//               />
//             ) : (
//               // Display item name or fallback
//               <span className="text-xs text-center px-1">{newItem.name || 'Item'}</span>
//             )}
//           </div>
//           {/* Item details: flex column layout */}
//           <div className="flex flex-col">
//             <p className="text-sm font-medium">{newItem.name || 'Brown T-Shirt'}</p>
//             <p className="text-xs text-gray-600">{newItem.category || 'Tops'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Save Button: pink background, white text, full-width, rounded, 2-unit padding, 10-unit horizontal margin */}
//       <button
//         type="submit"
//         className="bg-pink-400 text-white font-medium mx-10 py-2 rounded hover:bg-pink-500 transition-colors"
//       >
//         Save
//       </button>
//     </form>
//   );
// }

// export default AddClotheForm;









//add remove.bg api 
// components/AddClotheForm.jsx
import React, { useState, useRef } from 'react';
import addPic from '../icons/add-picture-icon.png';

// Component to handle adding a new clothing item with a form
function AddClotheForm({ onSave }) {
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
  const fileInputRef = useRef(); // Ref for the file input to clear it

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:px-20">
      {/* Photo Section */}
      <div className="mb-6">
        {/* Section label*/}
        <h3 className="font-medium mb-2">Photo</h3>
        {/* Upload area*/}
        <div className="border-2 border-dashed border-gray-300 bg-[#F5F5F5] rounded-lg p-4 flex flex-col items-center justify-center h-[200px]">
          {!imagePreview ? (
            isProcessing ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-400 mb-2"></div>
                <p className="text-sm text-gray-600">Processing your image...</p>
              </div>
            ) : (
              <>
                {/* Cloud icon and upload text */}
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <img src={addPic} alt="Upload icon" className="h-[30px] mb-2" />
                  {/* Upload text*/}
                  <p className="text-sm text-gray-600 text-center">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                    <br />
                    <br />
                    PNG, JPG or GIF (MAX. 5MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </>
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
                  className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 flex items-center justify-center w-8 h-8"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
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
          <p className="text-xs text-gray-500 mt-1">
            Click the swap icon to toggle between original and background-removed image.
          </p>
        )}
      </div>

      {/* About Section */}
      <div className="mb-6">
        {/* Section label*/}
        <h3 className="font-medium mb-2">About</h3>
        {/* Form fields container*/}
        <div className="flex flex-col gap-4 bg-[#F5F5F5] border border-[#21252933] p-4 rounded-sm">
          {/* Item Name field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Brown T-Shirt"
              className="w-full border-b border-gray-400 focus:border-black outline-none py-1"
            />
          </div>
          {/* Category field (dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="w-full border-b border-gray-400 focus:border-black outline-none py-1"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                className="w-10 h-10 border-none"
              />
              <input
                type="text"
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                placeholder="Choose a color"
                className="w-full placeholder:text-gray-300 outline-none py-1"
              />
            </div>
          </div>
          {/* Notes field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              value={newItem.notes}
              onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
              placeholder="Add more details about this item, brand, fabric type, size."
              className="w-full border border-gray-300 focus:border-black outline-none py-1 px-3 text-sm md:text-md resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Preview</h3>
        {/* Preview card*/}
        <div className="flex items-center gap-4 bg-[#F5F5F5] rounded-sm p-4">
          <div
            className="w-30 h-30 bg-[#D9D9D9] rounded-sm flex items-center justify-center"
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
              <span className="text-xs text-center px-1">{newItem.name || 'Item'}</span>
            )}
          </div>
          {/* Item details: flex column layout */}
          <div className="flex flex-col">
            <p className="text-sm font-medium">{newItem.name || 'Brown T-Shirt'}</p>
            <p className="text-xs text-gray-600">{newItem.category || 'Tops'}</p>
            {processingError && (
              <p className="text-xs text-yellow-600 mt-1">Using original image (background removal failed)</p>
            )}
            {!processingError && imagePreview && (
              <p className="text-xs text-green-600 mt-1">Background removed</p>
            )}
          </div>
        </div>
      </div>

      {/* Save Button: pink background, white text, full-width, rounded, 2-unit padding, 10-unit horizontal margin */}
      <button
        type="submit"
        disabled={isProcessing}
        className={`${
          isProcessing ? 'bg-gray-400' : 'bg-pink-400 hover:bg-pink-500'
        } text-white font-medium mx-10 py-2 rounded transition-colors flex justify-center items-center`}
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
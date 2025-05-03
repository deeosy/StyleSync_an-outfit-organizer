import React, { useState, useEffect } from 'react';

function BackgroundRemover({ imageSrc, onProcessedImage }) {
  const [isRemoved, setIsRemoved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const removeBackground = async () => {
      if (isRemoved && imageSrc && !loading) {
        setLoading(true);
        try {
          const formData = new FormData();
          const response = await fetch(imageSrc);
          const blob = await response.blob();
          formData.append('image_file', blob, 'image.jpg');

          const apiResponse = await fetch('https://api.removal.ai/3.0/remove', {
            method: 'POST',
            headers: {
              'Authorization': 'Client-ID YOUR_API_KEY_HERE',
            },
            body: formData,
          });

          if (!apiResponse.ok) {
            throw new Error(`HTTP error! status: ${apiResponse.status}`);
          }

          const processedBlob = await apiResponse.blob();
          const processedUrl = URL.createObjectURL(processedBlob);
          onProcessedImage(processedUrl);
        } catch (error) {
          console.error('Error removing background:', error);
          onProcessedImage(imageSrc);
        } finally {
          setLoading(false);
        }
      } else if (!isRemoved && imageSrc) {
        onProcessedImage(imageSrc);
      }
    };

    removeBackground();
  }, [imageSrc, isRemoved, onProcessedImage, loading]);

  return (
    <div className="relative">
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">Processing...</div>}
      <button
        type="button"
        onClick={() => setIsRemoved(!isRemoved)}
        className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {isRemoved ? 'Reset Background' : 'Remove Background'}
      </button>
    </div>
  );
}

export default BackgroundRemover;






// the code below uses the background remover feature, but will need to purchase an API from Removal.AI to use this feature

// // components/AddClotheForm.jsx
// import React, { useState, useRef } from 'react';
// import addPic from '../icons/add-picture-icon.png';
// import BackgroundRemover from '../components/BackgroundRemover';

// function AddClotheForm({ onSave }) {
//   const [newItem, setNewItem] = useState({
//     name: '',
//     category: 'tops',
//     color: '',
//     imageUrl: null,
//     notes: '',
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [processedPreview, setProcessedPreview] = useState(null);
//   const fileInputRef = useRef();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setNewItem({ ...newItem, imageUrl: file });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     setImagePreview(null);
//     setNewItem({ ...newItem, imageUrl: null });
//     fileInputRef.current.value = '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newItem.name.trim()) {
//       let imageUrl = null;
//       if (newItem.imageUrl) {
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
          
//           if (data.success) {
//             imageUrl = data.data.link;
//           } else {
//             console.error('Imgur upload failed:', data);
//           }
//         } catch (error) {
//           console.error('Error uploading to Imgur:', error);
//         }
//       }
      
//       const itemData = {
//         name: newItem.name.trim(),
//         category: newItem.category || 'tops',
//         color: newItem.color || '#000000',
//         imageUrl: imageUrl || '',
//         notes: newItem.notes || '',
//         lastWorn: 'Never',
//         createdAt: new Date()
//       };

//       if (onSave) {
//         onSave(itemData);
//       }

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
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Photo</h3>
//         <div className="border-2 border-dashed border-gray-300 bg-[#F5F5F5] rounded-lg p-4 flex flex-col items-center justify-center h-[200px]">
//           {!imagePreview ? (
//             <label className="flex flex-col items-center justify-center cursor-pointer">
//               <img src={addPic} alt="Upload icon" className="h-[30px] mb-2" />
//               <p className="text-sm text-gray-600 text-center">
//                 <span className="font-semibold">Click to upload</span> or drag and drop
//                 <br />
//                 <br />
//                 PNG, JPG or GIF (MAX. 5MB)
//               </p>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleFileChange}
//               />
//             </label>
//           ) : (
//             <div className="relative w-full h-full">
//               <img
//                 src={processedPreview || imagePreview}
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
//               <BackgroundRemover
//                 imageSrc={imagePreview}
//                 onProcessedImage={setProcessedPreview}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mb-6">
//         <h3 className="font-medium mb-2">About</h3>
//         <div className="flex flex-col gap-4 bg-[#F5F5F5] border border-[#21252933] p-4 rounded-sm">
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

//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Preview</h3>
//         <div className="flex items-center gap-4 bg-[#F5F5F5] rounded-sm p-4">
//           <div
//             className="w-30 h-30 bg-[#D9D9D9] rounded-sm flex items-center justify-center"
//             style={{ backgroundColor: newItem.color }}
//           >
//             {processedPreview || imagePreview ? (
//               <img
//                 src={processedPreview || imagePreview}
//                 alt="Item preview"
//                 className="w-full h-full object-cover rounded-sm"
//               />
//             ) : (
//               <span className="text-xs text-center px-1">{newItem.name || 'Item'}</span>
//             )}
//           </div>
//           <div className="flex flex-col">
//             <p className="text-sm font-medium">{newItem.name || 'Brown T-Shirt'}</p>
//             <p className="text-xs text-gray-600">{newItem.category || 'Tops'}</p>
//           </div>
//         </div>
//       </div>

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
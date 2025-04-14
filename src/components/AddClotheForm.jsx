

// export default function AddClotheForm() {
//   const { user } = useAuthenticationStore();
//     const toggleAddForm = useWardrobeStore( state => state.toggleAddForm)
//     const addClothingItem = useWardrobeStore(state => state.addClothingItem);

//     const [newItem, setNewItem] = useState({
//       name: '',
//       category: 'tops',
//       color: '#ffffff',
//       lastWorn: 'Never',
//       imageUrl: null,
//       notes: ''
//     });
//     const [imagePreview, setImagePreview] = useState(null);
//     const fileInputRef = useRef();

//     const handleAddItem = (e) => {
//       e.preventDefault();
//       if (newItem.name.trim()) {
//         addClothingItem(newItem);
//         setNewItem({
//           name: '',
//           category: 'tops',
//           color: '#ffffff',
//           lastWorn: 'Never',
//           imageUrl: null,
//           notes: ''
//         });
//         setImagePreview(null);
//         toggleAddForm(false);
//       }
//     };

//     const handleFileChange = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         // Create a file reader to get the data URL for preview
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setImagePreview(reader.result);
//           setNewItem({ ...newItem, imageUrl: reader.result });
//         };
//         reader.readAsDataURL(file);
//       }
//     };
  
//     const handleRemoveImage = () => {
//       setImagePreview(null);
//       setNewItem({ ...newItem, imageUrl: null });
//       fileInputRef.current.value = '';
//     };

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6 mb-6 mx-auto max-w-[1200px]">
//       <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
//       <form onSubmit={handleAddItem}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Item Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={newItem.name}
//                 onChange={(e) => setNewItem({...newItem, name: e.target.value})}
//                 className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1
//                   ${ user?.gender === 'male' ? 'focus:border-blue-300 focus:ring-blue-300' : 'focus:border-pink-400 focus:ring-pink-400'} 
//                `}                
//                 placeholder="White T-Shirt"
//                 required
//               />
//             </div>
            
//             <div className="mb-4">
//               <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 id="category"
//                 value={newItem.category}
//                 onChange={(e) => setNewItem({...newItem, category: e.target.value})}
//                 className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1
//                    ${ user?.gender === 'male' ? 'focus:border-blue-300 focus:ring-blue-300' : 'focus:border-pink-400 focus:ring-pink-400'} 
//                 `}
//               >
//                 <option value="tops">Tops</option>
//                 <option value="bottoms">Bottoms</option>
//                 <option value="outerwear">Outerwear</option>
//                 <option value="shoes">Shoes</option>
//                 <option value="accessories">Accessories</option>
//               </select>
//             </div>
            
//             <div className="mb-4">
//               <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
//                 Color
//               </label>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="color"
//                   id="color"
//                   value={newItem.color}
//                   onChange={(e) => setNewItem({...newItem, color: e.target.value})}
//                   className={`w-10 h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1
//                     ${ user?.gender === 'male' ? 'focus:border-blue-300 focus:ring-blue-300' : 'focus:border-pink-400 focus:ring-pink-400'} 
//                   `}
//                 />
//                 <span className="text-sm">{newItem.color}</span>
//               </div>
//             </div>
            
//             <div className="mb-4">
//               <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
//                 Notes (Optional)
//               </label>
//               <textarea
//                 id="notes"
//                 value={newItem.notes}
//                 onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
//                 className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 
//                 ${ user?.gender === 'male' ? 'focus:border-blue-300 focus:ring-blue-300' : 'focus:border-pink-400 focus:ring-pink-400'}
//                 `}
//                 rows="3"
//                 placeholder="Add details about this item, like brand, fabric, size, etc."
//               />
//             </div>
//           </div>
          
//           <div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Photo
//               </label>
//               <div className="flex items-center justify-center w-full">
//                 {!imagePreview ? (
//                   <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//                       </svg>
//                       <p className="mb-2 text-sm text-gray-500">
//                         <span className="font-semibold">Click to upload</span> or drag and drop
//                       </p>
//                       <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB)</p>
//                     </div>
//                     <input 
//                       ref={fileInputRef}
//                       type="file" 
//                       className="hidden" 
//                       accept="image/*"
//                       onChange={handleFileChange}
//                     />
//                   </label>
//                 ) : (
//                   <div className="relative w-full h-64">
//                     <img 
//                       src={imagePreview} 
//                       alt="Item preview" 
//                       className="w-full h-full object-contain rounded-lg"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleRemoveImage}
//                       className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
//               <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
//               <div className="flex items-center space-x-4">
//                 <div 
//                   className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center"
//                   style={{ backgroundColor: newItem.color }}
//                 >
//                   {imagePreview ? (
//                     <img src={imagePreview} alt="Item" className="w-full h-full object-cover rounded-lg" />
//                   ) : (
//                     <span className="text-xs text-center px-1">{newItem.name || "Item"}</span>
//                   )}
//                 </div>
//                 <div>
//                   <p className="font-medium">{newItem.name || "New Item"}</p>
//                   <p className="text-xs text-gray-500 capitalize">{newItem.category}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="mt-6 flex justify-end space-x-3">
//           <button
//             type="button"
//             onClick={() => toggleAddForm(false)}
//             className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 hover:cursor-pointer transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className={`px-4 py-2 text-white rounded hover:cursor-pointer transition-colors
//               ${ user?.gender === 'male' ? 'bg-blue-200 hover:bg-blue-300' : 'bg-pink-400 hover:bg-pink-500'}
//             `}
//           >
//             Add Item
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }


import React, { useState } from 'react'
import addPic from '../icons/add-picture-icon.png'



// Basic AddClotheForm component to match the design in the image
function AddClotheForm({ onSave }) {
  // State to manage form inputs
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [notes, setNotes] = useState('');

  // Handle form submission (to be implemented with wardrobe store later)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(); // Close the modal on save (for now, just closes the modal)
  };

  return (
    // Form container: flex column layout
    <form onSubmit={handleSubmit} className="flex flex-col md:px-20 ">
      {/* Photo Section */}
      <div className="mb-6">
        {/* Section label: medium font, 2-unit bottom margin */}
        <h3 className="font-medium mb-2">Photo</h3>
        {/* Upload area: dashed border, light gray background, rounded, 4-unit padding, centered content */}
        <div className="border-2 border-dashed border-gray-300 bg-[#F5F5F5] rounded-lg p-4 flex flex-col items-center justify-center h-[200px]">
          {/* Cloud icon */}
          <img src={addPic} alt="" className='h-[30px] mb-2' />
          {/* Upload text: small font, gray-600 text */}
          <p className="text-sm text-gray-600 text-center">
            <span className='font-semibold'>Click to upload</span>  or drag and drop
            <br />
            <br />
            PNG, JPG or GIF (MAX. 5MB)
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-6">
        {/* Section label: medium font, 2-unit bottom margin */}
        <h3 className="font-medium mb-2">About</h3>
        {/* Form fields container: flex column layout, 4-unit gap */}
        <div className="flex flex-col gap-4 bg-[#F5F5F5] border border-[#21252933] p-4 rounded-sm ">
          {/* Item Name field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Brown T-Shirt"
              className="w-full border-b border-gray-400 focus:border-black outline-none py-1"
            />
          </div>
          {/* Category field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Tops"
              className="w-full border-b border-gray-400 focus:border-black outline-none py-1"
            />
          </div>
          {/* Color field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 border-none"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Choose a color"
                className="w-full placeholder:text-gray-300 outline-none py-1"
              />
            </div>
          </div>
          {/* Notes field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add more details about this item, brand, fabric type, size."
              className="w-full border border-gray-300 focus:border-black outline-none py-1 text-sm md:text-md resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mb-6">
        {/* Section label: medium font, 2-unit bottom margin */}
        <h3 className="font-medium mb-2">Preview</h3>
        {/* Preview card: flex layout, gray background, rounded, 4-unit padding */}
        <div className="flex items-center gap-4 bg-[#F5F5F5] rounded-sm p-4">
          {/* Placeholder image: gray square */}
          <div className="w-30 h-30 bg-[#D9D9D9] rounded-sm"></div>
          {/* Item details: flex column layout */}
          <div className="flex flex-col">
            <p className="text-sm font-medium">{itemName || 'Brown T-Shirt'}</p>
            <p className="text-xs text-gray-600">{category || 'Tops'}</p>
          </div>
        </div>
      </div>

      {/* Save Button: pink background, white text, full-width, rounded, 2-unit padding */}
      <button
        type="submit"
        className="bg-pink-400 text-white font-medium mx-30 py-2 rounded hover:bg-pink-500 transition-colors"
      >
        Save
      </button>
    </form>
  );
}

export default AddClotheForm;
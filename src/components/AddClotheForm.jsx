// components/AddClotheForm.jsx
import React, { useState, useRef } from 'react';
import addPic from '../icons/add-picture-icon.png';

// Component to handle adding a new clothing item with a form
function AddClotheForm({ onSave }) {
  // State to manage all form inputs in a single object
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'tops', // Default category
    color: '', // Default color ()
    imageUrl: null, // Store the uploaded image URL
    notes: '',
  });
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const fileInputRef = useRef(); // Ref for the file input to clear it

  // Handle file change for image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update image preview
        setNewItem({ ...newItem, imageUrl: reader.result }); // Update image URL in state
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle removing the uploaded image
  const handleRemoveImage = () => {
    setImagePreview(null); // Clear image preview
    setNewItem({ ...newItem, imageUrl: null }); // Clear image URL in state
    fileInputRef.current.value = ''; // Reset file input
  };

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.name.trim()) { // Validate that the name field is not empty
      const formData = {
        itemName: newItem.name,
        category: newItem.category,
        color: newItem.color,
        notes: newItem.notes,
        imageUrl: newItem.imageUrl,
      };
      onSave(formData); // Pass form data to parent component
      // Reset form state after submission
      setNewItem({
        name: '',
        category: 'tops',
        color: '#ffffff',
        imageUrl: null,
        notes: '',
      });
      setImagePreview(null); // Clear image preview
    }
  };

  return (
    // Form container: flex column layout, 20-unit horizontal padding on medium screens
    <form onSubmit={handleSubmit} className="flex flex-col md:px-20">
      {/* Photo Section */}
      <div className="mb-6">
        {/* Section label: medium font, 2-unit bottom margin */}
        <h3 className="font-medium mb-2">Photo</h3>
        {/* Upload area: dashed border, light gray background, rounded, 4-unit padding, centered content */}
        <div className="border-2 border-dashed border-gray-300 bg-[#F5F5F5] rounded-lg p-4 flex flex-col items-center justify-center h-[200px]">
          {!imagePreview ? (
            <>
              {/* Cloud icon and upload text */}
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <img src={addPic} alt="Upload icon" className="h-[30px] mb-2" />
                {/* Upload text: small font, gray-600 text, centered */}
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
          ) : (
            // Display uploaded image with remove button
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Item preview"
                className="w-full h-full object-contain rounded-lg"
              />
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
      </div>

      {/* About Section */}
      <div className="mb-6">
        {/* Section label: medium font, 2-unit bottom margin */}
        <h3 className="font-medium mb-2">About</h3>
        {/* Form fields container: flex column layout, 4-unit gap, light gray background, light border, 4-unit padding, rounded */}
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
          </div>
        </div>
      </div>

      {/* Save Button: pink background, white text, full-width, rounded, 2-unit padding, 10-unit horizontal margin */}
      <button
        type="submit"
        className="bg-pink-400 text-white font-medium mx-10 py-2 rounded hover:bg-pink-500 transition-colors"
      >
        Save
      </button>
    </form>
  );
}

export default AddClotheForm;
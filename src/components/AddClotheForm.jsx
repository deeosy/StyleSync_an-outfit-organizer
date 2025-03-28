import React, { useState, useRef } from 'react'
import useWardrobeStore from '../store/wardrobeStore';

export default function AddClotheForm() {
    const toggleAddForm = useWardrobeStore( state => state.toggleAddForm)
    const addClothingItem = useWardrobeStore(state => state.addClothingItem);

    const [newItem, setNewItem] = useState({
      name: '',
      category: 'tops',
      color: '#ffffff',
      lastWorn: 'Never',
      imageUrl: null,
      notes: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef();

    const handleAddItem = (e) => {
      e.preventDefault();
      if (newItem.name.trim()) {
        addClothingItem(newItem);
        setNewItem({
          name: '',
          category: 'tops',
          color: '#ffffff',
          lastWorn: 'Never',
          imageUrl: null,
          notes: ''
        });
        setImagePreview(null);
        toggleAddForm(false);
      }
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Create a file reader to get the data URL for preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setNewItem({ ...newItem, imageUrl: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleRemoveImage = () => {
      setImagePreview(null);
      setNewItem({ ...newItem, imageUrl: null });
      fileInputRef.current.value = '';
    };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 mx-auto max-w-[1200px]">
      <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
      <form onSubmit={handleAddItem}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400"
                placeholder="White T-Shirt"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400"
              >
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="outerwear">Outerwear</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="color"
                  value={newItem.color}
                  onChange={(e) => setNewItem({...newItem, color: e.target.value})}
                  className="w-10 h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400"
                />
                <span className="text-sm">{newItem.color}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={newItem.notes}
                onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400"
                rows="3"
                placeholder="Add details about this item, like brand, fabric, size, etc."
              />
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo
              </label>
              <div className="flex items-center justify-center w-full">
                {!imagePreview ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB)</p>
                    </div>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="relative w-full h-64">
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center"
                  style={{ backgroundColor: newItem.color }}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Item" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-xs text-center px-1">{newItem.name || "Item"}</span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{newItem.name || "New Item"}</p>
                  <p className="text-xs text-gray-500 capitalize">{newItem.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => toggleAddForm(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 hover:cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-pink-400 text-white rounded hover:cursor-pointer hover:bg-pink-500 transition-colors"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  )
}

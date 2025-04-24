import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchWardrobeItems, addClothingItem } from '../services/wardrobeService';

const Wardrobe = () => {
  const { user } = useAuth();
  const [wardrobeItems, setWardrobeItems] = useState([]);

  // Example usage of wardrobeItems
  console.log('Wardrobe Items:', wardrobeItems);

  useEffect(() => {
    if (user) {
      fetchWardrobeItems(user.uid).then(items => setWardrobeItems(items));
    }
  }, [user]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Example usage of showAddForm
  console.log('Show Add Form:', showAddForm);

  useEffect(() => {
    if (user) {
      fetchWardrobeItems(user.uid);
    }
  }, [user]);

  const handleSave = async (formData) => {
    if (!user) {
      console.error('No user logged in');
      return;
    }
    try {
      await addClothingItem(formData, user.uid);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding clothing item:', error);
    }
  };

  return (
    <div>
      {/* Render your component content here */}
      <button onClick={() => setShowAddForm(true)}>Add Item</button>
      {showAddForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = { name: e.target.name.value }; // Example form data
            handleSave(formData);
          }}
        >
          <input type="text" name="name" placeholder="Item Name" required />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default Wardrobe; 
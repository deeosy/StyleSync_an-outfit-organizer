import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchWardrobeItems, addClothingItem } from '../services/wardrobeService';

const Wardrobe = () => {
  const { user } = useAuth();
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWardrobeItems(user.uid);
    }
  }, [user, fetchWardrobeItems]);

  const handleSave = async (formData) => {
    if (!user) {
      console.error('No user logged in');
      return;
    }
    try {
      await addClothingItem(formData, user.uid);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving clothing item:', error);
    }
  };

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default Wardrobe; 
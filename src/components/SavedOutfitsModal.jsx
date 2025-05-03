import React from 'react';
import useWardrobeStore from '../store/wardrobeStore';
import {
  DeleteOutline,
  Favorite,
  FavoriteBorder,
  Edit,
  CheckCircle,
  Close as CloseIcon
} from '@mui/icons-material';

const SavedOutfitsModal = ({ open, onClose, onSelectOutfit }) => {
  const { savedOutfits, deleteSavedOutfit, wearOutfit, updateSavedOutfit } = useWardrobeStore();
  const [editingOutfit, setEditingOutfit] = React.useState(null);
  const [editName, setEditName] = React.useState('');

  // Start editing an outfit name
  const handleStartEdit = (outfit) => {
    setEditingOutfit(outfit.id);
    setEditName(outfit.name);
  };

  // Save the edited outfit name
  const handleSaveEdit = (id) => {
    if (editName.trim()) {
      updateSavedOutfit(id, { name: editName });
      setEditingOutfit(null);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingOutfit(null);
  };

  // Mark an outfit as worn today
  const handleWearOutfit = (id) => {
    wearOutfit(id);
    // Optional: Add a visual confirmation that items have been marked as worn
    alert('Outfit items marked as worn today!');
  };

  // Toggle favorite status for an outfit
  const handleToggleFavorite = (id) => {
    const outfit = savedOutfits.find(o => o.id === id);
    if (outfit) {
      updateSavedOutfit(id, { isFavorite: !outfit.isFavorite });
    }
  };

  // Format the date in a more human-readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle outfit deletion with confirmation
  const handleDeleteOutfit = (id) => {
    if (window.confirm('Are you sure you want to delete this outfit?')) {
      deleteSavedOutfit(id);
    }
  };

  // Get a count of items in an outfit
  const getItemCount = (items) => {
    let count = 0;
    if (items.top) count++;
    if (items.bottom) count++;
    if (items.outerwear) count++;
    if (items.shoes) count++;
    if (items.accessories) count += items.accessories.length;
    return count;
  };

  // Determine the representative image for an outfit
  const getRepresentativeImage = (outfit) => {
    // Priority: top > outerwear > bottom > shoes > first accessory
    if (outfit.items.top) return outfit.items.top.imageUrl;
    if (outfit.items.outerwear) return outfit.items.outerwear.imageUrl;
    if (outfit.items.bottom) return outfit.items.bottom.imageUrl;
    if (outfit.items.shoes) return outfit.items.shoes.imageUrl;
    if (outfit.items.accessories && outfit.items.accessories.length > 0) {
      return outfit.items.accessories[0].imageUrl;
    }
    return '/placeholder-outfit.png'; // Fallback image
  };

  // Handle selecting an outfit to load it into the outfit builder
  const handleSelectOutfit = (outfit) => {
    if (onSelectOutfit) {
      onSelectOutfit(outfit.items);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Saved Outfits</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {savedOutfits.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>You haven't saved any outfits yet.</p>
              <p className="mt-2">Create and save outfits to see them here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {savedOutfits.map((outfit) => (
                <div 
                  key={outfit.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Outfit details on the left */}
                    <div className="p-4 flex-1">
                      {editingOutfit === outfit.id ? (
                        <div className="flex items-center mb-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded mr-2"
                            autoFocus
                          />
                          <button 
                            onClick={() => handleSaveEdit(outfit.id)}
                            className="text-green-600 mr-1"
                            aria-label="Save outfit name"
                          >
                            <CheckCircle fontSize="small" />
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="text-gray-500"
                            aria-label="Cancel editing"
                          >
                            <CloseIcon fontSize="small" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-lg text-gray-800">{outfit.name}</h3>
                          <div className="flex items-center">
                            <button 
                              onClick={() => handleToggleFavorite(outfit.id)}
                              className="text-red-500 mr-2"
                              aria-label={outfit.isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                              {outfit.isFavorite ? 
                                <Favorite fontSize="small" /> : 
                                <FavoriteBorder fontSize="small" />
                              }
                            </button>
                            <button 
                              onClick={() => handleStartEdit(outfit)}
                              className="text-gray-500 hover:text-gray-700"
                              aria-label="Edit outfit name"
                            >
                              <Edit fontSize="small" />
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-500 mb-3">
                        <div>{getItemCount(outfit.items)} items</div>
                        <div>Created {formatDate(outfit.createdAt)}</div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleSelectOutfit(outfit)}
                          className="flex-1 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors"
                        >
                          Select
                        </button>
                        <button
                          onClick={() => handleWearOutfit(outfit.id)}
                          className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Wear Today
                        </button>
                        <button
                          onClick={() => handleDeleteOutfit(outfit.id)}
                          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                          aria-label="Delete outfit"
                        >
                          <DeleteOutline fontSize="small" />
                        </button>
                      </div>
                    </div>

                    {/* Outfit preview image on the right */}
                    <div className="md:w-1/3 bg-gray-100">
                      <img 
                        src={getRepresentativeImage(outfit)} 
                        alt={outfit.name}
                        className="w-full h-full object-contain max-h-48"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedOutfitsModal;
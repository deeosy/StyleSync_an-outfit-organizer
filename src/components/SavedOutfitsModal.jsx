import React from 'react';
import useWardrobeStore from '../store/wardrobeStore';
import useThemeStore from '../store/themeStore';
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

  // Theme store integration
  const { getTheme } = useThemeStore();
  const theme = getTheme();

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-200">
      <div className={`${theme.surface} rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden border ${theme.border} transition-colors duration-200`}>
        {/* Modal Header */}
        <div className={`flex items-center justify-between border-b ${theme.border} px-6 py-4 transition-colors duration-200`}>
          <h2 className={`text-xl font-semibold ${theme.textPrimary}`}>Saved Outfits</h2>
          <button 
            onClick={onClose}
            className={`${theme.textSecondary} ${theme.surfaceHover.replace('hover:', 'hover:text-')} hover:${theme.textPrimary.replace('text-', '')} transition-all duration-200 transform hover:scale-110 active:scale-95 p-1 rounded`}
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {savedOutfits.length === 0 ? (
            <div className={`text-center py-10 ${theme.textSecondary}`}>
              <p>You haven't saved any outfits yet.</p>
              <p className={`mt-2 ${theme.textMuted}`}>Create and save outfits to see them here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {savedOutfits.map((outfit) => (
                <div 
                  key={outfit.id} 
                  className={`border ${theme.border} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 ${theme.surfaceHover}`}
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
                            className={`flex-1 px-2 py-1 border ${theme.border} rounded mr-2 ${theme.surface} ${theme.textPrimary} focus:outline-none ${theme.ring} focus:ring-1 transition-colors duration-200`}
                            autoFocus
                          />
                          <button 
                            onClick={() => handleSaveEdit(outfit.id)}
                            className="text-green-500 hover:text-green-600 mr-1 transition-colors duration-200 transform hover:scale-110 active:scale-95 p-1 rounded"
                            aria-label="Save outfit name"
                          >
                            <CheckCircle fontSize="small" />
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className={`${theme.textSecondary} hover:${theme.textPrimary.replace('text-', '')} transition-colors duration-200 transform hover:scale-110 active:scale-95 p-1 rounded`}
                            aria-label="Cancel editing"
                          >
                            <CloseIcon fontSize="small" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-medium text-lg ${theme.textPrimary}`}>{outfit.name}</h3>
                          <div className="flex items-center">
                            <button 
                              onClick={() => handleToggleFavorite(outfit.id)}
                              className="text-red-500 hover:text-red-600 mr-2 transition-all duration-200 transform hover:scale-110 active:scale-95 p-1 rounded"
                              aria-label={outfit.isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                              {outfit.isFavorite ? 
                                <Favorite fontSize="small" /> : 
                                <FavoriteBorder fontSize="small" />
                              }
                            </button>
                            <button 
                              onClick={() => handleStartEdit(outfit)}
                              className={`${theme.textSecondary} hover:${theme.textPrimary.replace('text-', '')} transition-all duration-200 transform hover:scale-110 active:scale-95 p-1 rounded`}
                              aria-label="Edit outfit name"
                            >
                              <Edit fontSize="small" />
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <div className={`text-sm ${theme.textSecondary} mb-3`}>
                        <div>{getItemCount(outfit.items)} items</div>
                        <div className={theme.textMuted}>Created {formatDate(outfit.createdAt)}</div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleSelectOutfit(outfit)}
                          className={`flex-1 py-2 ${theme.primary} ${theme.primaryHover} text-white rounded transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md font-medium`}
                        >
                          Select
                        </button>
                        <button
                          onClick={() => handleWearOutfit(outfit.id)}
                          className={`flex-1 py-2 ${theme.secondary} ${theme.secondaryHover} text-white rounded transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md font-medium`}
                        >
                          Wear Today
                        </button>
                        <button
                          onClick={() => handleDeleteOutfit(outfit.id)}
                          className={`px-3 py-2 ${theme.backgroundSecondary || theme.light} ${theme.surfaceHover} ${theme.textSecondary} rounded transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md border ${theme.border}`}
                          aria-label="Delete outfit"
                        >
                          <DeleteOutline fontSize="small" />
                        </button>
                      </div>
                    </div>

                    {/* Outfit preview image on the right */}
                    <div className={`md:w-1/3 ${theme.backgroundSecondary || theme.light} border-l ${theme.border} transition-colors duration-200`}>
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
        <div className={`border-t ${theme.border} px-6 py-4 flex justify-end transition-colors duration-200`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 ${theme.backgroundSecondary || theme.light} ${theme.textSecondary} rounded ${theme.surfaceHover} transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md border ${theme.border} font-medium`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedOutfitsModal;
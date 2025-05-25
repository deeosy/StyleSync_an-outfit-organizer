// src/components/FloatingButtonWithImage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FloatingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/outfit-recommender');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="group relative bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-purple-200 hover:border-purple-400"
        title="Get Outfit Recommendations"
      >
        {/* Replace 'your-image.png' with your actual image path */}
        <div className="w-10 h-10 relative overflow-hidden rounded-full">
          <img 
            src="/path-to-your-image.png" 
            alt="Style Assistant"
            className="w-full h-full object-cover animate-pulse"
            onError={(e) => {
              // Fallback if image doesn't load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          
          {/* Fallback icon if image fails to load */}
          <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg ">
            👗
          </div>
        </div>
        
        {/* Moving animation elements */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce delay-150"></div>
        <div className="absolute top-0 left-0 w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-ping delay-300"></div>
        
        {/* Hover effect */}
        <div className="absolute inset-0 rounded-full bg-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        ✨ Get Style Recommendations
        <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );
}
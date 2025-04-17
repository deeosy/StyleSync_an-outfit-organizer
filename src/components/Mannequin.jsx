// components/Mannequin.jsx
import React from 'react';

function Mannequin({ currentOutfit }) {
  const { top, bottom, outerwear, shoes, accessories } = currentOutfit || {};
  
  return (
    <div className="w-full h-96 relative flex justify-center">
      <div className="relative h-full">
        {/* Basic mannequin SVG shape */}
        <svg viewBox="0 0 200 400" className="h-full z-10 relative">
          <circle cx="100" cy="50" r="40" fill="#f5f5f5" stroke="#ddd" /> {/* head */}
          <rect x="80" y="90" width="40" height="120" rx="20" fill="#f5f5f5" stroke="#ddd" /> {/* torso */}
          <rect x="60" y="150" width="20" height="100" rx="10" fill="#f5f5f5" stroke="#ddd" /> {/* left arm */}
          <rect x="120" y="150" width="20" height="100" rx="10" fill="#f5f5f5" stroke="#ddd" /> {/* right arm */}
          <rect x="80" y="210" width="20" height="140" rx="10" fill="#f5f5f5" stroke="#ddd" /> {/* left leg */}
          <rect x="100" y="210" width="20" height="140" rx="10" fill="#f5f5f5" stroke="#ddd" /> {/* right leg */}
        </svg>
        
        {/* Clothing item layers that will be populated when items are dropped */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-20 h-24 z-20">
          {top && (
            <div 
              className="w-full h-full flex items-center justify-center rounded opacity-90 shadow text-xs text-center p-0.5"
              style={{ backgroundColor: top.color }}
            >
              {top.imageUrl ? (
                <img src={top.imageUrl} alt={top.name} className="object-cover w-full h-full rounded" />
              ) : (
                <span className="bg-white bg-opacity-70 p-0.5 rounded text-xs">{top.name}</span>
              )}
            </div>
          )}
        </div>
        
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2 w-16 h-32 z-20">
          {bottom && (
            <div 
              className="w-full h-full flex items-center justify-center rounded opacity-90 shadow text-xs text-center p-0.5"
              style={{ backgroundColor: bottom.color }}
            >
              {bottom.imageUrl ? (
                <img src={bottom.imageUrl} alt={bottom.name} className="object-cover w-full h-full rounded" />
              ) : (
                <span className="bg-white bg-opacity-70 p-0.5 rounded text-xs">{bottom.name}</span>
              )}
            </div>
          )}
        </div>
        
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-24 h-32 z-30">
          {outerwear && (
            <div 
              className="w-full h-full flex items-center justify-center rounded opacity-90 shadow text-xs text-center p-0.5"
              style={{ backgroundColor: outerwear.color }}
            >
              {outerwear.imageUrl ? (
                <img src={outerwear.imageUrl} alt={outerwear.name} className="object-cover w-full h-full rounded" />
              ) : (
                <span className="bg-white bg-opacity-70 p-0.5 rounded text-xs">{outerwear.name}</span>
              )}
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-12 z-20">
          {shoes && (
            <div 
              className="w-full h-full flex items-center justify-center rounded opacity-90 shadow text-xs text-center p-0.5"
              style={{ backgroundColor: shoes.color }}
            >
              {shoes.imageUrl ? (
                <img src={shoes.imageUrl} alt={shoes.name} className="object-cover w-full h-full rounded" />
              ) : (
                <span className="bg-white bg-opacity-70 p-0.5 rounded text-xs">{shoes.name}</span>
              )}
            </div>
          )}
        </div>
        
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-10 h-12 z-40">
          {accessories && (
            <div 
              className="w-full h-full flex items-center justify-center rounded-full opacity-90 shadow text-xs text-center p-0.5"
              style={{ backgroundColor: accessories.color }}
            >
              {accessories.imageUrl ? (
                <img src={accessories.imageUrl} alt={accessories.name} className="object-cover w-full h-full rounded-full" />
              ) : (
                <span className="bg-white bg-opacity-70 p-0.5 rounded-full text-xs">{accessories.name}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mannequin;
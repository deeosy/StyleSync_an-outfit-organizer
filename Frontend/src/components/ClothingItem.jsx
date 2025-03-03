// components/ClothingItem.jsx
import React from 'react';

function ClothingItem({ item, onDragStart }) {
  return (
    <div 
      className="bg-white rounded-lg shadow h-40 flex flex-col justify-between p-1 border border-gray-200 cursor-grab hover:shadow-md hover:-translate-y-1 transition-all"
      draggable 
      onDragStart={(e) => onDragStart(e, item)}
    >
      {item.imageUrl ? (
        <div 
          className="flex-1 flex items-center justify-center overflow-hidden rounded"
          style={{ backgroundColor: item.color }}
        >
          <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
        </div>
      ) : (
        <div 
          className="flex-1 flex items-center justify-center text-sm bg-opacity-70 rounded"
          style={{ backgroundColor: item.color }}
        >
          <div className="bg-white bg-opacity-70 p-1 rounded">
            {item.name}
          </div>
        </div>
      )}
      
      <div className="bg-white bg-opacity-90 p-1 rounded ">
        <h4 className="text-sm font-medium m-0">{item.name}</h4>
        <p className="text-[10px] text-gray-600 m-0">Last worn: {item.lastWorn || 'Never'}</p>
      </div>
    </div>
  );
}

export default ClothingItem;
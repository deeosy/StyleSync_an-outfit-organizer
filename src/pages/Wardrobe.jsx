// pages/Wardrobe.jsx
import React, { useState } from 'react';
import useWardrobeStore from '../store/wardrobeStore';
import AddClotheForm from '../components/AddClotheForm';
import useAuthenticationStore from '../store/userStore';

function Wardrobe() {
  const [filter, setFilter] = useState('all');
  const { user } = useAuthenticationStore();

  
  const wardrobeItems = useWardrobeStore(state => state.wardrobeItems);
  const showAddForm = useWardrobeStore(state => state.showAddForm);
  const toggleAddForm = useWardrobeStore( state => state.toggleAddForm)
  
  const filteredItems = filter === 'all' 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === filter);
  
  return (
    <div className='px-3'>
      <div className="flex justify-between items-center mb-6 mx-auto max-w-[1200px]">
        <h1 className="text-xl sm:text-3xl font-bold">Digital Wardrobe</h1>
        <button
          onClick={() => toggleAddForm(!showAddForm)}
          className={`px-4 py-2 text-xs sm:text-lg hover:cursor-pointer text-white rounded transition-colors
            ${ user?.gender === 'male' ? 'bg-blue-200' : 'bg-pink-400'}  
            ${ user?.gender === 'male' ? 'hover:bg-blue-300' : 'hover:bg-pink-600'}
          `}
        >
          {showAddForm ? 'Cancel' : 'Add New Item'}
        </button>
      </div>
      
      {showAddForm && (
        <AddClotheForm />
      )}
      
      <div className="bg-white rounded-lg shadow-xl p-6 mb-8 w-full h-full mx-auto max-w-[1200px]">
        <div className="flex sm:justify-center mb-6 overflow-x-auto no-scrollbar">
          <button 
            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap 
              ${ filter === 'all' 
                ? 'text-gray-900 md:text-xl border-b-2' 
                : 'text-gray-500 md:text-xl hover:cursor-pointer'
              }
              ${ user?.gender === 'male' ? 'border-blue-300' : 'bg-pink-400'}  
            `}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {['tops', 'bottoms', 'outerwear', 'shoes', 'accessories'].map(category => (
            <button 
              key={category}
              className={`px-4 py-2 font-medium transition-colors whitespace-nowrap 
                ${ filter === category 
                ? 'text-gray-900 md:text-xl border-b-2' 
                : 'text-gray-500 md:text-xl hover:cursor-pointer'
                }
                ${ user?.gender === 'male' ? 'border-blue-300' : 'bg-pink-400'}
              `}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="sm:h-[70vh] h-[100vh] overflow-scroll no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-8 my-5   ">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-gray-50 p-3 flex flex-col rounded-[5px] border border-gray-200">
                
                <div 
                  className="h-full rounded-[5px] mb-2 md:mb-4 flex text-xs"
                >
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-[full] object-cover rounded" />
                  ) : (
                    <span>{item.name}</span>
                  )}
                </div>
                <p className="text-sm font-medium pb-2 truncate">{item.name}</p>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-600 capitalize">{item.category}</p>
                  <p className="text-xs text-gray-600 ">Last worn: {item.lastWorn || 'Never'}</p>
                </div>
                {item.notes && <p className="text-xs pb-2 truncate text-gray-500">{item.notes}</p>}
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full h-[60vh] py-8 text-center text-gray-500">
                No items found in this category.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Wardrobe;
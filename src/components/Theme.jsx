import React, { useState } from 'react'

export default function Theme() {
  const [color, setColor] = useState('pink-300')
  const [secondaryColor, setSecondaryColor] = useState('pink-400')
  
  const handleTheme = (event) => {
    const selectedColor = event.target.value
    switch (selectedColor) {
      case 'pink':
        setColor('pink-300')
        setSecondaryColor('pink-400')
        break
      case 'green':
        setColor('green-300')
        setSecondaryColor('green-400')
        break
      case 'blue':
        setColor('blue-300')
        setSecondaryColor('blue-400')
        break
      default:
        break
    }
  }

  return (
    <div className="p-4">
      <select 
        name="Theme" 
        id="theme-select" 
        onChange={handleTheme}
        className=" p-2 mb-4 outline-none "
        defaultValue="pink"
      >
        <option value="pink">Pink Theme</option>
        <option value="green">Green Theme</option>
        <option value="blue">Blue Theme</option>
      </select>

      <div className="mt-4">
        <button className={`bg-${color} hover:bg-${secondaryColor} text-white font-bold py-2 px-4 rounded mr-2`}>
          Primary Button
        </button>
      </div>
    </div>
  )
}
import React, { useState } from 'react'



export default function Theme() {
  const [color, setColor] = useState('bg-pink-300')
  const [secondaryColor, setSecondaryColor] = useState('bg-pink-400')
  
  const handleTheme = (event) => {
    const selectedColor = event.target.value
    switch (selectedColor) {
      case 'pink':
        setColor('bg-pink-300')
        setSecondaryColor('hover:bg-pink-400')
        break
      case 'gray':
        setColor('bg-gray-300')
        setSecondaryColor('hover:bg-gray-400')
        break
      case 'blue':
        setColor('bg-blue-300')
        setSecondaryColor('hover:bg-blue-400')
        break
      case 'red':
        setColor('bg-red-300')
        setSecondaryColor('hover:bg-red-400')
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
        <option value="gray">Gray Theme</option>
        <option value="blue">Blue Theme</option>
        <option value="red">Red Theme</option>
      </select>

      <div className="mt-4">
        <button className={`${color} ${secondaryColor} text-white font-bold py-2 px-4 rounded mr-2`}>
          Primary Button
        </button>
      </div>
    </div>
  )
}
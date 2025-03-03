
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='bg-purple-800 text-white shadow-md' >
      <div className="container mx-auto px4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold">StyleSync</div>
          <ul className='flex space-x-6'>
            <li>
              <Link to='/' className='hover:bg-purple-700 px-3 py-2 rounded transition-colors' >
                Dashboard
              </Link>
            </li>
            <li>
              <Link to='/wardrobe' className='hover:bg-purple-700 px-3 py-2 rounded transition-colors' >
                My Wardrobe
              </Link>
            </li>
            <li>
              <Link to='/outfits' className='hover:bg-purple-700 px-3 py-2 rounded transition-colors' >
                Outfit Builder
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

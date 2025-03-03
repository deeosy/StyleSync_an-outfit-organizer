import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Wardrobe from './pages/Wardrobe'
import Outfits from './components/Outfits'



import './App.css'

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/wardrobe' element={<Wardrobe />} />
              <Route path='/outfits' element={<Outfits />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App



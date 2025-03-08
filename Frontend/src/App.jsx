import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Wardrobe from './pages/Wardrobe'
import Outfits from './components/Outfits'
import Login from './pages/Login';
import './App.css'



// things you should know
// the use of Zustand for state management
// the use of React-router-dom for page routing


function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container max-w-screen ">
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/dashboard' element={<Home />} />
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



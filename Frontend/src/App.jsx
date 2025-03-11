import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Wardrobe from './pages/Wardrobe'
import Outfits from './components/Outfits'
import './App.css'
import Authentication from './pages/Authentication';
import SignUpLanguage from './pages/SignUpLanguage';
import SignIn from './pages/SignIn';
import SignUpDetails from './pages/SignUpDetails';



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
              <Route path='/' element={<Authentication />} >
                <Route index element={<SignUpLanguage />} />
                <Route path='sign-up-details' element={<SignUpDetails />} />
                <Route path='sign-in' element={<SignIn />} />
              </Route>
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



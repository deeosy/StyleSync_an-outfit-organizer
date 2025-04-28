import React from "react";   // Import React library for building the component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Import routing components from react-router-dom for handling page navigation

// Import Zustand for state management (though not directly used in this file, noted for context)
// Zustand would typically be used in components or pages for global state management

import Navbar from "./components/Navbar";  // Navigation bar component
import Footer from "./components/Footer";   // Footer component
// Import page components for routing
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Wardrobe from "./pages/Wardrobe";
import Outfits from "./components/Outfits";
import Account from "./pages/Account";
import Authentication from "./pages/Authentication";
import SignUpLanguage from "./pages/SignUpLanguage";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import SignUpDetails from "./pages/SignUpDetails";
import SignUpReason from "./pages/SignUpReason";
import FAQfull from "./components/FAQfull"; 
import AddClothesCard from "./components/AddClothesCard";

import "./App.css";   // Import global styles for the app
import FAQPage from "./components/FAQfull";
import FAQSection from "./components/FAQSection";
// import Theme from "./components/Theme";


function App() {
  return (
    <>
      <Router>  {/* Router component from react-router-dom to enable client-side routing */}
        <div className="min-h-screen bg-gray-50">
          {/* Render the Navbar component at the top of every page */}
          <Navbar />  
          <div className="container max-w-screen bg-[#f5f5f5] ">
            <Routes>
              {/* Route for the home page (root path) */}
              <Route path="/" element={<Home />} />
              <Route path="/authentication" element={<Authentication />}>   {/* Parent route for authentication-related pages */}
                <Route path="sign-in" element={<SignIn />} />
                <Route index element={<SignUpLanguage />} />
                <Route path="sign-up-details" element={<SignUpDetails />} />
                <Route path="sign-up-reason" element={<SignUpReason />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wardrobe" element={<Wardrobe />} />
              <Route path="/outfits" element={<Outfits />} />
              <Route path="/account" element={<Account />} /> 
              <Route path="/faq" element={<FAQfull />} />  {/* Route for the outfits page */}
              <Route path="/add-clothes" element={<AddClothesCard />} />  {/* Route for the add clothes page */}

              {/* Fallback route for handling 404 errors (when no route matches) */}
              <Route path="*" element={<div className="text-center py-10">404 - Page Not Found</div>} />
            </Routes>
          </div>
          <Footer />   {/* Render the Footer component at the bottom of every page */}
        </div>
      </Router>
    </>
  );
}

export default App;

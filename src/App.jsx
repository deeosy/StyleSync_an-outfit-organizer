import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Wardrobe from "./pages/Wardrobe";
import Outfits from "./components/Outfits";
import Authentication from "./pages/Authentication";
import SignUpLanguage from "./pages/SignUpLanguage";
import SignIn from "./pages/SignIn";
import SignUpDetails from "./pages/SignUpDetails";
import SignUpReason from "./pages/SignUpReason";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
 import Account from "./pages/Account";
import ResetPassword from "./pages/ResetPassword";

// things you should know
// the use of Zustand for state management
// the use of React-router-dom for page routing

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container max-w-screen bg-[#f5f5f5] ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/authentication" element={<Authentication />}>
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
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;

// import React, { useState } from 'react';
// import InputField from '../components/InputField';
// import PasswordInputField from '../components/PasswordInputField';
// import userLogo from '../icons/user.png';
// import mailLogo from '../icons/mail.png';
// import useAuthenticationStore from '../store/userStore';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import calendar from '../icons/calendar.svg';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import prevArrow from '../icons/leftArrow.png';
// import { motion } from 'framer-motion';
// import { signUp } from '../services/authService';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import useAuthHandler from '../hooks/useAuthHandler';

// export default function SignUpDetails() {
//   const { user = { country: '', username: '', email: '', date: '', gender: '' }, updateUser } = useAuthenticationStore();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState('');
//   const { loading, error, handleAuthAction } = useAuthHandler();
//   const [validationErrors, setValidationErrors] = useState({username: '', email: '', gender: '', date: '', password: ''});

//   const validateForm = () => {
//     const errors = {
//       username: !user.username ? 'Username is required' : '',
//       email: !user.email ? 'Email is required' : !/\S+@\S+\.\S+/.test(user.email) ? 'Invalid email format' : '',
//       gender: !user.gender ? 'Please select your gender' : '',
//       date: !user.date ? 'Date of birth is required' : '',
//       password: !password ? 'Password is required' : password.length < 8 ? 'Password must be at least 8 characters' : '',
//     };
//     setValidationErrors(errors);
//     return !Object.values(errors).some((err) => err !== '');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'password') {
//       setPassword(value);
//     } else {
//       updateUser(name, value);
//     }
//     if (validationErrors[name]) setValidationErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleGender = (e) => {
//     e.preventDefault();
//     const gender = e.currentTarget.getAttribute('data-gender');
//     updateUser('gender', gender);
//     if (validationErrors.gender) setValidationErrors((prev) => ({ ...prev, gender: '' }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     handleAuthAction(async () => {
//       const userCredential = await signUp(user.email, password);
//       const uid = userCredential.user.uid;
//       const userData = {
//         uid,
//         country: user.country,
//         username: user.username,
//         email: user.email,
//         gender: user.gender,
//         dateOfBirth: user.date,
//         createdAt: new Date(),
//       };
//       await setDoc(doc(db, 'users', uid), userData);
//       setPassword(''); // Clear password after successful signup
//       navigate('/authentication/sign-up-reason');
//     }, {
//       'auth/email-already-in-use': 'Email already registered',
//       'auth/weak-password': 'Password is too weak',
//     });
//   };

//   const isPasswordValid = password.length >= 8;

//   return (
//     <div className="mx-4 sm:mx-10 py-[30px]">
//       <div className="flex items-center justify-between w-full">
//         <Link to="/authentication/sign-up-language">
//           <img src={prevArrow} alt="previous button" className="h-[30px] p-0.5" />
//         </Link>
//         <p className="text-center sm:text-[20px] font-bold">Tell us who you are</p>
//         <div></div>
//       </div>
//       <div className="flex gap-3 my-[27px] w-full z-10">
//         <div className="w-full border border-[#F06D99]"></div>
//         <motion.div
//           initial={{ x: '-100%', border: '1px solid black' }}
//           animate={{ x: '0%', border: '1px solid #F06D99' }}
//           transition={{ duration: 1, ease: 'linear' }}
//           className="w-full"
//         />
//         <div className="w-full border border-[#000000] opacity-50"></div>
//       </div>
//       <p className="text-[12px] text-gray-500 mb-[25px]">
//         We are creating a personalised experience for you based on the information you provide
//       </p>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] text-gray-400">
//         <div className="flex gap-[20px] items-center">
//           <button
//             onClick={handleGender}
//             data-gender="female"
//             className={`w-full py-[13px] rounded-[5px] font-medium border-[1px] cursor-pointer ${
//               user.gender === 'female' ? 'bg-[#B1D2F1]' : 'bg-white'
//             }`}
//           >
//             Female
//           </button>
//           <button
//             onClick={handleGender}
//             data-gender="male"
//             className={`w-full py-[13px] rounded-[5px] font-medium border-[1px] cursor-pointer ${
//               user.gender === 'male' ? 'bg-[#B1D2F1]' : 'bg-white'
//             }`}
//           >
//             Male
//           </button>
//         </div>
//         {validationErrors.gender && <p className="text-red-500 text-sm">{validationErrors.gender}</p>}
//         <InputField
//           icon={userLogo}
//           name="username"
//           placeholder="Username"
//           handleChange={handleChange}
//           value={user.username}
//         />
//         {validationErrors.username && <p className="text-red-500 text-sm">{validationErrors.username}</p>}
//         <InputField
//           icon={mailLogo}
//           name="email"
//           placeholder="Email"
//           handleChange={handleChange}
//           value={user.email}
//         />
//         {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
//         <div className="flex gap-[12px] items-center text-[14px] text-gray-900 font-medium py-[12px] px-[16px] border border-gray-400 rounded-[5px] h-auto w-full">
//           <img src={calendar} alt="calendar-icon" className="w-[24px] h-[24px]" />
//           <DatePicker
//             selected={user.date ? new Date(user.date) : null}
//             onChange={(date) => {
//               updateUser('date', date?.toISOString().split('T')[0]);
//               if (validationErrors.date) setValidationErrors((prev) => ({ ...prev, date: '' }));
//             }}
//             placeholderText="Date of birth"
//             className="text-[14px] text-gray-900 w-full font-medium outline-none"
//           />
//         </div>
//         {validationErrors.date && <p className="text-red-500 text-sm">{validationErrors.date}</p>}
//         <PasswordInputField
//           name="password"
//           userPassword={password}
//           passwordLength={password.length}
//           handleChange={handleChange}
//         />
//         {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         <button
//           type="submit"
//           disabled={!isPasswordValid || loading}
//           className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
//             isPasswordValid && !loading ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
//           }`}
//         >
//           {loading ? 'Signing Up...' : 'Continue'}
//         </button>
//         <Outlet />
//       </form>
//     </div>
//   );
// }


// Import necessary dependencies for the sign-up form
import React, { useState } from 'react'; // React and useState for managing password state
import InputField from '../components/InputField'; // Custom input field component for username and email
import PasswordInputField from '../components/PasswordInputField'; // Custom password input field component
import userLogo from '../icons/user.png'; // Icon for username input
import mailLogo from '../icons/mail.png'; // Icon for email input
import calendar from '../icons/calendar.svg'; // Icon for date picker
import useAuthenticationStore from '../store/userStore'; // Zustand store for managing user state
import DatePicker from 'react-datepicker'; // DatePicker component for selecting date of birth
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker CSS for styling
import { Link, useNavigate } from 'react-router-dom'; // Link and useNavigate for navigation
import prevArrow from '../icons/leftArrow.png'; // Previous arrow icon for back button
import { motion } from 'framer-motion'; // Framer Motion for animating the progress bar
import { signUp } from '../services/authService'; // signUp function from authService for Firebase Auth
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions for storing user data
import { db } from '../config/firebase'; // Firestore database instance
import useAuthHandler from '../hooks/useAuthHandler'; // Custom hook for handling authentication actions and errors

// Define the SignUpDetails component
export default function SignUpDetails() {
  // Initialize user data from Zustand store, defaulting to empty strings if undefined
  const { user = { country: '', username: '', email: '', date: '', gender: '' }, updateUser } = useAuthenticationStore();
  // Use navigate hook to redirect users after successful sign-up
  const navigate = useNavigate();
  // State to store the password input value
  const [password, setPassword] = useState('');
  // Destructure loading, error states, and handleAuthAction function from custom hook
  const { loading, error, handleAuthAction } = useAuthHandler();
  // State to store validation errors for each form field
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    email: '',
    gender: '',
    date: '',
    password: '',
  });

  // Validate form fields and update validation errors
  const validateForm = () => {
    const errors = {
      username: !user.username ? 'Username is required' : '', // Check if username is provided
      email: !user.email
        ? 'Email is required'
        : !/\S+@\S+\.\S+/.test(user.email)
        ? 'Invalid email format'
        : '', // Check if email is provided and valid
      gender: !user.gender ? 'Please select your gender' : '', // Check if gender is selected
      date: !user.date ? 'Date of birth is required' : '', // Check if date of birth is provided
      password: !password
        ? 'Password is required'
        : password.length < 8
        ? 'Password must be at least 8 characters'
        : '', // Check if password is provided and meets length requirement
    };
    setValidationErrors(errors); // Update validation errors state
    // Return true if there are no errors (all error messages are empty)
    return !Object.values(errors).some((err) => err !== '');
  };

  // Handle changes to input fields (username, email, password)
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the input's name and value
    if (name === 'password') {
      setPassword(value); // Update password state if the field is password
    } else {
      updateUser(name, value); // Update user state in the store for other fields
    }
    // Clear validation error for the field if it exists
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle gender selection
  const handleGender = (e) => {
    e.preventDefault(); // Prevent default button behavior
    const gender = e.currentTarget.getAttribute('data-gender'); // Get the selected gender from data attribute
    updateUser('gender', gender); // Update gender in the store
    // Clear gender validation error if it exists
    if (validationErrors.gender) {
      setValidationErrors((prev) => ({ ...prev, gender: '' }));
    }
  };

  // Handle form submission: sign up user and store data in Firestore
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!validateForm()) return; // Stop if form validation fails

    // Use handleAuthAction to perform the sign-up and handle errors
    handleAuthAction(async () => {
      // Create a new user with email and password using Firebase Auth
      const userCredential = await signUp(user.email, password);
      const uid = userCredential.user.uid; // Get the user's unique ID
      // Prepare user data to store in Firestore
      const userData = {
        uid,
        country: user.country,
        username: user.username,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.date,
        createdAt: new Date(), // Timestamp for when the user was created
      };
      // Store user data in Firestore under the 'users' collection with the user's UID
      await setDoc(doc(db, 'users', uid), userData);
      setPassword(''); // Clear password field after successful sign-up
      // Redirect to the next step in the sign-up process
      navigate('/authentication/sign-up-reason');
    }, {
      // Map Firebase error codes to user-friendly messages
      'auth/email-already-in-use': 'Email already registered',
      'auth/weak-password': 'Password is too weak',
    });
  };

  // Validate password length (minimum 8 characters)
  const isPasswordValid = password.length >= 8;

  return (
    // Main container with responsive padding: 4-unit margin on small screens, 10-unit on larger, 30px vertical padding
    <div className="mx-4 sm:mx-10 py-[30px]">
      {/* Header with back button and title: flex layout, centered items, space-between justification */}
      <div className="flex items-center justify-between w-full">
        <Link to="/authentication">
          {/* Back button image: 30px height, 0.5-unit padding */}
          <img src={prevArrow} alt="previous button" className="h-[30px] p-0.5" />
        </Link>
        {/* Title: centered, 20px font on small screens and above, bold */}
        <p className="text-center sm:text-[20px] font-bold">Tell us who you are</p>
        {/* Placed an empty div below for stlying purposes */}
        <div className=""></div>
      </div>
      {/* Progress bar with animation: flex layout, 3-unit gap, 27px vertical margin, full width, z-index 10 */}
      <div className="flex gap-3 my-[27px] w-full z-10">
        {/* First segment (completed): full width, pink border */}
        <div className="w-full border border-[#F06D99]"></div>
        {/* Animated segment (current step): full width, animates from -100% to 0% with pink border */}
        <motion.div
          initial={{ x: '-100%', border: '1px solid black' }}
          animate={{ x: '0%', border: '1px solid #F06D99' }}
          transition={{ duration: 1, ease: 'linear' }}
          className="w-full"
        />
        {/* Last segment (upcoming): full width, black border, 50% opacity */}
        <div className="w-full border border-[#000000] opacity-50"></div>
      </div>
      {/* Description: 12px font, gray-500 color, 25px bottom margin */}
      <p className="text-[12px] text-gray-500 mb-[25px]">
        We are creating a personalised experience for you based on the information you provide
      </p>
      {/* Form for user details: flex column layout, 16px gap, gray-400 text */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] text-gray-400">
        {/* Gender selection buttons: flex layout, 20px gap, centered items */}
        <div className="flex gap-[20px] items-center">
          {/* Female button: full width, 13px padding, rounded, medium font, 1px border, pointer cursor, conditional background */}
          <button
            onClick={handleGender}
            data-gender="female"
            className={`w-full py-[13px] rounded-[5px] font-medium border-[1px] cursor-pointer ${
              user.gender === 'female' ? 'bg-[#B1D2F1]' : 'bg-white'
            }`}
          >
            Female
          </button>
          {/* Male button: full width, 13px padding, rounded, medium font, 1px border, pointer cursor, conditional background */}
          <button
            onClick={handleGender}
            data-gender="male"
            className={`w-full py-[13px] rounded-[5px] font-medium border-[1px] cursor-pointer ${
              user.gender === 'male' ? 'bg-[#B1D2F1]' : 'bg-white'
            }`}
          >
            Male
          </button>
        </div>
        {/* Gender validation error: red-500 text, small font */}
        {validationErrors.gender && <p className="text-red-500 text-sm">{validationErrors.gender}</p>}
        {/* Username input field */}
        <InputField
          icon={userLogo}
          name="username"
          placeholder="Username"
          handleChange={handleChange}
          value={user.username}
        />
        {/* Username validation error: red-500 text, small font */}
        {validationErrors.username && <p className="text-red-500 text-sm">{validationErrors.username}</p>}
        {/* Email input field */}
        <InputField
          icon={mailLogo}
          name="email"
          placeholder="Email"
          handleChange={handleChange}
          value={user.email}
        />
        {/* Email validation error: red-500 text, small font */}
        {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
        {/* Date of birth picker: flex layout, 12px gap, centered items, 14px font, gray-900 text, medium font, 12px vertical padding, 16px horizontal padding, gray-400 border, rounded, auto height, full width */}
        <div className="flex gap-[12px] items-center text-[14px] text-gray-900 font-medium py-[12px] px-[16px] border border-gray-400 rounded-[5px] h-auto w-full">
          {/* Calendar icon: 24px width and height */}
          <img src={calendar} alt="calendar-icon" className="w-[24px] h-[24px]" />
          {/* Date picker component */}
          <DatePicker
            selected={user.date ? new Date(user.date) : null}
            onChange={(date) => {
              updateUser('date', date?.toISOString().split('T')[0]); // Store date in YYYY-MM-DD format
              // Clear date validation error if it exists
              if (validationErrors.date) {
                setValidationErrors((prev) => ({ ...prev, date: '' }));
              }
            }}
            placeholderText="Date of birth"
            className="text-[14px] text-gray-900 w-full font-medium outline-none"
          />
        </div>
        {/* Date validation error: red-500 text, small font */}
        {validationErrors.date && <p className="text-red-500 text-sm">{validationErrors.date}</p>}
        {/* Password input field */}
        <PasswordInputField
          name="password"
          userPassword={password}
          passwordLength={password.length}
          handleChange={handleChange}
        />
        {/* Password validation error: red-500 text, small font */}
        {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}
        {/* Authentication error: red-500 text, small font, centered */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {/* Submit button: full width, 13px padding, rounded, bold font, pointer cursor on hover, opacity transition, conditional styling based on validation and loading */}
        <button
          type="submit"
          disabled={!isPasswordValid || loading}
          className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
            isPasswordValid && !loading ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
          }`}
        >
          {/* Show "Signing Up..." while loading, otherwise "Continue" */}
          {loading ? 'Signing Up...' : 'Continue'}
        </button>
        {/* Removed Outlet as it was unused */}
      </form>
    </div>
  );
}
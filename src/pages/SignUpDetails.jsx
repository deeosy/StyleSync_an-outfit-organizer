// import React, { useState } from 'react';
// import InputField from '../components/InputField';
// import PasswordInputField from '../components/PasswordInputField';
// import userLogo from '../icons/user.png';
// import mailLogo from '../icons/mail.png';
// import useAuthenticationStore from '../store/userStore'; // Assuming this is the correct path
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import calendar from '../icons/calendar.svg';
// import { Link, Outlet } from 'react-router-dom';
// import prevArrow from '../icons/leftArrow.png';
// import { motion } from 'framer-motion';
// import { signUp } from '../services/authService';
// import { useNavigate } from 'react-router-dom';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '../config/firebase';

// export default function SignUpDetails() {
//   const { user = { country: '', username: '', email: '', date: '', gender: '' }, updateUser } = useAuthenticationStore();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState(''); // Password managed locally, not in store
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({
//     username: '',
//     email: '',
//     gender: '',
//     date: '',
//     password: '',
//   });

//   // Validate form fields
//   const validateForm = () => {
//     const errors = {
//       username: !user.username ? 'Username is required' : '',
//       email: !user.email
//         ? 'Email is required'
//         : !/\S+@\S+\.\S+/.test(user.email)
//         ? 'Invalid email format'
//         : '',
//       gender: !user.gender ? 'Please select your gender' : '',
//       date: !user.date ? 'Date of birth is required' : '',
//       password: !password
//         ? 'Password is required'
//         : password.length < 8
//         ? 'Password must be at least 8 characters'
//         : '',
//     };

//     setValidationErrors(errors);
//     return !Object.values(errors).some((error) => error !== '');
//   };

//   const isPasswordValid = () => password.length >= 8;

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'password') {
//       setPassword(value);
//     } else {
//       updateUser(name, value);
//     }
//     // Clear validation error when user starts typing
//     if (validationErrors[name]) {
//       setValidationErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   // Handle gender selection
//   const handleGender = (e) => {
//     e.preventDefault();
//     const gender = e.currentTarget.getAttribute('data-gender');
//     updateUser('gender', gender);
//     if (validationErrors.gender) {
//       setValidationErrors((prev) => ({ ...prev, gender: '' }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (!validateForm()) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const userCredential = await signUp(user.email, password);
//       const uid = userCredential.user.uid;

//       // Prepare user data (no password stored, country from SignUpLanguage)
//       const userData = {
//         uid,
//         country: user.country, // Already set in SignUpLanguage
//         username: user.username,
//         email: user.email,
//         gender: user.gender,
//         dateOfBirth: user.date, // Consistent naming with Firestore
//         createdAt: new Date(),
//       };

//       // Save user data to Firestore
//       await setDoc(doc(db, 'users', uid), userData);
//       navigate('/authentication/sign-up-reason');
//     } catch (error) {
//       let errorMessage = 'Sign up failed';
//       if (error.code === 'auth/email-already-in-use') {
//         errorMessage = 'Email already registered';
//         setValidationErrors((prev) => ({ ...prev, email: errorMessage }));
//       } else if (error.code === 'auth/weak-password') {
//         errorMessage = 'Password is too weak';
//         setValidationErrors((prev) => ({ ...prev, password: errorMessage }));
//       }
//       console.error('Sign up error:', error);
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-4 sm:mx-10 py-[30px]">
//       <div className="flex items-center justify-between w-full">
//         <Link to="/authentication/sign-up-language"> {/* Updated to match flow */}
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
//         {/* Gender Selection */}
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
//         {validationErrors.gender && (
//           <p className="text-red-500 text-sm">{validationErrors.gender}</p>
//         )}

//         {/* Username */}
//         <InputField
//           icon={userLogo}
//           name="username"
//           placeholder="Username"
//           handleChange={handleChange}
//           value={user.username}
//         />
//         {validationErrors.username && (
//           <p className="text-red-500 text-sm">{validationErrors.username}</p>
//         )}

//         {/* Email */}
//         <InputField
//           icon={mailLogo}
//           name="email"
//           placeholder="Email"
//           handleChange={handleChange}
//           value={user.email}
//         />
//         {validationErrors.email && (
//           <p className="text-red-500 text-sm">{validationErrors.email}</p>
//         )}

//         {/* Date Picker */}
//         <div className="flex gap-[12px] items-center text-[14px] text-gray-900 font-medium py-[12px] px-[16px] border border-gray-400 rounded-[5px] h-auto w-full">
//           <img src={calendar} alt="calendar-icon" className="w-[24px] h-[24px]" />
//           <DatePicker
//             selected={user.date ? new Date(user.date) : null}
//             onChange={(date) => {
//               updateUser('date', date?.toISOString().split('T')[0]);
//               if (validationErrors.date) {
//                 setValidationErrors((prev) => ({ ...prev, date: '' }));
//               }
//             }}
//             placeholderText="Date of birth"
//             className="text-[14px] text-gray-900 w-full font-medium outline-none"
//           />
//         </div>
//         {validationErrors.date && (
//           <p className="text-red-500 text-sm">{validationErrors.date}</p>
//         )}

//         {/* Password */}
//         <PasswordInputField
//           name="password"
//           userPassword={password}
//           passwordLength={password.length}
//           handleChange={handleChange}
//         />
//         {validationErrors.password && (
//           <p className="text-red-500 text-sm">{validationErrors.password}</p>
//         )}

//         {/* Global error message */}
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         <button
//           type="submit"
//           className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
//             isPasswordValid() && !loading
//               ? 'bg-[#B1D2F1] text-[#212529]'
//               : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
//           }`}
//           disabled={!isPasswordValid() || loading}
//         >
//           {loading ? 'Signing Up...' : 'Continue'}
//         </button>
//         <Outlet />
//       </form>
//     </div>
//   );
// }




import React, { useState } from 'react';
import InputField from '../components/InputField';
import PasswordInputField from '../components/PasswordInputField';
import userLogo from '../icons/user.png';
import mailLogo from '../icons/mail.png';
import useAuthenticationStore from '../store/userStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calendar from '../icons/calendar.svg';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import prevArrow from '../icons/leftArrow.png';
import { motion } from 'framer-motion';
import { signUp } from '../services/authService';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import useAuthHandler from '../hooks/useAuthHandler';

export default function SignUpDetails() {
  const { user = { country: '', username: '', email: '', date: '', gender: '' }, updateUser } = useAuthenticationStore();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { loading, error, handleAuthAction } = useAuthHandler();
  const [validationErrors, setValidationErrors] = useState({username: '', email: '', gender: '', date: '', password: ''});

  const validateForm = () => {
    const errors = {
      username: !user.username ? 'Username is required' : '',
      email: !user.email ? 'Email is required' : !/\S+@\S+\.\S+/.test(user.email) ? 'Invalid email format' : '',
      gender: !user.gender ? 'Please select your gender' : '',
      date: !user.date ? 'Date of birth is required' : '',
      password: !password ? 'Password is required' : password.length < 8 ? 'Password must be at least 8 characters' : '',
    };
    setValidationErrors(errors);
    return !Object.values(errors).some((err) => err !== '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else {
      updateUser(name, value);
    }
    if (validationErrors[name]) setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleGender = (e) => {
    e.preventDefault();
    const gender = e.currentTarget.getAttribute('data-gender');
    updateUser('gender', gender);
    if (validationErrors.gender) setValidationErrors((prev) => ({ ...prev, gender: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    handleAuthAction(async () => {
      const userCredential = await signUp(user.email, password);
      const uid = userCredential.user.uid;
      const userData = {
        uid,
        country: user.country,
        username: user.username,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.date,
        createdAt: new Date(),
      };
      await setDoc(doc(db, 'users', uid), userData);
      setPassword(''); // Clear password after successful signup
      navigate('/authentication/sign-up-reason');
    }, {
      'auth/email-already-in-use': 'Email already registered',
      'auth/weak-password': 'Password is too weak',
    });
  };

  const isPasswordValid = password.length >= 8;

  return (
    <div className="mx-4 sm:mx-10 py-[30px]">
      <div className="flex items-center justify-between w-full">
        <Link to="/authentication/sign-up-language">
          <img src={prevArrow} alt="previous button" className="h-[30px] p-0.5" />
        </Link>
        <p className="text-center sm:text-[20px] font-bold">Tell us who you are</p>
        <div></div>
      </div>
      <div className="flex gap-3 my-[27px] w-full z-10">
        <div className="w-full border border-[#F06D99]"></div>
        <motion.div
          initial={{ x: '-100%', border: '1px solid black' }}
          animate={{ x: '0%', border: '1px solid #F06D99' }}
          transition={{ duration: 1, ease: 'linear' }}
          className="w-full"
        />
        <div className="w-full border border-[#000000] opacity-50"></div>
      </div>
      <p className="text-[12px] text-gray-500 mb-[25px]">
        We are creating a personalised experience for you based on the information you provide
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] text-gray-400">
        <div className="flex gap-[20px] items-center">
          <button
            onClick={handleGender}
            data-gender="female"
            className={`w-full py-[13px] rounded-[5px] font-medium border-[1px] cursor-pointer ${
              user.gender === 'female' ? 'bg-[#B1D2F1]' : 'bg-white'
            }`}
          >
            Female
          </button>
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
        {validationErrors.gender && <p className="text-red-500 text-sm">{validationErrors.gender}</p>}
        <InputField
          icon={userLogo}
          name="username"
          placeholder="Username"
          handleChange={handleChange}
          value={user.username}
        />
        {validationErrors.username && <p className="text-red-500 text-sm">{validationErrors.username}</p>}
        <InputField
          icon={mailLogo}
          name="email"
          placeholder="Email"
          handleChange={handleChange}
          value={user.email}
        />
        {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
        <div className="flex gap-[12px] items-center text-[14px] text-gray-900 font-medium py-[12px] px-[16px] border border-gray-400 rounded-[5px] h-auto w-full">
          <img src={calendar} alt="calendar-icon" className="w-[24px] h-[24px]" />
          <DatePicker
            selected={user.date ? new Date(user.date) : null}
            onChange={(date) => {
              updateUser('date', date?.toISOString().split('T')[0]);
              if (validationErrors.date) setValidationErrors((prev) => ({ ...prev, date: '' }));
            }}
            placeholderText="Date of birth"
            className="text-[14px] text-gray-900 w-full font-medium outline-none"
          />
        </div>
        {validationErrors.date && <p className="text-red-500 text-sm">{validationErrors.date}</p>}
        <PasswordInputField
          name="password"
          userPassword={password}
          passwordLength={password.length}
          handleChange={handleChange}
        />
        {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={!isPasswordValid || loading}
          className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
            isPasswordValid && !loading ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
          }`}
        >
          {loading ? 'Signing Up...' : 'Continue'}
        </button>
        <Outlet />
      </form>
    </div>
  );
}
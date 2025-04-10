// import React from 'react';
// import SignUpOptions from '../components/SignUpOptions';
// import CountryInputField from '../components/CountryInputField';
// import google from '../icons/google.png';
// import facebook from '../icons/facebook.png';
// import instagram from '../icons/instagram.png';
// import useAuthenticationStore from '../store/userStore';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { auth } from '../config/firebase';
// import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
// import useAuthHandler from '../hooks/useAuthHandler';

// export default function SignUpLanguage() {
//   const { user = { country: '' }, updateUser, login } = useAuthenticationStore();
//   const navigate = useNavigate();
//   const { loading, error, handleAuthAction } = useAuthHandler();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     updateUser(name, value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if ((user?.country ?? '').trim().length >= 2) navigate('/authentication/sign-up-details');
//   };

//   const handleGoogleSignUp = () =>
//     handleAuthAction(async () => {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       await login(user);
//       navigate('/authentication/sign-up-reason'); // Redirect to reason page after social signup
//     }, { default: 'Failed to sign up with Google' });

// //     // SignUp with Facebook not working, will look into it later
// //   const handleFacebookSignUp = () =>
// //     handleAuthAction(async () => {
// //       const provider = new FacebookAuthProvider();
// //       const result = await signInWithPopup(auth, provider);
// //       const user = result.user;
// //       await login(user);
// //       navigate('/authentication/sign-up-reason');
// //     }, { default: 'Failed to sign up with Facebook' });

//   // Since Facebook is not working i am going with this for now, this is is a placeholder
//   const handleFacebookSignUp = () => {
//     alert('Facebook sign-up is not currently supported.');
//   };

//   // Instagram signup not supported by Firebase, so this is a placeholder
//   const handleInstagramSignUp = () => {
//     alert('Instagram sign-up is not currently supported.');
//   };

//   const isCountryValid = (user?.country ?? '').trim().length >= 2;

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col mx-4 sm:mx-10 gap-[33px]">
//       <div className="flex flex-col gap-[16px]">
//         <CountryInputField name="country" value={user.country || ''} handleChange={handleChange} />
//         <p className="text-[12px] text-gray-500">
//           Select your country so we can tailor your experience. You can change the country & language in your profile settings anytime
//         </p>
//       </div>
//       <div className="flex flex-col gap-[16px]">
//         <button
//           type="submit"
//           disabled={!isCountryValid || loading}
//           className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
//             isCountryValid && !loading ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
//           }`}
//         >
//           Sign up with email
//         </button>
//         <p className="text-center text-sm text-gray-500">or sign up with:</p>
//         <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px]">
//           <SignUpOptions icon={google} onClick={handleGoogleSignUp} disabled={loading} />
//           <SignUpOptions icon={facebook} onClick={handleFacebookSignUp} disabled={loading} />
//           <SignUpOptions icon={instagram} onClick={handleInstagramSignUp} disabled={loading} />
//         </div>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//       </div>
//       <Outlet />
//     </form>
//   );
// }



// Import React for creating the component
import React from 'react';
// Import component for social sign-up buttons (Google, Facebook, Instagram)
import SignUpOptions from '../components/SignUpOptions';
// Import custom input field component for country selection
import CountryInputField from '../components/CountryInputField';
// Import icons for social sign-up options
import google from '../icons/google.png';
import facebook from '../icons/facebook.png';
import instagram from '../icons/instagram.png';
// Import Zustand store for managing user state and authentication
import useAuthenticationStore from '../store/userStore';
// Import Link and useNavigate from react-router-dom for navigation
import { Link, useNavigate } from 'react-router-dom';
// Import Firebase auth instance and provider for Google sign-up
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// Import custom hook for handling authentication actions and errors
import useAuthHandler from '../hooks/useAuthHandler';

// Define the SignUpLanguage component
export default function SignUpLanguage() {
  // Get user data, updateUser, and login functions from the authentication store, defaulting country to empty string
  const { user = { country: '' }, updateUser, login } = useAuthenticationStore();
  // Use navigate hook to redirect users after country selection or social sign-up
  const navigate = useNavigate();
  // Destructure loading, error states, and handleAuthAction function from custom hook
  const { loading, error, handleAuthAction } = useAuthHandler();

  // Handle changes to the country input field
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the input's name and value
    updateUser(name, value); // Update the country in the store
  };

  // Handle form submission to proceed to the next step if country is valid
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Check if country is valid (at least 2 characters after trimming)
    if ((user?.country ?? '').trim().length >= 2) {
      navigate('/authentication/sign-up-details'); // Redirect to the next step
    }
  };

  // Handle sign-up with Google using Firebase Auth
  const handleGoogleSignUp = () =>
  handleAuthAction(async () => {
    const provider = new GoogleAuthProvider(); // Create a Google authentication provider
    const result = await signInWithPopup(auth, provider); // Open Google sign-up popup
    const user = result.user; // Get the user from the result
    await login(user); // Update the authentication store with the user
    navigate('/authentication/sign-up-reason'); // Redirect to the reason page
  }, { default: 'Failed to sign up with Google' }); // Default error message for Google sign-up failures

  // SignUp with Facebook not working, will look into it later
  //   const handleFacebookSignUp = () =>
  //     handleAuthAction(async () => {
  //       const provider = new FacebookAuthProvider();
  //       const result = await signInWithPopup(auth, provider);
  //       const user = result.user;
  //       await login(user);
  //       navigate('/authentication/sign-up-reason');
  //     }, { default: 'Failed to sign up with Facebook' });

  // Since Facebook is not working i am going with this for now.
  // Placeholder for Facebook sign-up (not currently supported)
  const handleFacebookSignUp = () => {
    alert('Facebook sign-up is not currently supported.');
  };

  // Placeholder for Instagram sign-up (not supported by Firebase)
  const handleInstagramSignUp = () => {
    alert('Instagram sign-up is not currently supported.');
  };

  // Validate country input (at least 2 characters after trimming)
  const isCountryValid = (user?.country ?? '').trim().length >= 2;

  return (
    // Form for country selection and sign-up: flex column layout, 4-unit margin on small screens, 10-unit on larger, 33px gap
    <form onSubmit={handleSubmit} className="flex flex-col mx-4 sm:mx-10 gap-[33px]">
      {/* Country input and description: flex column layout, 16px gap */}
      <div className="flex flex-col gap-[16px]">
        {/* Country input field */}
        <CountryInputField
          name="country" // Name of the input field (used in handleChange)
          value={user.country || ''} // Controlled input value
          handleChange={handleChange} // Function to update country state
        />
        {/* Description: 12px font, gray-500 text */}
        <p className="text-[12px] text-gray-500">
          Select your country so we can tailor your experience. You can change the country & language in your profile settings anytime
        </p>
      </div>
      {/* Sign-up options: flex column layout, 16px gap */}
      <div className="flex flex-col gap-[16px]">
        {/* Email sign-up button: full width, 13px padding, rounded, bold font, pointer cursor on hover, opacity transition, conditional styling */}
        <button
          type="submit"
          disabled={!isCountryValid || loading}
          className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
            isCountryValid && !loading ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
          }`}
        >
          Sign up with email
        </button>
        {/* Separator text: centered, small font, gray-500 text */}
        <p className="text-center text-sm text-gray-500">or sign up with:</p>
        {/* Social sign-up buttons: flex layout, justified around on small screens, space-between on larger, 4px gap, 24px gap on medium screens */}
        <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px]">
          {/* Google sign-up button */}
          <SignUpOptions
            icon={google} // Google icon
            onClick={handleGoogleSignUp} // Handler for Google sign-up
            disabled={loading} // Disable button while loading
          />
          {/* Facebook sign-up button */}
          <SignUpOptions
            icon={facebook} // Facebook icon
            onClick={handleFacebookSignUp} // Placeholder handler for Facebook sign-up
            disabled={loading} // Disable button while loading
          />
          {/* Instagram sign-up button */}
          <SignUpOptions
            icon={instagram} // Instagram icon
            onClick={handleInstagramSignUp} // Placeholder handler for Instagram sign-up
            disabled={loading} // Disable button while loading
          />
        </div>
        {/* Error message: red-500 text, small font, centered */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
      {/* Removed Outlet as it was unused */}
    </form>
  );
}
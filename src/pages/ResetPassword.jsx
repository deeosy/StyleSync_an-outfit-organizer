// import React, { useState } from 'react';
// import InputField from '../components/InputField';
// import mailLogo from '../icons/mail.png';
// import { auth } from '../config/firebase';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import useAuthHandler from '../hooks/useAuthHandler';

// export default function ResetPassword() {
//   const [credentials, setCredentials] = useState({ email: '' });
//   const { loading, error, success, handleAuthAction } = useAuthHandler();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleResetPassword = (e) => {
//     e.preventDefault();
//     if (!credentials.email) {
//       setError('Please enter your email to reset your password');
//       return;
//     }
    
//     handleAuthAction(() => sendPasswordResetEmail(auth, credentials.email), {
//       'auth/invalid-email': 'Invalid email format. Please check and try again.',
//       'auth/user-not-found': 'No account found with this email.',
//       'auth/too-many-requests': 'Too many requests. Please try again later.',
//     });
//   };

//   return (
//     <form onSubmit={handleResetPassword} className="flex flex-col justify-between mx-4 sm:mx-10 gap-[16px] text-gray-400">
//       <div>
//         <InputField
//           icon={mailLogo}
//           name="email"
//           placeholder="Email"
//           handleChange={handleChange}
//           value={credentials.email}
//         />
//         {success && <p className="text-[12px] text-green-500 mt-2">Password reset email sent! Check your inbox.</p>}
//         {error && <p className="text-[12px] text-[#ED4F9D] mt-2">{error}</p>}
//       </div>
//       <button
//         type="submit"
//         disabled={loading}
//         className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
//           !loading ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
//         }`}
//       >
//         {loading ? 'Sending...' : 'Forgot Password?'}
//       </button>
//     </form>
//   );
// }


// Import React and useState for managing form state
import React, { useState } from 'react';
// Import custom input field component for email
import InputField from '../components/InputField';
// Import email icon for the input field
import mailLogo from '../icons/mail.png';
// Import Firebase auth instance and function for sending password reset email
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
// Import custom hook for handling authentication actions and errors
import useAuthHandler from '../hooks/useAuthHandler';

// Define the ResetPassword component
export default function ResetPassword() {
  // State to store the email input value
  const [credentials, setCredentials] = useState({ email: '' });
  // Destructure loading, error, success states, and handleAuthAction function from custom hook
  const { loading, error, success, handleAuthAction } = useAuthHandler();

  // Handle changes to the email input field
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the input's name and value
    setCredentials((prev) => ({ ...prev, [name]: value })); // Update the email in state
  };

  // Handle form submission to send a password reset email
  const handleResetPassword = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Validate that email is provided
    if (!credentials.email) {
      // Use handleAuthAction to set the error message (fixing the original setError typo)
      handleAuthAction(() => {
        throw new Error('Please enter your email to reset your password'); // Throw error to be caught by handleAuthAction
      });
      return;
    }
    // Send password reset email using Firebase Auth
    handleAuthAction(() => sendPasswordResetEmail(auth, credentials.email), {
      // Map Firebase error codes to user-friendly messages
      'auth/invalid-email': 'Invalid email format. Please check and try again.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/too-many-requests': 'Too many requests. Please try again later.',
    });
  };

  return (
    // Form for password reset: flex column layout, justified content, 4-unit margin on small screens, 10-unit on larger, 16px gap, gray-400 text
    <form onSubmit={handleResetPassword} className="flex flex-col justify-between mx-4 sm:mx-10 gap-[16px] text-gray-400">
      {/* Container for email input and feedback messages */}
      <div>
        {/* Email input field */}
        <InputField
          icon={mailLogo} // Icon for the email input
          name="email" // Name of the input field (used in handleChange)
          placeholder="Email" // Placeholder text
          handleChange={handleChange} // Function to update email state
          value={credentials.email} // Controlled input value
        />
        {/* Success message: 12px font, green-500 text, 2-unit top margin */}
        {success && <p className="text-[12px] text-green-500 mt-2">Password reset email sent! Check your inbox.</p>}
        {/* Error message: 12px font, custom pink text, 2-unit top margin */}
        {error && <p className="text-[12px] text-[#ED4F9D] mt-2">{error}</p>}
      </div>
      {/* Submit button: full width, 13px padding, rounded, bold font, pointer cursor on hover, opacity transition, conditional styling based on loading */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
          !loading ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
        }`}
      >
        {/* Show "Sending..." while loading, otherwise "Forgot Password?" */}
        {loading ? 'Sending...' : 'Forgot Password?'}
      </button>
    </form>
  );
}
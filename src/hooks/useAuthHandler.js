import { useState } from 'react';  // Import useState hook from React for managing component state

export default function useAuthHandler() {
  const [loading, setLoading] = useState(false);  // State to track if an authentication action is in progress
  const [error, setError] = useState('');   // State to store error messages from authentication actions
  const [success, setSuccess] = useState('');    // State to store success messages from authentication actions

  // Function to handle authentication actions (e.g., login, sign-up, sign-out)
  const handleAuthAction = async (action, errorMap = {}) => {
    if (loading) return; // Prevent multiple submissions

    // Set loading state to true and clear previous messages
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await action();   // Execute the provided authentication action (e.g., Firebase auth operation)

      setSuccess('Operation successful!');  // Set success message and clear it after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      // Map the error code to a custom message, or use the default message, or fallback to the error message
      const message = errorMap[err.code] || errorMap.default || err.message;

      setError(message);   // Set the error message in state
      console.error('Auth action error:', err);
      throw err; // Re-throw the error to allow the caller to handle it if needed

    } finally {
      setLoading(false);  // Ensure loading state is reset regardless of success or failure
    }

  };
  
  const clearMessages = () => {  // Function to manually clear error and success messages
    setError('');
    setSuccess('');
  };
  
  return { loading, error, success, handleAuthAction, clearMessages  };
}
import { useState } from 'react';

export default function useAuthHandler() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAuthAction = async (action, errorMap = {}) => {
    if (loading) return; // Prevent multiple submissions
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await action();
      setSuccess('Operation successful!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const message = errorMap[err.code] || errorMap.default || err.message;
      setError(message);
      console.error('Auth action error:', err);
      throw err; // Re-throw to allow caller to handle
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleAuthAction };
}
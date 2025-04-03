import React, { useState } from 'react';
import InputField from '../components/InputField';
import mailLogo from '../icons/mail.png';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPassword() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resetMessage, setResetMessage] = useState(''); // For password reset feedback
    const [resetLoading, setResetLoading] = useState(false); // Separate loading state for reset

    // Handle input changes and clear error
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        setError('');
        setResetMessage('');
    };

    // Handle password reset
    const handleResetPassword = async (e) => {
        e.preventDefault(); 
        if (!credentials.email) {
            setError('Please enter your email to reset your password');
            return;
        }

        setResetLoading(true);
        setError('');
        setResetMessage('');

        try {
            await sendPasswordResetEmail(auth, credentials.email);
            setResetMessage('Password reset email sent! Check your inbox.');
            setTimeout(() => setResetMessage(''), 5000);
        } catch (error) {
            console.error('Password reset error:', error);
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Invalid email format. Please check and try again.');
                    break;
                case 'auth/user-not-found':
                    setError('No account found with this email.');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many requests. Please try again later.');
                    break;
                default:
                    setError('Failed to send reset email. Please try again.');
            }
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <form onSubmit={handleResetPassword} className="flex flex-col justify-between min-h-[250px] mx-4 sm:mx-10 gap-[16px] text-gray-400">
            <div>
                <InputField
                    icon={mailLogo}
                    name="email"
                    placeholder="Email"
                    handleChange={handleChange}
                    value={credentials.email}
                />
                {resetMessage && <p className="text-[12px] text-green-500 mt-2">{resetMessage}</p>}
                {error && <p className="text-[12px] text-[#ED4F9D] mt-2">{error}</p>}
            </div>

            <button
                type="submit"
                disabled={resetLoading || loading}
                className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity 
                    ${!resetLoading ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'}
                `}
            >
                {resetLoading ? 'Sending...' : 'Forgot Password?'}
            </button>
        </form>
    );
}
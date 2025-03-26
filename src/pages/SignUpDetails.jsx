import React, { useState } from 'react';
import InputField from '../components/InputField';
import PasswordInputField from '../components/PasswordInputField';
import userLogo from '../icons/user.png';
import mailLogo from '../icons/mail.png';
import useAuthencationStore from '../store/userStore';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from '../icons/calendar.svg';
import { Link, Outlet } from 'react-router-dom';
import prevArrow from '../icons/leftArrow.png';
import { motion } from "framer-motion";
import { signUp } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {db}  from '../config/firebase';


export default function SignUpDetails() {
    const { user, updateUser } = useAuthencationStore();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateUser(name, value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Validate form
            if (!user.email || !user.password) {
                throw new Error('Please fill in all fields');
            }
            
            if (user.password !== user.confirmPassword) {
                throw new Error('Passwords do not match');
            }
            
            // Sign up with Firebase Authentication
            const userCredential = await signUp(user.email, user.password);
            const uid = userCredential.user.uid;

            // Save user data to Firestore after successful signup
            
            await addDoc(collection(db, "users"), {
                uid: uid,  // Store the Firebase Auth UID
                username: user.username,
                email: user.email,
                gender: user.gender,
                dateOfBirth: user.date,
                createdAt: new Date(),
            });
            
            // Navigate to the next page 
            navigate('/authenticaion/sign-up-reason');
        } catch (error) {
            setError(error.message);
            console.error('Sign up error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-4 sm:mx-10 py-[30px]">
            <div className="flex items-center justify-between w-full">
                <Link to='/authenticaion'>
                    <img src={prevArrow} alt="previous button" className='h-[30px] p-0.5 ' />
                </Link>
                <p className='text-center sm:text-[20px] font-bold '>Tell us who you are</p>
                <div className=""></div>
            </div>
            <div className="flex gap-3 my-[27px] w-full z-10">
                <div className="w-full border border-[#F06D99] "></div>
                <motion.div
                    initial={{ x: "-100%", border:'1px solid black' }}
                    animate={{ x: "0%", border:'1px solid #F06D99' }}
                    transition={{ duration: 1, ease: "linear" }}
                    className="w-full "
                />
                <div className="w-full border border-[#000000] opacity-50 "></div>
            </div>
            <p className='text-[12px] text-gray-500 mb-[25px]'>We are creating a personalised experience for you based on the information you provide</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-[16px] text-gray-400'>
                {/* Gender Selection */}
                <div className="flex gap-[20px] items-center">
                    <button onClick={handleGender} data-gender='female' className={`w-full py-[13px] rounded-[5px] font-medium border-[1px] cursor-pointer ${user.gender === 'female' ? 'bg-[#B1D2F1]':'bg-white'}`}>Female</button>
                    <button onClick={handleGender} data-gender='male' className={`w-full py-[13px] rounded-[5px] font-medium border-[1px] cursor-pointer ${user.gender === 'male' ? 'bg-[#B1D2F1]':'bg-white'}`}>Male</button>
                </div>
                {/* Other Form Fields */}
                <InputField icon={userLogo} name='username' placeholder='Username' handleChange={handleChange} value={user.username} />
                <InputField icon={mailLogo} name='email' placeholder='Email' handleChange={handleChange} value={user.email} />
                {/* Date Picker */}
                <div className="flex gap-[12px] items-center text-[14px] text-gray-900 font-medium py-[12px] px-[16px] border border-gray-400 rounded-[5px] h-auto w-full">
                    <img src={calendar} alt="calendar-icon" className='w-[24px] h-[24px]' />
                    <DatePicker selected={user.date ? new Date(user.date) : null}
                        onChange={(date) => updateUser('date', date?.toISOString().split('T')[0])}
                        placeholderText="Date of birth"
                        className='text-[14px] text-gray-900 w-full font-medium outline-none '
                    />
                </div>
                <PasswordInputField name='password' userPassword={user.password} passwordLength={user.password.length} handleChange={handleChange} />
                <Link to='/authenticaion/sign-up-reason'>
                    <button 
                        type='submit'
                        className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${isPasswordValid ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'}`} 
                        disabled={!isPasswordValid}
                    >
                        Continue
                    </button>
                </Link>
                <Outlet />
            </form>
        </div>
    );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import prevArrow from '../icons/leftArrow.png';
import wardrobe from '../icons/wardrobe-outline.png';
import SignUpReasonButton from '../components/SignUpReasonButton';
import brain from '../icons/brain-outline.png';
import camera from '../icons/camera-outline.png';
import discover from '../icons/discover-outline.png';
import bar from '../icons/bar-chart-outline.png';
import picture from '../icons/picture-outline.png';
import { Link, useNavigate } from 'react-router-dom';
import useAuthenticationStore from '../store/userStore'; // Assuming this is the correct path
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function SignUpReason() {
  const { user, updateUser } = useAuthenticationStore();
  const isReasonSelected = Boolean(user.reason); // Check if a reason is selected
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle reason selection
  const handleReason = (e) => {
    updateUser('reason', e.currentTarget.dataset.reason);
  };

  // Handle continue button click
  const handleContinue = async () => {
    if (isReasonSelected) {
      setLoading(true);
      const auth = getAuth();
      const firebaseUser = auth.currentUser;

      if (firebaseUser) {
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          await updateDoc(userRef, { reason: user.reason }); // Update Firestore with selected reason
          navigate('/dashboard');
        } catch (error) {
          console.error('Failed to update user reason:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('No authenticated user found!');
        setLoading(false);
      }
    }
  };

  return (
    <div className="mx-4 sm:mx-10 py-[30px]">
      <div className="flex items-center justify-between w-full">
        <Link to="/authentication/sign-up-details">
          <img src={prevArrow} alt="previous button" className="h-[30px] p-0.5" />
        </Link>
        <p className="text-center sm:text-[20px] font-bold">Why are you here?</p>
        <div></div>
      </div>
      <div className="flex gap-3 my-[27px] w-full z-10">
        <div className="w-full border border-[#F06D99]"></div>
        <div className="w-full border border-[#F06D99]"></div>
        <motion.div
          initial={{ x: '-100%', border: '1px solid black' }}
          animate={{ x: '0%', border: '1px solid #F06D99' }}
          transition={{ duration: 1, ease: 'linear' }}
          className="w-full"
        />
      </div>
      <p className="text-[12px] text-gray-500 mb-[25px]">
        Select your main reason for signing up to StyleSync and we’ll customize your experience so you can get the most out of your wardrobe.
      </p>
      <div className="flex flex-col gap-4 h-[300px] sm:h-full overflow-scroll no-scrollbar">
        <div className="flex flex-col gap-8 sm:flex-row justify-between">
          <SignUpReasonButton handleReason={handleReason} reason="Organise" icon={wardrobe} text="Organise my wardrobe" />
          <SignUpReasonButton handleReason={handleReason} reason="AI recommendations" icon={brain} text="Get Personalised AI recommendations" />
        </div>
        <div className="flex flex-col gap-8 sm:flex-row justify-between">
          <SignUpReasonButton handleReason={handleReason} reason="Visual record" icon={camera} text="Visual record of clothing" />
          <SignUpReasonButton handleReason={handleReason} reason="Discover outfit" icon={discover} text="Discover new outfit ideas" />
        </div>
        <div className="flex flex-col gap-8 sm:flex-row justify-between">
          <SignUpReasonButton handleReason={handleReason} reason="Track wardrobe" icon={bar} text="See and track wardrobe value" />
          <SignUpReasonButton handleReason={handleReason} reason="Document" icon={picture} text="Document or refine my personal style" />
        </div>
      </div>
      <div className="flex flex-col mt-[27px]">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!isReasonSelected || loading}
          className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
            isReasonSelected && !loading
              ? 'bg-[#B1D2F1] text-[#212529]'
              : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
          }`}
        >
          {loading ? 'Continuing...' : 'Continue'}
        </button>
        <p onClick={() => navigate('/dashboard')} className="text-center pt-[13px] font-bold">
          <span className="hover:cursor-pointer hover:text-blue-300">Skip</span>
        </p>
      </div>
    </div>
  );
}


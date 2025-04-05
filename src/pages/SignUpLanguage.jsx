import React from 'react';
import SignUpOptions from '../components/SignUpOptions';
import CountryInputField from '../components/CountryInputField';
import google from '../icons/google.png';
import facebook from '../icons/facebook.png';
import instagram from '../icons/instagram.png';
import useAuthenticationStore from '../store/userStore';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import useAuthHandler from '../hooks/useAuthHandler';

export default function SignUpLanguage() {
  const { user = { country: '' }, updateUser, login } = useAuthenticationStore();
  const navigate = useNavigate();
  const { loading, error, handleAuthAction } = useAuthHandler();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUser(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((user?.country ?? '').trim().length >= 2) navigate('/authentication/sign-up-details');
  };

  const handleGoogleSignUp = () =>
    handleAuthAction(async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await login(user);
      navigate('/authentication/sign-up-reason'); // Redirect to reason page after social signup
    }, { default: 'Failed to sign up with Google' });

//     // SignUp with Facebook not working, will look into it later
//   const handleFacebookSignUp = () =>
//     handleAuthAction(async () => {
//       const provider = new FacebookAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       await login(user);
//       navigate('/authentication/sign-up-reason');
//     }, { default: 'Failed to sign up with Facebook' });

  // Since Facebook is not working i am going with this for now, this is is a placeholder
  const handleFacebookSignUp = () => {
    alert('Facebook sign-up is not currently supported.');
  };

  // Instagram signup not supported by Firebase, so this is a placeholder
  const handleInstagramSignUp = () => {
    alert('Instagram sign-up is not currently supported.');
  };

  const isCountryValid = (user?.country ?? '').trim().length >= 2;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-4 sm:mx-10 gap-[33px]">
      <div className="flex flex-col gap-[16px]">
        <CountryInputField name="country" value={user.country || ''} handleChange={handleChange} />
        <p className="text-[12px] text-gray-500">
          Select your country so we can tailor your experience. You can change the country & language in your profile settings anytime
        </p>
      </div>
      <div className="flex flex-col gap-[16px]">
        <button
          type="submit"
          disabled={!isCountryValid || loading}
          className={`w-full py-[13px] rounded-[5px] font-bold hover:cursor-pointer transition-opacity ${
            isCountryValid && !loading ? 'bg-[#B1D2F1] text-[#212529]' : 'bg-gray-300 text-gray-600 opacity-50 cursor-not-allowed'
          }`}
        >
          Sign up with email
        </button>
        <p className="text-center text-sm text-gray-500">or sign up with:</p>
        <div className="flex justify-around sm:justify-between gap-[4px] md:gap-[24px]">
          <SignUpOptions icon={google} onClick={handleGoogleSignUp} disabled={loading} />
          <SignUpOptions icon={facebook} onClick={handleFacebookSignUp} disabled={loading} />
          <SignUpOptions icon={instagram} onClick={handleInstagramSignUp} disabled={loading} />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
      <Outlet />
    </form>
  );
}
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PasswordError from './PasswordError';

export default function PasswordInputField({ name, userPassword, handleChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const passwordLength = userPassword.length;

  return (
    <div className={`flex flex-col ${passwordLength > 0 && passwordLength < 8 ? 'gap-[8px]' : 'gap-[12px]'}`}>
      <div className={`flex justify-between py-[12px] px-[16px] border ${passwordLength > 0 && passwordLength < 8 ? 'border-[#ED4F9D]' : 'border-gray-400'} rounded-[5px] h-auto w-full`}>
        <div className="flex gap-[12px] w-full">
          {/* Lock Icon */}
          <LockOutlinedIcon className='w-[24px] h-[24px] text-gray-500' />
  
          {/* Password Input */}
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="text-[14px] outline-none text-gray-900 font-medium placeholder:text-gray-400 w-full"
            autoComplete="current-password"
            onChange={handleChange}
            name={name} // Ensure this correctly updates state
            value={userPassword}
            required
          />
        </div>
  
        {/* Show/Hide Password Button */}
        <button type="button" onClick={handleClickShowPassword} 
          className="focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}>
          {showPassword ? (
            <VisibilityOff className="w-[24px] h-[24px] text-gray-500 hover:cursor-pointer" />
          ) : (
            <Visibility className="w-[24px] h-[24px] text-gray-500 hover:cursor-pointer" />
          )}
        </button>
      </div>

      {/* Password validation message */}
      {passwordLength > 0 && passwordLength < 8 ? (
        <PasswordError />
      ) : (
        <p className="text-[12px] text-gray-500">Your password must have at least 8 characters</p>
      )}
    </div>
  );
}

import React from "react";
import PropTypes from 'prop-types';

const SignUpOptions = ({ icon, onClick }) => {
  return (
    <div 
      className={`
        flex items-center justify-center 
        w-full max-w-[100px] 
        p-3 
        border border-gray-200 
        rounded-[5px] 
        hover:bg-gray-100 
        transition duration-300 
        cursor-pointer
        ${onClick ? 'hover:shadow-md' : 'opacity-50 cursor-not-allowed'}
      `}
      onClick={onClick}
    >
      <img 
        src={icon} 
        alt="Sign up option" 
        className="w-6 h-6 object-contain"
      />
    </div>
  );
};

// Add prop type validation
SignUpOptions.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default SignUpOptions;
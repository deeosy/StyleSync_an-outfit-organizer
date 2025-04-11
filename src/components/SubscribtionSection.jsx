import React, {use, useState} from 'react'

export default function SubscribtionSection() {
    const [buttonText, setButtonText ] = useState('Subscribe')
    const [isDisabled, setIsDisabled] = useState(false)

    const handleScribe = () => {
      setIsDisabled(true);   // disable the button during the state changes
      setButtonText('Subscribing...');  // change text to ...
      setTimeout(() => {
        setButtonText('Subscribed');    // After 1 second, change to "Subscribed"

        setTimeout(() => {    // After another second, revert back to "Subscribe"
          setButtonText('Subscribe')
          setIsDisabled(false)
        }, 1500);
      }, 1500)
    }

  return (
    <div className="bg-[#E5E5E5] w-full py-[60px] px-10 lg:px-20 ">
    <div className="max-w-[800px] mx-auto text-center">
      <h2 className="font-bold text-[18px] md:text-[22px] xl:text-[30px]">
        Stay Updated with Style Tips
      </h2>
      <p className="text-[16px] py-[20px] md:text-[20px]">
        Subscribe to our newsletter for style inspiration, updates, and
        exclusive content
      </p>

      <div className="flex flex-col md:flex-row gap-4 justify-center mt-8 ">
        <input
          type="email"
          placeholder="Your email address"
          className="px-6 py-3 bg-white rounded-sm border border-gray-400 outline-none md:min-w-[300px]"
        />
        <button 
            onClick={handleScribe}  disabled={isDisabled}
            className={`bg-[#212529] text-white px-6 py-3 rounded-sm hover:bg-blue-500 transition-all ${isDisabled ? 'opacity-80' : 'hover:cursor-pointer'}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
  )
}

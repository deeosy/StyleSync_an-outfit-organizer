// Import Link from react-router-dom for navigation
import { Link } from 'react-router-dom';
// Import background image for the FAQ section
import BgImage from '../images/image.png';

// Define the FAQSection component
export default function FAQSection() {
  return (
    // FAQ section container
    <div className="relative left-0 overflow-hidden px-10 lg:px-20 text-[#212529]">
      {/* Background image: absolute positioning, full width and height */}
      <img src={BgImage} alt="background image of clouds" className="absolute left-0 w-full h-full" />
      {/* Content container: relative positioning, 60px vertical padding */}
      <div className="relative py-[60px]">
        <h2 className="font-bold text-[18px] md:text-[22px] xl:text-[30px] text-center">
          Frequently Asked Questions
        </h2>

        {/* FAQ items container */}
        <div className="max-w-[900px] mx-auto py-8">
          {/* FAQ item 1*/}
          <div className="mb-6 p-4">
            {/* Question*/}
            <h3 className="font-bold text-lg mb-2">How do I add my clothes?</h3>
            {/* Answer */}
            <p className="text-[14px] md:text-[16px]">
              You can either take photos of your clothing items or search our extensive database to find similar items. Our intelligent system makes categorizing and organizing simple.
            </p>
          </div>

          {/* FAQ item 2*/}
          <div className="mb-6 p-4">
            {/* Question*/}
            <h3 className="font-bold text-lg mb-2">Is the AI styling feature really personalized?</h3>
            {/* Answer*/}
            <p className="text-[14px] md:text-[16px]">
              Yes! Our AI analyzes your preferences, clothing collection, and follows style principles to create outfits specifically for you. The more you use Style Sync, the better the recommendations become.
            </p>
          </div>

          {/* FAQ item 3*/}
          <div className="mb-6 p-4">
            {/* Question*/}
            <h3 className="font-bold text-lg mb-2">Can I use Style Sync on my phone?</h3>
            {/* Answer*/}
            <p className="text-[14px] md:text-[16px]">
              Absolutely! Style Sync is fully responsive and works great on mobile devices, tablets, and desktops.
            </p>
          </div>

          {/* Link container to See more FAQs */}
          <div className="flex justify-center mt-8">
            {/* Link to full FAQ page */}
            <Link to="/faq" className="font-semibold flex items-center gap-2 group">
              <p className="text-center text-[18px] font-semibold group-hover:text-blue-600 transition-colors">
                See all FAQs
              </p>
              {/* Inline SVG arrow*/}
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="group-hover:text-blue-600 transition-colors"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.29 6.71a.996.996 0 000 1.41L13.17 12l-3.88 3.88a.996.996 0 101.41 1.41l4.59-4.59a.996.996 0 000-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
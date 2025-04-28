import { useState, useEffect } from 'react';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState(null); // Track which question is open

  const [faqItems] = useState([
     {
      id: 1,
      question: "How do I add items to my wardrobe?",
      answer: "You can add items to your wardrobe by clicking the 'Add Your First Item' button on the wardrobe page. Fill in the required details like name, category, color, and upload an image of your clothing item.",
      isOpen: false
    },
    {
      id: 2,
      question: "Can I categorize my clothing items?",
      answer: "Yes, StyleSync allows you to categorize your clothing into different sections like Tops, Bottoms, Outerwear, Shoes, Jump suits, and Accessories for better organization.",
      isOpen: false
    },
    {
      id: 3,
      question: "How does the Outfit Builder work?",
      answer: "The Outfit Builder allows you to mix and match items from your wardrobe to create complete outfits. Simply select items from different categories and save your created outfit.",
      isOpen: false
    },
    {
      id: 4,
      question: "Can I search for specific items in my wardrobe?",
      answer: "Absolutely! Use the search bar at the top of your wardrobe page to search for items by name, color, or category. The results will update in real-time as you type.",
      isOpen: false
    },
    {
      id: 5,
      question: "How do I edit or delete items from my wardrobe?",
      answer: "To edit an item, click on it in your wardrobe and select the 'Edit' option. To delete an item, select it and click the 'Delete' button. You'll be asked to confirm before the item is permanently removed.",
      isOpen: false
    },
    {
      id: 6,
      question: "Is my wardrobe data secure?",
      answer: "Yes, all your wardrobe data is securely stored and is only accessible through your account. We use industry-standard encryption to protect your information.",
      isOpen: false
    },
    {
      id: 7,
      question: "Can I access StyleSync on my mobile device?",
      answer: "Yes, StyleSync is fully responsive and works on mobile devices, tablets, and desktop computers. You can manage your wardrobe on the go!",
      isOpen: false
    },
    {
      id: 8,
      question: "How do I create an account?",
      answer: "Click on the 'Account' button in the top navigation bar and select 'Sign Up'. Fill in your details, verify your email address, and you're ready to start building your digital wardrobe.",
      isOpen: false
    },
    {
      id: 9,
      question: "Can I share my outfits with friends?",
      answer: "Currently, sharing functionality is in development. Soon, you'll be able to share your created outfits with friends via social media or direct links.",
      isOpen: false
    },
    {
      id: 10,
      question: "How do I recover my password?",
      answer: "If you've forgotten your password, click on 'Account', then 'Login', and select the 'Forgot Password' option. Follow the instructions sent to your email to reset your password.",
      isOpen: false
    },
    {
      id: 11,
      question: "Can I use StyleSync for free?",
      answer: "Yes, StyleSync offers a free tier that allows you to manage up to 50 clothing items. Premium plans with additional features and storage are available for a monthly subscription.",
      isOpen: false
    },
    {
      id: 12,
      question: "How do I provide feedback or report issues?",
      answer: "We value your feedback! You can contact our support team through the 'Help' section in your account settings or send an email to support@stylesync.com.",
      isOpen: false
    }
  ]);

  const [filteredFAQs, setFilteredFAQs] = useState(faqItems);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const clearSearch = () => setSearchTerm('');

  const toggleFAQ = (id) => {
    setOpenId(prevId => (prevId === id ? null : id)); // Close if same, open if different
  };

  useEffect(() => {
    const filtered = faqItems.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFAQs(filtered);
  }, [searchTerm, faqItems]);

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-gray-900 font-[Manrope]">FAQs</h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Find answers to your questions about StyleSync — your digital wardrobe companion.
          </p>
        </header>

        {/* Search */}
        <div className="relative max-w-3xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full py-3 pl-11 pr-11 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(item => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl shadow-md border transition duration-300 ease-in-out ${
                    isOpen ? 'border-indigo-300 ring-1 ring-indigo-200' : 'border-gray-200'
                  }`}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex justify-between items-center group focus:outline-none"
                    onClick={() => toggleFAQ(item.id)}
                  >
                    <span className="text-lg font-medium text-gray-800 group-hover:text-indigo-600 transition">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="text-indigo-500" size={22} />
                    ) : (
                      <ChevronDown className="text-gray-400 group-hover:text-indigo-500" size={22} />
                    )}
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center p-10 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-500 text-lg">No matching questions found. Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// src/components/StyleSyncOutfitRecommender.jsx
import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getOutfitImages, getFashionImages } from "../utils/imageSearch";

export default function OutfitRecommender() {
  const [user, setUser] = useState(null);
  const [wardrobe, setWardrobe] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [outfits, setOutfits] = useState([]);
  const [outfitImages, setOutfitImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Listen for auth state and fetch wardrobe
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) {
        const wardrobeQuery = query(
          collection(db, "wardrobe"),
          where("userId", "==", u.uid)
        );
        
        const unsubSnapshot = onSnapshot(wardrobeQuery, (querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const itemDescription = `${data.name || 'Unnamed item'} (${data.category || 'Unknown category'})`;
            items.push(itemDescription);
          });
          setWardrobe(items);
        });

        return unsubSnapshot;
      } else {
        setWardrobe([]);
      }
    });

    return () => unsubAuth();
  }, []);

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({
          file,
          preview: e.target.result,
          name: file.name
        });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setUploadedImages(prev => [...prev, ...images]);
    });
  };

  // Remove uploaded image
  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Get AI recommendations with images
  const getAIRecommendations = async () => {
    if (!selectedOption && !customPrompt) {
      alert("Please select an option or enter a custom prompt");
      return;
    }
    
    setLoading(true);
    setOutfits([]);
    setOutfitImages([]);

    let prompt = "";
    let imageSearchQuery = "";
    
    if (selectedOption === "work-attire") {
      prompt = "Generate a work attire from my personal closet. Create professional outfit suggestions.";
      imageSearchQuery = "professional business work attire";
    } else if (selectedOption === "web-outfit") {
      prompt = "Generate an outfit from the web with my style preference. Suggest trendy combinations.";
      imageSearchQuery = "trendy fashion outfit style";
    } else if (selectedOption === "casual-outfit") {
      prompt = "Generate a casual outfit from my trending closet. Create comfortable yet stylish looks.";
      imageSearchQuery = "casual comfortable fashion outfit";
    } else if (customPrompt) {
      prompt = customPrompt;
      imageSearchQuery = customPrompt.toLowerCase();
    }

    const fullPrompt = `
You are StyleSync, a personal AI stylist. 

My wardrobe contains:
${wardrobe.map((i) => `- ${i}`).join("\n")}

Request: ${prompt}

${uploadedImages.length > 0 ? 
  `I've also uploaded ${uploadedImages.length} reference image(s) for inspiration.` : 
  ''
}

Please suggest 3 complete outfit combinations. For each outfit:
1. List the specific items (Top, Bottom, Shoes, Accessories)
2. Explain why this combination works
3. Mention the occasion it's best for
4. Rate the outfit from 1-10 for style

Format your response clearly with outfit numbers.
    `.trim();

    try {
      // Get AI text recommendations
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`
        },
        body: JSON.stringify({
          model: uploadedImages.length > 0 ? "gpt-4o" : "gpt-3.5-turbo",
          messages: uploadedImages.length > 0 ? [
            {
              role: "user",
              content: [
                { type: "text", text: fullPrompt },
                ...uploadedImages.map(img => ({
                  type: "image_url",
                  image_url: { 
                    url: img.preview,
                    detail: "low" // This reduces cost for image analysis
                  }
                }))
              ]
            }
          ] : [{ role: "user", content: fullPrompt }],
          max_tokens: 800
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error?.message || `API Error: ${res.status}`);
      }
      
      const text = data.choices[0].message.content;
      const combos = text.split(/(?=\d+\.\s)/).filter(combo => combo.trim().length > 0);
      setOutfits(combos);

      // Get visual inspiration images from Unsplash
      if (imageSearchQuery) {
        const images = await getOutfitImages(imageSearchQuery, 6);
        setOutfitImages(images);
      }
      
    } catch (err) {
      console.error("API Error:", err);
      alert(`Failed to get recommendations: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Get sample recommendations
  const getSampleRecommendations = async () => {
    const sampleOutfits = [
      `1. Professional Work Look
- Top: Black top from your wardrobe
- Bottom: Brown skirt (creates nice contrast)
- Shoes: Black or brown professional shoes
- Accessories: Simple jewelry, structured bag
- Why it works: Classic color combination, professional yet stylish
- Best for: Office meetings, work presentations
- Style Rating: 8/10`,

      `2. Casual Chic Style
- Top: Black top (versatile base)
- Bottom: Brown skirt (earth tone balance) 
- Shoes: White sneakers or casual flats
- Accessories: Crossbody bag, minimal jewelry
- Why it works: Mixing casual and dressy elements
- Best for: Weekend outings, casual dates
- Style Rating: 7/10`,

      `3. Smart Casual Mix
- Top: Black top layered with a cardigan
- Bottom: Brown skirt 
- Shoes: Ankle boots or loafers
- Accessories: Belt to define waist, statement watch
- Why it works: Layering adds depth and interest
- Best for: Brunch, shopping, informal meetings
- Style Rating: 8/10`
    ];
    
    setOutfits(sampleOutfits);
    
    // Get some general fashion inspiration images
    const images = await getFashionImages(['casual', 'professional', 'trendy']);
    setOutfitImages(images);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to StyleSync</h2>
          <p className="text-gray-600">Please log in to access your AI stylist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Hi, I'm <span className="text-pink-600">StyleSync</span>
          </h1>
          <h2 className="text-xl text-gray-700 mb-4">What would you like to wear?</h2>
          <p className="text-gray-500">Use one of the most common prompts below or use your own to begin</p>
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div 
            className={`p-6 bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedOption === 'work-attire' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
            }`}
            onClick={() => setSelectedOption('work-attire')}
          >
            <div className="w-8 h-8 bg-gray-100 rounded mb-3 flex items-center justify-center">
              💼
            </div>
            <h3 className="font-semibold mb-2">Generate a work attire</h3>
            <p className="text-sm text-gray-600">from my personal closet</p>
          </div>

          <div 
            className={`p-6 bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedOption === 'web-outfit' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
            }`}
            onClick={() => setSelectedOption('web-outfit')}
          >
            <div className="w-8 h-8 bg-blue-100 rounded mb-3 flex items-center justify-center">
              🌐
            </div>
            <h3 className="font-semibold mb-2">Generate an outfit</h3>
            <p className="text-sm text-gray-600">from the web with my style preference</p>
          </div>

          <div 
            className={`p-6 bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedOption === 'casual-outfit' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
            }`}
            onClick={() => setSelectedOption('casual-outfit')}
          >
            <div className="w-8 h-8 bg-green-100 rounded mb-3 flex items-center justify-center">
              👕
            </div>
            <h3 className="font-semibold mb-2">Generate a casual outfit</h3>
            <p className="text-sm text-gray-600">from my trending closet</p>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-semibold mb-4">Upload Reference Images (Optional)</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="text-gray-400 mb-2">📷</div>
              <p className="text-gray-600">Click to upload inspiration images</p>
              <p className="text-sm text-gray-400">Support: JPG, PNG, GIF</p>
            </label>
          </div>
          
          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="mt-4">
              <p className="font-medium mb-2">Uploaded Images:</p>
              <div className="flex flex-wrap gap-2">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={img.preview} 
                      alt="Reference" 
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Custom Prompt */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              placeholder="How may I help find you something?"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={getAIRecommendations}
              disabled={loading || (!selectedOption && !customPrompt)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "✨" : "→"}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={getAIRecommendations}
            disabled={loading || (!selectedOption && !customPrompt)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Getting AI Recommendations..." : "Get AI Recommendations"}
          </button>
          
          <button
            onClick={getSampleRecommendations}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg"
          >
            Get Sample Recommendations
          </button>
        </div>

        {/* Wardrobe Summary */}
        {wardrobe.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="font-semibold mb-3">Your Wardrobe ({wardrobe.length} items):</h3>
            <div className="max-h-32 overflow-y-auto">
              <ul className="space-y-1">
                {wardrobe.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Visual Inspiration Section - Masonry Style */}
        {outfitImages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Visual Inspiration</h3>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {outfitImages.map((img, index) => (
                <div key={img.id} className="relative group break-inside-avoid mb-4">
                  <img 
                    src={img.url} 
                    alt={img.alt}
                    className="w-full object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105"
                    onClick={() => window.open(img.regularUrl, '_blank')}
                    style={{
                      // Let images maintain their natural aspect ratio
                      height: 'auto'
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs">
                      Photo by{' '}
                      <a 
                        href={img.photographerUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline hover:text-yellow-300"
                      >
                        {img.photographer}
                      </a>
                    </p>
                  </div>
                  
                  {/* Category badge */}
                  {img.category && (
                    <div className="absolute top-2 left-2 bg-purple-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {img.category}
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                      Click to view
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outfit Recommendations */}
        {outfits.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Your Style Recommendations:</h3>
            {outfits.map((outfit, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                  {outfit.trim()}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {wardrobe.length === 0 && (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <div className="text-4xl mb-4">👗</div>
            <h3 className="font-semibold text-gray-800 mb-2">Your wardrobe is empty!</h3>
            <p className="text-gray-600">Add some clothes to your wardrobe first to get personalized recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
}
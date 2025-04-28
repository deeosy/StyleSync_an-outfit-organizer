import { Lightbulb, CheckCircle, Camera, Upload, PlusCircle, HelpCircle } from 'lucide-react';

export default function AddClothesCard() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">How to Add Clothes to Your StyleSync Wardrobe</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Welcome to StyleSync! This guide will walk you through the process of adding clothing items to your digital wardrobe so you can start creating amazing outfit combinations.
        </p>
      </header>

      {/* Introduction Section */}
      <section className="mb-10 bg-indigo-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">Getting Started with Your Digital Wardrobe</h2>
        <div className="flex items-start mb-4">
          <Lightbulb className="text-amber-500 h-6 w-6 mt-1 mr-3 flex-shrink-0" />
          <p className="text-gray-700">
            Your StyleSync digital wardrobe is the foundation of the entire experience. The more accurately you build your wardrobe, the better outfit suggestions you will receive. We offer multiple ways to add your clothing items, so choose the method that works best for you.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-md border border-indigo-100 mt-4">
          <h3 className="font-medium text-indigo-700 mb-2">Before You Begin</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="text-green-500 h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">Have your clothes accessible and sorted if possible</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-500 h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">Find a well-lit area if you plan to take photos</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-500 h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">Consider your most-worn items to add first</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Method 1: Manual Entry */}
      <section className="mb-10">
        <div className="flex items-center mb-4">
          <div className="bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
            <span className="font-bold text-indigo-700">1</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Manual Entry Method</h2>
        </div>
        
        <div className="pl-11">
          <p className="text-gray-600 mb-4">
            Manual entry gives you the most control over your wardrobe details. It is perfect for adding specific information about each clothing item.
          </p>
          
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Step 1: Access Your Wardrobe</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Log in to your StyleSync account</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Navigate to the "My Wardrobe" section from the main menu</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Click the "+ Add Item" button in the top right corner</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Step 2: Enter Basic Information</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Select the appropriate category (Tops, Bottoms, Dresses, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Choose a subcategory for more specific classification (T-shirt, Blouse, Jeans, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Give your item a name that will help you identify it (e.g., "Blue Denim Jacket")</span>
                </li>
              </ul>
              <div className="mt-4 bg-amber-50 p-3 rounded-md flex">
                <Lightbulb className="text-amber-500 h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Tip: Be specific with your item names to easily find them later. "Navy Blue V-neck Sweater" is better than just "Sweater".
                </p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Step 3: Add Visual Information</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Click "Upload Image" to add a photo of your item</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Select the primary color(s) from the color palette</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Identify any patterns (solid, striped, floral, etc.)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Step 4: Add Style Details</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Select appropriate seasons for the item (Summer, Winter, All Seasons, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Add occasion tags (Casual, Work, Formal, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Set your personal style tags (Minimalist, Bohemian, Streetwear, etc.)</span>
                </li>
              </ul>
              <div className="mt-4 bg-amber-50 p-3 rounded-md flex">
                <Lightbulb className="text-amber-500 h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Tip: The more style tags you add, the better StyleSync can match items for different occasions.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Step 5: Save Your Item</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Review all the information for accuracy</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Click the "Save to Wardrobe" button</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Your item will now appear in your digital wardrobe!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Method 2: Photo Upload */}
      <section className="mb-10">
        <div className="flex items-center mb-4">
          <div className="bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
            <span className="font-bold text-indigo-700">2</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Photo Upload Method</h2>
        </div>
        
        <div className="pl-11">
          <p className="text-gray-600 mb-4">
            Our AI-powered photo recognition makes adding items quick and easy. Just take photos and let StyleSync do the work!
          </p>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
            <div className="flex items-center mb-4">
              <Camera className="text-indigo-600 h-6 w-6 mr-2" />
              <h3 className="font-medium text-lg">Photo Tips for Best Results</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium text-gray-700 mb-2">Do:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="text-green-500 h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Use natural lighting when possible</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="text-green-500 h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Place item on a plain, contrasting background</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="text-green-500 h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Capture the entire item in the frame</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="text-green-500 h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Smooth out wrinkles when possible</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium text-gray-700 mb-2">Don't:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="text-red-500 h-4 w-4 mr-2 flex-shrink-0 font-bold">✕</div>
                    <span>Use flash (creates glare and alters colors)</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="text-red-500 h-4 w-4 mr-2 flex-shrink-0 font-bold">✕</div>
                    <span>Photograph items on mannequins or being worn</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="text-red-500 h-4 w-4 mr-2 flex-shrink-0 font-bold">✕</div>
                    <span>Capture multiple items in one photo</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="text-red-500 h-4 w-4 mr-2 flex-shrink-0 font-bold">✕</div>
                    <span>Use heavily filtered images</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Step 1: Access Photo Upload</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Navigate to "My Wardrobe" from the main menu</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Click "+ Add Item" and select the "Photo Upload" tab</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Step 2: Take or Select Photos</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Tap "Take Photo" to use your device's camera</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Or tap "Upload Photo" to select images from your device</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Wait for the image to upload and process</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Step 3: Review AI Detection</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Our AI will automatically detect the item type, color, and suggest categories</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Review the detected information and make any necessary corrections</span>
                </li>
              </ul>
              <div className="mt-4 bg-amber-50 p-3 rounded-md flex">
                <Lightbulb className="text-amber-500 h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Tip: While our AI is quite accurate, always double-check category and color detection, especially for items with multiple colors or unique designs.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Step 4: Add Additional Details</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Add a name for your item</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Select seasons and occasions as appropriate</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Add any style tags that apply to this item</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-3">Step 5: Save to Your Wardrobe</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Review all information one last time</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Click "Save to Wardrobe" to complete the process</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Continue adding more items or return to your wardrobe</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Method 3: Bulk Import */}
      <section className="mb-10">
        <div className="flex items-center mb-4">
          <div className="bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
            <span className="font-bold text-indigo-700">3</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Bulk Import Method</h2>
        </div>
        
        <div className="pl-11">
          <p className="text-gray-600 mb-4">
            Add multiple items at once to quickly build your wardrobe. Perfect for users with large collections!
          </p>
          
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <div className="flex items-center mb-3">
                <Upload className="text-indigo-600 h-5 w-5 mr-2" />
                <h3 className="font-medium text-lg">Import from Online Retailers</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Go to "My Wardrobe" and select "Bulk Import" option</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Choose "Import from Retailers" and select from our partner stores</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Log in to your retailer account when prompted</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                  <span>Select which past purchases you want to import</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">5</span>
                  <span>Review the items and confirm the import</span>
                </li>
              </ul>
              <div className="mt-4 bg-amber-50 p-3 rounded-md flex">
                <Lightbulb className="text-amber-500 h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Tip: Items imported from retailers will include professional photos and detailed style information directly from the brand.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <div className="flex items-center mb-3">
                <Upload className="text-indigo-600 h-5 w-5 mr-2" />
                <h3 className="font-medium text-lg">Multiple Photo Upload</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>From "Bulk Import," select "Multiple Photos"</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Upload up to 20 photos at once</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Allow the system to process all photos (this may take a few minutes)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                  <span>Review each item and make any necessary adjustments</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">5</span>
                  <span>Save all items to your wardrobe</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
              <div className="flex items-center mb-3">
                <Upload className="text-indigo-600 h-5 w-5 mr-2" />
                <h3 className="font-medium text-lg">Spreadsheet Upload</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Download our spreadsheet template from the "Bulk Import" section</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Fill out the template with your clothing items' details</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Save the completed spreadsheet (CSV or Excel format)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                  <span>Upload the file through the "Spreadsheet Upload" option</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">5</span>
                  <span>Review and confirm the import</span>
                </li>
              </ul>
              <div className="mt-4 bg-amber-50 p-3 rounded-md flex">
                <Lightbulb className="text-amber-500 h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Tip: The spreadsheet method is ideal for users who already have an inventory of their clothing or want to prepare everything offline first.
                </p>
              </div>
            </div>
          </div>
        </div>
            </section>
          </div>
        );
      }
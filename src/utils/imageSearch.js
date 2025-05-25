// src/utils/imageSearch.js
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function getOutfitImages(query, count = 6) {
  try {
    // Better search terms focused on clothing items and outfits, not people
    const outfitSearchTerms = [
      `${query} clothes fashion items`,
      `${query} clothing outfit flatlay`,
      `${query} fashion accessories wardrobe`,
      `${query} style clothing items`,
      `${query} outfit clothes fashion`,
      `${query} wardrobe fashion items`
    ];
    
    const randomTerm = outfitSearchTerms[Math.floor(Math.random() * outfitSearchTerms.length)];
    
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: randomTerm,
        per_page: count,
        order_by: 'relevant',
        // Remove portrait orientation to get more clothing/item photos
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    return response.data.results.map((img) => ({
      id: img.id,
      url: img.urls.small,
      regularUrl: img.urls.regular,
      alt: img.alt_description || `${query} outfit inspiration`,
      photographer: img.user.name,
      photographerUrl: img.user.links.html,
      width: img.width,
      height: img.height,
    }));
  } catch (error) {
    console.error('Unsplash API error:', error);
    return [];
  }
}

export async function getFashionImages(categories = ['casual', 'professional', 'trendy']) {
  try {
    const allImages = [];
    
    // Better search terms focused on actual clothing and outfits
    const searchTerms = {
      casual: [
        'casual clothes flatlay',
        'casual outfit items',
        'everyday clothing wardrobe',
        'casual fashion accessories',
        'jeans tshirt sneakers outfit'
      ],
      professional: [
        'business clothes flatlay',
        'office outfit items',
        'professional wardrobe clothes',
        'suit shirt tie accessories',
        'business attire clothing'
      ],
      trendy: [
        'trendy clothes flatlay',
        'modern fashion items',
        'stylish clothing accessories',
        'fashion wardrobe items',
        'contemporary outfit clothes'
      ]
    };
    
    for (const category of categories) {
      const terms = searchTerms[category] || [`${category} clothing items`];
      const randomTerm = terms[Math.floor(Math.random() * terms.length)];
      
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: randomTerm,
          per_page: 2,
          order_by: 'relevant',
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });
      
      const categoryImages = response.data.results.map((img) => ({
        id: img.id,
        url: img.urls.small,
        regularUrl: img.urls.regular,
        alt: img.alt_description || `${category} outfit items`,
        photographer: img.user.name,
        photographerUrl: img.user.links.html,
        category: category,
        width: img.width,
        height: img.height,
      }));
      
      allImages.push(...categoryImages);
    }
    
    return allImages;
  } catch (error) {
    console.error('Unsplash API error:', error);
    return [];
  }
}
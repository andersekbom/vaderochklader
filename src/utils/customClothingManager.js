import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CUSTOM_CLOTHING_KEY = 'customClothingItems';
const CUSTOM_IMAGES_DIR = FileSystem.documentDirectory + 'customClothingImages/';

// Ensure the images directory exists
const ensureImagesDirectory = async () => {
  const dirInfo = await FileSystem.getInfoAsync(CUSTOM_IMAGES_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(CUSTOM_IMAGES_DIR, { intermediates: true });
  }
};

// Generate unique ID for custom items
const generateCustomId = () => {
  return `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Save custom clothing item
export const saveCustomClothingItem = async (bodyPart, itemData, imageUri) => {
  try {
    await ensureImagesDirectory();
    
    // Generate unique ID for this item
    const customId = generateCustomId();
    
    // Copy image to local storage
    const filename = `${customId}.jpg`;
    const localImagePath = CUSTOM_IMAGES_DIR + filename;
    await FileSystem.copyAsync({
      from: imageUri,
      to: localImagePath,
    });
    
    // Create custom item object
    const customItem = {
      id: customId,
      name: itemData.name,
      emoji: itemData.emoji || '📷',
      imageUri: localImagePath,
      isCustom: true,
      bodyPart: bodyPart,
      weather: itemData.weather || ['sunny', 'cloudy', 'rainy', 'snowy', 'stormy'],
      temperature: itemData.temperature || [-20, 35],
      createdAt: new Date().toISOString(),
    };
    
    // Get existing custom items
    const existingItems = await getCustomClothingItems();
    
    // Add new item to the appropriate body part
    if (!existingItems[bodyPart]) {
      existingItems[bodyPart] = {};
    }
    existingItems[bodyPart][customId] = customItem;
    
    // Save to AsyncStorage
    await AsyncStorage.setItem(CUSTOM_CLOTHING_KEY, JSON.stringify(existingItems));
    
    return customItem;
  } catch (error) {
    console.error('Fel vid sparande av anpassat klädesplagg:', error);
    throw new Error('Kunde inte spara det anpassade klädesplagget');
  }
};

// Get all custom clothing items
export const getCustomClothingItems = async () => {
  try {
    const items = await AsyncStorage.getItem(CUSTOM_CLOTHING_KEY);
    return items ? JSON.parse(items) : {};
  } catch (error) {
    console.error('Fel vid hämtning av anpassade klädesplagg:', error);
    return {};
  }
};

// Get custom items for a specific body part
export const getCustomItemsForBodyPart = async (bodyPart) => {
  try {
    const allItems = await getCustomClothingItems();
    return allItems[bodyPart] || {};
  } catch (error) {
    console.error('Fel vid hämtning av anpassade klädesplagg för kroppsdel:', error);
    return {};
  }
};

// Delete custom clothing item
export const deleteCustomClothingItem = async (bodyPart, itemId) => {
  try {
    const existingItems = await getCustomClothingItems();
    
    if (existingItems[bodyPart] && existingItems[bodyPart][itemId]) {
      const item = existingItems[bodyPart][itemId];
      
      // Delete the image file
      if (item.imageUri) {
        const fileInfo = await FileSystem.getInfoAsync(item.imageUri);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(item.imageUri);
        }
      }
      
      // Remove from storage
      delete existingItems[bodyPart][itemId];
      
      // Clean up empty body part objects
      if (Object.keys(existingItems[bodyPart]).length === 0) {
        delete existingItems[bodyPart];
      }
      
      await AsyncStorage.setItem(CUSTOM_CLOTHING_KEY, JSON.stringify(existingItems));
    }
  } catch (error) {
    console.error('Fel vid borttagning av anpassat klädesplagg:', error);
    throw new Error('Kunde inte ta bort det anpassade klädesplagget');
  }
};

// Update custom clothing item
export const updateCustomClothingItem = async (bodyPart, itemId, updates) => {
  try {
    const existingItems = await getCustomClothingItems();
    
    if (existingItems[bodyPart] && existingItems[bodyPart][itemId]) {
      existingItems[bodyPart][itemId] = {
        ...existingItems[bodyPart][itemId],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem(CUSTOM_CLOTHING_KEY, JSON.stringify(existingItems));
      return existingItems[bodyPart][itemId];
    }
    
    throw new Error('Anpassat klädesplagg hittades inte');
  } catch (error) {
    console.error('Fel vid uppdatering av anpassat klädesplagg:', error);
    throw error;
  }
};

// Clear all custom clothing items (for testing/reset)
export const clearAllCustomItems = async () => {
  try {
    // Delete all image files
    const dirInfo = await FileSystem.getInfoAsync(CUSTOM_IMAGES_DIR);
    if (dirInfo.exists) {
      await FileSystem.deleteAsync(CUSTOM_IMAGES_DIR);
    }
    
    // Clear AsyncStorage
    await AsyncStorage.removeItem(CUSTOM_CLOTHING_KEY);
  } catch (error) {
    console.error('Fel vid rensning av anpassade klädesplagg:', error);
    throw new Error('Kunde inte rensa anpassade klädesplagg');
  }
};

export default {
  saveCustomClothingItem,
  getCustomClothingItems,
  getCustomItemsForBodyPart,
  deleteCustomClothingItem,
  updateCustomClothingItem,
  clearAllCustomItems,
};
/**
 * OutfitSelectionModal Component
 * 
 * Modal interface for selecting clothing items for a specific body part.
 * Supports both default clothing items and custom user-uploaded photos.
 * Includes long-press delete functionality for custom items.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, Animated } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import Button from './ui/Button';
import { useOutfitLogic } from '../hooks/useOutfitLogic';
import { useLanguage } from '../context/LanguageContext';
import CustomClothingCamera from './CustomClothingCamera';
import { deleteCustomClothingItem } from '../utils/customClothingManager';

const OutfitSelectionModal = ({ visible, onClose, bodyPart, bodyPartName, bodyPartIcon }) => {
  // Hooks
  const { 
    outfit, 
    updateOutfitItem, 
    getAvailableItems, 
    applySuggestedOutfit,
    clearOutfit,
    loadCustomItems: refreshCustomItemsCache
  } = useOutfitLogic();
  const { t, language } = useLanguage();

  // Local state
  const [showCustomCamera, setShowCustomCamera] = useState(false);
  
  // Get available items for the selected body part
  const availableItems = bodyPart ? getAvailableItems(bodyPart) : {};
  
  // Separate default and custom items for better organization
  const defaultItems = {};
  const customItems = {};
  
  Object.entries(availableItems).forEach(([key, item]) => {
    if (item.isCustom) {
      customItems[key] = item;
    } else {
      defaultItems[key] = item;
    }
  });

  // Categorize default items by season for better organization
  const categorizeItems = (items) => {
    const categories = {
      summer: { 
        title: t('summerClothes'), 
        items: {} 
      },
      spring: { 
        title: t('springClothes'), 
        items: {} 
      },
      autumn: { 
        title: t('autumnClothes'), 
        items: {} 
      },
      winter: { 
        title: t('winterClothes'), 
        items: {} 
      },
      rain: { 
        title: t('rainClothes'), 
        items: {} 
      }
    };

    Object.entries(items).forEach(([key, item]) => {
      const temp = item.temperature || [0, 30];
      const avgTemp = (temp[0] + temp[1]) / 2;
      const weather = item.weather || [];

      if (weather.includes('rainy') || weather.includes('stormy')) {
        categories.rain.items[key] = item;
      } else if (avgTemp >= 20) {
        categories.summer.items[key] = item;
      } else if (avgTemp <= 5 || weather.includes('snowy')) {
        categories.winter.items[key] = item;
      } else if (avgTemp >= 15) {
        categories.spring.items[key] = item;
      } else {
        categories.autumn.items[key] = item;
      }
    });

    // Remove empty categories
    return Object.entries(categories).filter(([_, cat]) => Object.keys(cat.items).length > 0);
  };

  const categorizedItems = categorizeItems(defaultItems);

  /**
   * Handles selection of a clothing item
   */
  const handleItemSelection = (item) => {
    updateOutfitItem(bodyPart, item);
    onClose();
  };

  // Animated clothing item component
  const AnimatedClothingItem = ({ item, isSelected, onPress, onLongPress, children }) => {
    const [scaleValue] = useState(new Animated.Value(1));

    const handlePressIn = () => {
      // Light haptic feedback on press
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
        speed: 20,
        bounciness: 4,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 4,
      }).start();
    };

    const handlePress = () => {
      // Success haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Success animation
      Animated.sequence([
        Animated.spring(scaleValue, {
          toValue: 1.05,
          useNativeDriver: true,
          speed: 25,
          bounciness: 8,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          speed: 25,
          bounciness: 8,
        })
      ]).start();
      
      if (onPress) {
        setTimeout(onPress, 100); // Slight delay for animation
      }
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={onLongPress}
        delayLongPress={800}
        activeOpacity={0.8}
        style={[
          styles.clothingItem,
          isSelected && styles.clothingItemSelected,
        ]}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleValue }],
            flex: 1,
          }}
        >
          {children}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  /**
   * Handles clearing the selected item (no clothing)
   */
  const handleClearItem = () => {
    updateOutfitItem(bodyPart, null);
    onClose();
  };
  
  /**
   * Handles successful creation of a custom clothing item
   */
  const handleCustomItemCreated = (newItem) => {
    setShowCustomCamera(false);
    // Refresh the global custom items cache to reload the modal
    refreshCustomItemsCache();
  };
  
  /**
   * Opens the custom clothing camera modal
   */
  const handleAddCustomItem = () => {
    setShowCustomCamera(true);
  };
  
  /**
   * Handles deletion of a custom clothing item with confirmation
   */
  const handleDeleteCustomItem = (item) => {
    // Warning haptic feedback for delete action
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    
    Alert.alert(
      t('deleteClothingItem'),
      `${t('deleteConfirm')} "${item.name}"?`,
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              // Error haptic feedback for deletion
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
              await deleteCustomClothingItem(bodyPart, item.id);
              // If this item was currently selected, clear it
              if (outfit[bodyPart]?.id === item.id) {
                updateOutfitItem(bodyPart, null);
              }
              // Refresh the items
              refreshCustomItemsCache();
            } catch (error) {
              Alert.alert(
                t('error'), 
                error.message || t('couldNotDelete')
              );
            }
          }
        }
      ]
    );
  };

  if (!bodyPart) return null;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            {bodyPartIcon && (() => {
              const IconComponent = bodyPartIcon.library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
              return (
                <IconComponent
                  name={bodyPartIcon.name}
                  size={24}
                  color={Colors.background}
                  style={styles.titleIcon}
                />
              );
            })()}
            <Text style={styles.title}>{bodyPartName}</Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
          {/* Clear/None option */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>
              {t('noClothing')}
            </Text>
            <View style={styles.categoryItems}>
              <AnimatedClothingItem
                isSelected={!outfit[bodyPart]}
                onPress={handleClearItem}
              >
                <View style={styles.clothingItemContent}>
                  <Ionicons name="close-circle-outline" size={32} color="#9E9E9E" />
                  <Text style={styles.clothingName}>
                    {t('none')}
                  </Text>
                </View>
              </AnimatedClothingItem>
            </View>
          </View>
            
          {/* Categorized default clothing items */}
          {categorizedItems.map(([categoryKey, category]) => (
            <View key={categoryKey} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <View style={styles.categoryItems}>
                {Object.values(category.items).map((item) => (
                  <AnimatedClothingItem
                    key={item.id}
                    item={item}
                    isSelected={outfit[bodyPart]?.id === item.id}
                    onPress={() => handleItemSelection(item)}
                  >
                    <View style={styles.clothingItemContent}>
                      {item.emoji ? (
                        <Text style={styles.clothingEmoji}>{item.emoji}</Text>
                      ) : (() => {
                        const iconData = item.icon;
                        const IconComponent = iconData?.library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
                        return iconData ? (
                          <IconComponent
                            name={iconData.name}
                            size={32}
                            color={iconData.color}
                          />
                        ) : null;
                      })()}
                      <Text style={styles.clothingName}>{item.name}</Text>
                    </View>
                  </AnimatedClothingItem>
                ))}
              </View>
            </View>
          ))}
            
            {/* Custom clothing items section */}
            {Object.keys(customItems).length > 0 && (
              <View style={styles.categorySection}>
                <Text style={styles.categoryTitle}>
                  {t('myCustomClothes')}
                </Text>
                <View style={styles.categoryItems}>
                  {Object.values(customItems).map((item) => (
                    <AnimatedClothingItem
                      key={item.id}
                      item={item}
                      isSelected={outfit[bodyPart]?.id === item.id}
                      onPress={() => handleItemSelection(item)}
                      onLongPress={() => handleDeleteCustomItem(item)}
                    >
                      <View style={styles.clothingItemContent}>
                        {item.imageUri ? (
                          <Image 
                            source={{ uri: item.imageUri }} 
                            style={styles.customItemImage}
                            resizeMode="cover"
                          />
                        ) : (
                          <Text style={styles.clothingEmoji}>{item.emoji || '📷'}</Text>
                        )}
                        <Text style={styles.clothingName}>{item.name}</Text>
                        <Text style={styles.customItemBadge}>✨</Text>
                        <Text style={styles.deleteHint}>
                          {t('holdToDelete')}
                        </Text>
                      </View>
                    </AnimatedClothingItem>
                  ))}
                </View>
              </View>
            )}
            
          {/* Add custom item section */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>
              {t('addCustomClothes')}
            </Text>
            <View style={styles.categoryItems}>
              <AnimatedClothingItem
                isSelected={false}
                onPress={handleAddCustomItem}
              >
                <View style={styles.clothingItemContent}>
                  <MaterialCommunityIcons 
                    name="camera-plus" 
                    size={32} 
                    color={Colors.primary} 
                  />
                  <Text style={styles.addCustomText}>
                    {t('addCustom')}
                  </Text>
                </View>
              </AnimatedClothingItem>
            </View>
          </View>
        </ScrollView>
        
        <CustomClothingCamera
          visible={showCustomCamera}
          onClose={() => setShowCustomCamera(false)}
          bodyPart={bodyPart}
          bodyPartName={bodyPartName}
          onItemCreated={handleCustomItemCreated}
        />
        
        <View style={styles.actionButtons}>
          <Button
            title={t('chooseForMe')}
            onPress={() => {
              applySuggestedOutfit();
              onClose();
            }}
            variant="primary"
            size="small"
            style={styles.actionButton}
          />
          <Button
            title={t('clear')}
            onPress={() => {
              clearOutfit();
              onClose();
            }}
            variant="secondary"
            size="small"
            style={styles.actionButton}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Sizes.padding.md,
    paddingVertical: Sizes.padding.sm,
    backgroundColor: Colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  titleIcon: {
    marginRight: Sizes.margin.xs,
  },
  
  title: {
    fontSize: Fonts.size.extraLarge,
    fontWeight: Fonts.weight.bold,
    color: Colors.background,
    lineHeight: Fonts.lineHeight.extraLarge,
  },
  
  closeButton: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  closeButtonText: {
    fontSize: Fonts.size.medium,
    color: Colors.primary,
    fontWeight: Fonts.weight.bold,
  },
  
  currentSelection: {
    backgroundColor: Colors.lightBackground,
    paddingHorizontal: Sizes.padding.md,
    paddingVertical: Sizes.padding.sm,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  currentSelectionLabel: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    opacity: 0.7,
    marginBottom: Sizes.margin.xs,
  },
  
  currentSelectionIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  currentIcon: {
    marginRight: Sizes.margin.xs,
  },
  
  currentSelectionText: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.primary,
  },
  
  itemsContainer: {
    flex: 1,
    paddingHorizontal: Sizes.padding.md,
  },
  
  
  clothingItem: {
    width: '48%',
    marginBottom: Sizes.margin.md,
    borderRadius: Sizes.borderRadius.medium,
    borderWidth: Sizes.borderWidth.medium,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    minHeight: 120,
  },
  
  clothingItemSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '20',
  },
  
  clothingItemContent: {
    padding: Sizes.padding.lg,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  
  clothingEmoji: {
    fontSize: 32,
    marginBottom: Sizes.margin.xs,
  },
  
  clothingName: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: Fonts.weight.semibold,
    lineHeight: Fonts.lineHeight.medium,
  },
  
  customItemImage: {
    width: 40,
    height: 40,
    borderRadius: Sizes.borderRadius.small,
    marginBottom: Sizes.margin.xs,
  },
  
  customItemBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 12,
    color: Colors.primary,
  },
  
  addCustomItem: {
    width: '48%',
    marginBottom: Sizes.margin.md,
    borderRadius: Sizes.borderRadius.medium,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  
  addCustomText: {
    fontSize: Fonts.size.small,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: Fonts.weight.medium,
    marginTop: Sizes.margin.xs,
  },
  
  deleteHint: {
    position: 'absolute',
    bottom: 2,
    fontSize: 8,
    color: Colors.text,
    opacity: 0.5,
    textAlign: 'center',
  },
  
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.padding.md,
    paddingVertical: Sizes.padding.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.lightBackground,
  },
  
  actionButton: {
    flex: 1,
    marginHorizontal: Sizes.margin.xs,
  },

  categorySection: {
    width: '100%',
    marginBottom: Sizes.margin.lg,
  },

  categoryTitle: {
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Sizes.margin.md,
    paddingHorizontal: Sizes.padding.md,
    lineHeight: Fonts.lineHeight.large,
  },

  categoryItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.padding.md,
  },
});

export default OutfitSelectionModal;
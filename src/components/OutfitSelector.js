/**
 * OutfitSelector Component
 * 
 * Provides a horizontal outfit selection interface for selecting clothing items.
 * This component is currently used in some parts of the app but may be deprecated
 * in favor of the OutfitSelectionModal for a more consistent UX.
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import { BODY_PARTS_ARRAY } from '../constants/BodyParts';
import Card from './ui/Card';
import Button from './ui/Button';
import { useOutfitLogic } from '../hooks/useOutfitLogic';
import { useLanguage } from '../context/LanguageContext';

const OutfitSelector = ({ style }) => {
  const { t } = useLanguage();
  const { 
    outfit, 
    updateOutfitItem, 
    getAvailableItems, 
    applySuggestedOutfit,
    clearOutfit 
  } = useOutfitLogic();
  
  const [selectedBodyPart, setSelectedBodyPart] = useState('torso');
  
  // Use shared body parts configuration
  const bodyParts = BODY_PARTS_ARRAY;

  /**
   * Renders the body part selector tabs
   */
  const renderBodyPartSelector = () => (
    <View style={styles.bodyPartSelector}>
      {bodyParts.map((bodyPart) => (
        <TouchableOpacity
          key={bodyPart.key}
          style={[
            styles.bodyPartButton,
            selectedBodyPart === bodyPart.key && styles.bodyPartButtonActive
          ]}
          onPress={() => setSelectedBodyPart(bodyPart.key)}
        >
          <Text style={styles.bodyPartEmoji}>{bodyPart.emoji}</Text>
          <Text style={[
            styles.bodyPartText,
            selectedBodyPart === bodyPart.key && styles.bodyPartTextActive
          ]}>
            {bodyPart.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  /**
   * Renders the horizontal scrolling list of clothing items for the selected body part
   */
  const renderClothingItems = () => {
    const availableItems = getAvailableItems(selectedBodyPart);
    
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.clothingScroll}
        contentContainerStyle={styles.clothingScrollContent}
      >
        {/* Clear/None option */}
        <TouchableOpacity
          style={[
            styles.clothingItem,
            !outfit[selectedBodyPart] && styles.clothingItemSelected
          ]}
          onPress={() => updateOutfitItem(selectedBodyPart, null)}
        >
          <View style={styles.clothingItemContent}>
            <Text style={styles.clothingEmoji}>❌</Text>
            <Text style={styles.clothingName}>{t('none')}</Text>
          </View>
        </TouchableOpacity>
        
        {/* Available clothing items */}
        {Object.values(availableItems).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.clothingItem,
              outfit[selectedBodyPart]?.id === item.id && styles.clothingItemSelected
            ]}
            onPress={() => updateOutfitItem(selectedBodyPart, item)}
          >
            <View style={styles.clothingItemContent}>
              {item.isCustom && item.imageUri ? (
                <Image 
                  source={{ uri: item.imageUri }} 
                  style={styles.customItemImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.clothingEmoji}>{item.emoji}</Text>
              )}
              <Text style={styles.clothingName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };



  return (
    <Card style={[styles.container, style]} padding="md">
      <Text style={styles.title}>{t('chooseOutfit')}</Text>
      
      {renderBodyPartSelector()}
      {renderClothingItems()}
      
      <View style={styles.actionButtons}>
        <Button
          title={t('suggestClothes')}
          onPress={applySuggestedOutfit}
          variant="primary"
          size="small"
          style={styles.actionButton}
        />
        <Button
          title={t('clearAll')}
          onPress={clearOutfit}
          variant="secondary"
          size="small"
          style={styles.actionButton}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  
  title: {
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Sizes.margin.md,
  },
  
  bodyPartSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Sizes.margin.md,
  },
  
  bodyPartButton: {
    alignItems: 'center',
    padding: Sizes.padding.sm,
    borderRadius: Sizes.borderRadius.medium,
    minWidth: 60,
  },
  
  bodyPartButtonActive: {
    backgroundColor: Colors.primary,
  },
  
  bodyPartEmoji: {
    fontSize: Fonts.size.large,
    marginBottom: Sizes.margin.xs,
  },
  
  bodyPartText: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    fontWeight: Fonts.weight.medium,
  },
  
  bodyPartTextActive: {
    color: Colors.background,
  },
  
  
  clothingScroll: {
    marginBottom: Sizes.margin.md,
  },
  
  clothingScrollContent: {
    paddingHorizontal: Sizes.padding.sm,
  },
  
  clothingItem: {
    marginRight: Sizes.margin.sm,
    borderRadius: Sizes.borderRadius.medium,
    borderWidth: Sizes.borderWidth.medium,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  
  clothingItemSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  
  clothingItemContent: {
    padding: Sizes.padding.md,
    alignItems: 'center',
    minWidth: 80,
  },
  
  clothingEmoji: {
    fontSize: Fonts.size.large,
    marginBottom: Sizes.margin.xs,
  },
  
  clothingName: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: Fonts.weight.medium,
  },
  
  customItemImage: {
    width: 40,
    height: 40,
    borderRadius: Sizes.borderRadius.small,
    marginBottom: Sizes.margin.xs,
  },
  
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Sizes.margin.sm,
  },
  
  actionButton: {
    flex: 1,
    marginHorizontal: Sizes.margin.xs,
  },
});

export default OutfitSelector;
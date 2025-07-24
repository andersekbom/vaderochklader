import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import Card from './ui/Card';
import Button from './ui/Button';
import { useOutfitLogic } from '../hooks/useOutfitLogic';

const OutfitSelector = ({ style }) => {
  const { 
    outfit, 
    updateOutfitItem, 
    getAvailableItems, 
    applySuggestedOutfit,
    clearOutfit 
  } = useOutfitLogic();
  
  const [selectedBodyPart, setSelectedBodyPart] = useState('torso');
  
  const bodyParts = [
    { key: 'head', name: 'Huvud', emoji: '👤' },
    { key: 'torso', name: 'Kropp', emoji: '👕' },
    { key: 'legs', name: 'Ben', emoji: '👖' },
    { key: 'feet', name: 'Fötter', emoji: '👟' },
  ];

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
            <Text style={styles.clothingName}>Inget</Text>
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
      <Text style={styles.title}>Välj din outfit</Text>
      
      {renderBodyPartSelector()}
      {renderClothingItems()}
      
      <View style={styles.actionButtons}>
        <Button
          title="Föreslå kläder"
          onPress={applySuggestedOutfit}
          variant="primary"
          size="small"
          style={styles.actionButton}
        />
        <Button
          title="Rensa allt"
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
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import Button from './ui/Button';
import { useOutfitLogic } from '../hooks/useOutfitLogic';
import CustomClothingCamera from './CustomClothingCamera';
import { getCustomItemsForBodyPart, deleteCustomClothingItem } from '../utils/customClothingManager';

const OutfitSelectionModal = ({ visible, onClose, bodyPart, bodyPartName, bodyPartIcon }) => {
  const { 
    outfit, 
    updateOutfitItem, 
    getAvailableItems, 
    applySuggestedOutfit,
    clearOutfit,
    loadCustomItems: refreshCustomItemsCache
  } = useOutfitLogic();

  const [showCustomCamera, setShowCustomCamera] = useState(false);
  
  const availableItems = bodyPart ? getAvailableItems(bodyPart) : {};
  
  // Separate default and custom items
  const defaultItems = {};
  const customItems = {};
  
  Object.entries(availableItems).forEach(([key, item]) => {
    if (item.isCustom) {
      customItems[key] = item;
    } else {
      defaultItems[key] = item;
    }
  });

  const handleItemSelection = (item) => {
    updateOutfitItem(bodyPart, item);
    onClose();
  };

  const handleClearItem = () => {
    updateOutfitItem(bodyPart, null);
    onClose();
  };
  
  const handleCustomItemCreated = (newItem) => {
    setShowCustomCamera(false);
    // Refresh the global custom items cache to reload the modal
    refreshCustomItemsCache();
  };
  
  const handleAddCustomItem = () => {
    setShowCustomCamera(true);
  };
  
  const handleDeleteCustomItem = (item) => {
    Alert.alert(
      'Ta bort klädesplagg',
      `Är du säker på att du vill ta bort "${item.name}"?`,
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Ta bort',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCustomClothingItem(bodyPart, item.id);
              // If this item was currently selected, clear it
              if (outfit[bodyPart]?.id === item.id) {
                updateOutfitItem(bodyPart, null);
              }
              // Refresh the items
              refreshCustomItemsCache();
            } catch (error) {
              Alert.alert('Fel', error.message || 'Kunde inte ta bort klädesplagget.');
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
          <View style={styles.itemsGrid}>
            {/* Clear/None option */}
            <TouchableOpacity
              style={[
                styles.clothingItem,
                !outfit[bodyPart] && styles.clothingItemSelected
              ]}
              onPress={handleClearItem}
            >
              <View style={styles.clothingItemContent}>
                <Ionicons name="close-circle-outline" size={32} color="#9E9E9E" />
                <Text style={styles.clothingName}>Inget</Text>
              </View>
            </TouchableOpacity>
            
            {/* Default clothing items */}
            {Object.values(defaultItems).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.clothingItem,
                  outfit[bodyPart]?.id === item.id && styles.clothingItemSelected
                ]}
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
              </TouchableOpacity>
            ))}
            
            {/* Custom clothing items */}
            {Object.values(customItems).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.clothingItem,
                  outfit[bodyPart]?.id === item.id && styles.clothingItemSelected
                ]}
                onPress={() => handleItemSelection(item)}
                onLongPress={() => handleDeleteCustomItem(item)}
                delayLongPress={500}
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
                  <Text style={styles.deleteHint}>Håll för att ta bort</Text>
                </View>
              </TouchableOpacity>
            ))}
            
            {/* Add custom item button */}
            <TouchableOpacity
              style={styles.addCustomItem}
              onPress={handleAddCustomItem}
            >
              <View style={styles.clothingItemContent}>
                <MaterialCommunityIcons 
                  name="camera-plus" 
                  size={32} 
                  color={Colors.primary} 
                />
                <Text style={styles.addCustomText}>Lägg till egen</Text>
              </View>
            </TouchableOpacity>
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
            title="Välj åt mig"
            onPress={() => {
              applySuggestedOutfit();
              onClose();
            }}
            variant="primary"
            size="small"
            style={styles.actionButton}
          />
          <Button
            title="Rensa"
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
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.bold,
    color: Colors.background,
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
  
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: Sizes.padding.md,
  },
  
  clothingItem: {
    width: '48%',
    marginBottom: Sizes.margin.md,
    borderRadius: Sizes.borderRadius.medium,
    borderWidth: Sizes.borderWidth.medium,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  
  clothingItemSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '20',
  },
  
  clothingItemContent: {
    padding: Sizes.padding.md,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  
  clothingEmoji: {
    fontSize: 32,
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
});

export default OutfitSelectionModal;
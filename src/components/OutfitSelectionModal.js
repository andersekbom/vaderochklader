import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import Button from './ui/Button';
import { useOutfitLogic } from '../hooks/useOutfitLogic';

const OutfitSelectionModal = ({ visible, onClose, bodyPart, bodyPartName, bodyPartIcon }) => {
  const { 
    outfit, 
    updateOutfitItem, 
    getAvailableItems, 
    applySuggestedOutfit,
    clearOutfit 
  } = useOutfitLogic();

  const availableItems = bodyPart ? getAvailableItems(bodyPart) : {};

  const handleItemSelection = (item) => {
    updateOutfitItem(bodyPart, item);
    onClose();
  };

  const handleClearItem = () => {
    updateOutfitItem(bodyPart, null);
    onClose();
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
            <Text style={styles.title}>Choose {bodyPartName}</Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.currentSelection}>
          <Text style={styles.currentSelectionLabel}>Current:</Text>
          <View style={styles.currentSelectionIcon}>
            {outfit[bodyPart] ? (
              <>
                {outfit[bodyPart].emoji ? (
                  <Text style={[styles.currentIcon, { fontSize: 20 }]}>{outfit[bodyPart].emoji}</Text>
                ) : (() => {
                  const iconData = outfit[bodyPart].icon;
                  const IconComponent = iconData?.library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
                  return iconData ? (
                    <IconComponent
                      name={iconData.name}
                      size={20}
                      color={iconData.color}
                      style={styles.currentIcon}
                    />
                  ) : null;
                })()}
                <Text style={styles.currentSelectionText}>{outfit[bodyPart].name}</Text>
              </>
            ) : (
              <Text style={styles.currentSelectionText}>None</Text>
            )}
          </View>
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
                <Text style={styles.clothingName}>None</Text>
              </View>
            </TouchableOpacity>
            
            {/* Available clothing items */}
            {Object.values(availableItems).map((item) => (
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
          </View>
        </ScrollView>
        
        <View style={styles.actionButtons}>
          <Button
            title="Auto Select All"
            onPress={() => {
              applySuggestedOutfit();
              onClose();
            }}
            variant="primary"
            size="small"
            style={styles.actionButton}
          />
          <Button
            title="Clear All"
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
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import SwedenMap from './SwedenMap';
import { useLanguage } from '../context/LanguageContext';

const MapModal = ({ visible, onClose, userLocation, locationName }) => {
  const { t } = useLanguage();
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('whereInSweden')}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.mapContainer}>
          <SwedenMap 
            userLocation={userLocation}
            style={styles.map}
          />
        </View>
        
        {locationName && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              {t('youAreNear')} {locationName}
            </Text>
          </View>
        )}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t('findStockholm')}
          </Text>
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
  },
  
  title: {
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.bold,
    color: Colors.background,
    flex: 1,
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
  
  mapContainer: {
    flex: 1,
    margin: Sizes.margin.md,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  map: {
    flex: 1,
  },
  
  locationInfo: {
    backgroundColor: Colors.lightBackground,
    marginHorizontal: Sizes.margin.md,
    marginBottom: Sizes.margin.sm,
    padding: Sizes.padding.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  locationText: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    fontWeight: Fonts.weight.medium,
  },
  
  footer: {
    backgroundColor: Colors.lightBackground,
    paddingHorizontal: Sizes.padding.md,
    paddingVertical: Sizes.padding.sm,
    alignItems: 'center',
  },
  
  footerText: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default MapModal;
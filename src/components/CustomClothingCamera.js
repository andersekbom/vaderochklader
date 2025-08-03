import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import Button from './ui/Button';
import Card from './ui/Card';
import { saveCustomClothingItem } from '../utils/customClothingManager';
import { useLanguage } from '../context/LanguageContext';

const CustomClothingCamera = ({ 
  visible, 
  onClose, 
  bodyPart, 
  bodyPartName, 
  onItemCreated 
}) => {
  const { t } = useLanguage();
  const [itemName, setItemName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isSmallScreen = screenHeight < 700;
  const isMediumScreen = screenHeight < 800;

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert(
        'Behörigheter krävs',
        'Vi behöver tillgång till kameran och fotobiblioteket för att du ska kunna ta bilder på dina kläder.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0]);
    }
  };

  const pickFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0]);
    }
  };

  const showImageSourceOptions = () => {
    Alert.alert(
      t('selectImage'),
      'Hur vill du lägga till en bild av ditt klädesplagg?',
      [
        { text: 'Ta foto', onPress: takePhoto },
        { text: t('selectFromGallery'), onPress: pickFromGallery },
        { text: t('cancel'), style: 'cancel' },
      ]
    );
  };

  const saveCustomItem = async () => {
    if (!itemName.trim()) {
      Alert.alert('Fel', 'Vänligen ange ett namn för klädesplagget.');
      return;
    }

    if (!selectedImage) {
      Alert.alert('Fel', 'Vänligen välj en bild för klädesplagget.');
      return;
    }

    setIsLoading(true);
    try {
      const customItem = await saveCustomClothingItem(
        bodyPart,
        {
          name: itemName.trim(),
          emoji: '📷',
          weather: ['sunny', 'cloudy', 'rainy', 'snowy', 'stormy'],
          temperature: [-20, 35],
        },
        selectedImage.uri
      );

      Alert.alert(
        t('saved'),
        `${itemName} har sparats i din ${bodyPartName.toLowerCase()}-samling.`,
        [
          {
            text: 'OK',
            onPress: () => {
              onItemCreated?.(customItem);
              handleClose();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Fel', error.message || 'Kunde inte spara klädesplagget.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setItemName('');
    setSelectedImage(null);
    setIsLoading(false);
    onClose();
  };

  const getResponsiveFontSize = (baseSize) => {
    if (isSmallScreen) return screenWidth * (baseSize * 0.8) / 100;
    if (isMediumScreen) return screenWidth * (baseSize * 0.9) / 100;
    return screenWidth * baseSize / 100;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: getResponsiveFontSize(5) }]}>
            Lägg till {bodyPartName}
          </Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Card style={styles.formCard}>
            <Text style={[styles.label, { fontSize: getResponsiveFontSize(3.5) }]}>
              Namn på klädesplagget:
            </Text>
            <TextInput
              style={[styles.textInput, { fontSize: getResponsiveFontSize(3.5) }]}
              value={itemName}
              onChangeText={setItemName}
              placeholder="t.ex. Min favorit t-shirt"
              placeholderTextColor={Colors.text + '60'}
              maxLength={50}
            />

            <Text style={[styles.label, { fontSize: getResponsiveFontSize(3.5) }]}>
              Bild:
            </Text>
            
            {selectedImage ? (
              <View style={styles.imagePreview}>
                <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
                <TouchableOpacity 
                  style={styles.changeImageButton}
                  onPress={showImageSourceOptions}
                >
                  <Text style={styles.changeImageButtonText}>Ändra bild</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addImageButton}
                onPress={showImageSourceOptions}
              >
                <Text style={styles.addImageButtonText}>📷</Text>
                <Text style={[styles.addImageText, { fontSize: getResponsiveFontSize(3) }]}>
                  Lägg till bild
                </Text>
              </TouchableOpacity>
            )}
          </Card>

          <View style={styles.actionButtons}>
            <Button
              title={t('cancel')}
              onPress={handleClose}
              variant="secondary"
              style={[styles.button, { minWidth: screenWidth * 0.35 }]}
              textStyle={{ fontSize: getResponsiveFontSize(3.5) }}
            />
            <Button
              title={isLoading ? t('saving') : t('save')}
              onPress={saveCustomItem}
              disabled={isLoading}
              style={[styles.button, { minWidth: screenWidth * 0.35 }]}
              textStyle={{ fontSize: getResponsiveFontSize(3.5) }}
            />
          </View>
        </View>
      </View>
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
    paddingHorizontal: Sizes.padding.lg,
    paddingTop: Sizes.padding.xl,
    paddingBottom: Sizes.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.lightBackground,
  },
  title: {
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: Colors.secondary,
    fontWeight: Fonts.weight.bold,
  },
  content: {
    flex: 1,
    padding: Sizes.padding.lg,
  },
  formCard: {
    marginBottom: Sizes.margin.lg,
  },
  label: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.medium,
    color: Colors.text,
    marginBottom: Sizes.margin.xs,
    marginTop: Sizes.margin.md,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Sizes.borderRadius.medium,
    paddingHorizontal: Sizes.padding.md,
    paddingVertical: Sizes.padding.sm,
    fontSize: Fonts.size.medium,
    color: Colors.text,
    backgroundColor: Colors.background,
    marginBottom: Sizes.margin.sm,
  },
  addImageButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: Sizes.borderRadius.medium,
    paddingVertical: Sizes.padding.xl,
    alignItems: 'center',
    backgroundColor: Colors.primary + '10',
    marginBottom: Sizes.margin.sm,
  },
  addImageButtonText: {
    fontSize: 48,
    color: Colors.primary,
    marginBottom: Sizes.margin.xs,
  },
  addImageText: {
    fontSize: Fonts.size.medium,
    color: Colors.primary,
    fontWeight: Fonts.weight.medium,
  },
  imagePreview: {
    alignItems: 'center',
    marginBottom: Sizes.margin.sm,
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: Sizes.borderRadius.medium,
    marginBottom: Sizes.margin.sm,
  },
  changeImageButton: {
    paddingHorizontal: Sizes.padding.md,
    paddingVertical: Sizes.padding.xs,
    borderRadius: Sizes.borderRadius.small,
    backgroundColor: Colors.secondary + '20',
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  changeImageButtonText: {
    color: Colors.secondary,
    fontSize: Fonts.size.small,
    fontWeight: Fonts.weight.medium,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Sizes.padding.lg,
  },
  button: {
    flex: 0,
  },
});

export default CustomClothingCamera;
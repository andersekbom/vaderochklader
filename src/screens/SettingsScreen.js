/**
 * SettingsScreen Component
 * 
 * Allows users to configure app settings, including language selection.
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import { useLanguage } from '../context/LanguageContext';
import { useWeatherOutfit } from '../context/WeatherOutfitContext';

const SettingsScreen = ({ onClose }) => {
  const { language, changeLanguage, t, availableLanguages } = useLanguage();
  const { actions } = useWeatherOutfit();

  const handleLanguageChange = async (newLanguage) => {
    await changeLanguage(newLanguage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('settings')}</Text>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => {
              actions.setCurrentScreen('home');
              if (onClose) onClose();
            }}
          >
            <MaterialIcons name="close" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('language')}</Text>
          <View style={styles.optionsContainer}>
            {availableLanguages.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageOption,
                  language === lang && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageChange(lang)}
              >
                <Text 
                  style={[
                    styles.languageText,
                    language === lang && styles.selectedLanguageText,
                  ]}
                >
                  {t(lang === 'sv' ? 'swedish' : 'english')}
                </Text>
                {language === lang && (
                  <MaterialIcons 
                    name="check" 
                    size={20} 
                    color={Colors.white} 
                    style={styles.checkIcon} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    position: 'relative',
  },
  title: {
    fontSize: Fonts.size.title,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
  },
  closeButton: {
    position: 'absolute',
    right: Sizes.padding.md,
    padding: Sizes.padding.xs,
  },
  section: {
    padding: Sizes.padding.md,
    marginBottom: Sizes.margin.lg,
  },
  sectionTitle: {
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.semibold,
    color: Colors.text,
    marginBottom: Sizes.margin.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Sizes.margin.md,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.padding.sm,
    paddingHorizontal: Sizes.padding.md,
    borderRadius: Sizes.borderRadius.medium,
    backgroundColor: Colors.lightBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 120,
  },
  selectedLanguage: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  languageText: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.medium,
    color: Colors.text,
  },
  selectedLanguageText: {
    color: Colors.white,
  },
  checkIcon: {
    marginLeft: Sizes.margin.sm,
  },
});

export default SettingsScreen;
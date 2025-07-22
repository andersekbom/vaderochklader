import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const Card = ({ 
  children, 
  style,
  padding = 'md',
  shadow = true,
  borderRadius = 'medium',
  backgroundColor = Colors.background,
  ...rest 
}) => {
  const getCardStyle = () => {
    const baseStyle = [styles.card];
    
    if (padding === 'sm') baseStyle.push(styles.paddingSmall);
    if (padding === 'md') baseStyle.push(styles.paddingMedium);
    if (padding === 'lg') baseStyle.push(styles.paddingLarge);
    
    if (borderRadius === 'small') baseStyle.push(styles.radiusSmall);
    if (borderRadius === 'medium') baseStyle.push(styles.radiusMedium);
    if (borderRadius === 'large') baseStyle.push(styles.radiusLarge);
    
    if (shadow) baseStyle.push(styles.shadow);
    
    baseStyle.push({ backgroundColor });
    
    if (style) baseStyle.push(style);
    
    return baseStyle;
  };

  return (
    <View style={getCardStyle()} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: Sizes.borderWidth.thin,
    borderColor: Colors.border,
  },
  
  paddingSmall: {
    padding: Sizes.padding.sm,
  },
  
  paddingMedium: {
    padding: Sizes.padding.md,
  },
  
  paddingLarge: {
    padding: Sizes.padding.lg,
  },
  
  radiusSmall: {
    borderRadius: Sizes.borderRadius.small,
  },
  
  radiusMedium: {
    borderRadius: Sizes.borderRadius.medium,
  },
  
  radiusLarge: {
    borderRadius: Sizes.borderRadius.large,
  },
  
  shadow: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Card;
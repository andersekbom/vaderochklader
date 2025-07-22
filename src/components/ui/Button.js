import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Sizes from '../../constants/Sizes';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  ...rest 
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    if (size === 'small') baseStyle.push(styles.small);
    if (size === 'large') baseStyle.push(styles.large);
    
    if (variant === 'primary') baseStyle.push(styles.primary);
    if (variant === 'secondary') baseStyle.push(styles.secondary);
    if (variant === 'accent') baseStyle.push(styles.accent);
    
    if (disabled) baseStyle.push(styles.disabled);
    if (style) baseStyle.push(style);
    
    return baseStyle;
  };
  
  const getTextStyle = () => {
    const baseStyle = [styles.text];
    
    if (size === 'small') baseStyle.push(styles.smallText);
    if (size === 'large') baseStyle.push(styles.largeText);
    
    if (variant === 'primary') baseStyle.push(styles.primaryText);
    if (variant === 'secondary') baseStyle.push(styles.secondaryText);
    if (variant === 'accent') baseStyle.push(styles.accentText);
    
    if (disabled) baseStyle.push(styles.disabledText);
    if (textStyle) baseStyle.push(textStyle);
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: Sizes.button.height,
    borderRadius: Sizes.button.borderRadius,
    paddingHorizontal: Sizes.padding.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Sizes.touchTarget.minimum,
  },
  
  small: {
    height: 36,
    paddingHorizontal: Sizes.padding.sm,
  },
  
  large: {
    height: 56,
    paddingHorizontal: Sizes.padding.lg,
  },
  
  primary: {
    backgroundColor: Colors.primary,
  },
  
  secondary: {
    backgroundColor: Colors.secondary,
  },
  
  accent: {
    backgroundColor: Colors.accent,
  },
  
  disabled: {
    backgroundColor: Colors.neutral,
    opacity: 0.6,
  },
  
  text: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.medium,
    color: Colors.background,
  },
  
  smallText: {
    fontSize: Fonts.size.small,
  },
  
  largeText: {
    fontSize: Fonts.size.large,
  },
  
  primaryText: {
    color: Colors.background,
  },
  
  secondaryText: {
    color: Colors.text,
  },
  
  accentText: {
    color: Colors.background,
  },
  
  disabledText: {
    color: Colors.text,
    opacity: 0.7,
  },
});

export default Button;
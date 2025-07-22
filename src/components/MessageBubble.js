import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';

const MessageBubble = ({ 
  message, 
  type = 'default',
  position = 'bottom',
  style,
  textStyle,
  visible = true,
  ...rest 
}) => {
  if (!visible || !message) {
    return null;
  }

  // Get screen dimensions for responsive sizing
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isSmallScreen = screenHeight < 700;
  const isMediumScreen = screenHeight < 800;

  const getBubbleStyle = () => {
    const baseStyle = [styles.bubble, {
      padding: isSmallScreen ? screenWidth * 0.025 : isMediumScreen ? screenWidth * 0.03 : screenWidth * 0.04,
      maxWidth: screenWidth * 0.9, // Make it responsive to screen width
    }];
    
    if (type === 'positive') baseStyle.push(styles.positive);
    if (type === 'warning') baseStyle.push(styles.warning);
    if (type === 'error') baseStyle.push(styles.error);
    
    if (position === 'top') baseStyle.push(styles.bubbleTop);
    if (position === 'bottom') baseStyle.push(styles.bubbleBottom);
    if (position === 'left') baseStyle.push(styles.bubbleLeft);
    if (position === 'right') baseStyle.push(styles.bubbleRight);
    
    if (style) baseStyle.push(style);
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, {
      fontSize: isSmallScreen ? screenWidth * 0.032 : isMediumScreen ? screenWidth * 0.035 : screenWidth * 0.04,
      lineHeight: isSmallScreen ? screenWidth * 0.045 : isMediumScreen ? screenWidth * 0.05 : screenWidth * 0.055,
    }];
    
    if (textStyle) baseStyle.push(textStyle);
    
    return baseStyle;
  };

  return (
    <View style={getBubbleStyle()} {...rest}>
      <Text style={getTextStyle()}>{message}</Text>
      <View style={[styles.tail, getTailStyle()]} />
    </View>
  );
  
  function getTailStyle() {
    switch (position) {
      case 'top':
        return styles.tailBottom;
      case 'bottom':
        return styles.tailTop;
      case 'left':
        return styles.tailRight;
      case 'right':
        return styles.tailLeft;
      default:
        return styles.tailTop;
    }
  }
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: Colors.lightBackground,
    borderRadius: Sizes.borderRadius.large,
    padding: Sizes.padding.md,
    borderWidth: Sizes.borderWidth.thin,
    borderColor: Colors.border,
    maxWidth: 250,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  positive: {
    backgroundColor: Colors.feedback.positive,
    borderColor: Colors.feedback.positive,
  },
  
  warning: {
    backgroundColor: Colors.feedback.warning,
    borderColor: Colors.feedback.warning,
  },
  
  error: {
    backgroundColor: Colors.feedback.error,
    borderColor: Colors.feedback.error,
  },
  
  bubbleTop: {
    marginBottom: 8,
  },
  
  bubbleBottom: {
    marginTop: 8,
  },
  
  bubbleLeft: {
    marginRight: 8,
  },
  
  bubbleRight: {
    marginLeft: 8,
  },
  
  text: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.medium,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: Fonts.lineHeight.medium,
  },
  
  tail: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  
  tailTop: {
    top: -8,
    left: '50%',
    marginLeft: -8,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.lightBackground,
  },
  
  tailBottom: {
    bottom: -8,
    left: '50%',
    marginLeft: -8,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.lightBackground,
  },
  
  tailLeft: {
    left: -8,
    top: '50%',
    marginTop: -8,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: Colors.lightBackground,
  },
  
  tailRight: {
    right: -8,
    top: '50%',
    marginTop: -8,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: Colors.lightBackground,
  },
});

export default MessageBubble;
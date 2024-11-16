import {Colors} from '@unistyles/Constants';
import React from 'react';
import {Platform, StyleSheet, Text, TextStyle, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

type VariantProp = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
// | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline'
type PlatformType = 'ios' | 'android';
interface CustomTextProps {
  variant?: VariantProp;
  fontFamily?:
    | 'Okra-Bold'
    | 'Okra-Regular'
    | 'Okra-Medium'
    | 'Okra-Light'
    | 'Okra-Black';
  fontSize?: number;
  color?: string;
  children?: React.ReactNode;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  onLayout?: (event: any) => void;
}

const fontSizeMap: Record<VariantProp, Record<PlatformType, number>> = {
  h1: {ios: 24, android: 22},
  h2: {ios: 22, android: 20},
  h3: {ios: 20, android: 18},
  h4: {ios: 18, android: 16},
  h5: {ios: 16, android: 14},
  h6: {ios: 12, android: 10},
};

const CustomText: React.FC<CustomTextProps> = ({
  variant,
  fontFamily = 'Okra-Regular',
  fontSize,
  color,
  children,
  style,
  numberOfLines,
  onLayout,
  ...props
}) => {
  let computeFontSize: number =
    Platform.OS === 'android'
      ? RFValue(fontSize || 12)
      : RFValue(fontSize || 10);

  if (variant && fontSizeMap[variant]) {
    const defaultFontSize: number =
      fontSizeMap[variant][Platform.OS as PlatformType];
    computeFontSize = RFValue(fontSize || defaultFontSize);
  }

  const fontFamilyStyle = {
    fontFamily,
  };
  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        {
          color: color || Colors.text,
          fontSize: computeFontSize,
        },
        fontFamilyStyle,
        style,
      ]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
      {...props}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

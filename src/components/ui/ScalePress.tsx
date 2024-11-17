import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';

interface ScalePressProps {
  onPress?: () => void;
  onLongPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const ScalePress: FC<ScalePressProps> = ({
  children,
  onPress,
  onLongPress,
  style,
}) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start;
  };

  const onPressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      activeOpacity={1}
      style={{...style}}>
      <Animated.View
        style={[
          {transform: [{scale: scaleValue}], width: '100%'},

          // {borderWidth: 2},
        ]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

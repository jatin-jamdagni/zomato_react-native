import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {Colors} from '@unistyles/Constants';
import {phoneStyles} from '@unistyles/phoneStyles';
import React, {FC} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';

interface PhoneInputProps {
  onBlur?: () => void;
  onFocus?: () => void;
  onChangeText: (text: string) => void;
  value: string;
}

export const PhoneInput: FC<PhoneInputProps> = ({
  onBlur,
  onFocus,
  onChangeText,
  value,
}) => {
  const {styles} = useStyles(phoneStyles);
  return (
    <View style={styles.container}>
      <Pressable style={styles.countryPickerContainer}>
        <CustomText variant="h2">🇮🇳</CustomText>
        <Icon
          iconFamily="Ionicons"
          name="caret-down-sharp"
          size={18}
          color={Colors.lightText}
        />
      </Pressable>

      <View style={styles.phoneInputContainer}>
        <CustomText fontFamily="Okra-Bold">+91</CustomText>

        <TextInput
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          value={value}
          placeholderTextColor={Colors.lightText}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          style={styles.input}
        />
      </View>
    </View>
  );
};

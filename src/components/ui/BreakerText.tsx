import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {loginStyles} from '@unistyles/authStyles';
import {useStyles} from 'react-native-unistyles';
import CustomText from '@components/global/CustomText';

const BreakerText: FC<{text: string}> = ({text}) => {
  const {styles} = useStyles(loginStyles);

  return (
    <View style={styles.breakerContainer}>
      <View style={styles.horizontalLine} />
      <CustomText
        style={styles.breakerText}
        fontSize={12}
        fontFamily="Okra-Medium">
        {text}
      </CustomText>
      <View style={styles.horizontalLine} />
    </View>
  );
};

export default BreakerText;

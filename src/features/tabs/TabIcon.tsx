import {ViewStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

interface TabProp {
  name: string;
}

interface IconProp {
  focused: boolean;
}

const styles = {
  width: RFValue(18),
  height: RFValue(18),
};

const tabStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

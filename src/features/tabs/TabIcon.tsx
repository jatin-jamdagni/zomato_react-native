import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import {FC, memo} from 'react';
import {Image, TextStyle, View, ViewStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import DeliveryFocused from '@assets/tabicons/delivery_focused.png';
import Delivery from '@assets/tabicons/delivery.png';

import Dining from '@assets/tabicons/dining.png';
import DiningFocused from '@assets/tabicons/dining_focused.png';
import Live from '@assets/tabicons/live.png';
import LiveFocused from '@assets/tabicons/live_focused.png';
import Reorder from '@assets/tabicons/reorder.png';
import ReorderFocused from '@assets/tabicons/reorder_focused.png';
import {useAppSelector} from '@states/reduxHook';

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
  // width: RFValue,
};

const textStyleInActive: TextStyle = {
  textAlign: 'center',
  margin: 4,
  color: Colors.lightText,
  fontSize: RFValue(9.5),
};

const textStyleActive: TextStyle = {
  textAlign: 'center',
  margin: 4,
  color: Colors.active,
  fontSize: RFValue(9.5),
};

const TabIcon: FC<TabProp> = memo(({name}) => {
  return (
    <View style={tabStyle}>
      <Image
        source={
          name === 'Delivery'
            ? Delivery
            : name === 'Dining'
            ? Dining
            : name === 'Live'
            ? Live
            : Reorder
        }
        style={styles}
      />

      <CustomText style={textStyleInActive}>{name}</CustomText>
    </View>
  );
});

const TabIconFocused: FC<TabProp> = memo(({name}) => {
  const isVegmode = useAppSelector(state => state.user.isVegMode);
  return (
    <View style={tabStyle}>
      <Image
        // , {tintColor: (name ==="Live")? undefined : }
        style={[
          styles,
          {
            tintColor:
              name === 'Live'
                ? undefined
                : isVegmode
                ? Colors.active
                : Colors.primary,
          },
        ]}
        source={
          name === 'Delivery'
            ? DeliveryFocused
            : name === 'Dining'
            ? DiningFocused
            : name === 'Live'
            ? LiveFocused
            : ReorderFocused
        }
      />

      <CustomText style={textStyleActive}>{name}</CustomText>
    </View>
  );
});

export const DeliveryTabIcon = memo(({focused}: IconProp) => {
  return focused ? (
    <TabIconFocused name="Delivery" />
  ) : (
    <TabIcon name="Delivery" />
  );
});

export const ReorderTabIcon = memo(({focused}: IconProp) => {
  return focused ? (
    <TabIconFocused name="Reorder" />
  ) : (
    <TabIcon name="Reorder" />
  );
});

export const DiningTabIcon = memo(({focused}: IconProp) => {
  return focused ? <TabIconFocused name="Dining" /> : <TabIcon name="Dining" />;
});

export const LiveTabIcon = memo(({focused}: IconProp) => {
  return focused ? <TabIconFocused name="Live" /> : <TabIcon name="Live" />;
});

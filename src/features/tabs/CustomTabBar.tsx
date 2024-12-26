import {Image, Linking, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useAppSelector} from '@states/reduxHook';
import {useSharedState} from './SharedContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import {tabStyles} from '@unistyles/tabStyles';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Colors, screenWidth} from '@unistyles/Constants';
import ScalePress from '@components/ui/ScalePress';
import {
  DeliveryTabIcon,
  DiningTabIcon,
  LiveTabIcon,
  ReorderTabIcon,
} from './TabIcon';

const CustomTabBar: FC<BottomTabBarProps> = props => {
  const isVegMode = useAppSelector(state => state.user.isVegMode);

  const {ScrollY} = useSharedState();
  const {state, navigation} = props;

  const bottom = useSafeAreaInsets();
  const {styles} = useStyles(tabStyles);

  const isLiveTabFoucsed = state.routes[state.index]?.name === 'Live';
  const animtatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            ScrollY.value === 1
              ? withTiming(100, {duration: 300})
              : withTiming(0, {duration: 300}),
        },
      ],
    };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const baseLeft = 10;
    let slideValue = state.index === 3 ? 0.23 : 0.24;
    return {
      left: withTiming(baseLeft + state.index * screenWidth * slideValue),
    };
  });
  return (
    <>
      <Animated.View
        style={[
          styles.tabBarContainer,
          animtatedStyle,
          {
            paddingBottom: bottom.bottom,
            backgroundColor: isLiveTabFoucsed ? Colors.dark : Colors.background,
          },
        ]}>
        <View style={[styles.tabContainer]}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                console.log(
                  'Navigating to:',
                  route.name,
                  'Navigation object:',
                  navigation,
                );

                navigation.navigate(route?.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <ScalePress
                onPress={onPress}
                onLongPress={onLongPress}
                key={index}
                style={[
                  styles.tabItem,

                  isFocused ? styles.focusedTabItem : {},
                ]}>
                {route?.name === 'Delivery' && (
                  <DeliveryTabIcon focused={isFocused} />
                )}
                {route?.name === 'Reorder' && (
                  <ReorderTabIcon focused={isFocused} />
                )}
                {route?.name === 'Dining' && (
                  <DiningTabIcon focused={isFocused} />
                )}
                {route?.name === 'Live' && <LiveTabIcon focused={isFocused} />}
              </ScalePress>
            );
          })}

          <View style={styles.verticalLine} />
        </View>

        <Animated.View
          style={[
            styles.slidingIndicator,
            indicatorStyle,
            {
              backgroundColor: isLiveTabFoucsed
                ? '#fff'
                : isVegMode
                ? Colors.active
                : Colors.primary,
            },
          ]}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.blinkitLogoContainer}
          onPress={() => Linking.openURL('')}>
          <Image
            source={require('@assets/icons/blinkit.png')}
            style={styles.blinkitLogo}
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default CustomTabBar;

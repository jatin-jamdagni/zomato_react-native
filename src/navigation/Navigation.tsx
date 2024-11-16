import LoginScreen from '@features/auth/LoginScreen';
import SplashScreen from '@features/auth/SplashScreen';
import AnimatedTabs from '@features/tabs/AnimatedTabs';
import UserBottomTab from '@features/tabs/UserBottomTabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '@utils/NavigationUtils';
import {FC} from 'react';

const stack = createNativeStackNavigator();

const Navgation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <stack.Screen name="SplashScreen" component={SplashScreen} />
        <stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            animation: 'fade',
          }}
        />

        <stack.Screen
          name="UserBottomTab"
          component={AnimatedTabs}
          options={{
            animation: 'fade',
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navgation;

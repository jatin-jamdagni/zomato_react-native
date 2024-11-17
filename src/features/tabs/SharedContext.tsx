import React, {createContext, FC, ReactNode, useContext} from 'react';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

interface SharedStateContextType {
  ScrollY: Animated.SharedValue<number>;
  ScrollYGlobal: Animated.SharedValue<number>;
  ScrollToTop: () => void;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(
  undefined,
);

export const SharedStateProvider: FC<{children: ReactNode}> = ({children}) => {
  const ScrollY = useSharedValue(0);
  const ScrollYGlobal = useSharedValue(0);
  const ScrollToTop = () => {
    ScrollY.value = withTiming(0, {duration: 300});
    ScrollYGlobal.value = withTiming(0, {duration: 300});
  };

  return (
    <SharedStateContext.Provider value={{ScrollY, ScrollYGlobal, ScrollToTop}}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }

  return context;
};

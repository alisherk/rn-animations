import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import { TravelList } from './TravelList';
import { TravelListDetail } from './TravelListDetail';
import { StackNavigationOptions } from '@react-navigation/stack';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

const Stack = createSharedElementStackNavigator();

const config: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const options: StackNavigationOptions = {
  gestureEnabled: false,
  headerBackTitle: 'none',
  transitionSpec: {
    open: config,
    close: config,
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode='none'
      initialRouteName='List'
      screenOptions={{ cardStyle: { backgroundColor: 'gray' } }}
    >
      <Stack.Screen
        name='Detail'
        component={TravelListDetail}
        options={options}
        sharedElements={(route, otherRoute, showing) => {
          const { item } = route.params;
          return [
            {
              id: `item.${item.key}.location`,
              animation: 'fade-out',
              align: 'right-bottom',
            },
          ];
        }}
      />
      <Stack.Screen name='List' component={TravelList} options={options} />
    </Stack.Navigator>
  </NavigationContainer>
);

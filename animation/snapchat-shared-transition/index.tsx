import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';

import Snapchat, { stories } from './Snapchat';
import StoryComp from './Story';
import { SnapchatRoutes } from './Model';

export const assets = stories
  .map((story) => [story.avatar, story.source])
  .flat();

const Stack = createSharedElementStackNavigator<SnapchatRoutes>();
const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: 'transparent' },
      }}
      headerMode='none'
      keyboardHandlingEnabled
      mode='modal'
    >
      <Stack.Screen name='Snapchat' component={Snapchat} />
      <Stack.Screen
        name='Story'
        component={StoryComp}
        sharedElements={(route) => {
          const { id } = route.params.story;
          return [id];
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigator;

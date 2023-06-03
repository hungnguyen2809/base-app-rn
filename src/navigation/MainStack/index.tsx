import { DEFAULT_OPTION_SCREEN, ROUTES } from '@/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeTabs from './HomeTabs';

const Stack = createNativeStackNavigator();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={DEFAULT_OPTION_SCREEN}>
      <Stack.Screen name={ROUTES.HomeTabs} component={HomeTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;

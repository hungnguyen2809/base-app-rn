import { DEFAULT_OPTION_SCREEN, ROUTES } from '@/constants';
import Home from '@/features/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={DEFAULT_OPTION_SCREEN}>
      <Stack.Screen name={ROUTES.Login} component={Home} />
    </Stack.Navigator>
  );
};

export default AuthStack;

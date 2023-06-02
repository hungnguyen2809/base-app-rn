import { navLinking } from '@/constants';
import { delay } from '@/utils';
import { NavigationContainer } from '@react-navigation/native';
import React, { Fragment } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from '../AuthStack';
import MainStack from '../MainStack';
import { setNavigator } from '../service';

const isLogin = false;

const AppNavigation: React.FC = () => {
  const bootstrap = async () => {
    await delay(500);
    SplashScreen.hide();
  };

  return (
    <NavigationContainer onReady={bootstrap} linking={navLinking} ref={setNavigator}>
      {isLogin ? (
        <Fragment>
          <MainStack />
        </Fragment>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;

import { navLinking } from '@/constants';
import { NavigationContainer } from '@react-navigation/native';
import React, { Fragment } from 'react';
import AuthStack from '../AuthStack';
import MainStack from '../MainStack';
import { setNavigator } from '../service';

const isLogin = false;

const AppNavigation: React.FC = () => {
  const bootstrap = async () => {
    //
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

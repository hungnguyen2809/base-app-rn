import { LinkingOptions } from '@react-navigation/native';

export const DEFAULT_OPTION_SCREEN = {
  headerShown: false,
};

export const navLinking: LinkingOptions<any> = {
  prefixes: [],
};

export enum ROUTES {
  Splash = 'Splash',
  Login = 'Login',
  Register = 'Register',

  HomeTabs = 'HomeTabs',
  Home = 'Home',
  Notification = 'Notification',
  Setting = 'Setting',
}

import { Colors, DEFAULT_OPTION_SCREEN, Fonts, ROUTES } from '@/constants';
import { fontScale, scale } from '@/utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tabs = createBottomTabNavigator();

type TabBarIconProps = { focused: boolean; color: string; size: number };

const HomeIcon = ({ color, focused }: TabBarIconProps) => {
  return <Ionicons name={focused ? 'home' : 'home-outline'} size={scale(20)} color={color} />;
};

const NotiIcon = ({ color, focused }: TabBarIconProps) => {
  return <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={scale(20)} color={color} />;
};

const SettingIcon = ({ color, focused }: TabBarIconProps) => {
  return <Ionicons name={focused ? 'settings' : 'settings-outline'} size={scale(20)} color={color} />;
};

const HomeTabs: React.FC = () => {
  return (
    <Tabs.Navigator
      initialRouteName={ROUTES.Home}
      screenOptions={{
        ...DEFAULT_OPTION_SCREEN,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: fontScale(12),
          fontFamily: Fonts.REGULAR,
        },
        tabBarStyle: {
          borderTopWidth: 0.3,
          borderTopColor: '#C2C2CB',
          backgroundColor: '#ffffff',
        },
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.INACTIVE_GREY,
      }}>
      <Tabs.Screen component={View} name={ROUTES.Home} options={{ title: 'Trang chủ', tabBarIcon: HomeIcon }} />
      <Tabs.Screen component={View} name={ROUTES.Notification} options={{ title: 'Thông báo', tabBarIcon: NotiIcon }} />
      <Tabs.Screen component={View} name={ROUTES.Setting} options={{ title: 'Cài đặt', tabBarIcon: SettingIcon }} />
    </Tabs.Navigator>
  );
};

export default HomeTabs;

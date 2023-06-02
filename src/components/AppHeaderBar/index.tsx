import { Colors, Fonts } from '@/constants';
import { navigationService } from '@/navigation';
import { DeviceUtils, fontScale, logger, scale } from '@/utils';
import React from 'react';
import { StatusBar, StatusBarStyle, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Separator, TextBase } from '../base';

type AppHeaderProps = {
  title?: string;
  showBack?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  childrenLeft?: React.ReactNode;
  childrenRight?: React.ReactNode;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  onPressBack?: () => void;
  titleHeaderStyle?: ViewStyle;
  titleStyle?: TextStyle;
  barStyle?: StatusBarStyle;
};

const AppHeaderBar: React.FC<AppHeaderProps> = ({
  title,
  showBack,
  iconLeft,
  iconRight,
  childrenLeft,
  childrenRight,
  onPressLeft,
  onPressRight,
  onPressBack,
  titleHeaderStyle,
  titleStyle,
  barStyle = 'light-content',
}) => {
  const onGoBack = () => {
    if (navigationService.canGoBack()) {
      navigationService.goBack();
    } else {
      logger.log('Can not go back');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle={barStyle} backgroundColor="transparent" />
      <Separator safeTop />

      <View style={styles.containerTitle}>
        <View style={styles.btnLeftContainer}>
          {childrenLeft ? (
            childrenLeft
          ) : iconLeft ? (
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonLeft} onPress={onPressLeft}>
              {iconLeft}
            </TouchableOpacity>
          ) : showBack ? (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonLeft}
              onPress={onPressBack ? onPressBack : onGoBack}>
              <Ionicons name="chevron-back-outline" size={26} color={Colors.DEFAULT_WHITE} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        <View style={[styles.titleHeader, titleHeaderStyle]}>
          <TextBase style={[styles.titleText, titleStyle]} numberOfLines={1}>
            {title}
          </TextBase>
        </View>

        <View style={styles.btnRightContainer}>
          {childrenRight ? (
            childrenRight
          ) : iconRight ? (
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonRight} onPress={onPressRight}>
              {iconRight}
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View />
      </View>
    </View>
  );
};

export default AppHeaderBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: scale(10),
    backgroundColor: Colors.PRIMARY,
    paddingTop: DeviceUtils.hasNotch ? 0 : 10,
  },
  btnLeftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonLeft: {
    marginLeft: scale(10),
    paddingLeft: scale(5),
    paddingRight: scale(10),
  },
  btnRightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  buttonRight: {
    marginRight: scale(10),
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleHeader: {
    flex: 5,
    height: 27,
    alignItems: 'center',
  },
  titleText: {
    fontSize: fontScale(18),
    lineHeight: fontScale(18, true),
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.MEDIUM,
  },
});

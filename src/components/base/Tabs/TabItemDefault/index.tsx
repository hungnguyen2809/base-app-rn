import { Colors, Fonts } from '@/constants';
import { fontScale, scale } from '@/utils';
import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import TextBase from '../../TextBase';
import { NavRoute } from '../common';

type TabItemProps = {
  route: NavRoute;
  active?: boolean;
  onPress?: (index: number) => void;
  style?: ViewStyle;
};

const TabItemDefault: React.FC<TabItemProps> = ({ route, active, onPress, style }) => {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      Animated.timing(animated, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handlePress = () => {
    onPress?.(route.index);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity activeOpacity={0.5} onPress={handlePress} style={styles.buttonContainer}>
        <View style={styles.textContainer}>
          <TextBase style={[styles.textButton, active ? styles.textBtnActive : styles.textBtnInActive]}>
            {route.title}
          </TextBase>
          {route.badge ? (
            <TextBase
              style={[styles.textButton, styles.textBadge, active ? styles.textBtnActive : styles.textBtnInActive]}>
              ({route.badge})
            </TextBase>
          ) : null}
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.lineActive,
          {
            width: animated.interpolate({
              inputRange: [0, 25, 50, 75, 100],
              outputRange: ['0%', '25%', '50%', '75%', '100%'],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
    </View>
  );
};

export default memo(TabItemDefault);

const styles = StyleSheet.create({
  container: {
    paddingTop: 3,
    paddingBottom: 2,
  },
  buttonContainer: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(8),
  },
  textContainer: {
    flexDirection: 'row',
  },
  textButton: {
    fontFamily: Fonts.MEDIUM,
    fontSize: fontScale(15),
    lineHeight: fontScale(15, true),
  },
  lineActive: {
    height: 2,
    width: '100%',
    borderRadius: 6,
    backgroundColor: Colors.PRIMARY,
  },
  textBadge: {
    marginLeft: scale(5),
  },
  textBtnActive: {
    color: Colors.PRIMARY,
  },
  textBtnInActive: {
    color: Colors.INACTIVE_GREY,
  },
});

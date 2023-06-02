import { Colors, Fonts } from '@/constants';
import { fontScale, scale } from '@/utils';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import TextBase from '../../TextBase';
import { NavRoute } from '../common';

type TabItemProps = {
  route: NavRoute;
  active?: boolean;
  onPress?: (index: number) => void;
  style?: ViewStyle;
};

const TabItemRounded: React.FC<TabItemProps> = ({ route, active, onPress, style }) => {
  const handlePress = () => {
    onPress?.(route.index);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handlePress}
        style={[styles.buttonContainer, active ? styles.btnActive : styles.btnInActive]}>
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
    </View>
  );
};

export default memo(TabItemRounded);

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(10),
  },
  buttonContainer: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(5),
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_GREY2,
  },
  textContainer: {
    flexDirection: 'row',
  },
  textButton: {
    fontFamily: Fonts.MEDIUM,
    fontSize: fontScale(15),
    lineHeight: fontScale(15, true),
  },
  textBadge: {
    marginLeft: scale(5),
  },
  btnActive: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  textBtnActive: {
    color: Colors.DEFAULT_WHITE,
  },
  btnInActive: {
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  textBtnInActive: {
    color: Colors.DEFAULT_BLACK,
  },
});

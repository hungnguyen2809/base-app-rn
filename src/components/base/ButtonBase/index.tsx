import React, { forwardRef, useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Colors, Fonts, FontSize } from '@/constants';
import { fontScale, scale } from '@/utils';
import TextBase from '../TextBase';

export interface ButtonBaseProp extends TouchableOpacityProps {
  title?: string;
  children?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  type?: 'primary' | 'outline';
  icon?: React.ReactNode;
}

const ButtonBase: React.ForwardRefRenderFunction<TouchableOpacity, ButtonBaseProp> = (
  { children, icon, titleStyle, style, title, activeOpacity = 0.6, type, ...restProps },
  ref,
) => {
  const isOutline = useMemo(() => type === 'outline', [type]);

  return (
    <TouchableOpacity
      ref={ref}
      style={[styles.button, isOutline && styles.btnOutline, style, restProps.disabled && styles.disabled]}
      activeOpacity={activeOpacity}
      {...restProps}>
      {children ? (
        children
      ) : (
        <>
          {icon ? icon : null}
          <TextBase
            style={[
              styles.title,
              isOutline ? styles.titleOutline : {},
              icon ? { marginLeft: scale(10) } : {},
              titleStyle,
            ]}>
            {title || 'title'}
          </TextBase>
        </>
      )}
    </TouchableOpacity>
  );
};

export default forwardRef(ButtonBase);

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(13),
    backgroundColor: Colors.PRIMARY,
  },
  title: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.REGULAR,
    fontSize: fontScale(FontSize.DEFAULT),
    lineHeight: fontScale(FontSize.DEFAULT, true),
  },
  btnOutline: {
    backgroundColor: Colors.BG_OUTLIGHT,
  },
  titleOutline: {
    color: Colors.PRIMARY,
  },
  disabled: {
    opacity: 0.6,
  },
});

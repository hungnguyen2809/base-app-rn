import { Colors, FontSize, Fonts } from '@/constants';
import { fontScale } from '@/utils';
import React, { forwardRef } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export interface TextBaseProps extends TextProps {
  children: React.ReactNode;
  required?: boolean;
}

const TextBase: React.ForwardRefRenderFunction<Text, TextBaseProps> = (
  { required, children, style, ...restProps },
  ref,
) => {
  return (
    <Text ref={ref} style={[styles.text, style]} allowFontScaling={false} {...restProps}>
      {children} {required && <Text style={styles.textRequired}>*</Text>}
    </Text>
  );
};

export default forwardRef(TextBase);

const styles = StyleSheet.create({
  text: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.REGULAR,
    fontSize: fontScale(FontSize.DEFAULT),
    lineHeight: fontScale(FontSize.DEFAULT, true),
  },
  textRequired: {
    color: Colors.DEFAULT_RED,
  },
});

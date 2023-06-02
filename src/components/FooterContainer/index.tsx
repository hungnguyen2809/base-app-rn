import { Colors } from '@/constants';
import { scale } from '@/utils';
import React, { memo, PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FooterContainerProps extends PropsWithChildren, ViewStyle {
  lineTop?: boolean;
  safeBottom?: number;
}

const FooterContainer: React.FC<FooterContainerProps> = ({
  children,
  lineTop = true,
  safeBottom = 10,
  ...restProps
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.footContainer,
        lineTop && styles.lineTop,
        { paddingBottom: Math.max(insets.bottom, scale(safeBottom)) },
        restProps,
      ]}>
      {children}
    </View>
  );
};

export default memo(FooterContainer);

const styles = StyleSheet.create({
  footContainer: {
    paddingTop: scale(10),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  lineTop: {
    borderTopWidth: 0.6,
    borderTopColor: Colors.DEFAULT_GREY,
  },
});

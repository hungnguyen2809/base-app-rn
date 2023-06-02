import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SeparatorProps extends Omit<ViewStyle, 'children'> {
  height?: number | string;
  width?: number | string;
  safeTop?: boolean;
  safeBottom?: boolean;
}

const Separator: React.FC<SeparatorProps> = ({ height, width, safeTop, safeBottom, ...extraProps }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ height: safeTop ? insets.top : safeBottom ? Math.max(insets.bottom, 10) : height, width, ...extraProps }}
    />
  );
};

Separator.defaultProps = {
  height: 0,
  width: 0,
};

export default Separator;

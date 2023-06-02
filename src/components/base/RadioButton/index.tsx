/* eslint-disable react-native/no-inline-styles */
import { Colors } from '@/constants';
import { fontScale, scale } from '@/utils';
import React, { memo } from 'react';
import { PixelRatio, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import TextBase from '../TextBase';

export type RadioButtonProps = {
  borderColor?: string;
  color?: string;
  containerStyle?: ViewStyle;
  description?: string;
  descriptionStyle?: TextStyle;
  disabled?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  layout?: 'row' | 'column';
  size?: number;
  selected?: boolean;
  value?: any;
  onPress?: (value: any) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  borderColor,
  color = Colors.PRIMARY,
  containerStyle,
  description,
  descriptionStyle,
  disabled = false,
  label,
  labelStyle,
  layout = 'row',
  onPress,
  selected = false,
  size = 20,
  value,
}) => {
  const borderWidth = PixelRatio.roundToNearestPixel(size * 0.1);
  const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.5);
  const sizeFull = PixelRatio.roundToNearestPixel(size);

  let orientation: any = { flexDirection: 'row' };
  let margin: any = { marginLeft: scale(10) };

  if (layout === 'column') {
    orientation = { alignItems: 'center' };
    margin = { marginTop: scale(10) };
  }

  const handlePress = () => {
    if (disabled) {
      return null;
    }
    if (onPress) {
      onPress(value);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.container, orientation, { opacity: disabled ? 0.2 : 1 }, containerStyle]}>
        <View
          style={[
            styles.border,
            {
              borderColor: borderColor || color,
              borderWidth,
              width: sizeFull,
              height: sizeFull,
              borderRadius: sizeHalf,
            },
          ]}>
          {selected && (
            <View
              style={{
                backgroundColor: color,
                width: sizeHalf,
                height: sizeHalf,
                borderRadius: sizeHalf,
              }}
            />
          )}
        </View>
        {Boolean(label) && (
          <TextBase numberOfLines={1} style={[styles.label, margin, labelStyle]}>
            {label}
          </TextBase>
        )}
      </TouchableOpacity>
      {Boolean(description) && (
        <TextBase numberOfLines={2} style={[styles.description, margin, descriptionStyle]}>
          {description}
        </TextBase>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: scale(8),
    marginHorizontal: scale(10),
  },
  border: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: fontScale(15),
    lineHeight: fontScale(15, true),
  },
  description: {
    fontSize: fontScale(14),
    lineHeight: fontScale(14, true),
  },
});

export default memo(RadioButton);

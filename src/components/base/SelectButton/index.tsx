import { Colors } from '@/constants';
import { scale } from '@/utils';
import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Block from '../Block';
import TextBase from '../TextBase';

interface SelectButtonProps extends TouchableOpacityProps {
  title?: string;
  showTitle?: boolean;
  placeholder?: string;
  titleStyle?: TextStyle;
}

const SelectButton: React.FC<SelectButtonProps> = ({ title, showTitle, placeholder, style, titleStyle, ...props }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles.container, [style]]} {...props}>
      {props.children ? (
        props.children
      ) : (
        <Block flexDirection="row" justifyContent="space-between" alignItems="center">
          {showTitle ? (
            <TextBase style={titleStyle} numberOfLines={1}>
              {title}
            </TextBase>
          ) : (
            <TextBase numberOfLines={1} style={{ color: Colors.DEFAULT_GREY2 }}>
              {placeholder}
            </TextBase>
          )}
          <Ionicons name="caret-down-outline" size={15} />
        </Block>
      )}
    </TouchableOpacity>
  );
};

export default SelectButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: 0.5,
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
    borderColor: Colors.DEFAULT_GREY,
  },
});

import { Colors } from '@/constants';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import TextBase from '../TextBase';

interface TagButtonProps extends Omit<TouchableOpacityProps, 'onPress'> {
  value?: any;
  label?: string;
  active?: boolean;
  onPress?: (value: any) => void;
}

const TagButton: React.FC<TagButtonProps> = ({ active, value, label, onPress, style, ...props }) => {
  const handlePress = () => {
    onPress?.(value);
  };

  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, style, active ? styles.activeContainer : {}]}
      onPress={handlePress}>
      <TextBase style={active ? styles.activeLabel : {}}>{label}</TextBase>
    </TouchableOpacity>
  );
};

export default TagButton;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderColor: Colors.DEFAULT_GREY2,
  },
  activeContainer: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  activeLabel: {
    color: Colors.DEFAULT_WHITE,
  },
});

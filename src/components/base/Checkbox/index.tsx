import { Colors } from '@/constants';
import { scale } from '@/utils';
import RNCheckBox, { CheckBoxProps } from '@react-native-community/checkbox';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return (
    <RNCheckBox
      boxType="square"
      style={styles.container}
      onAnimationType="bounce"
      offAnimationType="bounce"
      onTintColor={Colors.PRIMARY}
      onCheckColor={Colors.PRIMARY}
      tintColors={{ true: Colors.PRIMARY }}
      {...props}
    />
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container:
    Platform.OS === 'ios'
      ? { width: scale(20), height: scale(20), margin: scale(2) }
      : { width: scale(24), height: scale(24), margin: 0 },
});

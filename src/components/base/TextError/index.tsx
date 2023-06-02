import { Colors } from '@/constants';
import React from 'react';
import { StyleSheet } from 'react-native';
import TextBase from '../TextBase';

type TextErrorProp = {
  message?: string;
};

const TextError: React.FC<TextErrorProp> = ({ message }) => {
  return message ? <TextBase style={styles.text}>{message}</TextBase> : <></>;
};

export default TextError;

const styles = StyleSheet.create({
  text: {
    color: Colors.DEFAULT_RED,
  },
});

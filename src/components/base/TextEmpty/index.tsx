import { Fonts } from '@/constants';
import { fontScale } from '@/utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextBase from '../TextBase';

type Props = {
  title?: string;
};

const TextEmpty: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <TextBase style={styles.title}>{title ? title : 'Không có dữ liệu'}</TextBase>
    </View>
  );
};

export default TextEmpty;

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: fontScale(14),
    lineHeight: fontScale(14, true),
    fontFamily: Fonts.REGULAR_ITALIC,
  },
});

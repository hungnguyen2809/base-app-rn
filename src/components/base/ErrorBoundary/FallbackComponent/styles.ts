import { Fonts } from '@/constants';
import { fontScale, scale } from '@/utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: scale(16),
  },
  title: {
    color: '#000',
    fontSize: fontScale(48),
    paddingBottom: scale(16),
    fontFamily: Fonts.REGULAR,
  },
  subtitle: {
    color: '#000',
    fontSize: fontScale(32),
    fontFamily: Fonts.BOLD,
  },
  error: {
    paddingVertical: scale(16),
    fontFamily: Fonts.REGULAR,
  },
  button: {
    borderRadius: 50,
    padding: scale(15),
    fontSize: fontScale(15),
    backgroundColor: '#2196f3',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: Fonts.MEDIUM,
  },
});

export default styles;

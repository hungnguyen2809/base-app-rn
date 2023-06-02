import { Fonts, Images } from '@/constants';
import { fontScale, scale } from '@/utils';
import { Portal } from '@gorhom/portal';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Animated, Keyboard, StyleSheet, View } from 'react-native';
import { TextBase } from '..';

type Props = Record<string, never>;

type State = {
  show: boolean;
  message: string;
};

class LoadingPortal extends React.Component<Props, State> {
  private showMessageTimeout: number | null = null;
  private hideLoadingTimeout: number | null = null;

  private showing = false;
  private textOpacity = new Animated.Value(0);

  private static loading: LoadingPortal;

  constructor(props: Props) {
    super(props);
    this.state = { show: false, message: '' };
    LoadingPortal.loading = this;
  }

  static show(message?: string) {
    LoadingPortal.loading.onShow();
    if (message) {
      LoadingPortal.loading.setMessage(message);
    }
  }

  static hide() {
    LoadingPortal.loading.onHide();
  }

  clearMessageTimeout() {
    if (this.showMessageTimeout) {
      clearTimeout(this.showMessageTimeout);
      this.showMessageTimeout = null;
    }
  }

  clearLoadingTimeout() {
    if (this.hideLoadingTimeout) {
      clearTimeout(this.hideLoadingTimeout);
      this.hideLoadingTimeout = null;
    }
  }

  onShow() {
    this.clearLoadingTimeout();
    if (!this.showing) {
      Keyboard.dismiss();
      this.showing = true;
      this.setState({ show: true });
      if (!this.state.message) {
        this.showMessageTimeout = setTimeout(() => {
          this.setMessage('Xin vui lòng chờ trong giây lát');
        }, 2 * 1000);
      }
    }
  }

  onHide() {
    if (this.showing) {
      this.hideLoadingTimeout = setTimeout(() => {
        this.showing = false;
        this.setState({ show: false, message: '' });
        this.clearMessageTimeout();
        this.clearLoadingTimeout();
      }, 500);
    }
  }

  setMessage(message: string) {
    Animated.timing(this.textOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ message }, () => {
        Animated.timing(this.textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    });
    this.clearMessageTimeout();
  }

  render() {
    if (this.state.show) {
      return (
        <Portal name="LoadingPortal">
          <View style={[StyleSheet.absoluteFill, styles.container]}>
            <View style={styles.placeholder} />
            <LottieView source={Images.LOTTIES_LOADING} autoPlay loop style={styles.loading} />

            <Animated.View style={[styles.messageContainer, { opacity: this.textOpacity }]}>
              <TextBase style={styles.message}>{this.state.message}</TextBase>
            </Animated.View>
          </View>
        </Portal>
      );
    }

    return <></>;
  }
}

export default LoadingPortal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1001,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  placeholder: {
    height: scale(120),
  },
  messageContainer: {
    alignSelf: 'stretch',
    height: scale(120),
  },
  message: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: fontScale(16),
    lineHeight: fontScale(16, true),
    marginHorizontal: scale(24),
    fontFamily: Fonts.MEDIUM,
  },
  loading: {
    width: scale(100),
  },
});

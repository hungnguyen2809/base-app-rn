import { Colors, Fonts, General } from '@/constants';
import { DeviceUtils, fontScale, scale } from '@/utils';
import { Portal } from '@gorhom/portal';
import React, { Component } from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { Block, TextBase } from '..';
import IcAlertError from './assets/ic_alert_error.svg';
import IcAlertInfo from './assets/ic_alert_info.svg';
import IcAlertSuccess from './assets/ic_alert_success.svg';
import IcAlertWarning from './assets/ic_alert_warning.svg';

enum AlertType {
  Error = 1,
  Success = 2,
  Warning = 3,
  Confirm = 4,
  Info = 5,
}

type ButtonAction = {
  text: string;
  style?: ViewStyle;
  styleText?: TextStyle;
  noDismiss?: boolean;
  onPress?: () => void;
  onDissmis?: () => void;
};

type AlertDialogOption = {
  message: string;
  title?: string;
  onOpen?: () => void;
  buttons?: ButtonAction[];
};

type AlertDialogProps = {};
type AlertDialogState = {
  visible: boolean;
  title?: string;
  message?: string;
};

class AlertDialog extends Component<AlertDialogProps, AlertDialogState> {
  static alertDialog: AlertDialog;
  private static alertType: AlertType;
  private static buttons: ButtonAction[] | undefined;

  constructor(props: AlertDialogProps) {
    super(props);
    AlertDialog.alertDialog = this;
    AlertDialog.alertType = AlertType.Info;
    this.state = { visible: false, title: '', message: '' };
  }

  static success = (options: AlertDialogOption) => {
    AlertDialog.alertType = AlertType.Success;
    AlertDialog.buttons = options.buttons;
    AlertDialog.alertDialog.onShow(options.message, options.title, options.onOpen);
  };

  static error = (options: AlertDialogOption) => {
    AlertDialog.alertType = AlertType.Error;
    AlertDialog.buttons = options.buttons;
    AlertDialog.alertDialog.onShow(options.message, options.title, options.onOpen);
  };

  static warning = (options: AlertDialogOption) => {
    AlertDialog.alertType = AlertType.Warning;
    AlertDialog.buttons = options.buttons;
    AlertDialog.alertDialog.onShow(options.message, options.title, options.onOpen);
  };

  static info = (options: AlertDialogOption) => {
    AlertDialog.alertType = AlertType.Info;
    AlertDialog.buttons = options.buttons;
    AlertDialog.alertDialog.onShow(options.message, options.title, options.onOpen);
  };

  onShow = (message: string, title?: string, callback?: () => void) => {
    this.setState({ visible: true, message, title: title ? title : '' }, callback);
  };

  onHide = (callback?: () => void) => {
    this.setState({ visible: false }, () => {
      callback?.();
      AlertDialog.buttons = undefined;
    });
  };

  onPressAction = (action?: ButtonAction) => {
    if (!action) {
      return;
    }

    if (action.noDismiss) {
      action.onPress?.();
    } else {
      action.onPress?.();
      this.onHide(action.onDissmis);
    }
  };

  _renderButton = () => {
    if (!AlertDialog.buttons || AlertDialog.buttons.length === 0) {
      return (
        <TouchableOpacity activeOpacity={0.5} style={styles.btnContainer} onPress={() => this.onHide()}>
          <TextBase style={styles.btnText}>Đóng</TextBase>
        </TouchableOpacity>
      );
    }

    if (AlertDialog.buttons.length === 1) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            this.onPressAction(AlertDialog.buttons?.[0]);
          }}
          style={[styles.btnContainer, AlertDialog.buttons?.[0].style]}>
          <TextBase style={[styles.btnText, AlertDialog.buttons[0]?.styleText]}>
            {AlertDialog.buttons[0]?.text}
          </TextBase>
        </TouchableOpacity>
      );
    }

    if (AlertDialog.buttons.length === 2) {
      return (
        <Block flexDirection="row">
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.onPressAction(AlertDialog.buttons?.[0]);
            }}
            style={[General.STYLES.FLEX_1, styles.btnContainer, AlertDialog.buttons[0]?.style]}>
            <TextBase style={[styles.btnText, AlertDialog.buttons[0]?.styleText]}>
              {AlertDialog.buttons[0]?.text}
            </TextBase>
          </TouchableOpacity>
          <View style={styles.btnLine} />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.onPressAction(AlertDialog.buttons?.[1]);
            }}
            style={[General.STYLES.FLEX_1, styles.btnContainer, AlertDialog.buttons[1]?.style]}>
            <TextBase style={[styles.btnText, styles.btnTextPrimary, AlertDialog.buttons[1]?.styleText]}>
              {AlertDialog.buttons?.[1].text}
            </TextBase>
          </TouchableOpacity>
        </Block>
      );
    }
  };

  render() {
    return (
      <Portal name="AlertDialog">
        <Modal
          style={styles.modal}
          statusBarTranslucent
          backdropOpacity={0.5}
          isVisible={this.state.visible}
          hideModalContentWhileAnimating
          backdropTransitionOutTiming={0}
          deviceHeight={DeviceUtils.height}
          useNativeDriver={DeviceUtils.isAndroid}
          useNativeDriverForBackdrop={DeviceUtils.isAndroid}>
          <View style={styles.container}>
            <Block marginBottom={scale(5)}>
              {AlertDialog.alertType === AlertType.Error && (
                <View style={styles.headIcon}>
                  <IcAlertError width={scale(27)} height={scale(27)} />
                </View>
              )}
              {AlertDialog.alertType === AlertType.Success && (
                <View style={styles.headIcon}>
                  <IcAlertSuccess width={scale(27)} height={scale(27)} />
                </View>
              )}
              {AlertDialog.alertType === AlertType.Warning && (
                <View style={styles.headIcon}>
                  <IcAlertWarning width={scale(27)} height={scale(27)} />
                </View>
              )}
              {AlertDialog.alertType === AlertType.Info && (
                <View style={styles.headIcon}>
                  <IcAlertInfo width={scale(27)} height={scale(27)} />
                </View>
              )}
              {this.state.title && <TextBase style={styles.headTitle}>{this.state.title}</TextBase>}
            </Block>

            <Block paddingHorizontal={scale(15)} marginBottom={scale(20)}>
              <TextBase style={styles.textMessage}>{this.state.message}</TextBase>
            </Block>

            <View style={styles.footerContainer}>{this._renderButton()}</View>
          </View>
        </Modal>
      </Portal>
    );
  }
}

export default AlertDialog;

const styles = StyleSheet.create({
  modal: {},
  container: {
    borderRadius: 10,
    paddingTop: scale(10),
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headIcon: {
    alignItems: 'center',
    marginBottom: scale(5),
  },
  headTitle: {
    textAlign: 'center',
    color: Colors.PRIMARY,
    fontSize: fontScale(17),
    lineHeight: fontScale(17, true),
    fontFamily: Fonts.BOLD,
  },
  textMessage: {
    textAlign: 'center',
  },
  footerContainer: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.DEFAULT_GREY,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(11),
  },
  btnText: {
    fontSize: fontScale(16),
    lineHeight: fontScale(16, true),
  },
  btnTextPrimary: {
    fontFamily: Fonts.MEDIUM,
  },
  btnLine: {
    width: 0.6,
    height: '100%',
    backgroundColor: Colors.DEFAULT_GREY,
  },
});

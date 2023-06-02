import { Portal } from '@gorhom/portal';
import React, { Component } from 'react';
import Toast, { ToastPresets, ToastProps } from './helper/Toast';

type ToastSnackbarProps = Record<string, any>;
type ToastSnackbarState = { visible: boolean; message: string };

type OptionSnack = { duration?: number } & ToastProps;
type OptionSnackOpen = Omit<OptionSnack, 'preset' | 'message' | 'visible' | 'autoDismiss'>;

const DEFAULT_OPTION: OptionSnack = {
  zIndex: 10000,
  duration: 3000,
  position: 'top',
  swipeable: true,
};

class ToastSnackbar extends Component<ToastSnackbarProps, ToastSnackbarState> {
  static snackbar: ToastSnackbar;
  private static options?: OptionSnack;

  constructor(props: ToastSnackbarProps) {
    super(props);
    ToastSnackbar.snackbar = this;
    ToastSnackbar.options = { ...DEFAULT_OPTION };
    this.state = { message: '', visible: false };
  }

  static openGeneral = (message: string | undefined, options?: OptionSnackOpen) => {
    if (!message) return;

    ToastSnackbar.options = { ...DEFAULT_OPTION, ...options, preset: ToastPresets.GENERAL };
    ToastSnackbar.snackbar.onOpenSnackbar(message);
  };

  static openSuccess = (message: string | undefined, options?: OptionSnackOpen) => {
    if (!message) return;

    ToastSnackbar.options = { ...DEFAULT_OPTION, ...options, preset: ToastPresets.SUCCESS };
    ToastSnackbar.snackbar.onOpenSnackbar(message);
  };

  static openFailed = (message: string | undefined, options?: OptionSnackOpen) => {
    if (!message) return;

    ToastSnackbar.options = { ...DEFAULT_OPTION, ...options, preset: ToastPresets.FAILURE };
    ToastSnackbar.snackbar.onOpenSnackbar(message);
  };

  static openOffline = (message: string | undefined, options?: OptionSnackOpen) => {
    if (!message) return;

    ToastSnackbar.options = { ...DEFAULT_OPTION, ...options, preset: ToastPresets.OFFLINE };
    ToastSnackbar.snackbar.onOpenSnackbar(message);
  };

  static dismiss = () => {
    ToastSnackbar.snackbar.onDismissSnackbar();
  };

  onOpenSnackbar = (message: string) => {
    this.setState({ visible: true, message: message });
  };

  onDismissSnackbar = () => {
    this.setState({ visible: false }, () => {
      ToastSnackbar.options = { ...DEFAULT_OPTION };
    });
  };

  render() {
    return (
      <Portal name="ToastSnackbar">
        <Toast
          {...ToastSnackbar.options}
          visible={this.state.visible}
          message={this.state.message}
          onDismiss={this.onDismissSnackbar}
          autoDismiss={ToastSnackbar.options?.duration}
        />
      </Portal>
    );
  }
}

export default ToastSnackbar;

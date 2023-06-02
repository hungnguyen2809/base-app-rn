import { ToastPresets, ToastProps } from '../types';

const checkMarkIcon = require('../assets/checkmarkFlat.png');
const exclamationIcon = require('../assets/exclamationFill.png');
const infoIcon = require('../assets/info.png');
const redCloudIcon = require('../assets/redCloud.png');

const TOAST_PRESETS = {
  [ToastPresets.GENERAL]: {
    icon: infoIcon,
    iconColor: '#3498db',
    accessibilityMessagePrefix: 'General',
  },
  [ToastPresets.SUCCESS]: {
    icon: checkMarkIcon,
    iconColor: '#24C869',
    accessibilityMessagePrefix: 'Success',
  },
  [ToastPresets.FAILURE]: {
    icon: exclamationIcon,
    iconColor: '#eb2f06',
    accessibilityMessagePrefix: 'Alert',
  },
  [ToastPresets.OFFLINE]: {
    icon: redCloudIcon,
    iconColor: '#bdc3c7',
    accessibilityMessagePrefix: 'Offline',
  },
};

export default ({
  preset,
  icon,
  iconColor,
  message,
}: Pick<ToastProps, 'preset' | 'icon' | 'message' | 'iconColor'>) => {
  const toastPreset = preset ? TOAST_PRESETS[preset] : undefined;

  return {
    icon: icon ?? toastPreset?.icon,
    iconColor: iconColor ?? toastPreset?.iconColor,
    accessibilityMessage: `${toastPreset?.accessibilityMessagePrefix} notification, ${message}`,
  };
};

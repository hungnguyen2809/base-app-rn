import { General } from '@/constants';
import { get } from 'lodash';
import moment from 'moment';
import { Alert, Linking } from 'react-native';
import { DeviceUtils } from './deviceUtils';

export const logger = {
  log: (...params: any) => {
    /* eslint-disable no-console */
    if (__DEV__) console.log(...params);
  },
  info: (...params: any) => {
    logger.log('[INFO]:', ...params);
  },
  error: (...params: any) => {
    logger.log('[ERROR]:', ...params);
  },
};

export const alertMessage = (message: string) => {
  if (!message || typeof message !== 'string') return;

  Alert.alert('', message, [{ text: 'Đóng', style: 'cancel' }]);
};

export const phoneDevice = {
  call: async (phone?: number | string) => {
    if (!phone) return;

    try {
      const url = `tel:${phone}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(`tel:${phone}`);
      } else {
        alertMessage('Số điện thoại không đúng định dạng');
      }
    } catch (error) {
      logger.error(error);
    }
  },
  sms: async (phone?: number | string, message = '') => {
    if (!phone) return;

    try {
      const separator = DeviceUtils.isIOS ? '&' : '?';
      const url = `sms:${phone}${separator}body=${message}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(`tel:${phone}`);
      } else {
        alertMessage('Số điện thoại không đúng định dạng, hoặc nội dung không hợp lệ');
      }
    } catch (error) {
      logger.error(error);
    }
  },
};

export const delay = (time = 500) => new Promise<void>((resolve) => setTimeout(resolve, time));

export const getMessageErr = (error: unknown, path = 'message'): string | undefined => {
  let message = get(error, path) || General.MESSAGE_ERR;

  if (message === 'null') {
    message = General.MESSAGE_ERR;
  }
  if (message === 'Network Error') {
    message = 'Hệ thống đang gián đoạn. Vui lòng liên hệ với CSKH hoặc thử lại sau ít phút';
  }

  if (message === General.MESS_IGNORE) return;
  return message;
};

export const makeResponseList = <T = any>(data: T, total?: number, page?: number) => {
  return { data, total: total || 0, page: page || 1 };
};

const intlNF = new Intl.NumberFormat(); //default: English
const vndIntlNF = new Intl.NumberFormat('vi-VN'); //vi-VN: Vietnamese
export const numberFormat = (num?: number | string, type: 'vnd' | 'en' = 'en'): string => {
  if (!num) return '0';

  let number = 0;
  if (typeof num === 'number') {
    number = num;
  } else if (typeof num === 'string') {
    number = Number.parseFloat(num);
  } else {
    return '0';
  }

  if (Number.isNaN(number)) {
    return '0';
  }

  if (type === 'vnd') {
    return vndIntlNF.format(number);
  }
  return intlNF.format(number);
};

export const numberFixed = (num?: number, fractionDigits = 2) => {
  if (!num) return 0;
  if (typeof num !== 'number') return 0;

  return Number.parseFloat(num.toFixed(fractionDigits));
};

export const dateTimeFormat = (time: any, formatOut: string, formatIn?: string): string => {
  if (!time) return '';
  try {
    return moment(time, formatIn).format(formatOut);
  } catch {
    return '';
  }
};

export const capitalizeString = (str: string): string => {
  if (!str) return '';
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
};

export const normalizeString = (value: any): string => {
  if (!value) return '';
  if (typeof value !== 'string') return '';

  return value.replace(/\s\s/g, ' ');
};

export const normalizeStringTrim = (value: any): string => {
  if (!value) return '';
  if (typeof value !== 'string') return '';

  return value.trim();
};

export const removeAccents = (str: string | undefined): string => {
  if (!str || typeof str !== 'string') return '';

  const accentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ];

  for (let i = 0; i < accentsMap.length; i++) {
    const re = new RegExp('[' + accentsMap[i].substring(1) + ']', 'g');
    const char = accentsMap[i][0];
    str = str.replace(re, char);
  }

  return str;
};

/**
 *
 * @param path path of image
 * @param type 'resize' | 'photo' @default photo
 * @returns uri
 */
export const makeUriImage = (path: string, type: 'resize' | 'photo' = 'photo') => {
  if (type === 'photo') return 'file://' + path;
  if (type === 'resize') return DeviceUtils.isIOS ? path.replace('file://', '') : path;

  return path;
};

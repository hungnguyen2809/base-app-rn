import { Dimensions, PixelRatio, Platform, StyleSheet as RNStyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const pixelDensity = PixelRatio.get();
const { height: H, width: W } = Dimensions.get('screen');

const objectMap = (object: any, mapFn: Function) => {
  return Object.keys(object).reduce((result: any, key) => {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
};

const objectMap2 = (object: any, overload: any) => {
  return Object.keys(object).reduce((result: any, key) => {
    if (typeof object[key] === 'number') {
      if (key.includes('flex') || key.includes('opacity') || key.includes('elevation')) {
        result[key] = object[key];
      } else {
        result[key] = scale(object[key]);
      }
    } else {
      result[key] = object[key];
    }

    return { ...overload, ...result };
  }, {});
};

const metricsNumber = () => {
  const density = pixelDensity * 160;
  const x = Math.pow((W * pixelDensity) / density, 2);
  const y = Math.pow((H * pixelDensity) / density, 2);
  const screenInches = Math.sqrt(x + y) + 1.6;

  return screenInches;
};

export class DeviceUtils {
  public static width = W;
  public static height = H;
  public static isIOS = Platform.OS === 'ios';
  public static isAndroid = Platform.OS === 'android';
  public static isTablet = DeviceInfo.isTablet();
  public static hasNotch = DeviceInfo.hasNotch();
  public static appVersion = DeviceInfo.getVersion();
  public static deviceId = DeviceInfo.getDeviceId();
  public static uniqueId = DeviceInfo.getUniqueId();

  public static scale(size: number) {
    const ratio = (metricsNumber() + pixelDensity) / 10;
    const value = size * Number(ratio.toFixed(1));
    return Number(value.toFixed(1));
  }

  public static fontScale(size: number, lineHeight?: boolean) {
    if (lineHeight) {
      return scale(size) * 1.4;
    }
    return scale(size);
  }

  public static setHeight(h: number) {
    return (H / 100) * h;
  }

  public static setWidth(w: number) {
    return (W / 100) * w;
  }

  public static StyleSheet = {
    create: <T>(styleSheet: T | RNStyleSheet.NamedStyles<T>, overload: RNStyleSheet.NamedStyles<any> = {}) =>
      RNStyleSheet.create(
        objectMap(styleSheet, (value: any) => {
          return objectMap2(value, overload);
        }),
      ),
  };
}

export const scale = DeviceUtils.scale;
export const fontScale = DeviceUtils.fontScale;
export const setWidth = DeviceUtils.setWidth;
export const setHeight = DeviceUtils.setHeight;

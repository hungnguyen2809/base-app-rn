import { AlertDialog } from '@/components';
import { Platform } from 'react-native';
import {
  check,
  openSettings,
  Permission,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

const alertOpenSettings = (listName: string[]) => {
  AlertDialog.warning({
    title: 'Thông báo',
    message: `Ứng dụng cần quyền truy cập vào ${listName.join(', ')} trên thiết bị`,
    buttons: [{ text: 'Hủy bỏ' }, { text: 'Mở cài đặt', onPress: openSettings }],
  });
};

const requestPermissions = async (permission: Permission, listName: string[]) => {
  let granted = false;
  try {
    const permissionsStatus = await check(permission);
    if (permissionsStatus === RESULTS.GRANTED || permissionsStatus === RESULTS.LIMITED) {
      granted = true;
    }
    if (permissionsStatus === RESULTS.UNAVAILABLE) {
      AlertDialog.warning({
        title: 'Thông báo',
        message: 'Tính năng này không khả dụng trên thiết bị',
      });
    }
    if (permissionsStatus === RESULTS.BLOCKED) {
      alertOpenSettings(listName);
    }
    if (permissionsStatus === RESULTS.DENIED) {
      const allowPermissions = await request(permission);
      if (allowPermissions === RESULTS.GRANTED) {
        granted = true;
      }
      if (allowPermissions === RESULTS.BLOCKED) {
        alertOpenSettings(listName);
      }
    }
  } catch (error) {
    AlertDialog.warning({
      title: 'Thông báo',
      message: 'Lỗi khi yêu cầu quyền trên thiết bị: ' + JSON.stringify(error),
    });
  }
  return granted;
};

const requestMultiplePermissions = async (permissions: Permission[], listName: string[]) => {
  let granted = false;
  let countGranted = 0;
  try {
    const permissionsStatus = await requestMultiple(permissions);
    permissions.forEach((permission) => {
      if (permissionsStatus[permission] === 'granted' || permissionsStatus[permission] === 'limited') {
        countGranted++;
      }
    });

    if (countGranted === permissions.length) {
      granted = true;
    } else {
      alertOpenSettings(listName);
    }
  } catch (error) {
    AlertDialog.warning({
      title: 'Thông báo',
      message: 'Lỗi khi yêu cầu quyền trên thiết bị: ' + JSON.stringify(error),
    });
  }
  return granted;
};

// device permissions can set null if don't need permission
// examp: { ios: null, android: PERMISSIONS.ANDROID.SEND_SMS }
export const checkPermissionsCamera = async () => {
  const listName = ['máy ảnh'];

  const permissions = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });
  return await requestPermissions(permissions as Permission, listName);
};

export const checkPermissionsPhoto = async () => {
  const listName = ['thư viện ảnh'];

  const permission = Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  });

  return await requestPermissions(permission as Permission, listName);
};

export const checkPermissionsCameraPhoto = async () => {
  const listName = ['máy ảnh', 'thư viện ảnh'];

  const permissions = Platform.select({
    ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY],
    android: [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ],
  });

  return await requestMultiplePermissions(permissions as Permission[], listName);
};

export const checkPermissionsAudio = async () => {
  const listName = ['microphone'];
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  });

  return await requestPermissions(permission as Permission, listName);
};

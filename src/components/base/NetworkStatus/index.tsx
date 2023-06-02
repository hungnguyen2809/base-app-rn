import { fontScale, scale } from '@/utils';
import { Portal } from '@gorhom/portal';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { ButtonBase, TextBase } from '..';
import IcErrorConnect from './assets/ic_error_connect.svg';

const NetworkStatus: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(true);

  useEffect(() => {
    const onConnected = () => {
      setConnected(true);
    };

    const onDisconnected = () => {
      setConnected(false);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        onConnected();
      } else {
        onDisconnected();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Portal name="NetworkStatus">
      <Modal animationType="fade" transparent statusBarTranslucent visible={!connected}>
        <View style={styles.main}>
          <View style={styles.content}>
            <View style={styles.image}>
              <IcErrorConnect width={112} height={90} />
            </View>
            <TextBase style={styles.txtLostConnect}>Đã mất kết nối!</TextBase>
            <TextBase style={styles.txtCheck}>Vui lòng kiểm tra đường truyền Internet</TextBase>

            <ButtonBase
              title="Xác nhận"
              style={styles.buttonOk}
              titleStyle={styles.buttonText}
              onPress={() => setConnected(true)}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default NetworkStatus;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: '85%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: scale(15),
  },
  image: {
    marginTop: 25,
    marginBottom: 30,
  },
  txtLostConnect: {
    color: '#000',
    fontSize: fontScale(18),
    lineHeight: fontScale(18, true),
  },
  txtCheck: {
    color: '#707070',
    marginTop: scale(8),
    marginBottom: scale(16),
    fontSize: fontScale(15),
    lineHeight: fontScale(15, true),
  },
  buttonOk: {
    width: '50%',
  },
  buttonText: {
    fontSize: fontScale(16),
  },
});

import { useAppSelector } from '@/app/hooks';
import { Colors, General } from '@/constants';
import { selectKeyboardState } from '@/redux/common/selectors';
import { DeviceUtils, scale } from '@/utils';
import React, {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const defaultMaxHeight = DeviceUtils.height * 0.85;

interface BottomModalProps extends PropsWithChildren {
  visible?: boolean;
  onClose?: () => void;
  onDismiss?: () => void;
}

export interface BottomModalRef {
  onClose: () => void;
}

const BottomModal: React.ForwardRefRenderFunction<BottomModalRef, BottomModalProps> = (
  { visible, onClose, onDismiss, children },
  ref,
) => {
  const keyboardState = useAppSelector(selectKeyboardState);
  const panY = useRef(new Animated.Value(DeviceUtils.height)).current;

  const _closeAnim = useRef(
    Animated.timing(panY, {
      toValue: DeviceUtils.height,
      duration: 500,
      useNativeDriver: false,
    }),
  ).current;

  const _resetPositionAnim = useRef(
    Animated.timing(panY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }),
  ).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: Animated.event([null, { dy: panY }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gs) => {
      if (gs.dy > 0 && gs.vy > 1) {
        return _closeAnim.start(onClose);
      }
      return _resetPositionAnim.start();
    },
  });

  const handleDissmiss = useCallback(() => {
    _closeAnim.start(onClose);
  }, [_closeAnim, onClose]);

  useEffect(() => {
    if (visible) {
      _resetPositionAnim.start();
    }
  }, [_resetPositionAnim, visible]);

  const top = panY.interpolate({ inputRange: [-1, 0, 1], outputRange: [0, 0, 1] });

  useImperativeHandle(ref, () => ({ onClose: handleDissmiss }), [handleDissmiss]);

  const maxHeight = useMemo(() => {
    return keyboardState.open ? DeviceUtils.height - keyboardState.height - 50 : defaultMaxHeight;
  }, [keyboardState.open, keyboardState.height]);

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={handleDissmiss} onDismiss={onDismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={General.STYLES.FLEX_1}
          behavior={DeviceUtils.isIOS ? 'padding' : 'height'}
          keyboardVerticalOffset={DeviceUtils.isAndroid ? -500 : 0}>
          <TouchableWithoutFeedback onPress={handleDissmiss}>
            <View style={General.STYLES.FLEX_1} />
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.main, { maxHeight: maxHeight, top }]}>
            <View {...panResponder.panHandlers}>
              <View style={styles.line} />
            </View>
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default forwardRef(BottomModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(51, 51, 51, 0.3)',
  },
  main: {
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.6,
    borderBottomWidth: 0,
    borderColor: Colors.DEFAULT_GREY,

    shadowColor: '#000',
    shadowOffset: { width: 5, height: 12 },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 25,
  },
  line: {
    height: scale(4),
    borderRadius: 5,
    width: scale(50),
    alignSelf: 'center',
    marginTop: scale(7),
    marginBottom: scale(15),
    backgroundColor: '#576574',
  },
});

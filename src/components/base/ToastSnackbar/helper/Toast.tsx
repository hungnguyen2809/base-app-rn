import { Colors } from '@/constants';

import { DeviceUtils, fontScale, scale } from '@/utils';
import { isUndefined } from 'lodash';
import React, { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  ActivityIndicator,
  Animated,
  Image,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  findNodeHandle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextBase from '../../TextBase';
import useDidUpdate from './hooks/useDidUpdate';
import useToastAnimation from './hooks/useToastAnimation';
import useToastPresets from './hooks/useToastPresets';
import useToastTimer from './hooks/useToastTimer';
import PanView from './panView';
import { ToastPresets, ToastProps } from './types';

const THRESHOLD = { x: DeviceUtils.width / 4, y: 10 };

const AnimatedView = Animated.createAnimatedComponent(View);

const Toast = (props: PropsWithChildren<ToastProps>) => {
  const {
    visible,
    position = 'bottom',
    icon,
    iconColor,
    preset,
    zIndex,
    elevation,
    style,
    containerStyle,
    message,
    messageStyle,
    renderAttachment,
    centerMessage,
    showLoader,
    loaderElement,
    swipeable,
    backgroundColor,
    onDismiss,
    onAnimationEnd,
    children,
  } = props;

  const insets = useSafeAreaInsets();

  const directions = useRef([
    position === 'top' ? PanView.directions.UP : PanView.directions.DOWN,
    PanView.directions.LEFT,
    PanView.directions.RIGHT,
  ]);

  const viewRef = useRef<Text>(null);
  const [toastHeight, setToastHeight] = useState<number | undefined>();

  const { clearTimer, setTimer } = useToastTimer(props);
  const toastPreset = useToastPresets({ icon, iconColor, message, preset });

  const playAccessibilityFeatures = () => {
    if (visible) {
      if (viewRef.current) {
        const reactTag = findNodeHandle(viewRef.current);
        AccessibilityInfo.setAccessibilityFocus(reactTag!);
      } else if (message) {
        AccessibilityInfo.announceForAccessibility?.(toastPreset.accessibilityMessage);
      }
    }
  };

  const { isAnimating, toggleToast, opacityStyle, translateStyle } = useToastAnimation({
    visible,
    position,
    onAnimationEnd,
    toastHeight,
    setTimer,
    playAccessibilityFeatures,
  });

  useEffect(() => {
    if (visible) {
      toggleToast(visible, { delay: 100 });
    }
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDidUpdate(() => {
    if (!visible) {
      clearTimer();
    }

    toggleToast(visible);
  }, [visible]);

  const handleDismiss = useCallback(() => {
    clearTimer();
    onDismiss?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDismiss]);

  const positionStyle = useMemo(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      [position]: Math.max(12, position === 'top' ? insets.top : insets.bottom),
    } as Pick<ViewStyle, 'top' | 'left' | 'right' | 'bottom' | 'position'>;
  }, [insets.bottom, insets.top, position]);

  const toastStyle = useMemo(() => {
    return [opacityStyle, containerStyle];
  }, [opacityStyle, containerStyle]);

  const toastContainerStyle = useMemo(() => {
    return [positionStyle, translateStyle, { zIndex, elevation }];
  }, [positionStyle, translateStyle, zIndex, elevation]);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const height = event.nativeEvent.layout.height;
      if (height !== toastHeight) {
        setToastHeight(height);
      }
    },
    [toastHeight],
  );

  const renderRightElement = () => {
    if (showLoader) {
      return loaderElement ?? <ActivityIndicator size={'small'} style={styles.loader} />;
    }
  };

  const renderMessage = () => {
    const textAlign = centerMessage ? 'center' : 'left';
    return (
      <View accessible={DeviceUtils.isIOS} style={styles.messageContainer}>
        <TextBase
          ref={viewRef}
          style={[styles.message, { textAlign }, messageStyle]}
          accessibilityLabel={toastPreset.accessibilityMessage}>
          {message}
        </TextBase>
      </View>
    );
  };

  const renderIcon = () => {
    return (
      <Image
        resizeMode={'contain'}
        source={toastPreset.icon}
        style={[styles.icon, { tintColor: toastPreset.iconColor }]}
      />
    );
  };

  const renderToastContent = () => {
    if (!isUndefined(children)) {
      return children;
    }

    return (
      <PanView
        directions={swipeable ? directions.current : []}
        dismissible
        animateToOrigin
        directionLock
        onDismiss={handleDismiss}
        threshold={THRESHOLD}>
        <View style={[styles.toastContent, style, backgroundColor ? { backgroundColor } : undefined]}>
          {renderIcon()}
          {renderMessage()}
          {renderRightElement()}
        </View>
      </PanView>
    );
  };

  const renderAttachmentContent = () => {
    if (renderAttachment) {
      return <View pointerEvents={'box-none'}>{renderAttachment()}</View>;
    }
  };

  const _renderAttachment = (_positionStyle: object, _zIndex?: number) => {
    return (
      <View style={[_positionStyle, { zIndex: _zIndex }]} pointerEvents={'box-none'}>
        {renderAttachmentContent()}
      </View>
    );
  };

  const renderToast = () => {
    const isTop = position === 'top';

    return (
      <>
        {!isTop && !!toastHeight && renderAttachmentContent()}
        <AnimatedView onLayout={onLayout} style={toastStyle} pointerEvents={visible ? 'box-none' : 'none'}>
          {renderToastContent()}
        </AnimatedView>
        {isTop && !!toastHeight && renderAttachmentContent()}
      </>
    );
  };

  if (!visible && !isAnimating) {
    return renderAttachment ? _renderAttachment(positionStyle, zIndex) : null;
  }

  return (
    <AnimatedView key="toast" style={toastContainerStyle} pointerEvents={'box-none'}>
      {renderToast()}
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  toastContent: {
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    minHeight: scale(50),
    flexDirection: 'row',
    paddingLeft: scale(10),
    marginVertical: scale(10),
    marginHorizontal: scale(20),
    backgroundColor: Colors.DEFAULT_WHITE,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  messageContainer: {
    flex: DeviceUtils.isTablet ? undefined : 1,
    paddingVertical: scale(12),
    justifyContent: 'center',
  },
  message: {
    fontSize: fontScale(15),
    lineHeight: fontScale(15, true),
    marginHorizontal: scale(10),
  },
  icon: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(4),
  },
  loader: {
    marginRight: scale(12),
  },
});

Toast.presets = ToastPresets;
Toast.displayName = 'Toast';

export { ToastPresets };
export type { ToastProps };

export default Toast;

import { isEmpty } from 'lodash';
import React from 'react';
import { StyleProp, View, ViewStyle, ViewProps } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import useHiddenLocation from './useHiddenLocation';
import { PanningDirections, PanningDirectionsEnum } from './panningUtil';
import usePanGesture, {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_DIRECTIONS,
  PanGestureProps,
  PanViewDirections,
  PanViewDirectionsEnum,
  PanViewDismissThreshold,
} from './usePanGesture';

export { PanningDirectionsEnum, PanViewDirectionsEnum, DEFAULT_DIRECTIONS, DEFAULT_ANIMATION_CONFIG };
export type { PanningDirections, PanViewDirections, PanViewDismissThreshold };

export interface PanViewProps extends Omit<PanGestureProps, 'hiddenLocation'>, ViewProps {
  containerStyle?: StyleProp<ViewStyle>;
}

interface Props extends PanViewProps {
  children?: React.ReactNode | React.ReactNode[];
}

const AnimatedView = Animated.createAnimatedComponent(View);

const PanView = (props: Props) => {
  const {
    directions = DEFAULT_DIRECTIONS,
    dismissible,
    animateToOrigin,
    onDismiss,
    directionLock,
    threshold,
    containerStyle,
    children,
    ...others
  } = props;

  const { setRef, onLayout, hiddenLocation } = useHiddenLocation<View>();
  const { translation, panGestureEvent } = usePanGesture({
    directions,
    dismissible,
    animateToOrigin,
    onDismiss,
    directionLock,
    threshold,
    hiddenLocation,
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translation.x.value }, { translateY: translation.y.value }],
    };
  }, []);

  return (
    <View ref={setRef} style={containerStyle} onLayout={onLayout}>
      <PanGestureHandler onGestureEvent={isEmpty(directions) ? undefined : panGestureEvent}>
        <AnimatedView style={animatedStyle}>
          <View {...others}>{children}</View>
        </AnimatedView>
      </PanGestureHandler>
    </View>
  );
};

PanView.displayName = 'PanView';
PanView.directions = PanViewDirectionsEnum;

export default PanView;

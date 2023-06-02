import { isEqual } from 'lodash';
import { RefCallback, useCallback, useRef, useState } from 'react';
import { Dimensions, LayoutChangeEvent, LayoutRectangle, View } from 'react-native';
import { PanningDirectionsEnum } from '.';

const { height: H, width: W } = Dimensions.get('screen');

type HiddenLocationRecord = Record<PanningDirectionsEnum, number>;

export interface HiddenLocation extends HiddenLocationRecord {
  wasMeasured: boolean;
}

export default function useHiddenLocation<T extends View>() {
  const getHiddenLocation = ({ x = 0, y = 0, width = W, height = H, wasMeasured = false }): HiddenLocation => {
    return {
      up: -y - height,
      down: H - y,
      left: -width - x,
      right: W - x,
      wasMeasured,
    };
  };

  const [hiddenLocation, setHiddenLocation] = useState<HiddenLocation>(getHiddenLocation({}));
  const ref = useRef<T>();
  const layoutData = useRef<LayoutRectangle>();
  const wasMeasured = useRef(false);

  const measure = useCallback(() => {
    if (ref.current && layoutData.current && layoutData.current.width > 0 && layoutData.current.height > 0) {
      wasMeasured.current = true;
      const { x, y, width, height } = layoutData.current;
      setHiddenLocation(
        getHiddenLocation({
          x,
          y,
          width,
          height,
          wasMeasured: true,
        }),
      );
    }
  }, []);

  const setRef: RefCallback<T> = useCallback(
    (node: T) => {
      if (node) {
        ref.current = node;
        measure();
      }
    },
    [measure],
  );

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!isEqual(layoutData.current, event.nativeEvent.layout)) {
        layoutData.current = event.nativeEvent.layout;
        measure();
      }
    },
    [measure],
  );

  return { setRef, onLayout, hiddenLocation };
}

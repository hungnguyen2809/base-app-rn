import { useMemo, useRef } from 'react';
import { Dimensions } from 'react-native';
import { DataProvider, LayoutProvider } from 'recyclerlistview';

const { width } = Dimensions.get('screen');

/**
 * @param data
 * @returns DataProvider
 */
export function useDataProvider<T = any>(data: T[]) {
  const _dataProvider = useRef(new DataProvider((r1, r2) => r1 !== r2));
  const dataProvider = useMemo(() => _dataProvider.current.cloneWithRows(data), [data]);

  return dataProvider;
}

/**
 * @param estimatedItemSize estimated height of item
 * @returns LayoutProvider
 */
export function useLayoutProvider(estimatedItemSize: number) {
  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        () => 'ViewTypes',
        (type, dim) => {
          switch (type) {
            case 'ViewTypes':
              dim.width = width;
              dim.height = estimatedItemSize;
              break;
            default:
              dim.height = 0;
              dim.width = 0;
              break;
          }
        },
      ),
    [estimatedItemSize],
  );

  return layoutProvider;
}

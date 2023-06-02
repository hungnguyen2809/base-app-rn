import { scale } from '@/utils';
import React, { memo, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View, ViewStyle } from 'react-native';
import Separator from '../../Separator';
import TabItemDefault from '../TabItemDefault';
import TabItemRounded from '../TabItemRounded';
import { NavRoute, TabType } from '../common';

type TopTabBarProps = {
  routes: NavRoute[];
  indexActive: number;
  onIndexChange?: (index: number) => void;
  type?: TabType;
  tabBarStyle?: ViewStyle;
  tabPaneStyle?: ViewStyle;
};

const TopTabBar: React.FC<TopTabBarProps> = ({
  routes,
  indexActive,
  onIndexChange,
  type,
  tabBarStyle,
  tabPaneStyle,
}) => {
  const flatListRef = useRef<FlatList<NavRoute>>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: indexActive, viewOffset: scale(20) });
  }, [indexActive]);

  const renderItem = ({ item }: { item: NavRoute }) => {
    if (type === 'rounded') {
      return (
        <TabItemRounded route={item} style={tabPaneStyle} onPress={onIndexChange} active={indexActive === item.index} />
      );
    }

    return (
      <TabItemDefault route={item} style={tabPaneStyle} onPress={onIndexChange} active={indexActive === item.index} />
    );
  };

  return (
    <View style={[styles.container, tabBarStyle]}>
      <FlatList
        horizontal
        data={routes}
        ref={flatListRef}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator width={scale(15)} />}
        ListHeaderComponent={() => <Separator width={scale(20)} />}
        ListFooterComponent={() => <Separator width={scale(20)} />}
      />
    </View>
  );
};

export default memo(TopTabBar);

const styles = StyleSheet.create({
  container: { width: '100%' },
});

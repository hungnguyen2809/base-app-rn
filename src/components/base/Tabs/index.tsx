import { General } from '@/constants';
import { logger } from '@/utils';
import React, { PureComponent } from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import { TabView } from 'react-native-tab-view';
import TopTabBar from './TopTabBar';
import { NavRoute, SceneMapProps, SceneMapType, TabPane, TabType, makeRoutes, makeSceneMap } from './common';

export type TabViewState = { index: number; routes: NavRoute[]; sceneMap: SceneMapType };
export type TabViewProps = {
  tabs: TabPane[];
  type?: TabType;
  swipeEnabled?: boolean;
  showTabBar?: boolean;
  tabBarStyle?: ViewStyle;
  tabPaneStyle?: ViewStyle;
  onIndexChange?: (index: number) => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
};

class Tabs extends PureComponent<TabViewProps, TabViewState> {
  constructor(props: TabViewProps) {
    super(props);

    this.state = {
      index: 0,
      routes: makeRoutes(props.tabs),
      sceneMap: makeSceneMap(props.tabs),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<TabViewProps>): void {
    if (this.props.tabs !== nextProps.tabs) {
      this.setState({
        routes: makeRoutes(nextProps.tabs),
        sceneMap: makeSceneMap(nextProps.tabs),
      });
    }
  }

  private _handleIndexChange = (index: number) => {
    this.setState({ index });
    this.props.onIndexChange?.(index);
  };

  private _renderScene = ({ route }: SceneMapProps) => {
    const Component = this.state.sceneMap[route.key];
    if (Component) return Component;
    return null;
  };

  onChangeTab = (index: number) => {
    if (index < 0 || index > this.state.routes.length - 1) {
      logger.error('index out of range for tabs');
      return;
    }
    this._handleIndexChange(index);
  };

  render() {
    const { index, routes } = this.state;
    const { type = 'default', showTabBar = true, swipeEnabled = false, tabBarStyle, tabPaneStyle } = this.props;

    return (
      <React.Fragment>
        {showTabBar ? (
          <TopTabBar
            type={type}
            routes={routes}
            indexActive={index}
            tabBarStyle={tabBarStyle}
            tabPaneStyle={tabPaneStyle}
            onIndexChange={this._handleIndexChange}
          />
        ) : null}
        <TabView
          style={General.STYLES.FLEX_1}
          swipeEnabled={swipeEnabled}
          navigationState={{ index, routes }}
          renderTabBar={() => null}
          renderScene={this._renderScene}
          onIndexChange={this._handleIndexChange}
          initialLayout={{ width: Dimensions.get('window').width }}
          onSwipeStart={this.props.onSwipeStart}
          onSwipeEnd={this.props.onSwipeEnd}
        />
      </React.Fragment>
    );
  }
}

export default Tabs;

export { TopTabBar };
export type { TabPane, SceneMapProps };

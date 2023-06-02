import { SceneRendererProps } from 'react-native-tab-view';

export type SceneMapType = { [key: string]: React.ReactNode | undefined };
export type SceneMapProps = SceneRendererProps & { route: { key: string; title: string } };
export type NavRoute = { index: number } & Omit<TabPane, 'children'>;
export type TabPane = { key: string; title: string; children?: React.ReactNode; badge?: number };
export type TabType = 'default' | 'rounded';

export const makeSceneMap = (tabs: TabPane[]) => {
  return tabs.reduce((obj: SceneMapType, tab) => {
    obj[tab.key] = tab.children;
    return obj;
  }, {});
};

export const makeRoutes = (tabs: TabPane[]): NavRoute[] => {
  return tabs.map((tab, idx) => {
    const t = { index: idx, ...tab };
    delete t.children;
    return t;
  });
};

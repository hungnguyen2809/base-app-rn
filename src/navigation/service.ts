import {
  CommonActions,
  DrawerActions,
  NavigationContainerRef,
  NavigationState,
  PartialState,
  Route,
} from '@react-navigation/native';

type ResetState =
  | PartialState<NavigationState>
  | NavigationState
  | (Omit<NavigationState, 'routes'> & { routes: Omit<Route<string>, 'key'>[] });

interface IConfig {
  navigator?: NavigationContainerRef<any>;
}

const config: IConfig = {};

export function setNavigator(navRef: NavigationContainerRef<any>): void {
  config.navigator = navRef;
}

function navigate(name: string, params?: object, merge?: boolean): void {
  if (config.navigator && name) {
    const action = CommonActions.navigate({ name, params, merge });
    config.navigator.dispatch(action);
  }
}

function goBack(): void {
  if (config.navigator) {
    const action = CommonActions.goBack();
    config.navigator.dispatch(action);
  }
}

function reset(state: string | ResetState): void {
  if (typeof state === 'string') {
    state = { routes: [{ name: state }] };
  }
  if (config.navigator) {
    const action = CommonActions.reset(state);
    config.navigator.dispatch(action);
  }
}

function toggleDrawer(): void {
  config.navigator?.dispatch(DrawerActions.toggleDrawer());
}

function canGoBack(): boolean {
  return config.navigator?.canGoBack() || false;
}

function getCurrentRouteName(): string {
  return config.navigator?.getCurrentRoute()?.name || '';
}

export const navigationService = {
  reset,
  goBack,
  navigate,
  canGoBack,
  toggleDrawer,
  getCurrentRouteName,
};

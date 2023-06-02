import { persistor, store } from '@/app/store';
import { AlertDialog, ErrorBoundary, LoadingPortal, NetworkStatus, ToastSnackbar } from '@/components';
import { General } from '@/constants';
import AppNavigation from '@/navigation';
import { PortalProvider } from '@gorhom/portal';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import { LogBox } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

moment.locale('vi');
LogBox.ignoreLogs(General.LOG_IGNORE);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <StoreProvider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <PortalProvider>
              <AppNavigation />
              <ToastSnackbar />
              <LoadingPortal />
              <AlertDialog />
              <NetworkStatus />
            </PortalProvider>
          </SafeAreaProvider>
        </PersistGate>
      </StoreProvider>
    </ErrorBoundary>
  );
};

const AppRoot = gestureHandlerRootHOC(App);
export default AppRoot;

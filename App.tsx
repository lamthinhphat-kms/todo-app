/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import axios from 'axios';
import {AuthProvider} from 'context/AuthContext';
import {AuthStack} from 'navigation/AuthNavigation';
import {RootStack} from 'navigation/RootNavigation';
import BottomNavTabs from 'navigation/bottomNavigation';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from 'redux/store';
import {setupAxios} from 'utils/AuthUtils';

const queryClient = new QueryClient();
setupAxios(axios);

function App(): JSX.Element {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <AuthProvider>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <SafeAreaView style={{flex: 1}}>
                <RootStack />
              </SafeAreaView>
            </Provider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});

export default App;

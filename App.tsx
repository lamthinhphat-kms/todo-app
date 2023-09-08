/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import axios from 'axios';
import {AuthProvider} from 'context/AuthContext';
import {AuthStack} from 'navigation/AuthNavigation';
import {RootStack} from 'navigation/RootNavigation';
import BottomNavTabs from 'navigation/bottomNavigation';
import {LogBox, Platform, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from 'redux/store';
import {setupAxios} from 'utils/AuthUtils';
import {GOOGLE_CLIENT_ID} from '@env';
import {useEffect} from 'react';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';

const queryClient = new QueryClient();
setupAxios(axios);

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
  offlineAccess: true,
});

function App(): JSX.Element {
  LogBox.ignoreLogs(['new NativeEventEmitter()']);
  useEffect(() => {
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {
        if (result !== RESULTS.GRANTED) {
          request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        }
      });
    }
  }, []);

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

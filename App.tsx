/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import BottomNavTabs from 'navigation/bottomNavigation';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from 'redux/store';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <BottomNavTabs />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});

export default App;

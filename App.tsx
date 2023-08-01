/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from './src/views/ToDoListStore/ToDoListStore';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import ToDoListStore from './src/views/ToDoListStore/ToDoListStore';
import BottomNavTabs from './src/navigation/bottomNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

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

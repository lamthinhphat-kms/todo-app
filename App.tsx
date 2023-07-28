/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from './src/views/Home';
import {Provider} from 'react-redux';
import store from './src/redux/store';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <Home />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;

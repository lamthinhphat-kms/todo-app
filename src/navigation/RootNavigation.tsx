import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from 'context/AuthContext';
import {useContext} from 'react';
import {AuthStack} from './AuthNavigation';
import BottomNavTabs from './bottomNavigation';
import {ActivityIndicator, View} from 'react-native';

export function RootStack() {
  const {userToken, isLoading} = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== undefined ? <BottomNavTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

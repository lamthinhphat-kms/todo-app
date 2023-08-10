import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from 'views/Login/LoginScreen';
import BottomNavTabs from './bottomNavigation';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

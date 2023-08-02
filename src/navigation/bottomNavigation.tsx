import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ToDoListStore from '../views/ToDoListStore/ToDoListStore';
import ToDoListApi from '../views/ToDoListApi/ToDoListApi';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ToDoListZustand from '../views/ToDoListZustand/ToDoListZustand';

const Tab = createBottomTabNavigator();

function BottomNavTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Store"
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Store"
        component={ToDoListStore}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="warehouse" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="API"
        component={ToDoListApi}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="network-wired" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Zustand"
        component={ToDoListZustand}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="hippo" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavTabs;

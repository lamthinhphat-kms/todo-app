import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ToDoListStore from 'views/ToDoListStore/ToDoListStore';
import ToDoListApi from 'views/ToDoListApi/ToDoListApi';
import ToDoListZustand from 'views/ToDoListZustand/ToDoListZustand';
import AccountScreen from 'views/Account/AccountScreen';
import DraggableToDoList from 'views/DraggableToDoList/DraggableToDoList';
import {useContext} from 'react';
import {ThemeContext} from 'context/ThemeContext';

const Tab = createBottomTabNavigator();

function BottomNavTabs() {
  const {isDarkMode} = useContext(ThemeContext);
  return (
    <Tab.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: isDarkMode ? 'gray' : undefined,
        tabBarInactiveTintColor: isDarkMode ? 'darkgray' : undefined,
        tabBarStyle: {
          backgroundColor: isDarkMode ? 'gainsboro' : 'white',
        },
      }}>
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
      <Tab.Screen
        name="Dragable"
        component={DraggableToDoList}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="list-ol" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="user-alt" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavTabs;

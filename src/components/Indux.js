import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Todo1 from './Todo1'
import Resetpassword from './Resetpassword'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Todo1" component={Todo1}/>
    </Tab.Navigator>
  );
};

const RootDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MyTabs} />
    </Drawer.Navigator>
  );
};

const Indux = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reset"
          component={Resetpassword}
          options={{headerShown:false}}
        />
        <Stack.Screen name="Home" component={RootDrawer} options={{headerShown:false}} />
        <Stack.Screen name="Todo1" component={RootDrawer}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Indux;

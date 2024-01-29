import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Main/Home';
import Detailweather from '../Screens/Main/Detailweather';
import AddCity from '../Screens/Main/Addcity';


const Stack = createStackNavigator();
const HomeStack = () => {
  return (
  <NavigationContainer>
      <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        animationEnabled: true,
        unmountOnBlur: true,
      })}>
      <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="Detailweather" component={Detailweather} />
       <Stack.Screen name="AddCity" component={AddCity} />

    </Stack.Navigator>
  </NavigationContainer>
  );
};
export default HomeStack;

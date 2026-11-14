import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import HelpScreen from './src/screens/HelpScreen';
import EditProductScreen from './src/screens/EditProductScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import SalesScreen from './src/screens/SalesScreen';
import ProfileModalScreen from './src/screens/ProfileModalScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="Sales" component={SalesScreen} />
        <Stack.Screen
          name="ProfileModal"
          component={ProfileModalScreen}
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

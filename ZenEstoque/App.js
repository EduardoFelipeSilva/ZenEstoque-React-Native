import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SessionManager } from './src/services/session';
import { USERS_KEY } from './src/storage/storageKeys';

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
import DashboardScreen from './src/screens/DashboardScreen';
import ProblemScreen from './src/screens/ProblemScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Welcome');
  const [initialUserName, setInitialUserName] = useState('usuário');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const loggedEmail = await SessionManager.getLoggedUser();
        if (loggedEmail) {
          const usersJson = await AsyncStorage.getItem(USERS_KEY);
          const users = usersJson ? JSON.parse(usersJson) : [];
          const foundUser = users.find(
            (u) => u.email && u.email.toLowerCase() === loggedEmail.toLowerCase()
          );

          setInitialUserName((foundUser && foundUser.nome) || 'Administrador');
          setInitialRoute('Home');
        }
      } catch (error) {
        console.log('Erro ao restaurar sessão:', error);
      } finally {
        setIsReady(true);
      }
    };

    checkSession();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#A855F7" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ userName: initialUserName }}
        />
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
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Problem" component={ProblemScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

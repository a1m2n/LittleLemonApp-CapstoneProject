import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import SplashScreen from './screens/SplashScreen';  
import Home from './screens/Home'

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  const loadOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('@onboarding_completed');

      if (value !== null) {
        setIsOnboardingCompleted(value === 'true' ? true : false);
      }
    } catch (error) {
      console.error("Error reading AsyncStorage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOnboardingStatus();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer 
      initialRouteName={isOnboardingCompleted ? "Home" : "Onboarding"}>
      <Stack.Navigator>
       <Stack.Screen 
          name="Onboarding" 
          component={Onboarding} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{ headerShown: false }}
        /> 
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

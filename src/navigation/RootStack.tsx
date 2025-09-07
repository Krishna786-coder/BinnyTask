import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from '../types/navigationTypes';
import SplashScreen from '../screens/landingScreen/SplashScreen';
import LargeListScreen from '../screens/optimizedList/LargeListScreen';
import OfflineScreen from '../screens/offlineSupport/OfflineScreen';
import SecureToken from '../screens/secureTokenStorage/SecureToken';
import ProductListScreen from '../screens/globalState/ProductScreen';
import CartScreen from '../screens/globalState/CartScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true}} initialRouteName="SplashScreen">
    
        <Stack.Screen name="SplashScreen" component={SplashScreen}  options={{headerShown:false}}/>


        <Stack.Screen name="LargeListScreen" component={LargeListScreen} />
        <Stack.Screen name="OfflineScreen" component={OfflineScreen} />
        <Stack.Screen name="SecureToken" component={SecureToken} />
        <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

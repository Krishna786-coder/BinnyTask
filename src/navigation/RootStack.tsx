import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from '../types/navigationTypes';
import LargeListScreen from '../screens/optimizedList/LargeListScreen';
import OfflineScreen from '../screens/offlineSupport/OfflineScreen';
import SecureToken from '../screens/secureTokenStorage/SecureToken';
import ProductListScreen from '../screens/globalState/ProductScreen';
import CartScreen from '../screens/globalState/CartScreen';





const Stack = createNativeStackNavigator<RootStackParamList>();


const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
       options={{

       }}
        component={LargeListScreen} 
        name={"LargeListScreen"}/>
          <Stack.Screen 
    
        component={OfflineScreen} 
        name={"OfflineScreen"}/>
           <Stack.Screen 
    
    component={SecureToken} 
    name={"SecureToken"}/>
           <Stack.Screen 
     component={ProductListScreen} 
    name={"ProductListScreen"}/>
          <Stack.Screen 
     component={CartScreen} 
    name={"CartScreen"}
    />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default RootStack;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from './TabRoutes';
import ProductDetails from '../screens/ProductDetails';
import CategoryProducts from '../screens/CategoryProducts';
import SearchResults from '../screens/SearchResults';
import ConfirmOrder from '../screens/ConfirmOrder';
import Checkout from '../screens/Checkout';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabRoutes} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
}
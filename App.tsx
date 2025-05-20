import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { CartProvider } from './src/context/CartContext';
import { SearchProvider } from './src/context/SearchContext';

export default function App() {
  return (
    <CartProvider>
      <SearchProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      </SearchProvider>
    </CartProvider>
  );
}
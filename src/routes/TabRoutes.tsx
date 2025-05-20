// routes/TabRoutes.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';

import Header from '../components/Header';
import Home from '../pages/Home';
import Cart from '../screens/Cart';
import SearchResults from '../screens/SearchResults';

const Tab = createBottomTabNavigator();

function WithHeader(Component: React.ComponentType) {
  return () => (
    <View style={{ flex: 1 }}>
      <Header />
      <Component />
    </View>
  );
}

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#681211',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          height: 60,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = '';
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Menu':
              iconName = focused ? 'menu' : 'menu-outline';
              break;
            default:
              iconName = 'alert-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* AGORA Home também usa o Header via WithHeader */}
      <Tab.Screen name="Home" component={WithHeader(Home)} />
      <Tab.Screen name="Profile" component={WithHeader(() => <View><Text>Perfil</Text></View>)} />
      <Tab.Screen name="Favorites" component={WithHeader(() => <View><Text>Favoritos</Text></View>)} />
      <Tab.Screen name="Cart" component={WithHeader(Cart)} />
      <Tab.Screen name="Menu" component={WithHeader(() => <View><Text>Menu</Text></View>)} />
      <Tab.Screen name="SearchResults"component={WithHeader(SearchResults)}
  options={{
    tabBarButton: () => null, // Oculta da barra inferior
  }}
/>
    </Tab.Navigator>
  );
}
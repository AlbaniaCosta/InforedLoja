import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext'; // NOVO

export default function Header() {
  const navigation = useNavigation<any>();
  const { cartItems } = useCart();
  const { searchTerm, setSearchTerm } = useSearch(); // NOVO

  const totalItems =
    Array.isArray(cartItems)
      ? cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
      : 0;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Pesquisar na Infored"
          placeholderTextColor="#ccc"
          style={styles.searchInput}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={() => navigation.navigate('SearchResults')}>
          <Ionicons name="search-outline" size={20} color="#681211" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: '#681211',
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
    height: 38,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    color: '#000',
  },
  searchIcon: {
    marginLeft: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
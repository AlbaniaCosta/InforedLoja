import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSearch } from '../context/SearchContext';
import { products } from '../utils/products';
import ProductCard from '../components/ProductCard';

export default function SearchResults() {
  const { searchTerm } = useSearch();
  const navigation = useNavigation<any>();

  const results = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const message =
  results.length > 0
    ? `${results.length} produto${results.length > 1 ? 's' : ''} encontrado${results.length > 1 ? 's' : ''} para "${searchTerm}"`
    : `Nenhum produto encontrado para "${searchTerm}"`;

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>{message}</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  list: {
    padding: 15,
  },
});
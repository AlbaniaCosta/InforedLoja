import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { products } from '../utils/products';
import ProductCard from '../components/ProductCard';
import { useSearch } from '../context/SearchContext'; // <-- novo

type Params = {
  category: string;
};

export default function CategoryProducts() {
  const route = useRoute<RouteProp<Record<string, Params>, string>>();
  const navigation = useNavigation<any>();
  const { category } = route.params;
  const { searchTerm } = useSearch(); // <-- novo

  const filteredProducts = products.filter(
    (product) =>
      product.category === category &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) // <-- novo filtro
  );

  return (
    <View style={styles.container}>
      {/* Topo com botão de voltar e título da categoria */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
      </View>

      <FlatList
  data={filteredProducts}
  keyExtractor={(_, index) => index.toString()}
  renderItem={({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    />
  )}
  ListEmptyComponent={
    <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
  }
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
  header: {
    backgroundColor: '#681211',
    paddingHorizontal: 15,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  list: {
    padding: 15,
  },
  emptyText: {
  textAlign: 'center',
  fontSize: 16,
  marginTop: 40,
  color: '#888',
},
});
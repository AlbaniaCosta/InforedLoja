import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigation = useNavigation();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleDecrease = (item: any) => {
    if (item.quantity && item.quantity > 1) {
      removeFromCart(item, false);
    } else {
      removeFromCart(item, true);
      Alert.alert('Removido', 'Produto removido do carrinho');
    }
  };

  const handleIncrease = (item: any) => {
    addToCart(item);
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#681211" />
      </TouchableOpacity>

      <Text style={styles.title}>Meu Carrinho</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>
                {item.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Text>

              {/* Contador de quantidade */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleDecrease(item)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantityNumber}>
                  {item.quantity || 1}
                </Text>

                <TouchableOpacity onPress={() => handleIncrease(item)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  removeFromCart(item, true);
                  Alert.alert('Removido', 'Produto removido do carrinho');
                }}
              >
                <Text style={styles.removeText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>
        Total:{' '}
        {total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Text>

      {cartItems.length > 0 && (
  <TouchableOpacity
    style={styles.checkoutButton}
    onPress={() => navigation.navigate('Checkout')}
  >
    <Text style={styles.checkoutButtonText}>Finalizar pedido</Text>
  </TouchableOpacity>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    marginVertical: 5,
    color: '#681211',
  },
  quantityContainer: {flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  quantityButton: {
    backgroundColor: '#681211',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityNumber: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeText: {
    color: '#c00',
    fontWeight: 'bold',
    marginTop: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
  checkoutButton: {
  backgroundColor: '#681211',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 20,
  marginBottom: 30,
},
checkoutButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
});
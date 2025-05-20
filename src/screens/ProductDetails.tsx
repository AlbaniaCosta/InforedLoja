import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Product = {
  title: string;
  description: string;
  image: any;
  price: number;
  installment: {
    quantity: number;
    value: number;
  };
};

type Params = {
  product: Product;
};

export default function ProductDetails() {
  const route = useRoute<RouteProp<Record<string, Params>, string>>();
  const { product } = route.params;
  const { addToCart } = useCart();
  const navigation = useNavigation();

  const handleBuyNow = () => {
    Alert.alert('Comprar Agora', 'Simulação: redirecionando para pagamento...');
  };

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Adicionado', 'Produto adicionado ao carrinho');
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar no topo */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={product.image} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.price}>
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>

        <Text style={styles.installment}>
          ou {product.installment.quantity}x de{' '}
          {product.installment.value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowButtonText}>Comprar Agora</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#681211',
    borderRadius: 20,
    padding: 5,
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#681211',
  },
  installment: {
    fontSize: 15,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#681211',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
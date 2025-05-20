import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useCart } from '../context/CartContext';

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

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  const { addToCart } = useCart();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={product.image} style={styles.image} />

      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>

      <Text style={styles.price}>
        {product.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={(e) => {
          e.stopPropagation(); // evita que clique no botão também acione o card
          addToCart(product);
        }}
      >
        <Text style={styles.buttonText}>Adicionar ao carrinho</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    width: '100%',
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
    minHeight: 40,
  },
  price: {
    fontSize: 16,
    color: '#681211',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#681211',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
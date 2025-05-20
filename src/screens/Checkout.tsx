import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems } = useCart();
  const navigation = useNavigation<any>();

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto' | 'debito'>('pix');
  const [installments, setInstallments] = useState(1);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const paymentOptions = [
    { key: 'pix', label: 'Pix' },
    { key: 'card', label: 'Cartão de Crédito' },
    { key: 'boleto', label: 'Boleto' },
    { key: 'debito', label: 'Débito' },
  ];

  const handleNext = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione produtos antes de finalizar o pedido.');
      return;
    }

    navigation.navigate('ConfirmOrder', {
      paymentMethod,
      installments,
      total,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.title} x{item.quantity || 1} – R${(item.price * (item.quantity || 1)).toFixed(2)}
          </Text>
        )}
        ListFooterComponent={
          <Text style={styles.total}>Total: R${total.toFixed(2)}</Text>
        }
      />

      <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
      {paymentOptions.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={[
            styles.option,
            paymentMethod === option.key && styles.optionSelected,
          ]}
          onPress={() => setPaymentMethod(option.key as any)}
        >
          <Text
            style={[
              styles.optionText,
              paymentMethod === option.key && styles.optionTextSelected,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}

      {paymentMethod === 'card' && (
        <View style={styles.installments}>
          <Text style={styles.installmentsText}>Parcelar em:</Text>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <TouchableOpacity
              key={n}
              style={[
                styles.installmentOption,
                installments === n && styles.installmentSelected,
              ]}
              onPress={() => setInstallments(n)}
            >
              <Text
                style={[
                  styles.installmentText,
                  installments === n && styles.installmentTextSelected,
                ]}
              >
                {n}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Envio</Text>
      <Text style={styles.deliveryNote}>
        Somente para Fortaleza e região. Entregas via parceiro logístico por conta do cliente ou retirada no local.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Prosseguir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 15,
    marginVertical: 3,
  },
  total: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 8,
  },
  optionSelected: {
    borderColor: '#681211',
    backgroundColor: '#fbe9e9',
  },
  optionText: {
    color: '#333',
  },
  optionTextSelected: {
    color: '#681211',
    fontWeight: 'bold',
  },
  installments: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  installmentsText: {
    marginRight: 10,
    fontSize: 14,
  },
  installmentOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginRight: 6,
    marginTop: 6,
  },
  installmentSelected: {
    backgroundColor: '#681211',
  },
  installmentText: {
    fontSize: 14,
    color: '#333',
  },
  installmentTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deliveryNote: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#681211',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
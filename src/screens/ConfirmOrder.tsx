import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

type Params = {
  paymentMethod: string;
  installments: number;
  total: number;
};

export default function ConfirmOrder() {
  const { cartItems } = useCart();
  const route = useRoute<RouteProp<Record<string, Params>, string>>();
  const { paymentMethod, installments, total } = route.params;

  const [phone, setPhone] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');

  const formatMessage = () => {
    let payment = '';
    switch (paymentMethod) {
      case 'pix':
        payment = 'Pix';
        break;
      case 'card':
        payment = `Cartão de Crédito (${installments}x)`;
        break;
      case 'boleto':
        payment = 'Boleto';
        break;
      case 'debito':
        payment = 'Débito';
        break;
    }

    const productLines = cartItems.map(
      (item) =>
        `- ${item.title} x${item.quantity || 1} – R$${(
          item.price * (item.quantity || 1)
        ).toFixed(2)}`
    );

    return (
      `*Pedido InforedApp*\n\n` +
      `*Produtos:*\n${productLines.join('\n')}\n\n` +
      `*Total:* R$${total.toFixed(2)}\n` +
      `*Pagamento:* ${payment}\n\n` +
      `*Cliente:*\n` +
      `Telefone: ${phone}\n` +
      `Nome: ${name}\n` +
      `E-mail: ${email}\n` +
      `Endereço: ${address}\n` +
      `CEP: ${cep}`
    );
  };

  const handleSendWhatsApp = () => {
    const message = formatMessage();
    const phoneNumber = '5585996691553'; // Substituir pelo número do vendedor com DDD, ex: 5585988888888
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url);
  };

  const handleSearch = () => {
    // Simulação: se número já foi usado antes nesta sessão, "retorna" dados
    if (phone === '999999999') {
      setName('João Cliente');
      setEmail('joao@email.com');
      setAddress('Rua Exemplo, 123');
      setCep('60000-000');
      setIsRegistered(true);
    } else {
      setName('');
      setEmail('');
      setAddress('');
      setCep('');
      setIsRegistered(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Seus dados</Text>

      <TextInput
        style={styles.input}
        placeholder="Telefone com DDD"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Text style={styles.searchBtnText}>Verificar</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
        editable={!isRegistered}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        editable={!isRegistered}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
        editable={!isRegistered}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
        editable={!isRegistered}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSendWhatsApp}>
        <Text style={styles.buttonText}>Finalizar pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  searchBtn: {
    backgroundColor: '#ccc',
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 10,
  },
  searchBtnText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#681211',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Banner() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/banner.jpg')} // <- puxando imagem local
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});
// pages/Home.tsx
import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import BannerCarousel from '../components/BannerCarousel';
import CategoriaCard from '../components/CategoriaCard';

export default function Home() {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriasContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Categorias */}
          <CategoriaCard title="Áudio e Vídeo" />
          <CategoriaCard title="Bolsas e Mochilas" />
          <CategoriaCard title="Brinquedos" />
          <CategoriaCard title="Camping e Aventura" />
          <CategoriaCard title="Celulares e Acessórios" />
          <CategoriaCard title="Copos e Garrafas" />
          <CategoriaCard title="Ferramentas" />
          <CategoriaCard title="Fitness" />
          <CategoriaCard title="Games e Acessórios" />
          <CategoriaCard title="Iluminação" />
          <CategoriaCard title="Informática" />
          <CategoriaCard title="Papelaria e Escritório" />
          <CategoriaCard title="Petshop" />
          <CategoriaCard title="Pilhas e Baterias" />
          <CategoriaCard title="Utilidades Domésticas" />
          <CategoriaCard title="Massageadores" />
        </ScrollView>

        <View style={styles.bannerContainer}>
          <BannerCarousel />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoriasContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  bannerContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
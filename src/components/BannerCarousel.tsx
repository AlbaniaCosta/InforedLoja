import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

const banners = [
  require('../assets/1.png'),
  require('../assets/2.png'),
];

export default function BannerCarousel() {
  const renderItem = ({ item }: { item: any }) => (
    <Image source={item} style={styles.bannerImage} resizeMode="cover" />
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={banners}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.95}
        loop
        autoplay
        autoplayDelay={3000}
        autoplayInterval={5000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  bannerImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
});
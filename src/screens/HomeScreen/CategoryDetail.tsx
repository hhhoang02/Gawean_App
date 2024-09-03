import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import Icon from 'react-native-vector-icons/Ionicons'
const CategoryDetail = () => {
  const products = [
    {
      id: '1',
      name: 'Product 1',
      price: '$10',
      shop: 'Shop 1',
      image: require('../../assets/images/Sushi.jpg'),
    },
    {
      id: '2',
      name: 'Product 2',
      price: '$20',
      shop: 'Shop 2',
      image: require('../../assets/images/Sushi.jpg'),
    },
    {
      id: '3',
      name: 'Product 3',
      price: '$30',
      shop: 'Shop 3',
      image: require('../../assets/images/Sushi.jpg'),
    },
    {
      id: '4',
      name: 'Product 4',
      price: '$30',
      shop: 'Shop 4',
      image: require('../../assets/images/Sushi.jpg'),
    },
  ];

  const shops = [
    {
      id: '1',
      name: 'Shop 1',
      location: 'Location 1',
      image: require('../../assets/images/KFC.png'),
    },
    {
      id: '2',
      name: 'Shop 2',
      location: 'Location 2',
      image: require('../../assets/images/KFC.png'),
    },
    {
      id: '3',
      name: 'Shop 3',
      location: 'Location 3',
      image: require('../../assets/images/KFC.png'),
    },
    {
      id: '4',
      name: 'Shop 4',
      location: 'Location 4',
      image: require('../../assets/images/KFC.png'),
    },
  ];

  const renderProductItem = ({item}: any) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Icon name="chevron-forward-outline" size={22} />
      </View>

    </TouchableOpacity>
  );

  const renderShopItem = ({item}: any) => (
    <TouchableOpacity style={styles.shopCard}>
      <Image source={item.image} style={styles.shopImage} />
      <View style={styles.shopDetails}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.shopLocation}>{item.location}</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Icon name="chevron-forward-outline" size={22} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}  style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black', paddingVertical: 20}}>Berger</Text>
      <View style={styles.productContainer}>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.shopContainer}>
        <FlatList
          data={shops}
          renderItem={renderShopItem}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  productCard: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    borderBottomWidth: 0.3
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  productContainer: {
    flex: 1,
  },
  shopContainer: {
    flex: 1,
    marginBottom: 15,
  },
  shopCard: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
 
  },
  shopImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  shopDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shopLocation: {
    fontSize: 16,
    color: '#888',
  },
});

export default CategoryDetail;

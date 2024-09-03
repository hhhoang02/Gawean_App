import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';

const OfferDetail = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const discountedProducts = [
    {
      id: '1',
      name: 'Discounted Product 1',
      image: require('../../assets/images/Sushi.jpg'),
      originalPrice: '$30',
      discountedPrice: '$20',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget condimentum massa.',
    },
    {
      id: '2',
      name: 'Discounted Product 2',
      image: require('../../assets/images/Sushi.jpg'),
      originalPrice: '$50',
      discountedPrice: '$35',
      description: 'Praesent vel magna id dui feugiat eleifend sed sed nunc.',
    },
    {
      id: '3',
      name: 'Discounted Product 3',
      image: require('../../assets/images/Sushi.jpg'),
      originalPrice: '$25',
      discountedPrice: '$15',
      description: 'Vivamus vel justo ullamcorper, tempor dui vel, eleifend neque.',
    },
  ];

  const renderDiscountedProductItem = ({ item } : any) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          <Text style={styles.discountedPrice}>{item.discountedPrice}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    const results:any = discountedProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
    setShowSearchResults(true);
  };

  const handleCancelSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search discounted products..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        {showSearchResults && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSearch}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>Discounted Products</Text>
      <FlatList
        data={showSearchResults ? filteredProducts : discountedProducts}
        renderItem={renderDiscountedProductItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OfferDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e63946',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {    color: '#fff',
  fontWeight: 'bold',
},
cancelButton: {
  backgroundColor: '#dc3545',
  paddingVertical: 8,
  paddingHorizontal: 15,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
},
cancelButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
});
   

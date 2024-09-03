import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-virtualized-view';

const ShopDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isBottomAlertVisible, setIsBottomAlertVisible] = useState(false);
  const [deliveryMethods, setDeliveryMethods] = useState([
    {id: '1', name: 'Delivery to doorstep'},
    {id: '2', name: 'Pickup at store'},
    {id: '3', name: 'Delivery to family/friend'},
  ]);

  const shopData = {
    name: 'Shop Name',
    location: 'Shop Location',
    deliveryTime: '30 mins',
    rating: '4.8',
    image: require('../../assets/images/KFC.png'),
    suggestedProducts: [
      {
        id: '1',
        name: 'Product 1',
        image: require('../../assets/images/Sushi.jpg'),
        price: '$10',
        category: 'category1',
      },
      {
        id: '2',
        name: 'Product 2',
        image: require('../../assets/images/Sushi.jpg'),
        price: '$20',
        category: 'category1',
      },
      {
        id: '3',
        name: 'Product 3',
        image: require('../../assets/images/Sushi.jpg'),
        price: '$30',
        category: 'category2',
      },
    ],
  };

  const renderSuggestedProductItem = ({item}: any) => (
    <TouchableOpacity style={styles.suggestedProduct}>
      <Image source={item.image} style={styles.productImage} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.suggestedProductName}>{item.name}</Text>
        <Text style={styles.suggestedProductPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleFollowShop = () => {
    // Logic to follow the shop
    console.log('Follow shop');
  };
  const toggleBottomAlert = () => {
    setIsBottomAlertVisible(!isBottomAlertVisible);
  };
  const toggleSave = () => {
    setIsBottomAlertVisible(!isBottomAlertVisible);
  };
  console.log(isBottomAlertVisible);

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? shopData.suggestedProducts
      : shopData.suggestedProducts.filter(
          product => product.category === selectedCategory,
        );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Image
        source={shopData.image}
        style={styles.shopImage}
        resizeMode="cover"
      />
      <View style={styles.shopInfo}>
        <View style={{width: '15%', borderRadius: 20}}>
          <Image source={shopData.image} style={styles.logo} />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.shopName}>{shopData.name}</Text>
          <Text style={styles.shopLocation}>{shopData.location}</Text>
        </View>

        <TouchableOpacity
          onPress={handleFollowShop}
          style={styles.followButton}>
          <Icon name="heart-outline" size={30} color="red" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.deliveryInfoContainer}
        onPress={toggleBottomAlert}>
        <View style={styles.deliveryInfoContent}>
          <Text style={styles.deliveryTime}>
            Delivery Time: {shopData.deliveryTime}
          </Text>
          <Text style={styles.rating}>Rating: {shopData.rating}</Text>
        </View>
        <View style={styles.arrowIconContainer}>
          <Icon name="chevron-forward-outline" size={22} />
        </View>
      </TouchableOpacity>
      {isBottomAlertVisible && (
        <Modal visible={isBottomAlertVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.bottomAlert}>
              <View style={styles.mapContainer}>
                <Text>Google Map</Text>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={styles.label}>User's Name</Text>
                <TextInput placeholder="Full name" style={styles.textInput} />
                <Text style={styles.label}>Building Name</Text>
                <TextInput
                  placeholder="Building Name"
                  style={styles.textInput}
                />
                <Text style={styles.label}>Special Instructions</Text>
                <TextInput
                  placeholder="Enter any special instructions"
                  multiline
                  numberOfLines={4}
                  style={[styles.textInput, {height: 100}]}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={toggleSave}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={toggleBottomAlert}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.categoryButtons}>
        <TouchableOpacity
          onPress={() => handleCategoryChange('all')}
          style={[
            styles.categoryButton,
            selectedCategory === 'all' && styles.selectedCategoryButton,
          ]}>
          <Text style={styles.categoryButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCategoryChange('category1')}
          style={[
            styles.categoryButton,
            selectedCategory === 'category1' && styles.selectedCategoryButton,
          ]}>
          <Text style={styles.categoryButtonText}>Category 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCategoryChange('category2')}
          style={[
            styles.categoryButton,
            selectedCategory === 'category2' && styles.selectedCategoryButton,
          ]}>
          <Text style={styles.categoryButtonText}>Category 2</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.suggestedProducts}>
        <Text style={styles.suggestedTitle}>Suggested Products:</Text>
        <FlatList
          data={filteredProducts}
          renderItem={renderSuggestedProductItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  deliveryDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    width: '48%',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '48%',
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buildingName: {
    fontSize: 14,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomAlert: {
    width: '100%',
    height: '90%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1, // Set the zIndex to bring it above other elements
  },
  deliveryInfoContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  deliveryInfoContent: {
    width: '70%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  deliveryTime: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '600',
    color: 'black',
  },
  rating: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '600',
    color: 'black',
  },
  arrowIconContainer: {
    width: '20%',
    height: 60,
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 60,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  shopImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  shopInfo: {
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shopLocation: {
    fontSize: 16,
    marginBottom: 10,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedCategoryButton: {
    backgroundColor: '#c0c0c0',
  },
  categoryButtonText: {
    fontSize: 16,
    color: 'black',

  },
  suggestedProducts: {
    marginBottom: 20,
  },
  suggestedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  suggestedProduct: {
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  suggestedProductPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  suggestedProductName: {
    fontSize: 16,
    color: 'black',
  },
  followButton: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  followButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default ShopDetail;

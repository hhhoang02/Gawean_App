import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  SafeAreaView,
  Switch,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-virtualized-view';

const ExploreScreen = () => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(suggestedProducts);
  const [stores, setStores] = useState(suggestedStores);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['All', 'Burgers', 'Pizza', 'Sushi', 'Desserts', 'Drinks'];

  const renderSuggestedProduct = ({ item }) => (
    <TouchableOpacity style={isGridView ? styles.gridItem : styles.suggestedItem} onPress={() => handleProductPress(item)}>
      <Image source={item.image} style={styles.suggestedItemImage} />
      <Text style={styles.suggestedItemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderSuggestedStore = ({ item }) => (
    <TouchableOpacity style={styles.suggestedItem} onPress={() => handleStorePress(item)}>
      <Image source={item.image} style={styles.suggestedItemImage} />
      <Text style={styles.suggestedItemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleProductPress = (product) => {
    console.log('Product pressed:', product);
  };

  const handleStorePress = (store) => {
    console.log('Store pressed:', store);
  };

  const handleApplyFilters = () => {
    console.log('Applying filters...');
    setIsFilterModalVisible(false);
  };

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFilterModalVisible}
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Advanced Filters</Text>
          <ScrollView>
            <View style={styles.filterOption}>
              <Text>Price Range:</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Min"
                keyboardType="numeric"
              />
              <Text>to</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Max"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.filterOption}>
              <Text>Rating:</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Min"
                keyboardType="numeric"
              />
              <Text>to</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Max"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.filterOption}>
              <Text>Delivery Time:</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Min"
                keyboardType="numeric"
              />
              <Text>to</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Max"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.filterOption}>
              <Text>Vegetarian:</Text>
              <Switch
                value={isVegetarian}
                onValueChange={setIsVegetarian}
              />
            </View>
            <View style={styles.filterOption}>
              <Text>Cuisine:</Text>
              <Picker
                selectedValue={selectedCuisine}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => setSelectedCuisine(itemValue)}
              >
                <Picker.Item label="Any" value="" />
                <Picker.Item label="Italian" value="italian" />
                <Picker.Item label="Chinese" value="chinese" />
                <Picker.Item label="Indian" value="indian" />
                <Picker.Item label="Mexican" value="mexican" />
              </Picker>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsFilterModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for restaurants or food..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
            <Icon name="filter-outline" size={24} color="#007BFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category} style={styles.categoryButton}>
              <Icon name="fast-food-outline" size={16} color="#fff" style={styles.categoryIcon} />
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.toggleViewContainer}>
          <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
            <Icon name={isGridView ? "list-outline" : "grid-outline"} size={24} color="#007BFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Suggested Products</Text>
        <FlatList
          data={products}
          renderItem={renderSuggestedProduct}
          keyExtractor={(item) => item.id}
          horizontal={!isGridView}
          numColumns={isGridView ? 2 : 1}
          key={isGridView ? 'grid' : 'list'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestedList}
        />

        <Text style={styles.sectionTitle}>Suggested Stores</Text>
        <FlatList
          data={stores}
          renderItem={renderSuggestedStore}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestedList}
        />
      </ScrollView>

      {renderFilterModal()}
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  applyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    flex: 1,
    fontSize: 13,
  },
  filterButton: {
    padding: 10,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  suggestedList: {
    paddingLeft: 5,
  },
  suggestedItem: {
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    padding: 10,
  },
  suggestedItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  suggestedItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    marginTop: 10,
    marginBottom: 20,
  },
  categoryButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    marginRight: 5,
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleViewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  gridItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  gridItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const suggestedProducts = [
  { id: '1', name: 'Product 1', image: require('../../assets/images/Berger.jpg'), description: 'Description of product 1.' },
  { id: '2', name: 'Product 2', image: require('../../assets/images/Berger.jpg'), description: 'Description of product 2.' },
  { id: '3', name: 'Product 3', image: require('../../assets/images/Berger.jpg'), description: 'Description of product 3.' },
  // Add more products here
];

const suggestedStores = [
  { id: '1', name: 'Store 1', image: require('../../assets/images/KFC.png'), description: 'Description of store 1.' },
  { id: '2', name: 'Store 2', image: require('../../assets/images/KFC.png'), description: 'Description of store 2.' },
  { id: '3', name: 'Store 3', image: require('../../assets/images/KFC.png'), description: 'Description of store 3.' },
  // Add more stores here
];


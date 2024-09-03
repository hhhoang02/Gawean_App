import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderScreen = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Burger',
      price: 5.99,
      quantity: 1,
      image: require('../../assets/images/Berger.jpg'),
    },
    {
      id: '2',
      name: 'Fries',
      price: 2.99,
      quantity: 2,
      image: require('../../assets/images/Berger.jpg'),
    },
    {
      id: '3',
      name: 'Coke',
      price: 1.99,
      quantity: 1,
      image: require('../../assets/images/Berger.jpg'),
    },
  ]);

  const addressData = [
    { id: '1', address: 'Address 1' },
    { id: '2', address: 'Address 2' },
    { id: '3', address: 'Address 3' },
  ]; // Example address data
  const paymentData = [
    { id: '1', method: 'Credit Card' },
    { id: '2', method: 'PayPal' },
    { id: '3', method: 'Bank Transfer' },
  ];

  const handleRemoveItem = (id: any) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const handleIncreaseQuantity = (id: any) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (id: any) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    setCartItems(updatedCartItems);
  };

  const handleAdd = () => {
    console.log('Add Order');
    console.log(selectedAddress, selectedPayment);
    navigation.naviga
    // Add your logic to proceed with the order
  };




  const toggleOption = (option: any) => {
    if (selectedOption === option) {
      setSelectedOption(null); // Unselect if already selected
    } else {
      setSelectedOption(option); // Select the option
    }
  };

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setSelectedOption(null); // Hide the selection list after choosing
  };

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
    setSelectedOption(null); // Hide the selection list after choosing
  };
  
  
  
  
  
  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const getTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Order</Text>

      <ScrollView style={styles.contentContainer}>
        {cartItems.map(item => (
          <View style={styles.cartItem} key={item.id}>
            <Image source={item.image} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => handleDecreaseQuantity(item.id)}
                  style={styles.quantityButton}>
                  <Icon name="remove-circle-outline" size={24} color="#007BFF" />
                </TouchableOpacity>
                <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleIncreaseQuantity(item.id)}
                  style={styles.quantityButton}>
                  <Icon name="add-circle-outline" size={24} color="#007BFF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.cartItemSubtotal}>
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeItemButton}
              onPress={() => handleRemoveItem(item.id)}>
              <Icon name="trash-outline" size={24} color="#ff3b30" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalAmount}>Total: ${getTotalAmount()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={toggleModal}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <View style={styles.containerPD}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => toggleOption('address')}>
                <Text style={styles.optionText}>Address</Text>
              </TouchableOpacity>
              {selectedAddress && (
                <Text style={styles.selectedText}>Selected Address: {selectedAddress}</Text>
              )}
              {selectedOption === 'address' && (
                <FlatList
                  data={addressData}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.paymentItem}
                      onPress={() => handleAddressSelect(item.address)}>
                      <Text>{item.address}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                  style={styles.optionContent}
                />
              )}

              <TouchableOpacity
                style={styles.option}
                onPress={() => toggleOption('payment')}>
                <Text style={styles.optionText}>Payment</Text>
              </TouchableOpacity>
              {selectedPayment && (
                <Text style={styles.selectedText}>Selected Payment: {selectedPayment}</Text>
              )}
              {selectedOption === 'payment' && (
                <FlatList
                  data={paymentData}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.paymentItem}
                      onPress={() => handlePaymentSelect(item.method)}>
                      <Text>{item.method}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                  style={styles.optionContent}
                />
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.addButtonModal]}
                onPress={handleAdd}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButtonModal]}
                onPress={toggleModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginVertical: 5,
    marginBottom: 15,
  },
  paymentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionContent: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: '40%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonModal: {
    backgroundColor: '#ccc',
  },
  addButtonModal: {
    backgroundColor: '#007BFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  containerPD: {},
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    paddingHorizontal: 5,
  },
  cartItemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  cartItemSubtotal: {
    fontSize: 16,
    color: '#888',
  },
  removeItemButton: {
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default OrderScreen;


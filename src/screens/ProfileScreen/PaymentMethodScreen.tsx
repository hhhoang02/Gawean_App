import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentMethodScreen = ({ navigation }: any) => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', type: 'Credit Card', details: '**** **** **** 1234', image: require('../../assets/images/credit-card.jpg') },
    { id: '2', type: 'PayPal', details: 'john.doe@example.com', image: require('../../assets/images/paypal.jpg') },
    // Add more payment methods as needed
  ]);

  const handleDeletePaymentMethod = (id:any) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    ToastAndroid.show("Payment method deleted", ToastAndroid.SHORT);
  };

  const addPaymentMethod = () => {
    navigation.navigate('AddPaymentMethod');
  };

  const renderPaymentMethodItem = ({ item } : any) => (
    <TouchableOpacity
      style={styles.paymentMethodItem}
      onLongPress={() => handleDeletePaymentMethod(item.id)}
    >
      <View style={styles.paymentMethodImageContainer}>
        <Image source={item.image} style={styles.paymentMethodImage} />
      </View>
      <View style={styles.paymentMethodDetails}>
        <Text style={styles.paymentType}>{item.type}</Text>
        <Text style={styles.paymentDetails}>{item.details}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethodItem}
        keyExtractor={item => item.id}
        style={styles.paymentList}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.addPaymentButton} onPress={addPaymentMethod}>
        <Icon name="add-circle-outline" size={30} color="#007BFF" />
        <Text style={styles.addPaymentText}>Add Payment Method</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  paymentList: {
    marginTop: 20,
  },
  paymentMethodItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodImageContainer: {
    marginRight: 15,
  },
  paymentMethodImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentDetails: {
    fontSize: 14,
    color: '#888',
  },
  addPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  addPaymentText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007BFF',
  },
});

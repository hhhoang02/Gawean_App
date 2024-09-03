import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('cash');

  const handlePayment = () => {
    console.log('Selected payment method:', selectedMethod);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Select Payment Method</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity
            style={[styles.methodButton, selectedMethod === 'cash' && styles.selectedMethod]}
            onPress={() => setSelectedMethod('cash')}
          >
            <Text style={styles.methodButtonText}>Cash on Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.methodButton, selectedMethod === 'bank' && styles.selectedMethod]}
            onPress={() => setSelectedMethod('bank')}
          >
            <Text style={styles.methodButtonText}>Bank Transfer</Text>
          </TouchableOpacity>
          {/* Add more payment methods if needed */}
        </View>

        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.paymentButtonText}>Confirm Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  methodButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedMethod: {
    backgroundColor: '#007BFF',
  },
  methodButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

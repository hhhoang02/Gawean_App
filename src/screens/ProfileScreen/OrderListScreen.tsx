import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const OrderListScreen = ({ status }:any) => {
  const orders = [
    { id: '1', name: 'Order 1', date: '2023-05-01', total: '$20.00', status: 'Currently Ordering' },
    { id: '2', name: 'Order 2', date: '2023-04-28', total: '$15.00', status: 'In Transit' },
    { id: '3', name: 'Order 3', date: '2023-04-25', total: '$25.00', status: 'Delivered' },
    { id: '4', name: 'Order 4', date: '2023-04-22', total: '$10.00', status: 'Cancelled' },
    // Add more orders as needed
  ].filter(order => order.status === status);

  const renderOrderItem = ({ item }: any) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderName}>{item.name}</Text>
      <Text style={styles.orderDate}>{item.date}</Text>
      <Text style={styles.orderTotal}>{item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        style={styles.orderList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OrderListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  orderList: {
    marginTop: 20,
  },
  orderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#888',
},
orderTotal: {
  fontSize: 16,
  color: '#333',
},
});


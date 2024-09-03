import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import OrderListScreen from './OrderListScreen';

const CurrentlyOrderingRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}><OrderListScreen status="Currently Ordering" /></View>
);

const InTransitRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}><OrderListScreen status="In Transit" /></View>
);

const DeliveredRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}><OrderListScreen status="Delivered" /></View>
);

const CancelledRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}><OrderListScreen status="Cancelled" /></View>
);


const OrderHistoryScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'currentlyOrdering', title: 'Đăng đặt' },
    { key: 'inTransit', title: 'Đang giao' },
    { key: 'delivered', title: 'Đã giao' },
    { key: 'cancelled', title: 'Đã hủy' },
  ]);

  const renderScene = SceneMap({
    currentlyOrdering: CurrentlyOrderingRoute,
    inTransit: InTransitRoute,
    delivered: DeliveredRoute,
    cancelled: CancelledRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'blue' }} // Màu của dấu hiệu hiện tại
      style={styles.tabBar} // Style của TabBar tổng thể
      labelStyle={styles.tabLabel} // Style của nhãn tab
    />
  );
  

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#fff', // Màu nền của TabBar
    borderBottomWidth: 1, // Độ dày của đường viền dưới của TabBar
    borderBottomColor: '#ddd', // Màu của đường viền dưới của TabBar
  },
  tabLabel: {
    color: 'black', // Màu của nhãn tab
    fontSize: 12, // Kích thước của nhãn tab
    fontWeight: 'bold', // Độ đậm của nhãn tab
  },
});

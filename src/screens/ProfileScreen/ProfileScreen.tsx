import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation} : any) => {
  const profileData = {
    avatar: require('../../assets/images/KFC.png'),
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const menuOptions = [
    {
      id: '1',
      icon: 'fast-food-outline',
      name: 'Order History',
      screen: 'OrderHistory'
    },
    {
      id: '2',
      icon: 'location-outline',
      name: 'Saved Addresses',
      screen: 'SaveAddress'
    },
    {
      id: '3',
      icon: 'card-outline',
      name: 'Payment Methods',
      screen: 'PaymentMethod'
    },
    {
      id: '4',
      icon: 'settings-outline',
      name: 'Settings',
      screen: 'Setting'
    },
  ];

  const renderMenuOption = ({ item }:any) => (
    <TouchableOpacity style={styles.menuOption}  onPress={() => navigation.navigate(item.screen)}>
      <Icon name={item.icon} size={24} color="#333" style={styles.menuIcon} />
      <Text style={styles.menuText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={profileData.avatar} style={styles.avatar} />
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.email}>{profileData.email}</Text>
      </View>
      <FlatList
        data={menuOptions}
        renderItem={renderMenuOption}
        keyExtractor={item => item.id}
        style={styles.menuList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  menuList: {
    paddingHorizontal: 20,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
});

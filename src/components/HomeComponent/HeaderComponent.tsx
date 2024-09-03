import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';

const HeaderComponent = () => {
  return (
    <View style={styles.header}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color="black" />
        <TextInput style={styles.searchText} placeholder='Search....'/>
      </View>
      <TouchableOpacity style={styles.iconWrapper}>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f0f0f0',
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchText: {
    marginLeft: 5,
    color: '#888',
  },
  iconWrapper: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

});

export default HeaderComponent;

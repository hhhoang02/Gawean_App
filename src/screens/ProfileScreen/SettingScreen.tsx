import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Switch } from 'react-native';

const SettingScreen = () => {
  const settingsOptions = [
    { id: '1', name: 'Notifications', type: 'switch', value: true },
    { id: '2', name: 'Privacy', type: 'button' },
    { id: '3', name: 'Language', type: 'button' },
    { id: '4', name: 'Help', type: 'button' },
  ];

  const renderSettingsItem = ({ item } : any) => (
    <View style={styles.settingsItem}>
      <Text style={styles.settingsName}>{item.name}</Text>
      {item.type === 'switch' ? (
        <Switch value={item.value} />
      ) : (
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        renderItem={renderSettingsItem}
        keyExtractor={item => item.id}
        style={styles.settingsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  settingsList: {
    marginTop: 20,
  },
  settingsItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

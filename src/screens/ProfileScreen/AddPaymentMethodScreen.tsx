import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddPaymentMethodScreen = ({ navigation }: any) => {
  const [banks, setBanks] = useState([
    { id: '1', name: 'Vietcombank', logo: require('../../assets/images/vietcombank.jpg'), country: 'Vietnam' },
    { id: '2', name: 'Sacombank', logo: require('../../assets/images/sacombank.jpg'), country: 'Vietnam' },
    { id: '3', name: 'Agribank', logo: require('../../assets/images/aribank.jpg'), country: 'Vietnam' },
    { id: '4', name: 'MB Bank', logo: require('../../assets/images/mbbank.jpg'), country: 'Vietnam' },
    { id: '5', name: 'ACB', logo: require('../../assets/images/acb.jpg'), country: 'Vietnam' },
    { id: '6', name: 'TP Bank', logo: require('../../assets/images/tpbank.jpg'), country: 'Vietnam' },
    { id: '7', name: 'BIDV', logo: require('../../assets/images/bidv.jpg'), country: 'Vietnam' },
    { id: '8', name: 'Visa', logo: require('../../assets/images/visa.jpg'), country: 'International' },  
    { id: '9', name: 'Mastercard', logo: require('../../assets/images/mastercard.jpg'), country: 'International' },
    { id: '10', name: 'JCB', logo: require('../../assets/images/jcb.jpg'), country: 'International' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [domesticBanks, setDomesticBanks] = useState([]);
  const [internationalBanks, setInternationalBanks] = useState([]);

  useEffect(() => {
    setDomesticBanks(banks.filter(bank => bank.country === 'Vietnam'));
    setInternationalBanks(banks.filter(bank => bank.country === 'International'));
  }, [banks]);

  const handleBankPress = (bank: any) => {
    // Navigate to bank details screen
    navigation.navigate('BankDetail', { bank });
  };

  const renderBankItem = (bank: any) => (
    <TouchableOpacity key={bank.id} style={styles.bankItem} onPress={() => handleBankPress(bank)}>
      <View style={styles.bankLogoContainer}>
        <Image source={bank.logo} style={styles.bankLogo} />
      </View>
      <View style={styles.bankDetails}>
        <Text style={styles.bankName}>{bank.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const searchBanks = (bankList: any) => {
    // Implement logic to search banks based on searchQuery
    // For simplicity, let's filter banks based on bank name
    const filteredBanks = bankList.filter((bank:any) => bank.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return filteredBanks;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search banks..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <View style={styles.bankListContainer}>
        <Text style={styles.listTitle}>Domestic Banks</Text>
        <View style={styles.bankList}>
          {searchBanks(domesticBanks).map(renderBankItem)}
        </View>
      </View>
      <View style={styles.bankListContainer}>
        <Text style={styles.listTitle}>International Banks</Text>
        <View style={styles.bankList}>
          {searchBanks(internationalBanks).map(renderBankItem)}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddPaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  bankListContainer: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bankList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Change to 'space-around' for even spacing
  },
  bankItem: {
    width: Dimensions.get('window').width / 4 - 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  bankLogoContainer: {
    marginBottom: 5,
  },
  bankLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bankDetails: {
    alignItems: 'center',
  },
  bankName: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bankCountry: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
  },
});

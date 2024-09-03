import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import PhoneInput from 'react-native-phone-number-input';
const SaveAddressScreen = () => {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      title: 'Home',
      name: 'Home',
      phoneNumber: '036558559',
      address: '123 Main St, City, Country',
    },
    {
      id: '2',
      title: 'Company',
      name: 'Work',
      phoneNumber: '036558559',
      address: '456 Elm St, City, Country',
    },
  ]);
  const [isSelected, setIsSelected] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    id: '',
    title: '',
    name: '',
    phoneNumber: '',
    address: '',
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const toggleModal = () => {
    setNewAddress({id: '',
      title: '',
      name: '',
      phoneNumber: '',
      address: '',});
      setIsSelected(false);

    setIsModalVisible(!isModalVisible);
  };  

  const addAddress = () => {
    if (newAddress.name && newAddress.address) {
        if (isEdit) {
        setAddresses(
          addresses.map(addr =>
            addr.id === newAddress.id ? {...newAddress} : addr,
          ),
        );
        setIsEdit(false);
      } else {
        setAddresses([
          ...addresses,
          {id: (addresses.length + 1).toString(), ...newAddress},
        ]);
      }
      setNewAddress({
        id: '',
        title: '',
        name: '',
        phoneNumber: '',
        address: '',
      });
      

      setIsModalVisible(false);
    } else {
      Alert.alert('Please enter both name and address');
    }
  };

  const getCurrentLocation = () => {
    console.log('Get current location');
    // Logic để lấy vị trí hiện tại sẽ được thêm ở đây
  };

  const editAddress = (item: any) => {
    console.log("isSelected",isSelected);
    
    setIsSelected(true);
    setNewAddress(item);
    setIsEdit(true);
    setIsModalVisible(true);
  };

  const deleteAddress = (id: any) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setAddresses(addresses.filter(addr => addr.id !== id));
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const renderAddressItem = ({item}: any) => (
    <View style={styles.addressItem}>
      <View>
        <Text style={styles.addressName}>{item.name}</Text>
        <Text style={styles.addressDetails}>{item.address}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editAddress(item)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteAddress(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={item => item.id}
        style={styles.addressList}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={getCurrentLocation}>
        <Image
          source={require('../../assets/images/location.png')}
          style={styles.locationIcon}
        />
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {
            
            isSelected ?
              <View><Text style={styles.title}>Edit Address</Text></View>
                :
              <View><Text style={styles.title}>Add Address</Text></View>           
            }

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newAddress.title}
              onChangeText={text =>
                setNewAddress(prevState => ({...prevState, title: text}))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newAddress.name}
              onChangeText={text =>
                setNewAddress(prevState => ({...prevState, name: text}))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={newAddress.address}
              onChangeText={text =>
                setNewAddress(prevState => ({...prevState, address: text}))
              }
            />
            <PhoneInput
              containerStyle={styles.phoneInput}
              textInputStyle={styles.inputTextStyle}
              ref={phoneInput}
              value={newAddress.phoneNumber}
              defaultCode="DM"
              layout="first"
              onChangeText={text => {
                setNewAddress(prevState => ({...prevState, phoneNumber: text}));
              }}
              onChangeFormattedText={(text: any) => {
                setNewAddress(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.addButtonModal]}
                onPress={addAddress}>
                <Text style={styles.buttonText}>
                  {isEdit ? 'Update' : 'Add'}
                </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 25,
    color: 'black',
  },
  inputTextStyle: {
    height: 60,
  },
  addButton: {
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  locationButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 999,
  },
  locationIcon: {
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  addressList: {
    marginTop: 20,
  },

  addressItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
  },
  addressName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addressDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },

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
  phoneInput: {
    width: '100%',
    height: 60,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    width: '40%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonModal: {
    backgroundColor: '#007BFF',
  },
  cancelButtonModal: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SaveAddressScreen;

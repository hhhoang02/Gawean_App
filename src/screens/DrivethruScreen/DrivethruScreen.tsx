import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {markers} from './mapData';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StartRating from './StarRating';


const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const DrivethruScreen = () => {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [error, setError] = useState<string>('');
  const _map = React.useRef<MapView>(null);
  const _scrollView = React.useRef<ScrollView>(null);

  const initialMapState = {
    markers,
    businessTypes: [
      {
        id: 'restaurant',
        name: 'Restaurant',
        icon: <Icon name="restaurant" size={18} color="#FF6347" />,
      },
      {
        id: 'coffee',
        name: 'Coffee',
        icon: <Icon name="cafe" size={18} color="#FF6347" />,
      },
      {
        id: 'hotel',
        name: 'Hotel',
        icon: <Icon name="restaurant" size={18} color="#FF6347" />,
      },
      {
        id: 'grocery',
        name: 'Grocery',
        icon: <Icon name="cart" size={18} color="#FF6347" />,
      },
    ],

    region: {
      latitude: 10.8,
      longitude: 106.71,
      latitudeDelta: 0.01,
      longitudeDelta: 0.02,
    },
  };

  const [state, setState] = React.useState(initialMapState);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
  
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
  
    return { scale };
  });

  // const requestLocationPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: 'Location Permission',
  //           message: 'App needs access to your location.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Location permission granted');
  //         getLocation();
  //       } else {
  //         console.log('Location permission denied');
  //         setError('Location permission denied');
  //       }
  //     } catch (err) {
  //       console.warn('Permission error:', err);
  //       setError('Permission error');
  //     }
  //   } else {
  //     getLocation();
  //   }
  // };

  // const handleGeolocationError = (error: any) => {
  //   let errorMessage = 'Geolocation error';
  //   switch (error.code) {
  //     case error.PERMISSION_DENIED:
  //       errorMessage = 'Location permission denied';
  //       break;
  //     case error.POSITION_UNAVAILABLE:
  //       errorMessage = 'Location position unavailable';
  //       break;
  //     case error.TIMEOUT:
  //       errorMessage = 'Location request timed out';
  //       break;
  //     default:
  //       errorMessage = Error: ${error.message};
  //   }
  //   console.error(errorMessage);
  //   setError(errorMessage);
  // };

  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       console.log('Position:', position);
  //       setLatitude(latitude);
  //       setLongitude(longitude);
  //     },
  //     error => {
  //       handleGeolocationError(error);
  //     },
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}, // Increase timeout and maximumAge
  //   );
  // };

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  const onMarkerPress = (mapEventData: any) => {
    const markerId = mapEventData._targetInst.return.key;
    let x = (markerId * CARD_WIDTH) + (markerId * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
    _scrollView.current?.scrollTo({ x, y: 0, animated: true });
  };

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeOut);

      const regionTimeOut = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = markers[index];
          if (_map.current) {
            _map.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: state.region.latitudeDelta,
                longitudeDelta: state.region.longitudeDelta,
              },
              350,
            );
          }
        }
      }, 10);
    });
  }, [mapAnimation, markers, state.region]);

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={state.region}>
        {markers.map((marker, index) => {


          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index]?.scale || 1, // Use default scale of 1 if undefined
              },
            ],
          };


          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}
              >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={marker.image}
                  style={[styles.marker, scaleStyle]} // Đảm bảo hình ảnh có kích thước hợp lý
                  resizeMode='cover'
                />
              </Animated.View>
            </Marker>
          ) 
      })}
      </MapView>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex: 1, padding: 0}}
        />
        <Icon name="search" size={20} />
      </View>

      {/* Chips ScrollView */}
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        style={styles.chipsScrollView}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0,
        }}>
        {state.businessTypes.map((businessType: any) => (
          <TouchableOpacity key={businessType.id} style={styles.chipsItem}>
            {businessType.icon}
            <Text>{businessType.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {markers.map((marker, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardTitle}>
                {marker.title}
              </Text>
              <StartRating rating={marker.rating} reviews={marker.reviews} />
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.signIn,
                    {
                      borderColor: '#FF6347',
                      borderWidth: 1,
                    },
                  ]}>
                  <Text style={[styles.textSign, {color: '#FF6347'}]}>
                    Order Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    elevation: 10,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  chipsScrollView: {
    position: 'absolute',
    top: 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    elevation: 10,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 170,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    marginTop: 10,
    color: '#ff0000',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  image: {
    width: 120,
    height: 80,
  },
});

export default DrivethruScreen;
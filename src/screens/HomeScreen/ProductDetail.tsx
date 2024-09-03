import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-virtualized-view';
const ProductDetail = () => {

  const [quantity, setQuantity] = useState<number>(1); // Số lượng ban đầu
  const [checkedItems, setCheckedItems] = useState<string[]>([]); // Mảng lưu trữ các mục đã được checked

  console.log(checkedItems);
  
  const handleQuantityChange = (value: any) => {
    setQuantity(parseInt(value));
  };

  const relatedProductsData = [
    { id: '1', name: 'Related Product 1', image: require('../../assets/images/Sushi.jpg'), price: '$9.99' },
    { id: '2', name: 'Related Product 2', image: require('../../assets/images/Sushi.jpg'), price: '$12.99' },
    { id: '3', name: 'Related Product 3', image: require('../../assets/images/Sushi.jpg'), price: '$14.99' },
    // Add more related products as needed
  ];

  const handleCheckboxChange = (id: string) => {
    // Toggle trạng thái checked của mục với id tương ứng
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id)); // Nếu đã được checked, loại bỏ khỏi mảng checkedItems
    } else {
      setCheckedItems([...checkedItems, id]); // Nếu chưa được checked, thêm vào mảng checkedItems
    }
  };

  const renderRelatedProductItem = ({ item }:any) => (
    <View style={styles.groupPD}>
      <TouchableOpacity  style={styles.relatedProduct}>
        <Image source={item.image} style={styles.relatedProductImage} />
        <View style={styles.relatedProductInfo}>
          <Text style={styles.relatedProductName}>{item.name}</Text>
          <Text style={styles.relatedProductPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
      <View style={{justifyContent: 'center'}}>
        <Checkbox
          status={checkedItems.includes(item.id) ? 'checked' : 'unchecked'} // Đặt trạng thái của checkbox dựa trên checkedItems
          color="#6a51ae"
          onPress={() => handleCheckboxChange(item.id)} // Gọi hàm xử lý khi checkbox được nhấn
        />
      </View>
      
    </View>
  );

  const handleAddToCart = () => {
    // Logic to add product to cart
    console.log('Product added to cart');
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../assets/images/Sushi.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>Product Name</Text>
        <Text style={styles.rating}>Rating: 4.5/5</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel massa id elit convallis
          vehicula.
        </Text>
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <NumericInput
            value={quantity}
            onChange={handleQuantityChange}
            minValue={1} // Giá trị tối thiểu
            totalWidth={100}
            totalHeight={40}
            iconSize={25}
            step={1}
            valueType="integer"
            rounded
            textColor="#B0228C"
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor="#6a51ae"
            leftButtonBackgroundColor="#6a51ae"
          />
        </View>
      </View>
      <View style={styles.relatedProducts}>
        <Text style={styles.relatedTitle}>Related Products:</Text>
        <FlatList
          data={relatedProductsData}
          renderItem={renderRelatedProductItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="heart-outline" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  productInfo: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  addToCartButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#6a51ae',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
  },
  relatedProducts: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupPD:{
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 10,
    borderRadius: 20
  },
  relatedProduct: {
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  relatedProductImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  relatedProductInfo: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  relatedProductName: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
  },
  relatedProductPrice: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  favoriteButton: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default ProductDetail;


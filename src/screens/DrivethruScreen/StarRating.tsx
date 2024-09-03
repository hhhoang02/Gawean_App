import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const StartRating = (props: any) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const name = i < props.rating ? 'star' : 'star-outline';
    stars.push(
      <Icon name={name} size={14} style={styles.star} key={i} />
    );
  }

  return (
    <View style={styles.container}>
      {stars}
      <Text style={styles.text}>({props.reviews})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#FFD700', // Gold color for the stars
  },
  text: {
    fontSize: 10, // Giảm kích thước chữ
    marginLeft: 5,
    color: '#333',
  },
});

export default StartRating;

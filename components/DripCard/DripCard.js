import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DripCard = (props) => {
  const cardStyles = StyleSheet.create({
    container: {
      padding: 10,
    },
    title: {
      fontSize: 20,
      textAlign: 'left',
    },
  });

  let { title, teaser } = props.drip;

  return (
    <View style={cardStyles.container}>
      <Text style={cardStyles.title}>{title}</Text>
      <Text>{teaser}</Text>
    </View>
  );
};

export default DripCard;

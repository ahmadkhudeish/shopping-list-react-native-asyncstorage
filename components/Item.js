import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
    bottom: 10,
  },
  item: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  itemDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EAAF1',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
  },
  itemDeleteText: {
    color: 'white',
  },
  itemEdit: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EAAF1',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 80,
    width: 50,
    height: 50,
  },
  itemEditText: {
    color: 'white',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
  },
  itemQuantity: {
    bottom: 60,
    left: 350,
    flex: 1,
    flexDirection: 'row',
    fontSize: 14,
  },
});

const Item = (props) => {
  return (
    <View key={props.keyval} style={styles.item}>
      <Image source={{ uri: props.val.image }} style={styles.image} />

      <Text style={styles.itemName}>{props.val.name}</Text>
      <Text style={styles.itemText}>{props.val.description}</Text>
      <Text style={styles.itemQuantity}>x {props.val.quantity}</Text>

      <TouchableOpacity onPress={props.editMethod} style={styles.itemEdit}>
        <Text style={styles.itemEditText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.deleteMethod} style={styles.itemDelete}>
        <Text style={styles.itemDeleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

Item.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.string,
  image: PropTypes.string,
};

Item.defaultProps = {
  name: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.string,
  image: PropTypes.string,
};

export default Item;

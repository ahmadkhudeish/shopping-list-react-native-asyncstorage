import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import Item from '../components/Item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1EAAF1',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#1EAAF1',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  textInput: {
    alignSelf: 'stretch',
    color: 'gray',
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#1EAAF1',
  },
  navBarButton: {
    color: '#FFFFFF',
    textAlign: 'center',
    width: 64,
  },
  navBarHeader: {
    flex: 1,
    paddingLeft: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navBar: {
    flexDirection: 'row',
    paddingTop: 30,
    height: 64,
    backgroundColor: '#1EAAF1',
  },
  normalText: {
    backgroundColor: 'black',
    color: 'gray',
  },
});

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentWillMount() {
    try {
      let items = (await AsyncStorage.getItem('items')) || ['[]'];
      items = JSON.parse(items);
      this.setState({ items });
    } catch (err) {
      alert(err);
    }
  }

  deleteItem = async (key) => {
    try {
      this.state.items.splice(key, 1);
      this.setState({ items: this.state.items });

      await AsyncStorage.setItem('items', JSON.stringify(this.state.items));
    } catch (err) {
      console.log(err);
    }
  };

  editItem = (key) => {
    this.props.navigation.navigate('EditItem', { key });
  };

  render() {
    let items = [];
    items = this.state.items.map((value, key) => {
      return (
        <Item
          key={key}
          keyval={key}
          val={value}
          name={value.name}
          description={value.description}
          quantity={value.quantity}
          image={value.image}
          editMethod={() => this.editItem(key)}
          deleteMethod={() => this.deleteItem(key)}
        />
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Shopping List</Text>
        </View>
        <ScrollView>{items}</ScrollView>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddItem')}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Cart.propTypes = {
  navigation: PropTypes.object,
};

Cart.defaultProps = {
  navigation: null,
};

export default Cart;

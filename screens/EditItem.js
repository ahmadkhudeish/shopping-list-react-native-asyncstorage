import React from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'stretch',
    color: 'gray',
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
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
  container: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#1EAAF1',
    width: 'auto',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      quantity: '',
      image: '',
    };
  }
  async componentWillMount() {
    try {
      await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            const key = store[i][0];
            const value = store[i][1];
            const filtered = JSON.parse(value);
            this.setState({ ...filtered[this.props.navigation.state.params.key] });
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  saveData = async () => {
    try {
      const item = {
        name: this.state.name,
        description: this.state.description,
        quantity: this.state.quantity,
        image: this.state.image,
      };

      let items = (await AsyncStorage.getItem('items')) || '[]';
      console.log(items);

      items = JSON.parse(items);
      items.splice(this.props.navigation.state.params.key, 1);
      items.push(item);

      await AsyncStorage.clear();
      AsyncStorage.setItem('items', JSON.stringify(items)).then(() => {
        alert('Saved successfully.');
      });
    } catch (err) {
      console.log(err);
    }
  };

  goToCart = () => {
    this.props.navigation.navigate('Cart');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Text style={styles.navBarButton} onPress={this.goToCart}>
            Back
          </Text>
          <Text style={styles.navBarHeader}>Edit Item</Text>
          <Text style={styles.navBarButton} />
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          placeholderTextColor="gray"
          underlineColorAndroid="transparent"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Description"
          onChangeText={(description) => this.setState({ description })}
          value={this.state.description}
          placeholderTextColor="gray"
          underlineColorAndroid="transparent"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Quantity"
          onChangeText={(quantity) => this.setState({ quantity })}
          value={this.state.quantity}
          placeholderTextColor="gray"
          underlineColorAndroid="transparent"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Image URL"
          onChangeText={(image) => this.setState({ image })}
          value={this.state.image}
          placeholderTextColor="gray"
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity style={styles.saveButton} onPress={this.saveData}>
          <Text style={styles.addButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

EditItem.propTypes = {
  navigation: PropTypes.object,
};

EditItem.defaultProps = {
  navigation: null,
};

export default EditItem;

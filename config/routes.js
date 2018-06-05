/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';

import AddItem from '../screens/AddItem';
import EditItem from '../screens/EditItem';
import Cart from '../screens/Cart';

export const CartStack = StackNavigator(
  {
    Cart: {
      screen: Cart,
    },
    AddItem: {
      screen: AddItem,
    },
    EditItem: {
      screen: EditItem,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

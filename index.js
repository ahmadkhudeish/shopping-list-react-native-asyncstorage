import React from 'react';
import { StatusBar, View } from 'react-native';

import { CartStack } from './config/routes';

const App = () => {
  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <CartStack />
    </View>
  );
};

export default App;

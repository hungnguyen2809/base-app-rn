import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App: React.FC = () => {
  return (
    <View style={styles.main}>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

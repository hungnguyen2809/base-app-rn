import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonBase, ToastSnackbar } from '@/components';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <ButtonBase
        title="Click Me"
        onPress={() => {
          ToastSnackbar.openGeneral('Hello World');
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

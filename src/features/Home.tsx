import { ButtonBase, ToastSnackbar } from '@/components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

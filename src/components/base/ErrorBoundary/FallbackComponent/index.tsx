import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export type Props = { error: Error; resetError: () => void };

const FallbackComponent: React.FC<Props> = (props) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.subtitle}>Đã có lỗi sảy ra !</Text>
      <Text style={styles.error}>{props.error.toString()}</Text>

      <TouchableOpacity style={styles.button} onPress={props.resetError}>
        <Text style={styles.buttonText}>Thử lại</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default FallbackComponent;

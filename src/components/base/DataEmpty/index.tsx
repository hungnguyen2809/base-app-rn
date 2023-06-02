import { Colors, Images } from '@/constants';
import { setWidth } from '@/utils';
import React, { memo } from 'react';
import {
  Image,
  ImageSourcePropType,
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
} from 'react-native';
import TextBase from '../TextBase';

interface Props extends ScrollViewProps {
  message?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
  sourceImage?: ImageSourcePropType;
}

const DataEmpty: React.FC<Props> = ({
  message,
  onRefresh,
  refreshing = false,
  sourceImage = Images.DATA_EMPTY,
  ...props
}) => {
  return (
    <ScrollView
      refreshControl={
        onRefresh ? (
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            colors={[Colors.PRIMARY]}
            tintColor={Colors.PRIMARY}
          />
        ) : undefined
      }
      {...props}>
      <View style={styles.container}>
        <Image source={sourceImage} style={styles.image} />
        <TextBase>{message ? message : 'Không có dữ liệu'}</TextBase>
      </View>
    </ScrollView>
  );
};

export default memo(DataEmpty);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: setWidth(25),
    height: setWidth(25),
  },
});

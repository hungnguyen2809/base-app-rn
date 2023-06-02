import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

interface BlockProps extends ViewStyle {}

const Block: React.FC<PropsWithChildren<BlockProps>> = (props) => {
  return <View style={props}>{props.children}</View>;
};

export default Block;

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  type ViewStyleColor = { style?: { color?: string } };
  const content: React.FC<SvgProps & ViewStyleColor>;
  export default content;
}

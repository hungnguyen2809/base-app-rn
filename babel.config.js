module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [require.resolve('babel-plugin-module-resolver'), { root: ['.'], alias: { '@': './src' } }],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};

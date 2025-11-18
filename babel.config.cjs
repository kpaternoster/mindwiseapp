module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
        alias: {
          '@app': './src/app',
          '@features': './src/features',
          '@components': './src/components',
          '@design': './src/design',
          '@lib': './src/lib',
          '@store': './src/store',
          '@config': './src/config',
          '@services': './src/services',
          '@types': './src/types',
          '@hooks': './src/hooks',
          '@assets': './src/assets',
        },
      },
    ],
    'react-native-worklets/plugin'
  ],
};

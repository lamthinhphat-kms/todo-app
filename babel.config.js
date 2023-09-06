module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env"
    }],
    'react-native-reanimated/plugin',
    ['module-resolver', {
      root: ["."],
      extensions: [
        '.ts',
        '.tsx',
        '.jsx',
        '.js',
        '.json',
        '.svg',
        '.jpg'
      ],
      "alias": {
        api:["./src/api"],
        components: ["./src/components"],
        constants: ["./src/constants"],
        hooks: ["./src/hooks"],
        models: ["./src/models"],
        navigation: ["./src/navigation"],
        redux: ["./src/redux"],
        utils: ["./src/utils"],
        views: ["./src/views"],
        zustand: ["./src/zustand"],
        context: ["./src/context"],
        socket: ["./src/socket"],
      }
    }]
  ]
};

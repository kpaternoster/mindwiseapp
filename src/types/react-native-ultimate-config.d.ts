declare module 'react-native-ultimate-config' {
    type EnvMap = Record<string, string | undefined> & {
      API_URL?: string;
    };
  
    const Config: EnvMap;
    export default Config;
  }
  
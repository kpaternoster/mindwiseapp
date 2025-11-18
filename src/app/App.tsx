import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { AuthProvider } from '@hooks/AuthContext';
import { initializeOneSignal } from '@services/OneSignalService';
import '../../global.css';

function App() {
  useEffect(() => {
    // Initialize OneSignal
    initializeOneSignal();
  }, []);

  return (
    <KeyboardProvider>
      <View className='flex-1'>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </View>
    </KeyboardProvider>
  );
}

export default App;

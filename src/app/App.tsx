import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { AuthProvider } from '@hooks/AuthContext';
import { initializeOneSignal } from '@services/OneSignalService';
import '../../global.css';

function App() {
  useEffect(() => {
    // Initialize OneSignal asynchronously to prevent blocking app render
    // Use setTimeout to ensure app renders first, then initialize OneSignal
    const initOneSignal = async () => {
      try {
        // Small delay to ensure app UI renders first
        await new Promise<void>(resolve => setTimeout(() => resolve(), 100));
        initializeOneSignal();
      } catch (error) {
        console.error('Failed to initialize OneSignal:', error);
        // App should continue to work even if OneSignal fails
      }
    };

    initOneSignal();
  }, []);

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <View className='flex-1'>
          <AuthProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </View>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}

export default App;

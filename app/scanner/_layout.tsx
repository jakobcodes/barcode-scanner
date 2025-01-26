import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function ScannerLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack screenOptions={{ 
      headerShown: false,
      headerStyle: {
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      },
      headerTintColor: isDark ? '#ffffff' : '#000000',
      headerShadowVisible: false,
    }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="manual-entry" 
        options={{ 
          headerShown: true,
          title: 'Manual Entry',
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen 
        name="product" 
        options={{ 
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
} 
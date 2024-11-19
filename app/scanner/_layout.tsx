import { Stack } from 'expo-router';

export default function ScannerLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Scan Barcode',
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen 
        name="manual-entry" 
        options={{ 
          title: 'Manual Entry',
          headerBackTitle: 'Back'
        }} 
      />
    </Stack>
  );
} 
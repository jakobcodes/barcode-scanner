import { Stack } from "expo-router";
import { ScannerProvider } from './context/ScannerContext';

export default function RootLayout() {
  return (
    <ScannerProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Home',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="scanner" 
          options={{ 
            title: 'Scan Barcode',
            presentation: 'modal',
          }} 
        />
      </Stack>
    </ScannerProvider>
  );
}

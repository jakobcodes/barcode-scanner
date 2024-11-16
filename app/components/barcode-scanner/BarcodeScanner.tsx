import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ScannerOverlay } from './ScannerOverlay';
import { ProductDetails } from './ProductDetails';

interface BarcodeScannerProps {
  onScan?: (data: string) => void;
  onScanComplete?: (data: string) => void;
}

export function BarcodeScanner({ onScan, onScanComplete }: BarcodeScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Requesting camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return null; // You might want to show a permission denied message here
  }

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    console.log('Barcode scanned:', data);
    setScanned(true);
    setScannedData(data);
    onScan?.(data);
    
    // Call the completion handler after a short delay to allow feedback
    if (onScanComplete) {
      setTimeout(() => {
        onScanComplete(data);
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_e', 'upc_a'],
        }}
      />
      <ScannerOverlay />
      {scanned && scannedData && (
        <ProductDetails
          product={null}
          onReset={() => setScanned(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

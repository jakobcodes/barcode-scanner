import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../ui/Button';
import { useCameraPermissions } from 'expo-camera';
import { useScannerContext } from '../../context/ScannerContext';

export function HomePage() {
  const [permission, requestPermission] = useCameraPermissions();
  const { scannedData } = useScannerContext();

  const handleScanPress = async () => {
    if (!permission?.granted) {
      const permissionResult = await requestPermission();
      if (!permissionResult.granted) {
        return;
      }
    }
    router.push('/scanner');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Scanner</Text>
      
      {scannedData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Last Scanned Code:</Text>
          <Text style={styles.resultText}>{scannedData}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button 
          onPress={handleScanPress}
          style={styles.button}
        >
          Scan Barcode
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultContainer: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
});

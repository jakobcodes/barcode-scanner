import { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Link, router, useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

export default function Scanner() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isProcessing = useRef(false); // Add this ref to track processing state

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    try {
      if (!isScanning || isProcessing.current) return; // Check if already processing
      
      isProcessing.current = true; // Set processing flag
      setIsScanning(false);
      console.log("Barcode", data);
  
      router.push({
        pathname: "/scanner/product",
        params: { 
          barcode: data,
        }
      });
    } catch (err) {
      console.log("Error processing barcode", err);
      setError('Failed to process barcode. Please try again.');
      setIsScanning(true);
      isProcessing.current = false; // Reset processing flag on error
    } 
  };

  useFocusEffect(
    useCallback(() => {
      const resetScanner = () => {
        setIsScanning(true);
        setError(null);
        isProcessing.current = false;
      };

      // Reset scanner when screen comes into focus
      resetScanner();

      return () => {
        setIsScanning(false);
        isProcessing.current = false;
      };
    }, [])
  );

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <MaterialIcons name="camera-alt" size={64} color="#fff" style={styles.icon} />
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <View style={styles.buttonGroup}>
          <Button onPress={requestPermission} title="Grant Permission" />
          <View style={styles.buttonSpacer} />
          <Link href="/scanner/manual-entry" asChild>
            <Button title="Enter Manually" />
          </Link>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "code128"]
        }}
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          {/* Top section */}
          <View style={styles.topSection}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                  onPress={() => setError(null)}
                  style={styles.dismissButton}
                >
                  <MaterialIcons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Middle section with scan area */}
          <View style={styles.middleSection}>
            <View style={styles.scanAreaContainer}>
              <View style={styles.scanArea}>
                <View style={[styles.cornerTL, styles.corner]} />
                <View style={[styles.cornerTR, styles.corner]} />
                <View style={[styles.cornerBL, styles.corner]} />
                <View style={[styles.cornerBR, styles.corner]} />
              </View>
              <Text style={styles.scanText}>
                {isScanning ? 'Align barcode within frame' : 'Processing...'}
              </Text>
            </View>
          </View>

          {/* Bottom section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
              <MaterialIcons name="flip-camera-ios" size={32} color="#fff" />
              <Text style={styles.buttonText}>Flip</Text>
            </TouchableOpacity>
            
            <Link href="/scanner/manual-entry" asChild>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="keyboard" size={32} color="#fff" />
                <Text style={styles.buttonText}>Manual</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  icon: {
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  message: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    padding: 16,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  buttonSpacer: {
    width: 16,
  },
  topSection: {
    flex: 1,
    padding: 20,
  },
  middleSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
  },
  errorContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  dismissButton: {
    padding: 4,
  },
  scanAreaContainer: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE/3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#fff',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  scanText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 4,
  },
  iconButton: {
    alignItems: 'center',
    padding: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
}); 
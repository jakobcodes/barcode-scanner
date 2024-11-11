import { StyleSheet, Text, View } from 'react-native';

export function ScannerOverlay() {
  return (
    <View style={styles.overlay}>
      <Text style={styles.overlayText}>
        Align barcode within the frame to scan
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
    borderRadius: 8,
  },
});

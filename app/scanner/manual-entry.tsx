import { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { router } from 'expo-router';

export default function ManualEntry() {
  const [barcode, setBarcode] = useState('');

  const handleSubmit = () => {
    if (barcode.trim()) {
      // For now, just alert the data. Later we'll integrate with the API
      alert(`Barcode entered manually: ${barcode}`);
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={barcode}
        onChangeText={setBarcode}
        placeholder="Enter barcode number"
        keyboardType="numeric"
        autoFocus
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
}); 
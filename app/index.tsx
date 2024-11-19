import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Link href="/scanner" asChild>
        <Button title="Scan Barcode" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useStorage } from '../hooks/use-storage';
import { ProductDetails } from '../components/Product/ProductDetails';
import { ErrorView } from '../components/ui/ErrorView';

export default function HistoryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { storageState, updateLastViewed } = useStorage();

  const product = storageState.recentScans.find(scan => scan._id === id);

  useEffect(() => {
    if (id) {
      updateLastViewed(id);
    }
  }, [id, updateLastViewed]);

  if (!product) {
    return (
      <View style={styles.container}>
        <ErrorView message="Product not found" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ProductDetails product={product} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
}); 
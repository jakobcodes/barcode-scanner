import { useLocalSearchParams, router } from 'expo-router';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ProductDetails } from '../components/Product/ProductDetails';
import { ErrorView } from '../components/ui/ErrorView';
import { LoadingView } from '../components/ui/LoadingView';
import { useProduct } from '../hooks/use-product';
import { useEffect } from 'react';

export default function ProductScreen() {
  const { barcode } = useLocalSearchParams<{ barcode: string }>();
  const { product, loading, error } = useProduct(barcode);

  // Handle invalid barcode
  useEffect(() => {
    if (!barcode) {
      router.back();
    }
  }, [barcode]);

  // Show loading state in a clean way
  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingView />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.container}>
        <ErrorView message={error?.message || 'Product not found'} />
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
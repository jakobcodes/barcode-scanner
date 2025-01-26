import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import type { StorageProduct } from '../../lib/types/storage.types';

interface HistoryListProps {
  products: StorageProduct[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function HistoryList({ products, onRefresh, isRefreshing }: HistoryListProps) {
  const router = useRouter();

  const renderItem = ({ item }: { item: StorageProduct }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push({
        pathname: '/history/details',
        params: { id: item._id }
      })}
    >
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.product_name}</Text>
        <Text style={styles.brand}>{item.brands}</Text>
        <Text style={styles.date}>
          Scanned: {new Date(item.scannedAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products scanned yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={styles.list}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemContent: {
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  brand: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
}); 
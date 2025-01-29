import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import type { StorageProduct } from '../../lib/types/storage.types';
import { NutriScoreBadge } from '../Product/NutriScoreBadge';

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
      <View style={styles.itemContainer}>
        {item.image_front_url ? (
          <Image
            source={{ uri: item.image_front_url }}
            style={styles.image}
          />
        ) : (
          <Image
            // source={require('../../../assets/images/marcin.png')}
            style={styles.image}
          />
        ) }
        <View style={styles.itemContent}>
          <Text style={styles.title}>{item.product_name || 'Unknown name'}</Text>
          {item.brands && (
            <Text style={styles.brand}>{item.brands}</Text>
          )}
          {item.nutriscore_grade && (
            <NutriScoreBadge grade={item.nutriscore_grade as any} />
          )}
          <Text style={styles.date}>
            Scanned: {new Date(item.scannedAt).toLocaleDateString()}
          </Text>
        </View>
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
    padding: 12,
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  itemContent: {
    flex: 1,
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
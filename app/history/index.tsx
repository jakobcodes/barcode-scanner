import { View, StyleSheet } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { HistoryList } from '../components/History/HistoryList';
import { useStorage } from '../hooks/use-storage';

export default function HistoryScreen() {
  const { storageState, loadStorage } = useStorage();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadStorage();
  }, [loadStorage, storageState]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await loadStorage();
    } finally {
      setIsRefreshing(false);
    }
  }, [loadStorage]);

  return (
    <View style={styles.container}>
      <HistoryList
        products={storageState.recentScans}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 
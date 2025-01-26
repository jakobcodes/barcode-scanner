import { useState, useCallback } from 'react';
import { StorageHandler } from '../lib/types/storage';
import type { StorageState, StorageProduct } from '../lib/types/storage.types'
import type { Product } from '../lib/types/api.types';

export function useStorage() {
  const [storageState, setStorageState] = useState<StorageState>({ recentScans: [] });
  const [loading, setLoading] = useState(false);

  const loadStorage = useCallback(async () => {
    try {
      setLoading(true);
      const state = await StorageHandler.getState();
      setStorageState(state);
    } catch (error) {
      console.error('Error loading storage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback(async (product: Product) => {
    try {
      setLoading(true);
      await StorageHandler.addProduct(product);
      await loadStorage(); // Reload storage state
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  }, [loadStorage]);

  const clearHistory = useCallback(async () => {
    try {
      setLoading(true);
      await StorageHandler.clearHistory();
      await loadStorage();
    } catch (error) {
      console.error('Error clearing history:', error);
    } finally {
      setLoading(false);
    }
  }, [loadStorage]);

  const updateLastViewed = useCallback(async (productId: string) => {
    try {
      await StorageHandler.updateLastViewed(productId);
      await loadStorage();
    } catch (error) {
      console.error('Error updating last viewed:', error);
    }
  }, [loadStorage]);

  return {
    storageState,
    loading,
    loadStorage,
    addProduct,
    clearHistory,
    updateLastViewed,
  };
} 
import { useEffect, useState, useCallback } from 'react';
import { useApi } from './use-api';
import { useStorage } from './use-storage';
import type { Product } from '../lib/types/api.types';
import { useLocalSearchParams, router } from 'expo-router';

export function useProduct(barcode: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const { fetchProduct, loading: apiLoading, error, clearError } = useApi();
  const { addProduct, loading: storageLoading } = useStorage();
  const params = useLocalSearchParams<{ prefetched: string }>();

  const loadProduct = useCallback(async () => {
    if (!barcode) return;

    const fetchedProduct = await fetchProduct(barcode);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      await addProduct(fetchedProduct);
    }
  }, [barcode, fetchProduct, addProduct]);

  const retry = useCallback(() => {
    clearError();
    setProduct(null);
    router.back();
  }, [clearError]);

  useEffect(() => {
    if (barcode) {
      loadProduct();
    }
  }, [barcode]);

  return {
    product,
    loading: apiLoading || storageLoading,
    error,
    retry,
  };
}
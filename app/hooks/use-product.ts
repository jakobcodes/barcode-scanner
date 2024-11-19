import { useEffect, useState } from 'react';
import { useApi } from './use-api';
import { useStorage } from './use-storage';
import type { Product } from '../lib/types/api.types';
import { useLocalSearchParams } from 'expo-router';

export function useProduct(barcode: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const { fetchProduct, loading: apiLoading, error } = useApi();
  const { addProduct, loading: storageLoading } = useStorage();
  const params = useLocalSearchParams<{ prefetched: string }>();

  useEffect(() => {
    const loadProduct = async () => {
      if (!barcode) return;
      
      const fetchedProduct = await fetchProduct(barcode);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        await addProduct(fetchedProduct);
      }
    };

    loadProduct();
  }, [barcode]);

  return {
    product,
    loading: apiLoading || storageLoading,
    error,
  };
}
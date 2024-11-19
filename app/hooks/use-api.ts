import { useState } from 'react';
import { ApiHandler } from '../lib/api/apiHandler';
import type { Product, ApiError } from '../lib/types/api.types';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchProduct = async (barcode: string): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ApiHandler.getProduct(barcode);
      return response.product;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchProduct,
    loading,
    error,
  };
} 
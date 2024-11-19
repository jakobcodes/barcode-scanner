import axios, { AxiosError } from 'axios';
import { API_CONFIG } from './config';
import type { ProductResponse, ApiError } from '../types/api.types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ApiHandler {
  static async getProduct(barcode: string): Promise<ProductResponse> {
    try {
      const response = await api.get<ProductResponse>(`${API_CONFIG.ENDPOINTS.PRODUCT}/${barcode}`);
      
      if (response.data.status !== 'success') {
        throw new Error('Product not found');
      }

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const apiError: ApiError = {
        status: axiosError.response?.status || 500,
        message: axiosError.message,
        code: axiosError.code,
      };

      throw apiError;
    }
  }
} 
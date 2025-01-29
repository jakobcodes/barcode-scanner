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
        console.log(response.data);
        const apiError: ApiError = {
          status: 404,
          message: response.data.errors?.[0] || 'Product not found in the database',
          code: 'PRODUCT_NOT_FOUND'
        };
        throw apiError;
      }

      return response.data;
    } catch (error) {
      // If we already created an ApiError, just rethrow it
      if ((error as ApiError).code === 'PRODUCT_NOT_FOUND') {
        throw error;
      }

      const axiosError = error as AxiosError;
      let message = 'An unexpected error occurred';

      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 404:
            message = 'Ludzie tu nikogo nie ma';
            break;
          case 400:
            message = 'Invalid barcode format';
            break;
          case 429:
            message = 'Too many requests. Please try again later';
            break;
          case 500:
            message = 'Server error. Please try again later';
            break;
          default:
            message = `Error: ${axiosError.message}`;
        }
      } else if (axiosError.code === 'ECONNABORTED') {
        message = 'Request timed out. Please check your internet connection';
      } else if (!axiosError.response) {
        message = 'Network error. Please check your internet connection';
      }

      const apiError: ApiError = {
        status: axiosError.response?.status || 500,
        message,
        code: axiosError.code,
      };

      throw apiError;
    }
  }
} 
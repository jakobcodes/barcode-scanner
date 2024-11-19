import { Product } from './api.types';

export interface StorageProduct extends Product {
  scannedAt: number; // timestamp
  lastViewed?: number; // timestamp
}

export interface StorageState {
  recentScans: StorageProduct[];
  lastScanned?: string; // barcode
} 
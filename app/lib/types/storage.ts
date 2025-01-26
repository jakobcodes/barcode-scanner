import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StorageState, StorageProduct } from './storage.types';
import type { Product } from './api.types';

const STORAGE_KEYS = {
  STATE: '@barcode_scanner/storage_state',
} as const;

const MAX_RECENT_SCANS = 50; // Limit history to last 50 items

export class StorageHandler {
  static async getState(): Promise<StorageState> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.STATE);
      return data ? JSON.parse(data) : { recentScans: [] };
    } catch (error) {
      console.error('Error reading from storage:', error);
      return { recentScans: [] };
    }
  }

  static async saveState(state: StorageState): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving to storage:', error);
      throw error;
    }
  }

  static async addProduct(product: Product): Promise<void> {
    try {
      const state = await this.getState();
      
      // Create storage product with timestamp
      const storageProduct: StorageProduct = {
        ...product,
        scannedAt: Date.now(),
      };

      // Add to recent scans, remove duplicates, and limit size
      const recentScans = [
        storageProduct,
        ...state.recentScans.filter(scan => scan._id !== product._id)
      ].slice(0, MAX_RECENT_SCANS);

      await this.saveState({
        recentScans,
        lastScanned: product._id,
      });
    } catch (error) {
      console.error('Error adding product to storage:', error);
      throw error;
    }
  }

  static async clearHistory(): Promise<void> {
    try {
      await this.saveState({ recentScans: [] });
    } catch (error) {
      console.error('Error clearing history:', error);
      throw error;
    }
  }

  static async updateLastViewed(productId: string): Promise<void> {
    try {
      const state = await this.getState();
      const recentScans = state.recentScans.map(scan => 
        scan._id === productId 
          ? { ...scan, lastViewed: Date.now() }
          : scan
      );

      await this.saveState({ ...state, recentScans });
    } catch (error) {
      console.error('Error updating last viewed:', error);
      throw error;
    }
  }
} 
import { ProductInfo } from './types';

export async function fetchProductInfo(barcode: string): Promise<ProductInfo> {
  // In a real app, this would be an API call
  return {
    name: 'Organic Whole Milk',
    brand: 'Happy Cows',
    nutritionalValues: {
      calories: 150,
      protein: '8g',
      fat: '8g',
      carbs: '12g',
      sugar: '12g',
    },
    ingredients: ['Organic Whole Milk'],
    certifications: ['USDA Organic', 'Non-GMO'],
    sustainabilityScore: 8.5,
  };
}

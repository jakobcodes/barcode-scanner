export interface ProductResponse {
  code: string;
  status: string;
  product: Product;
  errors?: string[];
}

export interface Product {
  _id: string;
  product_name: string;
  brands: string;
  categories: string;
  image_front_url: string;
  image_ingredients_url: string;
  image_nutrition_url: string;
  ingredients_text: string;
  allergens_tags: string[];
  nutriments: Nutriments;
  nutriscore_grade?: string;
  ecoscore_grade?: string;
  labels_tags: string[];
  ingredients_analysis_tags: string[];
  traces_tags: string[];
  serving_size?: string;
  product_quantity?: string;
  origins?: string;
}

export interface Nutriments {
  energy_100g: number;
  proteins_100g: number;
  carbohydrates_100g: number;
  fat_100g: number;
  fiber_100g?: number;
  sugars_100g?: number;
  salt_100g?: number;
  'saturated-fat_100g'?: number;
  sodium_100g?: number;
}

export type ApiError = {
  status: number;
  message: string;
  code?: string;
} 
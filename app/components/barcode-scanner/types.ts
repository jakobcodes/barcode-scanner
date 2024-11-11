export interface NutritionalValues {
  calories: number;
  protein: string;
  fat: string;
  carbs: string;
  sugar: string;
}

export interface ProductInfo {
  name: string;
  brand: string;
  nutritionalValues: NutritionalValues;
  ingredients: string[];
  certifications: string[];
  sustainabilityScore: number;
}

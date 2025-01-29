import { View, Text, Image, StyleSheet } from 'react-native';
import type { Product } from '../../lib/types/api.types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { NutriScoreBadge } from './NutriScoreBadge';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <View style={styles.container}>
      {product.image_front_url && (
        <Image 
          source={{ uri: product.image_front_url }} 
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Card style={styles.section}>
        <Text style={styles.title}>{product.product_name}</Text>
        <Text style={styles.brand}>{product.brands}</Text>
        {product.origins && (
          <Text style={styles.origin}>{product.origins}</Text>
        )}
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.ingredients}>{product.ingredients_text}</Text>
      </Card>

      {product.allergens_tags.length > 0 && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Allergens</Text>
          <View style={styles.badges}>
            {product.allergens_tags.map((allergen) => (
              <Badge 
                key={allergen} 
                label={allergen.replace('en:', '')} 
                type="warning" 
              />
            ))}
          </View>
        </Card>
      )}

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Nutrition Facts</Text>
        <View style={styles.nutritionGrid}>
          <NutritionItem 
            label="Energy" 
            value={`${product.nutriments.energy_100g} kcal`} 
          />
          <NutritionItem 
            label="Proteins" 
            value={`${product.nutriments.proteins_100g}g`} 
          />
          <NutritionItem 
            label="Carbs" 
            value={`${product.nutriments.carbohydrates_100g}g`} 
          />
          <NutritionItem 
            label="Fat" 
            value={`${product.nutriments.fat_100g}g`} 
          />
        </View>
      </Card>

      {(product.nutriscore_grade || product.ecoscore_grade) && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Scores</Text>
          <View style={styles.scores}>
            {product.nutriscore_grade && (
              <NutriScoreBadge grade={product.nutriscore_grade.toLowerCase() as any} />
            )}
            {product.ecoscore_grade && (
              <NutriScoreBadge grade={product.ecoscore_grade.toLowerCase() as any} />
            )}
          </View>
        </Card>
      )}
    </View>
  );
}

function NutritionItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.nutritionItem}>
      <Text style={styles.nutritionLabel}>{label}</Text>
      <Text style={styles.nutritionValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  section: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  origin: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  ingredients: {
    fontSize: 14,
    lineHeight: 20,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  nutritionItem: {
    flex: 1,
    minWidth: '40%',
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#666',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  scores: {
    flexDirection: 'row',
    gap: 8,
  },
}); 
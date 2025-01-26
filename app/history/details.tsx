import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useStorage } from '../hooks/use-storage';

export default function HistoryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { storageState, updateLastViewed } = useStorage();

  const product = storageState.recentScans.find(scan => scan._id === id);

  useEffect(() => {
    if (id) {
      updateLastViewed(id);
    }
  }, [id, updateLastViewed]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {product.image_front_url && (
        <Image
          source={{ uri: product.image_front_url }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{product.product_name}</Text>
        <Text style={styles.brand}>{product.brands}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.text}>{product.categories}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.text}>{product.ingredients_text}</Text>
        </View>

        {product.allergens_tags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Allergens</Text>
            <Text style={styles.text}>
              {product.allergens_tags.map(allergen => 
                allergen.replace('en:', '')
              ).join(', ')}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition Facts (per 100g)</Text>
          <View style={styles.nutriments}>
            <Text style={styles.text}>Energy: {product.nutriments.energy_100g}kcal</Text>
            <Text style={styles.text}>Proteins: {product.nutriments.proteins_100g}g</Text>
            <Text style={styles.text}>Carbohydrates: {product.nutriments.carbohydrates_100g}g</Text>
            <Text style={styles.text}>Fat: {product.nutriments.fat_100g}g</Text>
            {product.nutriments.fiber_100g && (
              <Text style={styles.text}>Fiber: {product.nutriments.fiber_100g}g</Text>
            )}
            {product.nutriments.sugars_100g && (
              <Text style={styles.text}>Sugars: {product.nutriments.sugars_100g}g</Text>
            )}
            {product.nutriments.salt_100g && (
              <Text style={styles.text}>Salt: {product.nutriments.salt_100g}g</Text>
            )}
          </View>
        </View>

        {(product.nutriscore_grade || product.ecoscore_grade) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scores</Text>
            {product.nutriscore_grade && (
              <Text style={styles.text}>Nutri-Score: {product.nutriscore_grade.toUpperCase()}</Text>
            )}
            {product.ecoscore_grade && (
              <Text style={styles.text}>Eco-Score: {product.ecoscore_grade.toUpperCase()}</Text>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scan Information</Text>
          <Text style={styles.text}>
            Scanned: {new Date(product.scannedAt).toLocaleString()}
          </Text>
          {product.lastViewed && (
            <Text style={styles.text}>
              Last viewed: {new Date(product.lastViewed).toLocaleString()}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brand: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  nutriments: {
    gap: 4,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
  },
}); 
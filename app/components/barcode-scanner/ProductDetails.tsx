import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProductInfo } from './types';
import { Button } from '../../ui/Button';

interface ProductDetailsProps {
  product: ProductInfo | null;  
  onReset: () => void;
}

export function ProductDetails({ product, onReset }: ProductDetailsProps) {
  if (!product) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.brand}>{product.brand}</Text>
      
      <Section title="Nutritional Values">
        {Object.entries(product.nutritionalValues).map(([key, value]) => (
          <Text key={key} style={styles.infoText}>
            {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
          </Text>
        ))}
      </Section>
      
      <Section title="Ingredients">
        {product.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.infoText}>{ingredient}</Text>
        ))}
      </Section>
      
      <Section title="Certifications">
        {product.certifications.map((cert, index) => (
          <Text key={index} style={styles.infoText}>{cert}</Text>
        ))}
      </Section>
      
      <Section title="Sustainability Score">
        <Text style={styles.infoText}>{product.sustainabilityScore} / 10</Text>
      </Section>
      
      <Button onPress={onReset} style={styles.button}>
        Scan Another Product
      </Button>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  brand: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#444',
  },
  button: {
    marginTop: 20,
  },
});

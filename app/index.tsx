import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#fff' : '#000';
  const cardBg = isDark ? '#1a1a1a' : '#ffffff';
  const shadowColor = isDark ? '#000' : '#888';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#f5f5f5' }]}>
      <View style={styles.header}>
        <Ionicons name="barcode-outline" size={80} color={textColor} />
        <Text style={[styles.title, { color: textColor }]}>
          Welcome to{'\n'}Barcode Scanner
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        <Pressable 
          style={[styles.card, { backgroundColor: cardBg, shadowColor }]} 
          onPress={() => router.push('/scanner')}
        >
          <Ionicons name="scan-circle-outline" size={40} color={textColor} />
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: textColor }]}>Scan Barcode</Text>
            <Text style={[styles.cardDescription, { color: textColor }]}>
              Scan product barcodes quickly and easily
            </Text>
          </View>
        </Pressable>

        <Pressable 
          style={[styles.card, { backgroundColor: cardBg, shadowColor }]}
          onPress={() => router.push('/history')}
        >
          <Ionicons name="time-outline" size={40} color={textColor} />
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: textColor }]}>View History</Text>
            <Text style={[styles.cardDescription, { color: textColor }]}>
              Check your previous scans and details
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 40,
  },
  cardsContainer: {
    gap: 20,
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    marginLeft: 20,
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
}); 
import { View, Text, StyleSheet } from 'react-native';

type NutriScore = 'a' | 'b' | 'c' | 'd' | 'e';

interface NutriScoreBadgeProps {
  grade: NutriScore;
}

const NUTRI_SCORE_COLORS = {
  a: {
    background: '#e8f5e9',
    text: '#1b5e20'
  },
  b: {
    background: '#f1f8e9',
    text: '#33691e'
  },
  c: {
    background: '#fff8e1',
    text: '#bf360c'
  },
  d: {
    background: '#fff3e0',
    text: '#e65100'
  },
  e: {
    background: '#ffebee',
    text: '#c62828'
  }
} as const;

export function NutriScoreBadge({ grade }: NutriScoreBadgeProps) {
  const normalizedGrade = grade.toLowerCase() as NutriScore;
  const colors = NUTRI_SCORE_COLORS[normalizedGrade];

  return (
    <View style={[styles.badge, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Nutri-Score: {grade.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
}); 
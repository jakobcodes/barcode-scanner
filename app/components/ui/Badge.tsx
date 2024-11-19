import { View, Text, StyleSheet } from 'react-native';

type BadgeType = 'default' | 'warning' | 'success' | 'error';

interface BadgeProps {
  label: string;
  type?: BadgeType;
}

export function Badge({ label, type = 'default' }: BadgeProps) {
  return (
    <View style={[styles.container, styles[type]]}>
      <Text style={[styles.text, styles[`${type}Text`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  default: {
    backgroundColor: '#e0e0e0',
  },
  defaultText: {
    color: '#666',
  },
  warning: {
    backgroundColor: '#fff3cd',
  },
  warningText: {
    color: '#856404',
  },
  success: {
    backgroundColor: '#d4edda',
  },
  successText: {
    color: '#155724',
  },
  error: {
    backgroundColor: '#f8d7da',
  },
  errorText: {
    color: '#721c24',
  },
}); 
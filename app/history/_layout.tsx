import { Stack } from 'expo-router';
import { useColorScheme, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStorage } from '../hooks/use-storage';

export default function HistoryLayout() {
  const colorScheme = useColorScheme();
  const { clearHistory } = useStorage();

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all scan history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearHistory,
        },
      ]
    );
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'History',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          headerRight: () => (
            <TouchableOpacity onPress={handleClearHistory} style={{ marginRight: 16 }}>
              <Ionicons
                name="trash-outline"
                size={24}
                color={colorScheme === 'dark' ? '#fff' : '#000'}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        }}
      />
    </Stack>
  );
} 
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

interface ErrorViewProps {
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export function ErrorView({ message, action }: ErrorViewProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.content,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }
      ]}>
        <Image 
          source={require('../../../assets/images/najman.jpeg')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.message}>{message}</Text>
          {action && (
            <TouchableOpacity 
              style={styles.button} 
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>{action.label}</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 28,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  message: {
    fontSize: 18,
    color: '#171717',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 26,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  button: {
    backgroundColor: '#000000',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
}); 
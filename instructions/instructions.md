# Product Requirements Document (PRD)

## Project Overview

The Barcode Scanning App allows users to scan product barcodes, fetch detailed product information using the Open Food Facts API, and display data in an intuitive, user-friendly manner. Users can also view a history of scanned products and access insightful visualizations of nutritional and environmental impact.

## Core Functionalities and Requirements

1. Barcode Scanning

	•	Objective: Provide users with a seamless way to scan barcodes.
	•	Requirements:
	•	Access the device’s camera for barcode scanning.
	•	Notify users of scanning success or failure.
	•	Allow users to retry scans or enter barcodes manually if needed.

2. Product Lookup

	•	Objective: Fetch product details after scanning.
	•	Requirements:
	•	Use the Open Food Facts API to retrieve product information.
	•	Handle missing products with a “Product Not Found” message.

3. Product Information Display

	•	Objective: Show relevant product details cleanly and comprehensively.
	•	Requirements:
	•	Display product name, brand, ingredients, nutrition facts, allergen details, palm oil/vegan/vegetarian status, Nutri-Score/Eco-Score, and environmental impact.
	•	Include graphs for nutrient levels (fat, sugar, etc.) and a dynamic health meter for overall health ratings.

4. History Management

	•	Objective: Keep a searchable history of scanned products.
	•	Requirements:
	•	Store a list of scanned products with options to view details.
	•	Allow users to clear history or search through previous scans.

5. Data Visualization

	•	Objective: Present product data in visually compelling ways.
	•	Requirements:
	•	Include charts for nutrient levels and category comparisons.
	•	Add a dynamic health meter indicating product health scores.

6. Shared Layouts

	•	Objective: Maintain a consistent user interface across screens.
	•	Requirements:
	•	Use _layout.tsx to define shared UI elements like headers, footers, and navigation.
	•	Ensure all child routes under a folder inherit the shared layout.


## Development Phases

### Phase 1: Foundation & Basic Scanning

#### 1. Project Setup
- Set up file structure
- Configure basic navigation
- Implement shared layouts

#### 2. Camera & Barcode Integration
- Implement camera permissions
- Basic camera view
- Barcode scanner integration
- Manual entry fallback
- Basic error handling

### Phase 2: API Integration & Data Model

#### 1. API Setup
- Open Food Facts API integration
- API error handling
- Response type definitions
- Basic product data model

#### 2. Local Storage
- Set up AsyncStorage
- Define storage schema
- Basic CRUD operations

### Phase 3: Core Product Features

#### 1. Basic Product Display
- Product details screen
- Basic information layout
- Loading states
- Error states

#### 2. Enhanced Product Information
- Detailed nutritional info
- Allergen display
- Status indicators (vegan, etc.)
- Environmental impact

### Phase 4: History & Search

#### 1. History Management
- History storage implementation
- Basic history list
- Product detail access
- Clear history function

#### 2. Search Functionality
- Search interface
- Filter implementation
- Search history

### Phase 5: Data Visualization

#### 1. Basic Charts
- Nutrient level charts
- Basic health meter
- Category comparisons

#### 2. Enhanced Visualization
- Interactive charts
- Dynamic health scoring
- Comparative analytics

### Phase 6: Polish & Optimization

#### 1. UI/UX Enhancement
- Consistent styling
- Animations
- Loading states
- Error handling

#### 2. Performance
- Caching
- Offline support
- Performance optimization

## Proposed File Structure

The file structure is designed for a React Native app using Expo Router with _layout.tsx to simplify layout management and ensure consistency.

app/  
├── index.tsx                     # Home screen  
├── _layout.tsx                   # Global shared layout for all screens  
├── scanner/  
│   ├── _layout.tsx               # Shared layout for scanner-related screens  
│   ├── index.tsx                 # Barcode scanner screen  
│   └── manual-entry.tsx          # Manual barcode entry screen  
├── history/  
│   ├── _layout.tsx               # Shared layout for history-related screens  
│   ├── index.tsx                 # History overview screen  
│   └── details.tsx               # Product details from history  
├── product/  
│   ├── _layout.tsx               # Shared layout for product-related screens  
│   ├── index.tsx                 # Product information display  
│   └── visualization.tsx         # Graphs and health meter visualization  
├── components/  
│   ├── ui/                       # Reusable UI components  
│   │   ├── Button.tsx  
│   │   ├── Card.tsx  
│   │   └── Icon.tsx  
│   ├── Scanner/  
│   │   ├── BarcodeScanner.tsx    # Barcode scanning functionality  
│   │   └── ManualEntryForm.tsx   # Manual entry component  
│   │   ├── Loading.tsx          # Loading spinner/states
│   │   ├── ErrorBoundary.tsx    # Error handling component
│   │   ├── Toast.tsx            # Toast notifications
│   │   └── Modal.tsx            # Reusable modal component
│   │   ├── ScannerOverlay.tsx   # Camera overlay UI
│   │   ├── NutritionChart.tsx   # Nutrition data visualization
│   │   └── EcoScore.tsx         # Environmental score display
│   ├── Product/  
│   │   ├── ProductDetails.tsx    # Product information display  
│   │   └── HealthMeter.tsx       # Dynamic health meter component  
│   └── History/  
│       ├── HistoryList.tsx       # List of scanned products  
│       └── HistoryDetails.tsx    # Detailed view for a scanned product  
│       └── SearchBar.tsx         # History search component
├── hooks/  
│   ├── use-toast.ts              # Notifications for success/errors  
│   ├── use-api.ts                # Hook for API integration  
│   ├── use-product.ts           # Product data management
│   ├── use-history.ts           # History management
│   ├── use-scanner.ts           # Scanner functionality
│   └── use-permissions.ts       # Permission management
├── lib/  
│   ├── utils.ts                  # General utilities  
│   ├── apiHandler.ts             # API communication logic  
│   ├── storage.ts               # Local storage utilities
│   ├── permissions.ts           # Permission handling
│   ├── constants.ts             # App constants
│   └── validation.ts            # Data validation
├── config/  
│   ├── tailwind.config.ts        # Tailwind CSS configuration  
│   ├── api.config.ts            # API configuration
│   └── theme.config.ts          # Theme configuration
├── styles/  
│   └── globals.css               # Global styles  
├── types/  
│   ├── productTypes.ts           # Type definitions for product data  
│   └── index.d.ts                # Global types  
├── store/                        # State management
│   ├── index.ts                 # Store configuration
│   ├── productSlice.ts          # Product-related state
│   ├── historySlice.ts          # History-related state
│   └── settingsSlice.ts         # App settings state
├── navigation/                   # Navigation helpers
│   ├── types.ts                 # Navigation type definitions
│   └── linking.ts               # Deep linking configuration
├── assets/
│   ├── fonts/                   # Custom fonts
│   ├── images/                  # Static images
│   └── icons/                   # App icons

## Docs

### EXAMPLE: Global Layout (app/_layout.tsx)

```tsx
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
```

### EXAMPLE: Tab Layout (app/tabs/_layout.tsx)

```tsx
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```


### EXAMPLE: Basic Camera Usage using expo-camera
```tsx
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
```

## Guidelines for _layout.tsx Usage

	1.	Structure Consistency:
Use _layout.tsx in folders where screens share UI elements, such as headers or navigation bars.
	2.	Reusability:
Keep layout logic reusable across child routes without duplicating code.
	3.	Clean Design:
Maintain a minimal design while ensuring core functionalities like navigation are centralized in _layout.tsx.

By incorporating _layout.tsx, the app maintains a clean, consistent structure and reduces redundancy, enhancing both development and user experience.
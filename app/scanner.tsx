import { BarcodeScanner } from './components/barcode-scanner/BarcodeScanner';
import { useRouter } from 'expo-router';
import { useScannerContext } from './context/ScannerContext';

export default function ScannerPage() {
  const router = useRouter();
  const { setScannedData } = useScannerContext();

  const handleScan = (data: string) => {
    // Handle the scanned data
    console.log('Scanned:', data);
    setScannedData(data);
    router.back();
    // You can navigate back or to a details page
    // router.push('/details');
  };

  return <BarcodeScanner onScan={handleScan} />;
}

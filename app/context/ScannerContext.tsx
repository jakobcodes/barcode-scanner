import { createContext, useContext, useState } from 'react';

interface ScannerContextType {
  scannedData: string | null;
  setScannedData: (data: string) => void;
}

const ScannerContext = createContext<ScannerContextType | null>(null);

export function ScannerProvider({ children }: { children: React.ReactNode }) {
  const [scannedData, setScannedData] = useState<string | null>(null);
  return (
    <ScannerContext.Provider value={{ scannedData, setScannedData }}>
      {children}
    </ScannerContext.Provider>
  );
}

export const useScannerContext = () => {
  const context = useContext(ScannerContext);
  if (!context) throw new Error('useScannerContext must be used within ScannerProvider');
  return context;
};

/**
 * Validates if the given barcode is in a correct format.
 * Most common barcode formats are EAN-13, EAN-8, UPC-A, and UPC-E.
 */
export function validateBarcode(barcode: string): { isValid: boolean; error?: string } {
  // Remove any whitespace
  const cleanBarcode = barcode.trim();

  // Check if barcode is empty
  if (!cleanBarcode) {
    return { isValid: false, error: 'Barcode is empty' };
  }

  // Check if barcode contains only digits
  if (!/^\d+$/.test(cleanBarcode)) {
    return { isValid: false, error: 'Barcode should contain only numbers' };
  }

  // Check barcode length
  // EAN-13: 13 digits
  // EAN-8: 8 digits
  // UPC-A: 12 digits
  // UPC-E: 6 digits
  const validLengths = [6, 8, 12, 13];
  if (!validLengths.includes(cleanBarcode.length)) {
    return {
      isValid: false,
      error: `Invalid barcode length. Expected ${validLengths.join(', ')} digits, got ${cleanBarcode.length}`
    };
  }

  return { isValid: true };
} 
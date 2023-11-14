import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {BarcodeScanner} from '../components/BarcodeScanner';

function BarcodeScannerPage(): JSX.Element {
  const [scannerVisible, setScannerVisible] = useState(false);

  const handleOpenScanner = () => {
    setScannerVisible(true);
  };

  const handleCloseScanner = () => {
    setScannerVisible(false);
  };

  return (
    <View style={styles.container}>
      {!scannerVisible ? (
        <TouchableOpacity style={styles.button} onPress={handleOpenScanner}>
          <Text style={styles.buttonText}>Open Scanner</Text>
        </TouchableOpacity>
      ) : (
        <BarcodeScanner onClose={handleCloseScanner} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default BarcodeScannerPage;

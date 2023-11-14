/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  useCameraDevice,
  useCodeScanner,
  Code,
  Camera,
} from 'react-native-vision-camera';
import {BarcodeResultModal} from './BarcodeResultModal';
import {FC, useEffect, useState} from 'react';

type BarcodeScannerProps = {
  onClose: () => void;
  width?: number;
  height?: number;
};
const BarcodeScanner: FC<BarcodeScannerProps> = (
  props: BarcodeScannerProps,
) => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');
  const [barcodes, setBarcodes] = useState<Code[]>([]);
  const [scanning, setScanning] = useState(true);

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'code-128', 'code-93', 'code-39', 'ean-8'],
    onCodeScanned: codes => {
      if (scanning) {
        setBarcodes(codes);
        setScanning(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status !== 'denied');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFillObject}
          device={device}
          isActive={scanning}
          codeScanner={codeScanner}
          enableZoomGesture={true}
        />
        <View
          style={{
            width: props.width ?? 300,
            height: props.height ?? 300,
            backgroundColor: 'transparent',
            borderColor: 'white',
            borderWidth: 2,
          }}
        />
        <TouchableOpacity style={styles.closeButton} onPress={props.onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <BarcodeResultModal
          onClose={() => props.onClose()}
          scanning={scanning}
          setScanning={setScanning}
          barcodes={barcodes}
        />
      </>
    )
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
});

export {BarcodeScanner};

/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Code} from 'react-native-vision-camera';

type BarcodeResultProps = {
  onClose: () => void;
  scanning: boolean;
  setScanning: (value: boolean) => void;
  barcodes: Code[];
};

const BarcodeResultModal: FC<BarcodeResultProps> = (
  props: BarcodeResultProps,
) => {
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={!props.scanning}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {props.barcodes.map((barcode, idx) => (
              <Text key={idx} style={{color: '#2196F3'}}>
                BarcodeValue - {barcode.value} {'\n'}
                BarcodeType - {barcode.type}
              </Text>
            ))}
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Pressable style={styles.button} onPress={() => props.onClose()}>
                <Text style={styles.textStyle}>Done</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => props.setScanning(true)}>
                <Text style={styles.textStyle}>Scan Again</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: 100,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#2196F3',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export {BarcodeResultModal};

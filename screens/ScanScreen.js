import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scanData: '',
      buttonState: 'normal',
    };
  }
  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status == 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };
  handleBarCodeScan = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scanData: data,
      buttonState: 'normal',
    });
  };
  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === 'clicked' && hasCameraPermission) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScan}
          style={{ width: 300, height: 250, alignSelf: 'center' }}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View>
      <Image
        style={styles.image}
        source={require('../assets/barcode.jpg')}
      />
          <View style={{ marginTop: 10 }}>
            <Text style={styles.header}>Bar Code Scanner</Text>
            <Text style={styles.text}>
              {hasCameraPermission == true
                ? this.state.scanData
                : 'Request  Camera  Permission'}
            </Text>
            <TouchableOpacity
              onPress={this.getCameraPermission}
              title="Bar Code Scanner"
              style={styles.scanButton}>
              <Text style={{ fontWeight: 'bold' }}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  scanButton: {
    alignSelf: 'center',
    backgroundColor: 'dodgerblue',
    width: 165,
    height: 30,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  text: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  header: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 30,
    fontFamily: 'Times',
  },
  image: { width: 300, height: 210, alignSelf: 'center' },
});
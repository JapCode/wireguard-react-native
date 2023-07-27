/* eslint-disable prettier/prettier */
// Archivo: wireGuardBridge.js

import {NativeModules} from 'react-native';
const {WireGuardModule} = NativeModules;

export default {
  startWireGuardVpn: (serverAddress, privateKey, publicKey) => {
    console.log('wireGuardBridge.js: startWireGuardVpn');
    console.log(WireGuardModule);
    WireGuardModule.startWireGuardVpn(serverAddress, privateKey, publicKey);
  },
};

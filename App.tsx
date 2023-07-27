/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  NativeModules,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
// import wireGuardBridge from './packageTest/WireGuardPackage/wireGuardBridge';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {WireGuardModule} = NativeModules;
  console.log(WireGuardModule);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [connectionResult, setConnectionResult] = useState('');

  const handleStartVpn = async () => {
    const serverAddress = 'vpn_server_address';
    const privateKey = 'your_private_key';
    const publicKey = 'your_public_key';

    try {
      // Llama al bridge y captura el resultado simulado en connectionResult.
      const testVpn = await WireGuardModule.startWireGuardVpn(
        serverAddress,
        privateKey,
        publicKey,
      );
      console.log(testVpn);
      setConnectionResult('Conexión VPN simulada con éxito.');
    } catch (error) {
      console.log(error);
      setConnectionResult('Error al simular la conexión VPN.');
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Test</Text>
          <Text>{connectionResult}</Text>
          <Button title="Start VPN" onPress={handleStartVpn} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

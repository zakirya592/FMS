import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View ,ScrollView} from 'react-native';
import Login from './assets/Screen/Login/Login';

export default function App() {
  return (
    <View>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <Login/>
      <StatusBar style="auto" />
    </View>
  );
}


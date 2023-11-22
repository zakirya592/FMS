import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './assets/Screen/Login/Login';
import Home from './assets/Screen/Home/Home';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName = "Login"  >
        <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Drawer.Screen name="Home" component={Home} options={{
          headerTitle: '',
          headerRight: () => (
            <Image
              source={require('./assets/Screen/Image/log-removebg-preview.png')}
              resizeMode = 'cover'
               style={{
                marginTop: 10, // Adjusted margin top
              }}
            />
          ),
          headerTransparent: true,

        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Login from './assets/Screen/Login/Login';
import Home from './assets/Screen/Home/Home';
import 'react-native-gesture-handler';
import Workrequest from './assets/Screen/Work Request/Workrequest';
import Createworkrequest from './assets/Screen/Work Request/Createworkrequest';
import AssetHome from './assets/Screen/Asset Managment/HomeAsset';
import { MenuProvider } from 'react-native-popup-menu';
import Addassetcode from './assets/Screen/Work Request/Addassetcode';
import Workorder from './assets/Screen/Work Order/Workorder';
import Createworkorder from './assets/Screen/Work Order/Createworkorder';
import Locationmanagement from './assets/Screen/Location Management/Locationmanagement';
import axios from "axios";
import Preventivemaintenance from './assets/Screen/Preventive Maintenance/Preventivemaintenance';
import Createpreventivemaintenance from './assets/Screen/Preventive Maintenance/Createpreventivemaintenance';

axios.defaults.baseURL = "http://gs1ksa.org:3021";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation, state } = props;

  const toggleDrawer = () => {
    if (state.isDrawerOpen) {
      navigation.closeDrawer();
    } else {
      navigation.closeDrawer();
    }
  };

  const renderDrawerIcon = () => {
    if (state.isDrawerOpen) {
      return (
        <TouchableOpacity onPress={toggleDrawer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={toggleDrawer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 10 }}>
        {renderDrawerIcon()}
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function MainStackNavigator() {
  return (
    < Stack.Navigator initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }
      }
    >
      {/* Login */}
      <Stack.Screen name="Login" component={Login} />
      {/* Workrequest */}
      <Stack.Screen name="Workrequest" component={Workrequest} options={{ headerShown: true, title: 'Work Request' }} />
      {/* Createworkrequest */}
      <Stack.Screen name="Createworkrequest" component={Createworkrequest}
        options={{
          title: 'Create Work Request', headerShown: true, headerStyle: { backgroundColor: '#0A2DAA' }, headerTitleStyle: { color: '#FFFFFF', },
          headerTintColor: '#FFFFFF'
        }} />
        {/* Addassetcode */}
      <Stack.Screen name="Addassetcode" component={Addassetcode}
        options={{
          title: 'Asset Management', headerShown: true, headerStyle: { backgroundColor: '#0A2DAA' }, headerTitleStyle: { color: '#FFFFFF', },
          headerTintColor: '#FFFFFF'
        }} />
        {/* Workorder */}
      <Stack.Screen name="Workorder" component={Workorder}
        options={{
          title: 'Work Order', headerShown: true, headerStyle: { backgroundColor: '#0A2DAA' }, headerTitleStyle: { color: '#FFFFFF', },
          headerTintColor: '#FFFFFF'
        }} />
        {/* Createworkorder */}
         <Stack.Screen name="Createworkorder" component={Createworkorder}
        options={{
          title: 'Work Order', headerShown: true, headerStyle: { backgroundColor: '#0A2DAA' }, headerTitleStyle: { color: '#FFFFFF', },
          headerTintColor: '#FFFFFF'
        }} />
        {/* Locationmanagement */}
          <Stack.Screen name="Locationmanagement" component={Locationmanagement}
        options={{
          title: 'Location Management', headerShown: true, headerStyle: { backgroundColor: '#0A2DAA' }, headerTitleStyle: { color: '#FFFFFF', },
          headerTintColor: '#FFFFFF'
        }} />
        {/* Preventivemaintenance */ }
            <Stack.Screen name="Preventivemaintenance" component={Preventivemaintenance}
        options={{
          title: 'Preventive Management', headerShown: true, headerStyle: { backgroundColor: '#0A2DAA' }, headerTitleStyle: { color: '#FFFFFF', },
          headerTintColor: '#FFFFFF'
        }} />
         {/* Createpreventivemaintenance */ }
            <Stack.Screen name="Createpreventivemaintenance" component={Createpreventivemaintenance}
        options={{
          title: 'Preventive Maintenance', headerShown: true, headerStyle: { backgroundColor: '#0A2DAA' }, headerTitleStyle: { color: '#FFFFFF', },
          headerTintColor: '#FFFFFF'
        }} />
      {/* Asset magmanet  */}
      <Stack.Screen name="AssetHome" component={AssetHome}
        options={{
          title: 'Asset Managment', headerShown: true, headerStyle: { backgroundColor: '#0A2DAA' }, headerTitleStyle: { color: '#FFFFFF', },
          headerTintColor: '#FFFFFF'
        }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Logout"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >

          <Drawer.Screen name="Home" component={Home} options={{
            headerTitle: '',
            headerRight: () => (
              <Image
                source={require('./assets/Screen/Image/log-removebg-preview.png')}
                resizeMode='contain'
                style={{
                  marginTop: 10,
                  width: '60%',
                  height: '80%',
                }}
              />
            ),
            drawerLabelStyle: {
              color: '#1D3A9F',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: '700',

            },
          }} />

          <Drawer.Screen name="Logout" component={MainStackNavigator} options={{ headerShown: false }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

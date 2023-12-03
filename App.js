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
import { MenuProvider } from 'react-native-popup-menu';
import Addassetcode from './assets/Screen/Work Request/Addassetcode';
import Workorder from './assets/Screen/Work Order/Workorder';
import Createworkorder from './assets/Screen/Work Order/Createworkorder';
import Locationmanagement from './assets/Screen/Location Management/Locationmanagement';
import axios from "axios";
import Preventivemaintenance from './assets/Screen/Preventive Maintenance/Preventivemaintenance';
import Createpreventivemaintenance from './assets/Screen/Preventive Maintenance/Createpreventivemaintenance';
import Cleaningworks from './assets/Screen/Cleaning Works/Cleaningworks';
import Createcleaningwork from './assets/Screen/Cleaning Works/Createcleaningwork';
import Usermanagment from './assets/Screen/User management/Usermanagment';
import Systemmodules from './assets/Screen/User management/System Modules/Systemmodules';
import Userauthoritylevels from './assets/Screen/User management/User Authority Levels/Userauthoritylevels';
import UserCredentials from './assets/Screen/User management/User Credientials/UserCredentials';
import Createusercredientials from './assets/Screen/User management/User Credientials/Createusercredientials';
import Useraccess from './assets/Screen/User management/User System Access/Useraccess';
import Crreateuseraccess from './assets/Screen/User management/User System Access/Crreateuseraccess';
import Addystemaccessmodules from './assets/Screen/User management/User System Access/Addystemaccessmodules';
import Setupconfigurationrouting from './assets/Screen/Set Up & Configuration/Set Up configuration Router/Setupconfigurationrouting';
import Worktype from './assets/Screen/Set Up & Configuration/Work Type/Worktype';
import Worktrade from './assets/Screen/Set Up & Configuration/Work Trade/Worktrade';
import Workstatus from './assets/Screen/Set Up & Configuration/Work Status/Workstatus';
import Workpriority from './assets/Screen/Set Up & Configuration/Work Priority/Workpriority';
import Workcategory from './assets/Screen/Set Up & Configuration/Work Category Maintenance/Workcategory';
import Department from './assets/Screen/Set Up & Configuration/Department/Department';
import Building from './assets/Screen/Set Up & Configuration/Building/Building';
import Location from './assets/Screen/Set Up & Configuration/Location/Location';
import Problemcategory from './assets/Screen/Set Up & Configuration/Problem Category/Problemcategory';
import Requeststatus from './assets/Screen/Set Up & Configuration/Request Status/Requeststatus';
import Failurecode from './assets/Screen/Set Up & Configuration/Failure Code/Failurecode';
import Solutioncode from './assets/Screen/Set Up & Configuration/Solution Code Maintenance/Solutioncode';
import Days from './assets/Screen/Set Up & Configuration/Days Maintenance/Days';
import Floorcode from './assets/Screen/Set Up & Configuration/Set Up configuration Router/Floor Code/Floorcode';
import RoomCode from './assets/Screen/Set Up & Configuration/Room Code/RoomCode';
import Gendercode from './assets/Screen/Set Up & Configuration/Gender Code/Gendercode';
import Titlesatutation from './assets/Screen/Set Up & Configuration/Title Salutation/Titlesatutation';
import Frequency from './assets/Screen/Set Up & Configuration/Frequency Code/Frequency';
import Maritalstatus from './assets/Screen/Set Up & Configuration/Marital Status/Maritalstatus';
import Nationality from './assets/Screen/Set Up & Configuration/Nationality/Nationality';
import Assettype from './assets/Screen/Set Up & Configuration/Asset Type/Assettype';

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
          title: 'Create Work Request', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Addassetcode */}
      <Stack.Screen name="Addassetcode" component={Addassetcode}
        options={{
          title: 'Asset Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: {
            color: '#FFFFFF',
          },
          headerTintColor: '#FFFFFF'
        }} />
      {/* Workorder */}
      <Stack.Screen name="Workorder" component={Workorder}
        options={{
          title: 'Work Order', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Createworkorder */}
      <Stack.Screen name="Createworkorder" component={Createworkorder}
        options={{
          title: 'Work Order', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Locationmanagement */}
      <Stack.Screen name="Locationmanagement" component={Locationmanagement}
        options={{
          title: 'Location Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Preventivemaintenance */}
      <Stack.Screen name="Preventivemaintenance" component={Preventivemaintenance}
        options={{
          title: 'Preventive Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Createpreventivemaintenance */}
      <Stack.Screen name="Createpreventivemaintenance" component={Createpreventivemaintenance}
        options={{
          title: 'Preventive Maintenance', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Cleaningworks */}
      <Stack.Screen name="Cleaningworks" component={Cleaningworks}
        options={{
          title: 'Cleaning Works', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Create Cleaningworks */}
      <Stack.Screen name="Createcleaningwork" component={Createcleaningwork}
        options={{
          title: 'Cleaning Works', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/*user managment Access */}
      <Stack.Screen name="Usermanagment" component={Usermanagment}
        options={{
          title: 'User Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/*Systemmodules managment Access */}
      <Stack.Screen name="Systemmodules" component={Systemmodules}
        options={{
          title: 'User Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/*Userauthoritylevels managment Access */}
      <Stack.Screen name="Userauthoritylevels" component={Userauthoritylevels}
        options={{
          title: 'User Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/*UserCredentials managment Access */}
      <Stack.Screen name="UserCredentials" component={UserCredentials}
        options={{
          title: 'User Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Create UserCredentials managment Access */}
      <Stack.Screen name="Createusercredientials" component={Createusercredientials}
        options={{
          title: 'User Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Useraccess managment Access */}
      <Stack.Screen name="Useraccess" component={Useraccess}
        options={{
          title: 'User Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Useraccess managment Access */}
      <Stack.Screen name="Crreateuseraccess" component={Crreateuseraccess}
        options={{
          title: 'User Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* Add System modules Access */}
      <Stack.Screen name="Addystemaccessmodules" component={Addystemaccessmodules}
        options={{
          title: 'User Management', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* set up and configuration COmponent Rounting */}
      <Stack.Screen name="Setupconfigurationrouting" component={Setupconfigurationrouting}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* set up and configuration Work types*/}
      <Stack.Screen name="Worktype" component={Worktype}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Work Trade*/}
      <Stack.Screen name="Worktrade" component={Worktrade}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Workstatus*/}
      <Stack.Screen name="Workstatus" component={Workstatus}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Workpriority */}
      <Stack.Screen name="Workpriority" component={Workpriority}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Workcategory */}
      <Stack.Screen name="Workcategory" component={Workcategory}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Department */}
      <Stack.Screen name="Department" component={Department}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Building */}
      <Stack.Screen name="Building" component={Building}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Location */}
      <Stack.Screen name="Location" component={Location}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Problemcategory */}
      <Stack.Screen name="Problemcategory" component={Problemcategory}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Requeststatus */}
      <Stack.Screen name="Requeststatus" component={Requeststatus}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Failurecode */}
      <Stack.Screen name="Failurecode" component={Failurecode}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Solutioncode */}
      <Stack.Screen name="Solutioncode" component={Solutioncode}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Days Maintenance */}
      <Stack.Screen name="Days" component={Days}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Floor code Maintenance*/}
      <Stack.Screen name="Floorcode" component={Floorcode}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Room Code Maintenance*/}
      <Stack.Screen name="RoomCode" component={RoomCode}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Frequency */}
      <Stack.Screen name="Frequency" component={Frequency}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Gender Code Maintenance*/}
      <Stack.Screen name="Gendercode" component={Gendercode}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Titlesatutation */}
      <Stack.Screen name="Titlesatutation" component={Titlesatutation}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Maritalstatus */}
      <Stack.Screen name="Maritalstatus" component={Maritalstatus}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Nationality */}
      <Stack.Screen name="Nationality" component={Nationality}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
        {/* Assettype */}
          <Stack.Screen name="Assettype" component={Assettype}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
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
  header: {
    backgroundColor: '#0A2DAA'
  },
  headertitle: {
    color: '#FFFFFF'
  }
});

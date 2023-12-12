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
import AssetMasterCreate from './assets/Screen/Asset Managment/Asset master/AssetCreate';
import AssetMasterUpdate from './assets/Screen/Asset Managment/Asset master/AssetUpdate';
import AssetTransactionsHome from './assets/Screen/Asset Managment/Asset Transaction/AssetTransactionsHome'
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
// import Worktype from './assets/Screen/Set Up & Configuration/Work Type/Worktype';
import AssetTransactionsCreate from './assets/Screen/Asset Managment/Asset Transaction/AssetTransactionsCreate'
import AssetManagementMasterList from "./assets/Screen/Asset Managment/Asset master/AssetManagementMasterList"
import AssetTransactionsUpdate from './assets/Screen/Asset Managment/Asset Transaction/AssetTransactionsUpdate'
import Worktrade from './assets/Screen/Set Up & Configuration/Work Trade/Worktrade'
import Workstatus from './assets/Screen/Set Up & Configuration/Work Status/Workstatus'
import Workpriority from './assets/Screen/Set Up & Configuration/Work Priority/Workpriority'
import Workcategory from './assets/Screen/Set Up & Configuration/Work Category Maintenance/Workcategory'
import Department from './assets/Screen/Set Up & Configuration/Department/Department'
import Building from './assets/Screen/Set Up & Configuration/Building/Building'
import Location from './assets/Screen/Set Up & Configuration/Location/Location'
import Problemcategory from './assets/Screen/Set Up & Configuration/Problem Category/Problemcategory'
import Requeststatus from './assets/Screen/Set Up & Configuration/Request Status/Requeststatus'
import Failurecode from './assets/Screen/Set Up & Configuration/Failure Code/Failurecode'
import Solutioncode from './assets/Screen/Set Up & Configuration/Solution Code Maintenance/Solutioncode'
import Days from './assets/Screen/Set Up & Configuration/Days Maintenance/Days'
import GoodReceiptable from './assets/Screen/PurchasingManagment/GoodsReceipts/GoodReceiptable'
import PMHome from './assets/Screen/PurchasingManagment/PMHome'
import GoodReceiptCreate from './assets/Screen/PurchasingManagment/GoodsReceipts/GoodReceiptCreate'
import GoodReceiptUpdate from './assets/Screen/PurchasingManagment/GoodsReceipts/GoodReceiptUpdate'
import GoodReturntable from './assets/Screen/PurchasingManagment/GoodsReturns/GoodReturntable'
import GoodReturnUpdate from './assets/Screen/PurchasingManagment/GoodsReturns/GoodReturnUpdate'
import GoodReturnCreate from './assets/Screen/PurchasingManagment/GoodsReturns/GoodReturnCreate'
import PurchaseOrdertable from './assets/Screen/PurchasingManagment/PurchaseOrders/PurchaseOrdertable'
import PurchaseOrderCreate from './assets/Screen/PurchasingManagment/PurchaseOrders/PurchaseOrderCreate'
import PurchaseOrderUpdate from './assets/Screen/PurchasingManagment/PurchaseOrders/PurchaseOrderUpdate'
import Purchaserequesttable from './assets/Screen/PurchasingManagment/PurchaseRequests/Purchaserequesttable'
import PurchaseRequestCreate from './assets/Screen/PurchasingManagment/PurchaseRequests/PurchaseRequestCreate'
import PurchaseRequestUpdate from './assets/Screen/PurchasingManagment/PurchaseRequests/PurchaseRequestUpdate'
import WarehouseManagment from './assets/Screen/WarehouseManagement/WarehouseManagment'
import ExpireWarrntytable from './assets/Screen/WarehouseManagement/EXPIREDWARRANTYENDITEMS/ExpireWarrntytable'
import ExpireWarrntyCreate from './assets/Screen/WarehouseManagement/EXPIREDWARRANTYENDITEMS/ExpireWarrntyCreate'
import ExpireWarrntyUpdate from './assets/Screen/WarehouseManagement/EXPIREDWARRANTYENDITEMS/ExpireWarrntyUpdate'
import reorderminitable from './assets/Screen/WarehouseManagement/REORDERMINIMUMLEVELS/reorderminitable'
import reorderminicreate from './assets/Screen/WarehouseManagement/REORDERMINIMUMLEVELS/reorderminicreate'
import reorderminiupdate from './assets/Screen/WarehouseManagement/REORDERMINIMUMLEVELS/reorderminiupdate'
import stockmastertable from './assets/Screen/WarehouseManagement/STOCKMASTERINVENTORY/stockmastertable'
import stockmasterCreate from './assets/Screen/WarehouseManagement/STOCKMASTERINVENTORY/stockmasterCreate'
import stockmasterUpdate from './assets/Screen/WarehouseManagement/STOCKMASTERINVENTORY/stockmasterUpdate'
import transferlocationTable from './assets/Screen/WarehouseManagement/TRANSFERLOCATIONS/transferlocationTable'
import transferlocationCreate from './assets/Screen/WarehouseManagement/TRANSFERLOCATIONS/transferlocationCreate'
import transferlocationUpdate from './assets/Screen/WarehouseManagement/TRANSFERLOCATIONS/transferlocationUpdate'
import RoomCode from './assets/Screen/Set Up & Configuration/Room Code/RoomCode';
import Gendercode from './assets/Screen/Set Up & Configuration/Gender Code/Gendercode';
import Titlesatutation from './assets/Screen/Set Up & Configuration/Title Salutation/Titlesatutation';
import Frequency from './assets/Screen/Set Up & Configuration/Frequency Code/Frequency';
import Maritalstatus from './assets/Screen/Set Up & Configuration/Marital Status/Maritalstatus';
import Nationality from './assets/Screen/Set Up & Configuration/Nationality/Nationality';
import Assettype from './assets/Screen/Set Up & Configuration/Asset Type/Assettype';
import Assetcategory from './assets/Screen/Set Up & Configuration/Asset Category/Assetcategory';
import Floorcode from './assets/Screen/Set Up & Configuration/Floor Code/Floorcode';
import AssetSubCategory from './assets/Screen/Set Up & Configuration/Asset Sub Category/AssetSubCategory';
import Assectcondition from './assets/Screen/Set Up & Configuration/Assect Condition/Assectcondition';
import WarrantyPeriod from './assets/Screen/Set Up & Configuration/Warranty Period/WarrantyPeriod';
import EmployeeStatus from './assets/Screen/Set Up & Configuration/Employee Status/EmployeeStatus';
import Employeedesignation from './assets/Screen/Set Up & Configuration/Employee Designation/Employeedesignation';
import Supplier from './assets/Screen/Set Up & Configuration/Supplier/Supplier';
import Crreatesupier from './assets/Screen/Set Up & Configuration/Supplier/Crreatesupier';
import Worktype from './assets/Screen/Set Up & Configuration/Work Type/Worktype';
import Viewworkorder from './assets/Screen/Work Order/Viewworkorder';
import Updataworkorder from './assets/Screen/Work Order/Updataworkorder';
import Viewpreventivemaintenance from './assets/Screen/Preventive Maintenance/Viewpreventivemaintenance';
import Updatapreventivemaintenance from './assets/Screen/Preventive Maintenance/Updatapreventivemaintenance';
import Viewcleaningwork from './assets/Screen/Cleaning Works/Viewcleaningwork';
import Updatacleaningwork from './assets/Screen/Cleaning Works/Updatacleaningwork';
import Viewworkrequest from './assets/Screen/Work Request/Viewworkrequest';
import Updataworkrequest from './assets/Screen/Work Request/Updataworkrequest';

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
      screenOptions={{ headerShown: false, }}
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
        {/* Viewworkrequest */}
         <Stack.Screen name="Viewworkrequest" component={Viewworkrequest}
        options={{
          title: 'Work Request', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
        {/* Updataworkrequest */}
          <Stack.Screen name="Updataworkrequest" component={Updataworkrequest}
        options={{
          title: 'Work Request', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
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
         {/* transferlocationTable */}
      <Stack.Screen name="transferlocationTable" component={transferlocationTable}
        options={{
          title: 'transfer location Table', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* transferlocationCreate */}
      <Stack.Screen name="transferlocationCreate" component={transferlocationCreate}
        options={{
          title: 'transfer location Create', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* transferlocationUpdate */}
      <Stack.Screen name="transferlocationUpdate" component={transferlocationUpdate}
        options={{
          title: 'transfer location Update', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* stockmastertable */}
      <Stack.Screen name="stockmastertable" component={stockmastertable}
        options={{
          title: 'stockmastertable', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* stockmasterCreate */}
      <Stack.Screen name="stockmasterCreate" component={stockmasterCreate}
        options={{
          title: 'stock master Create', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* stockmasterUpdate */}
      <Stack.Screen name="stockmasterUpdate" component={stockmasterUpdate}
        options={{
          title: 'stock master Update', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* reorderminitable */}
      <Stack.Screen name="reorderminitable" component={reorderminitable}
        options={{
          title: 'reorder mini table', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* reorderminicreate */}
      <Stack.Screen name="reorderminicreate" component={reorderminicreate}
        options={{
          title: 'reorder mini create', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* reorderminiupdate */}
      <Stack.Screen name="reorderminiupdate" component={reorderminiupdate}
        options={{
          title: 'reorder mini update', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* ExpireWarrntytable */}
      <Stack.Screen name="ExpireWarrntytable" component={ExpireWarrntytable}
        options={{
          title: 'Expire Warrnety table', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* ExpireWarrntyCreate */}
      <Stack.Screen name="ExpireWarrntyCreate" component={ExpireWarrntyCreate}
        options={{
          title: 'Expire Warrnty Create', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* ExpireWarrntyUpdate */}
      <Stack.Screen name="ExpireWarrntyUpdate" component={ExpireWarrntyUpdate}
        options={{
          title: 'Expire Warrnty Update', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* WarehouseManagment */}
      <Stack.Screen name="WarehouseManagment" component={WarehouseManagment}
        options={{
          title: 'Warehouse Managment', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* PurchaseRequestUpdate */}
      <Stack.Screen name="PurchaseRequestUpdate" component={PurchaseRequestUpdate}
        options={{
          title: 'Purchase Request Update', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {
        /* Purchaserequesttable */ }
      <Stack.Screen name="Purchaserequesttable" component={Purchaserequesttable}
        options={{
          title: 'Purchase request table', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* PurchaseRequestCreate */}
      <Stack.Screen name="PurchaseRequestCreate" component={PurchaseRequestCreate}
        options={{
          title: 'Purchase Request Create', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* PurchaseOrderUpdate */}
      <Stack.Screen name="PurchaseOrderUpdate" component={PurchaseOrderUpdate}
        options={{
          title: 'Purchase Order Update ', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* PurchaseOrderCreate */}
      <Stack.Screen name="PurchaseOrderCreate" component={PurchaseOrderCreate}
        options={{
          title: 'Purchase Order Create', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* PurchaseOrdertable */}
      <Stack.Screen name="PurchaseOrdertable" component={PurchaseOrdertable}
        options={{
          title: 'Purchase Order table', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* GoodReturnCreate */}
      <Stack.Screen name="GoodReturnCreate" component={GoodReturnCreate}
        options={{
          title: 'Good Return Create ', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* GoodReturnUpdate */}
      <Stack.Screen name="GoodReturnUpdate" component={GoodReturnUpdate}
        options={{
          title: 'Good Return Update ', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
      {/* GoodReturntable */}
      <Stack.Screen name="GoodReturntable" component={GoodReturntable}
        options={{
          title: 'Good Return ', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
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
         {/* View Work Orders */}
      <Stack.Screen name="ViewWorkorder" component={Viewworkorder}
        options={{
          title: ' View Work Orders', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
          {/* Modify Work Orders */}
      <Stack.Screen name="Updataworkorder" component={Updataworkorder}
        options={{
          title: 'Modify Work Orders', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
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
        {/* Viewpreventivemaintenance */}
         <Stack.Screen name="Viewpreventivemaintenance" component={Viewpreventivemaintenance}
        options={{
          title: 'View Preventive Maintenance', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
        {/* Updatapreventivemaintenance */}
         <Stack.Screen name="Updatapreventivemaintenance" component={Updatapreventivemaintenance}
        options={{
          title: 'Preventive Maintenance', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle,
          headerTintColor: '#FFFFFF'
        }} />
        {/* Cleaningworks */}
         <Stack.Screen name="Cleaningworks" component={Cleaningworks}
        options={{
          title: 'Cleaning Works', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
        {/* Createcleaningwork */}
          <Stack.Screen name="Createcleaningwork" component={Createcleaningwork}
        options={{
          title: 'Cleaning Works', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
        {/* Viewcleaningwork */}
          <Stack.Screen name="Viewcleaningwork" component={Viewcleaningwork}
        options={{
          title: 'Cleaning Works', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
        {/* Updatacleaningwork */}
          <Stack.Screen name="Updatacleaningwork" component={Updatacleaningwork}
        options={{
          title: 'Cleaning Works', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Asset magmanet  */}
      <Stack.Screen name="AssetHome" component={AssetHome}
        options={{
          title: 'Asset Managment', headerShown: true, headerStyle: { backgroundColor: '#0A2DAA' }, headerTitleStyle: { color: '#FFFFFF', },
          headerTintColor: '#FFFFFF'
        }} />
      <Stack.Screen name="AssetMasterCreate" component={AssetMasterCreate}
        options={{
          title: 'Asset Master List Create', headerShown: true, headerStyle: { backgroundColor: '#0A2DAA' }, headerTitleStyle: { color: '#FFFFFF', },

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
      {/* AssetManagementMasterList */}
      <Stack.Screen name="AssetManagementMasterList" component={AssetManagementMasterList}
        options={{
          title: 'Asset Management Master List', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* AssetMasterUpdate */}
      <Stack.Screen name="AssetMasterUpdate" component={AssetMasterUpdate}
        options={{
          title: 'Asset Master List update', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* AssetTransactionsHome */}
      <Stack.Screen name="AssetTransactionsHome" component={AssetTransactionsHome}
        options={{
          title: 'Asset Transactions', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* AssetTransactionsCreate */}
      <Stack.Screen name="AssetTransactionsCreate" component={AssetTransactionsCreate}
        options={{
          title: 'Asset Transactions Create', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* AssetTransactionsCreate */}
      <Stack.Screen name="AssetTransactionsUpdate" component={AssetTransactionsUpdate}
        options={{
          title: 'Asset Transactions Update', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
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
      {/* RoomCode */}
      <Stack.Screen name="RoomCode" component={RoomCode}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Gendercode */}
      <Stack.Screen name="Gendercode" component={Gendercode}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Titlesatutation */}
      <Stack.Screen name="Titlesatutation" component={Titlesatutation}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Frequency */}
      <Stack.Screen name="Frequency" component={Frequency}
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
      {/* Assetcategory */}
      <Stack.Screen name="Assetcategory" component={Assetcategory}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Floorcode */}
      <Stack.Screen name="Floorcode" component={Floorcode}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* AssetSubCategory */}
      <Stack.Screen name="AssetSubCategory" component={AssetSubCategory}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Assectcondition */}
      <Stack.Screen name="Assectcondition" component={Assectcondition}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* WarrantyPeriod */}
      <Stack.Screen name="WarrantyPeriod" component={WarrantyPeriod}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* EmployeeStatus */}
      <Stack.Screen name="EmployeeStatus" component={EmployeeStatus}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Employeedesignation */}
      <Stack.Screen name="Employeedesignation" component={Employeedesignation}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* supplier */}
      <Stack.Screen name="supplier" component={Supplier}
        options={{
          title: 'Set Up & Configuration', headerShown: true, headerStyle: styles.header, headerTitleStyle: styles.headertitle, headerTintColor: '#FFFFFF'
        }} />
      {/* Crreatesupier */}
      <Stack.Screen name="Crreatesupier" component={Crreatesupier}
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

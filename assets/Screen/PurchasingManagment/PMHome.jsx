import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import {Button, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function Workrequest () {
  const navigation = useNavigation ();
  const [value, setvalue] = useState ({
    Employeeid: '',
    WorkRequest: '',
  });

  const [page, setPage] = useState (0);
  const [numberOfItemsPerPageList] = useState ([10]);
  const [itemsPerPage, onItemsPerPageChange] = useState (
    numberOfItemsPerPageList[0]
  );

  const [items, setItems] = useState ([
    {
      _id: 1,
      WORKREQUEST: 'WORKREQUEST11',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
    {
      _id: 2,
      WORKREQUEST: 'WORKREQUEST2',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
    {
      _id: 3,
      WORKREQUEST: 'WORKREQUEST3',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
    {
      _id: 4,
      WORKREQUEST: 'WORKREQUEST4',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
    {
      _id: 5,
      WORKREQUEST: 'WORKREQUEST5',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
    {
      _id: 6,
      WORKREQUEST: 'WORKREQUEST6',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
    {
      _id: 7,
      WORKREQUEST: 'WORKREQUEST7',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
    {
      _id: 8,
      WORKREQUEST: 'WORKREQUEST8',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
    {
      _id: 9,
      WORKREQUEST: 'WORKREQUEST9',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
    {
      _id: 10,
      WORKREQUEST: 'WORKREQUEST10',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
    {
      _id: 11,
      WORKREQUEST: 'WORKREQUEST11',
      REQUESTSTATUS: 'Open',
      REQUESTBYEMP: 'REQUESTBYEMP',
      PRIORITY: 'PRIORITY',
      REQUESTDATE: '12/12/3003',
      WORKTYPEDESC: 'WORKTYPEDESC',
      WORKTRADEDESC: 'WORKTRADEDESC',
      ACTIONS: 'Open',
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min ((page + 1) * itemsPerPage, items.length);

  useEffect (
    () => {
      setPage (0);
    },
    [itemsPerPage]
  );
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
  ];

  const [selectedItems, setSelectedItems] = useState ([]);

  const handleCheckboxChange = _id => {
    const updatedItems = items.map (
      item => (item._id === _id ? {...item, selected: !item.selected} : item)
    );
    setItems (updatedItems);
    // Update selectedItems state
    const selectedIds = updatedItems
      .filter (item => item.selected)
      .map (item => item._id);
    setSelectedItems (selectedIds);
  };

  const handleSelectAllChange = () => {
    const allSelected = items.every (item => item.selected);
    const updatedItems = items.map (item => ({
      ...item,
      selected: !allSelected,
    }));
    setItems (updatedItems);
    const selectedIds = updatedItems
      .filter (item => item.selected)
      .map (item => item._id);
    setSelectedItems (selectedIds);
  };

  return (
    <ScrollView>
      <View style={{marginTop: '30%'}}>
        <View style={{display: 'flex', margin: 'auto 0'}}>
          <Text style={styles.prograp}>
            Select Purchase Management
          </Text>
          <View>
            <Button
              onPress={() => navigation.navigate ('AssetManagementMasterList')}
              radius={'md'}
              type="solid"
              containerStyle={{
                width: 250,
                marginHorizontal: 50,
                marginVertical: 40,
              }}
            >
              Purchase Requests
            </Button>

          </View>
          <View>
            <Button
              onPress={() => navigation.navigate ('AssetTransactionsHome')}
              radius={'md'}
              type="solid"
              containerStyle={{
                width: 250,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            >
             Purchase Orders
            </Button>

          </View>
<View>
            <Button
              onPress={() => navigation.navigate ('AssetManagementMasterList')}
              radius={'md'}
              type="solid"
              containerStyle={{
                width: 250,
                marginHorizontal: 50,
                marginVertical: 40,
              }}
            >
             Goods Receipts
            </Button>

          </View>
          <View>
            <Button
              onPress={() => navigation.navigate ('AssetTransactionsHome')}
              radius={'md'}
              type="solid"
              containerStyle={{
                width: 250,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            >
              Goods Returns
            </Button>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create ({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'space-around',
  },
  lableinput: {
    color: '#0A2DAA',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 17,
  },

  prograp: {
    color: '#1E3B8B',
    fontSize: 16,
    fontStyle: 'normal',
      fontWeight: '600',
    
    marginHorizontal: 60,
    marginVertical: 10,
  },
  inputBox: {
    width: 170,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: '#94A0CA',
    borderWidth: 1, // Border width
    fontSize: 14,
    color: 'black',
    marginVertical: 9,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
  },
  buttonsection: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  outlineIcon: {
    borderWidth: 1, // You can customize the border properties as needed
    borderRadius: 15, // Adjust the border radius to match the filled icon
    marginRight: 10, // Add spacing between the two icons
  },
  header: {
    textAlign: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableHeading: {
    color: '#1E3B8B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  item: {
    // borderColor: "#0A2DAA",
    // borderWidth: 1, // Border width
    // borderRadius:5
  },
  tablebody: {
    borderColor: '##9384EB',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionstitle: {
    fontSize: 14,
    marginRight: 5,
    color: '#0A2DAA',
    fontWeight: '700',
  },
});

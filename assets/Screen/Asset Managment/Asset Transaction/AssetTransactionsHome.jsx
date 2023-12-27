import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import { Button, Icon, Dialog } from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import {AntDesign} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function AssetTransactionsHome () {
  const navigation = useNavigation ();
  const [value, setvalue] = useState ({
    Employeeid: '',
    WorkRequest: '',
    AssetItemTagIDnumber:''
  });

  const [page, setPage] = useState (0);
  const [numberOfItemsPerPageList] = useState ([10]);
  const [itemsPerPage, onItemsPerPageChange] = useState (
    numberOfItemsPerPageList[0]
  );

  const [items, setItems] = useState([]);
  const getapi = () => {
    axios.get(`/api/AssetTransactions_GET_LIST`)
      .then((res) => {
        setItems(res.data.recordset)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getapi()
  }, [])
  const from = page * itemsPerPage;
  const to = Math.min ((page + 1) * itemsPerPage, items.length);

  useEffect (
    () => {
      setPage (0);
    },
    [itemsPerPage]
  );

  const [selectedItems, setSelectedItems] = useState ([]);

  const handleCheckboxChange = AssetItemTagID => {
    const updatedItems = items.map (
      item => (item.AssetItemTagID === AssetItemTagID ? {...item, selected: !item.selected} : item)
    );
    setItems (updatedItems);
    // Update selectedItems state
    const selectedIds = updatedItems
      .filter (item => item.selected)
      .map (item => item.AssetItemTagID);
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
      .map (item => item.AssetItemTagID);
    setSelectedItems (selectedIds);
  };

  // Deleting api
  const [showAlert, setShowAlert] = useState(false);
  const showSuccessAlert = () => {
    setShowAlert(true);
  };

  const [visible2, setVisible2] = useState(false);
  const [deleteItemCode, setDeleteItemCode] = useState('');

  const toggleDialog2 = (AssetItemTagID) => {
    setDeleteItemCode(AssetItemTagID);
    setVisible2(!visible2);
  };

  const Deletedapi = (AssetItemTagID) => {
    axios.delete(`/api/AssetTransactions_DELETE_BYID/${AssetItemTagID}`)
      .then((res) => {
        setVisible2(false);
        getapi()
        showSuccessAlert(true)
      })
      .catch((err) => {
        console.log('Error deleting', err);
      });
  }
  
  const [showAlertstatus, setshowAlertstatus] = useState(false);
  const showSuccessAlertstatus = () => {
    setshowAlertstatus(true);
  };
  const updatbutton = () => {
    if (selectedItems.length >= 1) {
      navigation.navigate(`AssetTransactionsUpdate`, { AssetItemTagID: selectedItems, myFunction: getapi })
    }
    else {
      showSuccessAlertstatus(true)
    }
  }

  return (
    <ScrollView>
      <View>
        {/* Top section */}
        <View>
          <Text style={styles.prograp}>
            AssetItem Tag ID
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.singleinputlable}>

              <TextInput
                style={styles.inputBox}
                value={value.AssetItemTagIDnumber}
                onChangeText={item => {
                  setvalue (prevValue => ({
                    ...prevValue,
                    AssetItemTagIDnumber: item,
                  }));
                }}
                placeholder="Select assetitem tag ID"
                placeholderTextColor="#94A0CA"
                selectionColor="#1D3A9F"
                underlineColorAndroid="transparent"
              />
              <Feather
                name="search"
                size={24}
                color="black"
                style={{position: 'absolute', left: '50%', top: '25%'}}
              />
            </View>
            <View style={styles.singleinputlable}>
              <Text style={styles.lableinput}>
                Asset Item Description
              </Text>
              <TextInput
                style={styles.inputBox}
                value={value.Employeeid}
                onChangeText={item => {
                  setvalue(prevValue => ({
                    ...prevValue,
                    Employeeid: item,
                  }));
                }}
                placeholder="Select Asset Item Description"
                placeholderTextColor="#94A0CA"
                selectionColor="#1D3A9F"
                underlineColorAndroid="transparent"
              />
              <Feather
                name="search"
                size={24}
                color="black"
                style={{position: 'absolute', left: '50%', top: '45%'}}
              />
            </View>

          </View>
        </View>
        {/* table section */}
        <ScrollView horizontal>
          <DataTable
            style={[
              styles.item,
              {
                width: '100%',
                height: 450,
                margin: 0,
              },
            ]}
          >
            <DataTable.Header>
              <DataTable.Title
                style={[styles.header, {width: 50, borderTopLeftRadius: 5}]}
              >
                <Text style={styles.tableHeading}>
                  <Checkbox
                    status={
                      selectedItems.length === items.length
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={handleSelectAllChange}
                  />
                </Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 50}]}>
                <Text style={styles.tableHeading}>Seq </Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 200}]}>
                <Text style={styles.tableHeading}>ASSET TAG/STOCK NUMBER</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 160}]}>
                <Text style={styles.tableHeading}>SERIAL NUMBER</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 200}]}>
                <Text style={styles.tableHeading}>ASSET ITEM DESCRIPTION</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 170}]}>
                <Text style={styles.tableHeading}>EMPLOYEE ID</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 130}]}>
                <Text style={styles.tableHeading}>ASSET CONDITION</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 180}]}>
                <Text style={styles.tableHeading}>BUILDING</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 170}]}>
                <Text style={styles.tableHeading}>LOACTION</Text>
              </DataTable.Title>

              <DataTable.Title
                style={[
                  styles.header,
                  {width: 140, borderRightWidth: 1, borderTopRightRadius: 5},
                ]}
              >
                <Text style={styles.tableHeading}>ACTIONS</Text>
              </DataTable.Title>
            </DataTable.Header>
            {items.filter(row => (
              (!value.AssetItemTagIDnumber || (row.AssetItemTagID && row.AssetItemTagID.includes(value.AssetItemTagIDnumber))) &&
              (!value.Employeeid || row.AssetItemDescription.toLowerCase().includes(value.Employeeid.toLowerCase()))
            )).slice (from, to).map ((item,index) => (
                <DataTable.Row key={item.AssetItemTagID}>
                  <DataTable.Cell style={[styles.tablebody, {width: 50}]}>
                    <Checkbox
                      status={item.selected ? 'checked' : 'unchecked'}
                      onPress={() => handleCheckboxChange (item.AssetItemTagID)}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 50}]}>
                    {index + 1}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 200}]}>
                    {item.AssetItemTagID}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 160}]}>
                    {item.SerialNumber}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 200}]}>
                    {item.AssetItemDescription}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 170}]}>
                    {item.EmployeeID}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 130}]}>
                    {item.AssetCondition}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 180}]}>
                    {item.BuildingCode}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 170}]}>
                    {item.LocationCode}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[
                      styles.tablebody,
                      {width: 140, borderRightWidth: 1, borderBottomWidth: 1},
                    ]}
                  >
                    <Menu>
                      <MenuTrigger>
                        <View style={styles.actions}>
                          <Text>Action </Text>
                          <AntDesign name="caretdown" size={18} color="black" />
                        </View>
                      </MenuTrigger>
                      <MenuOptions
                        optionsContainerStyle={{width: 'auto', padding: 10}}
                      >
                      <MenuOption onSelect={() => navigation.navigate(`Viewassettransaction`, { AssetItemTagID: item.AssetItemTagID, AssetItemTagIDnumer: getapi })}>
                          <View style={styles.actions}>
                            <Text style={styles.actionstitle}>View</Text>
                            <AntDesign name="eye" size={20} color="#0A2DAA" />
                          </View>
                        </MenuOption>
                      <MenuOption onSelect={() => navigation.navigate(`AssetTransactionsUpdate`, { AssetItemTagID: item.AssetItemTagID, myFunction: getapi })}>
                          <View style={styles.actions}>
                            <Text style={styles.actionstitle}>Update</Text>
                            <FontAwesome5
                              name="pencil-alt"
                              size={13}
                              color="#0A2DAA"
                            />
                          </View>
                        </MenuOption>
                        <MenuOption onSelect={() => toggleDialog2(item.AssetItemTagID)}>
                          <View style={styles.actions}>
                            <Text style={styles.actionstitle}>Delete</Text>
                            <AntDesign name="delete" size={15} color="red" />
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </DataTable.Cell>
                </DataTable.Row>
            ))}
            {/* If the length is equal to the 0 than   */}
            {items.filter(row => (
              (!value.AssetItemTagIDnumber || (row.AssetItemTagID && row.AssetItemTagID.includes(value.AssetItemTagIDnumber))) &&
              (!value.Employeeid || row.AssetItemDescription.toLowerCase().includes(value.Employeeid.toLowerCase()))
            )).length === 0 && (
                <DataTable.Row style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <DataTable.Cell style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text >No data available</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )}

          </DataTable>
        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil (items.length / itemsPerPage)}
          onPageChange={page => setPage (page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          // numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />

        {/* Button section */}
        <View style={styles.buttonsection}>
          <Button
            radius={'md'}
            type="solid"
            containerStyle={{
              width: 150,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={updatbutton}
          >
            Update
          </Button>
          <Button
            radius={'md'}
            type="outline"
            containerStyle={{
              width: 150,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate('AssetTransactionsCreate', { AssetItemTagIDnumer: getapi })}
          >
            <Icon
              name="add"
              color="#0A2DAA"
              size={15}
              style={styles.outlineIcon}
            />
            Create
          </Button>
        </View>
        <View style={styles.buttonsection}>
          <Button
            radius={'md'}
            type="outline"
            containerStyle={{
              width: 150,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          >
            <Icon
              name="print"
              color="#0A2DAA"
              size={20}
              style={{marginRight: 7}}
            />
            Print
          </Button>
          <Button
            radius={'md'}
            type="outline"
            containerStyle={{
              width: 150,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          >
            <MaterialIcons
              name="save-alt"
              size={20}
              color="#0A2DAA"
              style={{marginRight: 12}}
            />
            Export
          </Button>
        </View>

        {/* Deleted  Dialog*/}
        <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
          <Dialog.Title title="Are you sure?" />
          <Text>{`You want to delete this ${deleteItemCode} Asset Transactions`}</Text>
          <Dialog.Actions >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Dialog.Button onPress={() => setVisible2(!visible2)} ><Text style={{ backgroundColor: '#198754', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>No, cancel!</Text></Dialog.Button>
              <Dialog.Button onPress={() => Deletedapi(deleteItemCode)} ><Text style={{ backgroundColor: '#EF643B', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>Yes, delete it!</Text></Dialog.Button>
            </View>
          </Dialog.Actions>
        </Dialog>
        {/* Pop message */}
        <AwesomeAlert
          show={showAlert}
          title={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="delete" color="red" size={20} style={{ marginRight: 5 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Deleted!</Text>
            </View>
          }
          message={`Asset Transactions ${deleteItemCode} has been deleted`}
          confirmButtonColor="#DD6B55"
          confirmButtonStyle={{ backgroundColor: 'black' }}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="OK"
          onConfirmPressed={() => {
            setShowAlert(false)
          }}
        />

        {/* status updata */}
        <AwesomeAlert
          show={showAlertstatus}
          title={
            <View >
              <MaterialIcons name="error-outline" color="red" size={30} style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 4, marginLeft: 5 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Error!</Text>
            </View>
          }
          message={`Select a Asset Transactions  by checking the check box`}
          confirmButtonColor="#DD6B55"
          confirmButtonStyle={{ backgroundColor: 'black' }}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="OK"
          onConfirmPressed={() => {
            setshowAlertstatus(false)
          }}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create ({
  inputContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    display: 'block',
    paddingBottom: 5,
    marginBottom: 10,
    position: 'relative',
    marginLeft: -90,
    // justifyContent: 'space-around',
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
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inputBox: {
    width: 250,
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

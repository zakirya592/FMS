import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import { Button, Icon, Dialog } from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import {AntDesign} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import axios from 'axios';

export default function AssetManagementMasterList () {
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

  const [items, setItems] = useState ([]);
  const getapi = () => {
    axios.get(`/api/AssetsMaster_GET_LIST`, {
    },)
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

  const handleCheckboxChange = AssetItemDescription => {
    const updatedItems = items.map (
      item => (item.AssetItemDescription === AssetItemDescription ? {...item, selected: !item.selected} : item)
    );
    setItems (updatedItems);
    // Update selectedItems state
    const selectedIds = updatedItems
      .filter (item => item.selected)
      .map (item => item.AssetItemDescription);
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
      .map (item => item.AssetItemDescription);
    setSelectedItems (selectedIds);
  };

  // Deleting api
  const [showAlert, setShowAlert] = useState(false);
  const showSuccessAlert = () => {
    setShowAlert(true);
  };

  const [visible2, setVisible2] = useState(false);
  const [deleteItemCode, setDeleteItemCode] = useState('');

  const toggleDialog2 = (AssetItemDescription) => {
    setDeleteItemCode(AssetItemDescription);
    setVisible2(!visible2);
  };

  const Deletedapi = (AssetItemDescription) => {
    axios.delete(`/api/AssetsMaster_DELETE_BYID/${AssetItemDescription}`)
      .then((res) => {
        setVisible2(false);
        getapi()
        showSuccessAlert(true)
      })
      .catch((err) => {
        console.log('Error deleting', err);
      });
  }


  return (
    <ScrollView>
      <View>
        {/* Top section */}
        <View>
          <Text style={styles.prograp}>
            Asset Master List
          </Text>
          <View style={styles.inputContainer}>

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
                style={{position: 'absolute', left: '87%', top: '45%'}}
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
              <DataTable.Title style={[styles.header, {width: 180}]}>
                <Text style={styles.tableHeading}>Asset Item Description</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 160}]}>
                <Text style={styles.tableHeading}>ASSET ITEM GROUP</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 140}]}>
                <Text style={styles.tableHeading}>ASSET CATEGORY</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 170}]}>
                <Text style={styles.tableHeading}>ASSET SUB_CATGORY</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 130}]}>
                <Text style={styles.tableHeading}>ON-HAND QTY</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 180}]}>
                <Text style={styles.tableHeading}>LAST PURCHASE DATE</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 170}]}>
                <Text style={styles.tableHeading}>PURCHASE AMOUNT</Text>
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
              (!value.Employeeid || row.AssetItemDescription.toLowerCase().includes(value.Employeeid.toLowerCase()))
            )).slice(from, to).map((item,index) => (
               <DataTable.Row key={item.AssetItemDescription}>
                  <DataTable.Cell style={[styles.tablebody, {width: 50}]}>
                    <Checkbox
                      status={item.selected ? 'checked' : 'unchecked'}
                      onPress={() => handleCheckboxChange (item.AssetItemDescription)}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 50}]}>
                    {index + 1 }
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 180}]}>
                    {item.AssetItemDescription}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 160}]}>
                    {item.AssetItemGroup}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 140}]}>
                    {item.AssetCategory}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 170}]}>
                    {item.AssetSubCategory}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 130}]}>
                    {item.OnHandQty}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 180}]}>
                    {/* {item.LASTPURCHASEDATE} */}
                    {moment(item.LastPurchaseDate).isValid() ? moment(item.LastPurchaseDate).format('DD/MM/YYYY') : ''}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 170}]}>
                    {item.PurchaseAmount}
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
                      <MenuOption onSelect={() => navigation.navigate(`Viewassetmaster`, { AssetItemDescription: item.AssetItemDescription })}>
                          <View style={styles.actions}>
                            <Text style={styles.actionstitle}>View</Text>
                            <AntDesign name="eye" size={20} color="#0A2DAA" />
                          </View>
                        </MenuOption>
                      <MenuOption onSelect={() => navigation.navigate(`AssetMasterUpdate`, { AssetItemDescription: item.AssetItemDescription, myFunction: getapi })}>
                          <View style={styles.actions}>
                            <Text style={styles.actionstitle}>Update</Text>
                            <FontAwesome5
                              name="pencil-alt"
                              size={13}
                              color="#0A2DAA"
                            />
                          </View>
                        </MenuOption>
                        <MenuOption onSelect={() => toggleDialog2(item.AssetItemDescription)}>
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
            onPress={() => navigation.navigate ('AssetMasterUpdate')}
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
            onPress={() => navigation.navigate('AssetMasterCreate', { myFunction: getapi })}
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
          <Text>{`You want to delete this ${deleteItemCode} Asset Master`}</Text>
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
          message={`Asset Master ${deleteItemCode} has been deleted`}
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
    marginLeft: -90,
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

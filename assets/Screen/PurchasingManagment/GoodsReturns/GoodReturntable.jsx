import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Button, Icon, Dialog } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import axios from 'axios';
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function GoodReturntable() {
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [items, setItems] = useState([]);

  const getapi = () => {
    axios.get(`/api/GoodsReturn_GET_List`)
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
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (PurchaseOrderNumber) => {
    const updatedItems = items.map((item) =>
      item.PurchaseOrderNumber === PurchaseOrderNumber ? { ...item, selected: !item.selected } : item
    );
    setItems(updatedItems);
    // Update selectedItems state
    const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.PurchaseOrderNumber);
    setSelectedItems(selectedIds);
  };

  const handleSelectAllChange = () => {
    const allSelected = items.every((item) => item.selected);
    const updatedItems = items.map((item) => ({
      ...item,
      selected: !allSelected,
    }));
    setItems(updatedItems);
    const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.PurchaseOrderNumber);
    setSelectedItems(selectedIds);
  };

  const [visible2, setVisible2] = useState(false);
  const [deleteItemCode, setDeleteItemCode] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const showSuccessAlert = () => {
    setShowAlert(true);
  };

  const toggleDialog2 = (PurchaseOrderNumber) => {
    setVisible2(!visible2);
    setDeleteItemCode(PurchaseOrderNumber)
  };

  const Deletedapi = (PurchaseOrderNumber) => {
    axios.delete(`/api/GoodsReturn_DELETE_BYID/${PurchaseOrderNumber}`)
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
      navigation.navigate(`PurchaseRequestUpdate`, { PurchaseOrderNumber: selectedItems, myFunction: getapi })
    }
    else {
      console.warn('Please select at least one item before updating.');
      showSuccessAlertstatus(true)
    }
  }
  return (
    <ScrollView>
      <View>
        {/* Top section */}
        <View >
          <Text style={styles.prograp}>Goods Receipts
          </Text>
        </View>
        {/* table section */}
        <ScrollView horizontal >
          <DataTable style={[styles.item, {
            width: '100%', height: 450, margin: 0
          }]} >
            <DataTable.Header>
              <DataTable.Title style={[styles.header, { width: 50, borderTopLeftRadius: 5 }]}><Text style={styles.tableHeading}><Checkbox
                status={selectedItems.length === items.length ? 'checked' : 'unchecked'}
                onPress={handleSelectAllChange}
              /></Text></DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 80 }]} ><Text style={styles.tableHeading}>SEQ</Text></DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 200 }]} ><Text style={styles.tableHeading}>Purchase Order Number</Text></DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 200 }]} ><Text style={styles.tableHeading}>Invoice Number</Text></DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>Vendor ID</Text></DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>Return Date</Text></DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 140, borderRightWidth: 1, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>ACTIONS</Text></DataTable.Title>
            </DataTable.Header>
            {items.slice(from, to).map((item, index) => (
              <DataTable.Row key={item.PurchaseOrderNumber}>
                <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                  <Checkbox
                    status={item.selected ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange(item.PurchaseOrderNumber)}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 80 }]}>{index + 1}</DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.PurchaseOrderNumber}</DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.InvoiceNumber}</DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.VendorID}</DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{moment(item.ReturnDate).isValid() ? moment(item.ReturnDate).format('DD/MM/YYYY') : ''}</DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 140, borderRightWidth: 1, }]}><Menu>
                  <MenuTrigger >
                    <View style={styles.actions}>
                      <Text>Action </Text>
                      <AntDesign name="caretdown" size={18} color="black" />
                    </View>
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={{ width: 'auto', padding: 10 }}>
                    <MenuOption onSelect={() => navigation.navigate(`Viewpurachaserequest`, { PurchaseOrderNumber: item.PurchaseOrderNumber })}>
                      <View style={styles.actions}>
                        <Text style={styles.actionstitle}>View</Text>
                        <AntDesign name="eye" size={20} color="#0A2DAA" />
                      </View>
                    </MenuOption>
                    <MenuOption onSelect={() => navigation.navigate(`PurchaseRequestUpdate`, { PurchaseOrderNumber: item.PurchaseOrderNumber, myFunction: getapi })}>
                      <View style={styles.actions}>
                        <Text style={styles.actionstitle}>Update</Text>
                        <FontAwesome5 name="pencil-alt" size={13} color="#0A2DAA" />
                      </View>
                    </MenuOption>
                    <MenuOption onSelect={() => toggleDialog2(item.PurchaseOrderNumber)}>
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


          </DataTable>
        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
        {/* Button section */}
        <View style={styles.buttonsection} >
          <Button radius={"md"} type="solid" containerStyle={{
            width: 150,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
            onPress={updatbutton}
          >
            Update
          </Button>
          <Button radius={"md"} type="outline" containerStyle={{
            width: 150,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
            onPress={() => navigation.navigate('PurchaseRequestCreate', { myFunction: getapi })}
          >
            <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
            Create
          </Button>
        </View>
        <View style={styles.buttonsection} >
          <Button radius={"md"} type="outline" containerStyle={{
            width: 150,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          >
            <Icon name="print" color="#0A2DAA" size={20} style={{ marginRight: 7 }} />
            Print
          </Button>
          <Button radius={"md"} type="outline" containerStyle={{
            width: 150,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          >
            <MaterialIcons name="save-alt" size={20} color="#0A2DAA" style={{ marginRight: 12 }} />
            Export
          </Button>
        </View>
        {/* Deletinf section */}
        <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
          <Dialog.Title title="Are you sure?" />
          <Text>{`You want to delete this ${deleteItemCode} Purchase Order Number GOODS Recipt`}</Text>
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
          message={` Purchase Order Number Good Recipt ${deleteItemCode} has been deleted`}
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
          message={`Select a Purchase Request by checking the check box`}
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
  )
}

const styles = StyleSheet.create({
  prograp: {
    color: '#1E3B8B',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    marginHorizontal: 10,
    marginVertical: 30,
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
    fontSize: 14
  },
  tablebody: {
    borderColor: "##9384EB",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center'
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  actionstitle: {
    fontSize: 14,
    marginRight: 5,
    color: '#0A2DAA',
    fontWeight: '700'
  }
})

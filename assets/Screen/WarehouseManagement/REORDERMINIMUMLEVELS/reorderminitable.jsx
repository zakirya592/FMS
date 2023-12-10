import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import {Button, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
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
      Seq: '1',
      ASSETITEMDESCRIPTION: 'Open',
      ASSETITEMGROUP: 'InvoiceNumbe',
      ASSETCATGORY: 'DiscountAmount',
      ASSETSUB_CATGORY: '12/12/3003',
      ONHANDQTY: 'InvoiceDate',
     

       REORDER: 'InvoiceNumbe',
      MINIMUMORDERLEVEL: 'DiscountAmount',
      LASTPURCHASEDATE: '12/12/3003',
      WARRANTYENDDATE: 'InvoiceDate',
      ACTIONS: 'Open',
    },
    
  ]);
  //
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
      <View>
        {/* Top section */}
        <View>
          <Text style={styles.prograp}>
           Reorder/Minimum Levels
          </Text>

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
                <Text style={styles.tableHeading}>ASSET ITEM DESCRIPTION</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 160}]}>
                <Text style={styles.tableHeading}>ASSET ITEM GROUP</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 140}]}>
                <Text style={styles.tableHeading}>ASSET CATGORY</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 170}]}>
                <Text style={styles.tableHeading}>ASSET SUB_CATGORY</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 130}]}>
                <Text style={styles.tableHeading}>ON-HAND QTY</Text>
              </DataTable.Title>

              
              <DataTable.Title style={[styles.header, {width: 160}]}>
                <Text style={styles.tableHeading}>RE-ORDER</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 140}]}>
                <Text style={styles.tableHeading}>MINIMUM ORDER LEVEL</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 170}]}>
                <Text style={styles.tableHeading}>LAST PURCHASE DATE</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, {width: 130}]}>
                <Text style={styles.tableHeading}>WARRANTY END DATE</Text>
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
            {items.slice (from, to).map (item => (
              <ScrollView>
                <DataTable.Row key={item._id}>
                  <DataTable.Cell style={[styles.tablebody, {width: 50}]}>
                    <Checkbox
                      status={item.selected ? 'checked' : 'unchecked'}
                      onPress={() => handleCheckboxChange (item._id)}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 50}]}>
                    {item.Seq}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 180}]}>
                    {item.ASSETITEMDESCRIPTION}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 160}]}>
                    {item.ASSETITEMGROUP}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 140}]}>
                    {item.ASSETCATGORY}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 170}]}>
                    {item.ASSETSUB_CATGORY}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 130}]}>
                    {item.ONHANDQTY}
                  </DataTable.Cell>


                   <DataTable.Cell style={[styles.tablebody, {width: 160}]}>
                    {item.REORDER}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 140}]}>
                    {item.MINIMUMORDERLEVEL}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 170}]}>
                    {item.LASTPURCHASEDATE}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, {width: 130}]}>
                    {item.WARRANTYENDDATE}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[
                      styles.tablebody,
                      {width: 140, borderRightWidth: 1, borderBottomWidth: 1},
                    ]}
                  >
                    <Menu
                      onSelect={value => alert (`Selected number: ${value}`)}
                    >
                      <MenuTrigger>
                        <View style={styles.actions}>
                          <Text>Action </Text>
                          <AntDesign name="caretdown" size={18} color="black" />
                        </View>
                      </MenuTrigger>
                      <MenuOptions
                        optionsContainerStyle={{width: 'auto', padding: 10}}
                      >
                        <MenuOption value={1}>
                          <View style={styles.actions}>
                            <Text style={styles.actionstitle}>View</Text>
                            <AntDesign name="eye" size={20} color="#0A2DAA" />
                          </View>
                        </MenuOption>
                        <MenuOption value={2}>
                          <View style={styles.actions}>
                            <Text style={styles.actionstitle}>Update</Text>
                            <FontAwesome5
                              name="pencil-alt"
                              size={13}
                              color="#0A2DAA"
                            />
                          </View>
                        </MenuOption>
                        <MenuOption value={3}>
                          <View style={styles.actions}>
                            <Text style={styles.actionstitle}>Delete</Text>
                            <AntDesign name="delete" size={15} color="red" />
                          </View>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </DataTable.Cell>
                </DataTable.Row>
              </ScrollView>
            ))}

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

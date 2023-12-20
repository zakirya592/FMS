import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import axios from "axios";

export default function ExpireWarrntytable() {
  const [value, setvalue] = useState({
    AssetItemGroupCode: '',
    WorkRequest: '',
  });

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [items, setItems] = useState([]);
  const getapi = () => {
    axios.get(`/api/AssetsMaster_GET_LIST`).then((res) => {
      setItems(res.data.recordset)
    }).catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
    getapi()
  }, [])
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(
    () => {
      setPage(0);
    },
    [itemsPerPage]
  );

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = AssetItemDescription => {
    const updatedItems = items.map(
      item => (item.AssetItemDescription === AssetItemDescription ? { ...item, selected: !item.selected } : item)
    );
    setItems(updatedItems);
    // Update selectedItems state
    const selectedIds = updatedItems
      .filter(item => item.selected)
      .map(item => item.AssetItemDescription);
    setSelectedItems(selectedIds);
  };

  const handleSelectAllChange = () => {
    const allSelected = items.every(item => item.selected);
    const updatedItems = items.map(item => ({
      ...item,
      selected: !allSelected,
    }));
    setItems(updatedItems);
    const selectedIds = updatedItems
      .filter(item => item.selected)
      .map(item => item.AssetItemDescription);
    setSelectedItems(selectedIds);
  };

  const [AssetItemGrouplist, setAssetItemGrouplist] = useState([]);
  useEffect(() => {
    axios.get(`/api/AssetItemGroup_GET_LIST`).then((res) => {
      setAssetItemGrouplist(res.data.recordsets[0])
    }).catch((err) => {
      console.log(err);
    });
  }, [])


  return (
    <ScrollView>
      <View>
        {/* Top section */}
        <View>
          <Text style={styles.prograp}>Expired/Warrany Ends</Text>
        </View>
        {/* AssetItemDescription and Asset Item Description */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>Asset Item Description</Text>
            <TextInput
              style={[
                styles.inputBox,
              ]}
              value={value.AssetItemDescription}
              onChangeText={item => {
                setvalue((prevValue) => ({
                  ...prevValue,
                  AssetItemDescription: item,
                }));
              }}
              placeholder="Asset Item Description"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>Asset Item Group
            </Text>
            <Dropdown
              style={[styles.inputBox, { height: 40, }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={[
                { AssetItemGroupCode: 'Select All', AssetItemGroupName: 'Select All' },
                ...AssetItemGrouplist,
              ]}
              maxHeight={200}
              labelField="AssetItemGroupCode"
              valueField="AssetItemGroupCode"
              value={value.AssetItemGroupCode}
              onChange={item => {
                if (item?.AssetItemGroupCode === 'Select All') {
                  setvalue(prevValue => ({
                    ...prevValue,
                    AssetItemGroupCode: item?.AssetItemGroupCode || '',
                  }));
                } else {
                  setvalue(prevValue => ({
                    ...prevValue,
                    AssetItemGroupCode: item?.AssetItemGroupCode || '',
                  }));
                }
              }}
            />
          </View>

        </View>
        {/* table section */}
        <ScrollView horizontal>
          <DataTable style={[styles.item, { width: '100%', height: 450, margin: 0, }]}>
            <DataTable.Header>
              <DataTable.Title
                style={[styles.header, { width: 50, borderTopLeftRadius: 5 }]}
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
              <DataTable.Title style={[styles.header, { width: 80 }]}>
                <Text style={styles.tableHeading}>Seq </Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 200 }]}>
                <Text style={styles.tableHeading}>ASSET ITEM DESCRIPTION</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 160 }]}>
                <Text style={styles.tableHeading}>ASSET ITEM GROUP</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 140 }]}>
                <Text style={styles.tableHeading}>ASSET CATGORY</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 170 }]}>
                <Text style={styles.tableHeading}>ASSET SUB_CATGORY</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 130 }]}>
                <Text style={styles.tableHeading}>ON-HAND QTY</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 150 }]}>
                <Text style={styles.tableHeading}>WARRANTY PERIOD</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 150 }]}>
                <Text style={styles.tableHeading}>WARRANTY</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 180 }]}>
                <Text style={styles.tableHeading}>LAST PURCHASE DATE</Text>
              </DataTable.Title>
              <DataTable.Title style={[styles.header, { width: 180, borderTopRightRadius: 5 }]}>
                <Text style={styles.tableHeading}>MINIMUM ORDER LEVEL</Text>
              </DataTable.Title>
            </DataTable.Header>
            {items.filter(item => (
              (!value.AssetItemGroupCode || value.AssetItemGroupCode === 'Select All' || item.AssetItemGroup === value.AssetItemGroupCode) &&
              (!value.AssetItemDescription || item.AssetItemDescription.toLowerCase().includes(value.AssetItemDescription.toLowerCase()))
            )).slice(from, to).map((item, index) => (
              <DataTable.Row key={item.AssetItemDescription} index={item.AssetItemDescription}>
                <DataTable.Cell style={[styles.tablebody, { width: 50 }]}>
                  <Checkbox
                    status={item.selected ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange(item.AssetItemDescription)}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 80 }]}>
                  {index + 1}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>
                  {item.AssetItemDescription}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 160 }]}>
                  {item.AssetItemGroup}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>
                  {item.AssetCategory}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>
                  {item.AssetSubCategory}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 130 }]}>
                  {item.OnHandQty}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>
                  {item.WarrantyPeriod}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>
                  {item.Warranty}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>
                  {moment(item.LastPurchaseDate).isValid() ? moment(item.LastPurchaseDate).format('DD/MM/YYYY') : ''}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>
                  {moment(item.WarrantyEndDate).isValid() ? moment(item.WarrantyEndDate).format('DD/MM/YYYY') : ''}
                </DataTable.Cell>
              </DataTable.Row>
            ))}

          </DataTable>
        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
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
              style={{ marginRight: 7 }}
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
              style={{ marginRight: 12 }}
            />
            Export
          </Button>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'space-around'
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
    marginVertical: 20,
  },
  inputBox: {
    width: 170,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "#94A0CA",
    borderWidth: 1,
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
    marginBottom: 10,
  },
  outlineIcon: {
    borderWidth: 1, // You can customize the border properties as needed
    borderRadius: 15, // Adjust the border radius to match the filled icon
    marginRight: 10, // Add spacing between the two icons
  },
  header: {
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  tableHeading: {
    color: '#1E3B8B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tablebody: {
    borderColor: '##9384EB',
    borderWidth: 0.5,
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

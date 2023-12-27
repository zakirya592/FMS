import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Icon, Dialog } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AwesomeAlert from 'react-native-awesome-alerts'; 
import { FontAwesome5 } from '@expo/vector-icons';


export default function GoodReceiptCreate({ route }) {
  const { myFunction } = route.params
  const navigation = useNavigation();

  const [value, setvalue] = useState({
    PurchaseOrderNumber: '',
    InvoiceNumber: '', PurchaseOrder:'',
    EmployeeNumber: '', EmployeeName: '',
    VendorCode: '', VendorCodeEmployeeName: '',
    SUBTOTALAMOUNT: '0', VAT: '0', TOTALAMOUNT: '0',
    VendorConfirm: '', Discounts: '0', FeedbackComments:'',
  });

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  const [ActualDeliveryDate, setActualDeliveryDate] = useState(null);
  const [showPickerActualDeliveryDate, setShowPickerActualDeliveryDate] = useState(false);

  const onChangeActualDeliveryDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPickerActualDeliveryDate(Platform.OS === 'ios');
    setActualDeliveryDate(currentDate);
  };

  const showDatepickerActualDeliveryDate = () => {
    setShowPickerActualDeliveryDate(true);
  };
  
  const [items, setItems] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (_id) => {
    const updatedItems = items.map((item) =>
      item._id === _id ? { ...item, selected: !item.selected } : item
    );
    setItems(updatedItems);
    const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item._id);
    setSelectedItems(selectedIds);
  };

  const handleSelectAllChange = () => {
    const allSelected = items.every((item) => item.selected);
    const updatedItems = items.map((item) => ({
      ...item,
      selected: !allSelected,
    }));
    setItems(updatedItems);
    const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item._id);
    setSelectedItems(selectedIds);
  };

  const [EmployeeiddropdownEmployeeNumber, setEmployeeiddropdownEmployeeNumber] = useState([])
  const [EmployeeiddropdownVendorCode, setEmployeeiddropdownVendorCode] = useState([])
  const [PurchaseOrderdropdown, setPurchaseOrderdropdown] = useState([]);

  useEffect(() => {
    axios.get('/api/EmployeeID_GET_LIST').then((response) => {
      const data = response.data.recordset.map((item) => ({
        labelEmployeeID: `${item.Firstname} (${item.EmployeeID})`,
        valueEmployeeID: item.EmployeeID,
        labelEmployeeIDname: item.Firstname
      }));
      setEmployeeiddropdownEmployeeNumber(data)
    }).catch((error) => {
      console.log('-----', error);
    });
    axios.get('/api/Filter_VendorMaster')
      .then((response) => {
        const data = response.data.recordset.map((item) => ({
          labelVendorID: `${item.VendorID} (${item.VendorName})`,
          valueVendorID: item.VendorID,
          labelVendorNamename: item.VendorName
        }));
        setEmployeeiddropdownVendorCode(data)
      }).catch((error) => {
        console.log('-----', error);
      });
    axios.get('/api/Filter_PurchaseOrderNumber')
      .then((response) => {
        const data = response?.data?.recordset;
        setPurchaseOrderdropdown(data ?? [])
      })
      .catch((error) => {
        console.log('-----', error);
      }
      );
  }, [])

  const [showAlertpost, setshowAlertpost] = useState(false);
  const showSuccessAlertpost = () => {
    setshowAlertpost(true);
  };
  const [showAlertstatus, setshowAlertstatus] = useState(false);
  const showSuccessAlertstatus = () => {
    setshowAlertstatus(true);
  };
  const Assetcodebtn = (e) => {
    if (value.PurchaseOrder) {
      navigation.navigate('Addgoodreceip', { PurchaseOrderNumber: value.PurchaseOrder, myFunction: getapi });
    } else {
      showSuccessAlertstatus(true)
    }
  };


  const [datanumber, setdatanumber] = useState([])

  const getapi = () => {
    axios.get(`/api/GET_BY_PurchaseOrderNumber_GoodsReceiptDetail/${value.PurchaseOrder}`)
      .then((res) => {
        const SAQ = res.data.recordset.map((item) => item.seq);
        const AssetItemDescriptionsss = res.data.recordset.map((item) => item.AssetItemDescription);
        const promises = res.data.recordset.map((item) => {
          const itid = item.AssetItemDescription;
          return axios.get(`/api/tblAssetsMaster_GET_BYID/${itid}`).then((res) => {
            return {
              item,
              data: res.data.recordset,
            };
          }).catch((err) => {
            console.log(err);
            return {
              item,
              data: null
            };
          });
        });

        const promisesNumber = res.data.recordset.map((item) => {
          const itid = item.AssetItemDescription;
          return axios.get(`/api/AssetTransactions_GET_ItemDescription/${itid}`)
            .then((res) => {
              return {
                item,
                data: res.data.recordset,
              };
            }).catch((err) => {
              console.log(err);
              return {
                item,
                data: []
              };
            });
        });

        Promise.all([Promise.all(promises), Promise.all(promisesNumber)])
          .then(([results1, results2]) => {
            results1.forEach((itemRecords, index) => {
              const recordsWithDescriptions = AssetItemDescriptionsss.map((description, index) => ({
                description: description,
                records: results1[index],
                saq: SAQ[index],
              }));
              const recordsWithSAQ = SAQ.map((saq, index) => ({
                saq: SAQ[index],
                records: results1[index],
              }));
              setItems(recordsWithDescriptions, recordsWithSAQ);
            });
            results2.forEach((itemRecords, index) => {
              const assetItemTagID = AssetItemDescriptionsss.map((assetItemTagID, index) => ({
                assetItemTagID: assetItemTagID,
                records: results2[index],
                saq: SAQ[index],
              }));
              setdatanumber(assetItemTagID);
            });

          });
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
  useEffect(() => {
    getapi()
  }, [])
  const countDuplicates = (array, key) => {
    const counts = {};
    array.forEach(item => {
      const value = item[key];
      counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
  };
  const duplicatesCount = countDuplicates(items, 'description');
  const uniqueDescriptions = Array.from(new Set(items.map(row => row.description)));
  const filteredRows = uniqueDescriptions.map((description, index) => {
    const assetQty = duplicatesCount[description] || 0;
    const purchaseAmount = items[index].records ? parseFloat(items[index].records.data[0].PurchaseAmount) : '';
    let totalPrice;

    if (!isNaN(purchaseAmount)) {
      if (assetQty === 1) {
        totalPrice = purchaseAmount;
      } else if (assetQty > 1) {
        totalPrice = purchaseAmount * assetQty;
      } else {
        totalPrice = 0; // Handle cases where AssetQty is negative or invalid
      }
    } else {
      totalPrice = 0; // Handle cases where PurchaseAmount is not a valid number
    }

    return {
      id: index + 1,
      AssetItemDescription: description,
      PurchaseRequest: datanumber[index]?.records?.data[0]?.AssetItemTagID || "",
      ASQS: items.find(row => row.description === description)?.saq || 0,
      AssetQty: assetQty,
      PurchaseAmount: purchaseAmount,
      TOTAL_PRICE: totalPrice,
    };
  });
  // Calculate the overall TOTAL_PRICE
  const overallTotalPrice = filteredRows.reduce((total, row) => total + row.TOTAL_PRICE, 0);
  // Calculate the initial overallTotalPrice

  const initialOverallTotalPrice = calculateOverallTotalPrice(filteredRows);

  const [overallTotalPricess, setOverallTotalPricess] = useState(initialOverallTotalPrice);
  // console.log(initialOverallTotalPrice);
  useEffect(() => {
    setOverallTotalPricess(initialOverallTotalPrice);
  }, [initialOverallTotalPrice])
  // Function to calculate the overallTotalPrice
  function calculateOverallTotalPrice(rows) {
    return rows.reduce((total, row) => total + row.TOTAL_PRICE, 0);
  }

  // Update overallTotalPrice when the VAT input changes
  const handleVATChange = (text) => {
    const newVAT = parseFloat(text) || 0; // Parse the VAT input as a number
    const newOverallTotalPrice = initialOverallTotalPrice + newVAT;
    setOverallTotalPricess(newOverallTotalPrice);

    setvalue(prevValue => ({
      ...prevValue,
      VAT: newVAT,
    }));
  };
  function handlediscountChange(newDiscount) {
    const parsedDiscount = parseFloat(newDiscount) || 0;
    const newOverallTotalPrice = initialOverallTotalPrice - parsedDiscount;
    setOverallTotalPricess(newOverallTotalPrice);
    setvalue(prevValue => ({
      ...prevValue,
      Discounts: newDiscount,
    }));
  }
  // Deleting api
  const [visible2, setVisible2] = useState(false);
  const [deleteItemCode, setDeleteItemCode] = useState('');

  const toggleDialog2 = (ASQS) => {
    setDeleteItemCode(ASQS);
    setVisible2(!visible2);
  };
  const [showAlert, setShowAlert] = useState(false);
  const showSuccessAlert = () => {
    setShowAlert(true);
  };

  const Deletedapi = (ASQS) => {
    axios.delete(`/api/PurchaseGOODSAsset_DELETE_BYID/${ASQS}`)
      .then((res) => {
        setVisible2(false);
        console.log(ASQS);
        getapi()
        showSuccessAlert(true)
      })
      .catch((err) => {
        console.log('Error deleting', err);
      });
  }


  const Createapi = () => {
    axios.post(`/api/GoodsReceipt_post`, {
      PurchaseOrderNumber: value.PurchaseOrder,
      InvoiceNumber: value.InvoiceNumber,
      InvoiceDate: date,
      ActualDeliveryDate: ActualDeliveryDate,
      RecievedByEmployeeID: value.EmployeeNumber,
      VendorID: value.VendorCode,
      FeedbackOrComments: value.FeedbackComments,
      DiscountAmount: value.Discounts,
      VAT: value.VAT,
      TOTAL_AMOUNT: overallTotalPricess,
    }).then((res) => {
      myFunction()
      showSuccessAlertpost(true)
    }).catch((err) => {
      console.log('err', err);
    });
  };

  return (

    <ScrollView contentContainerStyle={styles.containerscrollview}>
      <View>
        <View >
          <Text style={styles.prograp}>Create Goods Receipts</Text>
        </View>
        {/* Purchase Order  */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>Purchase Order
            </Text>
            <Dropdown
              style={[styles.inputBox, { height: 40, },]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={PurchaseOrderdropdown}
              search
              maxHeight={200}
              labelField="PurchaseOrderNumber"
              valueField="PurchaseOrderNumber"
              placeholder={'Select Purchase Order'}
              searchPlaceholder="Search..."
              value={value.PurchaseOrder}
              onChange={item => {
                setvalue((prevValue) => ({
                  ...prevValue,
                  PurchaseOrder: item?.PurchaseOrderNumber || '',
                }));
              }}
            />
          </View>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}> Invoice Number </Text>
            <TextInput
              style={[
                styles.inputBox,
              ]}
              value={value.InvoiceNumber}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  InvoiceNumber: item,
                }));
              }}
              placeholder="Purchase Order"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
          </View>
        </View>
        {/* invoice data and Actual date */}
        <View style={styles.inputContainer}>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>Invoice Date
            </Text>

            <View>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
              }}>
                <TextInput
                  style={[styles.inputBox, { position: 'relative', }]}
                  value={date ? date.toISOString().split('T')[0] : 'YYYY-MM-DD'}

                  editable={true}
                />
                <TouchableOpacity onPress={showDatepicker} style={styles.iconcontainer}>
                  <AntDesign name="calendar" size={20} color="white" />
                </TouchableOpacity>
              </View>
              {showPicker && (
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>Actual Delivery Date
            </Text>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.inputBox, { position: 'relative' }]}
                  placeholder="dd/mm/yyyy"
                  editable={true}
                  value={ActualDeliveryDate ? ActualDeliveryDate.toISOString().split('T')[0] : 'YYYY-MM-DD'}
                />
                <TouchableOpacity
                  onPress={showDatepickerActualDeliveryDate}
                  style={styles.iconcontainer}
                >
                  <AntDesign name="calendar" size={20} color="white" />
                </TouchableOpacity>
              </View>
              {showPickerActualDeliveryDate &&
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={ActualDeliveryDate || new Date()}
                    mode="date"
                    is24Hour={true}
                    format="YYYY-MM-DD"
                    display="default"
                    onChange={onChangeActualDeliveryDate}
                  />
                </View>}
            </View>
          </View>
        </View>
        {/* Recieved by Number and Emp Name. */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>Recieved by
            </Text>
            <Dropdown
              style={[styles.inputBox, { height: 40, }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={EmployeeiddropdownEmployeeNumber}
              maxHeight={200}
              labelField="labelEmployeeID"
              valueField="valueEmployeeID"
              placeholder={'Review/Processed '}
              search
              searchPlaceholder='search by Employee ID'
              value={value.EmployeeNumber}
              onChange={item => {
                setvalue((prevValue) => ({
                  ...prevValue,
                  EmployeeNumber: item?.valueEmployeeID || '',
                  EmployeeName: item?.labelEmployeeIDname || '',
                }));
              }}

            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>Employee Name
            </Text>
            <TextInput
              style={styles.inputBox}
              value={value.EmployeeName}
              onChange={text => {
                setvalue((prevValue) => ({
                  ...prevValue,
                  EmployeeName: text,
                }));
              }}
              placeholder="Employee Name"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
            />
          </View>

        </View>
        {/* ADD BUTTON */}
        <Button radius={"md"} type="solid" containerStyle={{
          width: 200,
          marginHorizontal: 20,
          marginVertical: 20,
        }}
          onPress={Assetcodebtn}
        >
          <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
          Add Goods Receipts
        </Button>
        {/* Table section */}
        <View style={[{ height: 300, marginBottom: 40 }]}>
          <ScrollView horizontal vertical>
            <DataTable style={[styles.item, {
              width: '100%', height: 450, margin: 0
            }]} >
              <DataTable.Header>
                <DataTable.Title style={[styles.header, { width: 50, borderTopLeftRadius: 5 }]}><Text style={styles.tableHeading}>
                  <Checkbox
                    status={selectedItems.length === items.length ? 'checked' : 'unchecked'}
                    onPress={handleSelectAllChange}
                  /></Text></DataTable.Title>
                <DataTable.Title style={[styles.header, { width: 180 }]} ><Text style={styles.tableHeading}>MATERIAL /STOCK CODE</Text></DataTable.Title>
                <DataTable.Title style={[styles.header, { width: 150 }]} ><Text style={styles.tableHeading}>DESCRIPTION</Text></DataTable.Title>
                <DataTable.Title style={[styles.header, { width: 200 }]}><Text style={styles.tableHeading}>QAT</Text></DataTable.Title>
                <DataTable.Title style={[styles.header, { width: 140 }]}><Text style={styles.tableHeading}>UNITY PRICE</Text></DataTable.Title>
                <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>TOTAL PRICE</Text></DataTable.Title>
                <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>ACTIONS</Text></DataTable.Title>
              </DataTable.Header>
              <ScrollView>
              {uniqueDescriptions.map((item, index) => (
                <DataTable.Row key={item}>
                  <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                    <Checkbox
                      status={item.selected ? 'checked' : 'unchecked'}
                      onPress={() => handleCheckboxChange(item)}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>{datanumber[index]?.records?.data[0]?.AssetItemTagID || ""}</DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item}</DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{duplicatesCount[item] || 0}</DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{items[index].records ? parseFloat(items[index].records.data[0].PurchaseAmount) : ''}</DataTable.Cell>
                  <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>
                    {(() => {
                      const assetQty = duplicatesCount[item] || 0;
                      const purchaseAmount = items[index].records ? parseFloat(items[index].records.data[0].PurchaseAmount) : '';
                      let totalPrice;

                      if (!isNaN(purchaseAmount)) {
                        if (assetQty === 1) {
                          totalPrice = purchaseAmount;
                        } else if (assetQty > 1) {
                          totalPrice = purchaseAmount * assetQty;
                        } else {
                          totalPrice = 0;
                        }
                      } else {
                        totalPrice = 0;
                      }

                      return totalPrice;
                    })()}
                  </DataTable.Cell>

                  <DataTable.Cell style={[styles.tablebody, { width: 140, textAlign: 'center', justifyContent: 'center', }]}><TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: 'aut' }}
                    onPress={() => {
                      const ASQS = items[index]?.records.item.seq
                      // items[index]?.records?.data[0]?.saq
                      toggleDialog2(ASQS)
                    }}
                  >
                    <Text>Delete</Text>
                    <MaterialIcons name="delete" size={20} color="black" />
                  </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </ScrollView>
            </DataTable>
          </ScrollView>
        </View>
        {/* SUB TOTAL AMOUNT Level and VAT */}
        <View style={styles.inputContainer}>

          <View style={[styles.singleinputlable]}>
            <Text style={styles.lableinput}>
              SUB TOTAL AMOUNT
            </Text>
            <TextInput
              style={[styles.inputBox, { width: 150 }]}
              value={overallTotalPrice.toString()}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  SUBTOTALAMOUNT: item,
                }));
              }}
              placeholder="0"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
          </View>
          <Ionicons name="add" size={24} color="black" style={{ marginTop: 12 }} />
          <View style={[styles.singleinputlable]}>
            <Text style={styles.lableinput}>
              VAT
            </Text>
            <TextInput
              style={[styles.inputBox, { width: 150 }]}
              value={value.VAT.toString()} // Convert VAT to string to display in the TextInput
              onChangeText={handleVATChange}
              placeholder="0"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
          </View>

        </View>

        {/* TOTAL AMOUNT */}
        <View style={styles.inputContainer}>
          <View style={[styles.singleinputlable]}>
            <Text style={styles.lableinput}>
              Discounts
            </Text>
            <TextInput
              style={[styles.inputBox, { width: 150 }]}
              value={value.Discounts.toString()} // Convert VAT to string to display in the TextInput
              onChangeText={handlediscountChange}
              placeholder="0"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
          </View>
          <FontAwesome5 name="equals" size={20} color="black" style={{ marginTop: 12 }} />
        <View style={[styles.singleinputlable]}>
          <Text style={styles.lableinput}>TOTAL AMOUNT
          </Text>
          <TextInput
              style={[styles.inputBox, { width: 150 }]}
            value={overallTotalPricess.toString()}
            onChangeText={item => {
              setOverallTotalPricess(item)
            }}
            placeholder="TOTAL AMOUNT"
            placeholderTextColor="#94A0CA"
            selectionColor="#1D3A9F"
            underlineColorAndroid="transparent"
            keyboardType="numeric"
          />
        </View>
        </View>
        {/* Vendor Code */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>Vendor Code
            </Text>
            <Dropdown
              style={[styles.inputBox, { height: 40, }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={EmployeeiddropdownVendorCode}
              maxHeight={200}
              labelField="labelVendorID"
              valueField="valueVendorID"
              placeholder={'Vendor Code'}
              search
              searchPlaceholder='search Emp. Code'
              value={value.VendorCode}
              onChange={item => {
                setvalue((prevValue) => ({
                  ...prevValue,
                  VendorCode: item?.valueVendorID || '',
                  VendorCodeEmployeeName: item?.labelVendorNamename || '',
                }));
              }}

            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>Employee Name
            </Text>
            <TextInput
              style={styles.inputBox}
              value={value.VendorCodeEmployeeName}
              onChange={text => {
                setvalue((prevValue) => ({
                  ...prevValue,
                  VendorCodeEmployeeName: text,
                }));
              }}
              placeholder="Employee Name"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
            />
          </View>

        </View>
        {/* Feedback/FeedbackComments */}
        <View style={[styles.singleinputlable, { marginLeft: 10, marginBottom: 10, }]}>
          <Text style={styles.lableinput}>Feedback/FeedbackComments
          </Text>
          <TextInput
            style={[styles.inputBox, { width: 340 }]}
            value={value.FeedbackComments}
            onChangeText={text => {
              setvalue((prevValue) => ({
                ...prevValue,
                FeedbackComments: text
              }));
            }}
            multiline
            numberOfLines={2}
            placeholder="Please provide nature or Feedback/Comments of the request"
            placeholderTextColor="#94A0CA"
            selectionColor="#1D3A9F"
            underlineColorAndroid="transparent"
          />
        </View>
        {/* Button section */}
        <Button radius={"md"} type="solid" containerStyle={{
          width: 150,
          marginLeft: 15,
          marginBottom: 10,
        }}
          onPress={Createapi}
        >
          <Ionicons name="md-save-outline" size={20} color="white" style={{ marginRight: 12 }} />
          SAVE
        </Button>
        {/* Deleted  Dialog*/}
        <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
          <Dialog.Title title="Are you sure?" />
          <Text>{`You want to delete this  Add Goods Receipts`}</Text>
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
          message={`Goods Receipts has been deleted.`}
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
        {/* create data */}
        <AwesomeAlert
          show={showAlertpost}
          title={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="ios-checkmark-circle" size={30} color="#4CAF50" style={{ marginRight: 5 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Success</Text>
            </View>
          }
          message={`Goods Receipts ${value.PurchaseOrder} has been created successfully`}
          confirmButtonColor="#DD6B55"
          confirmButtonStyle={{ backgroundColor: 'black' }}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          onConfirmPressed={() => {
            navigation.navigate('GoodReceiptable')
            myFunction()
          }}
        />

        <AwesomeAlert
          show={showAlertstatus}
          title={
            <View >
              <MaterialIcons name="error-outline" color="red" size={30} style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 4, marginLeft: 5 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Error!</Text>
            </View>
          }
          message={`Purchase order number is required to assign add to assetCode`}
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
// Style section
const styles = StyleSheet.create({
  iconcontainer: {
    position: 'absolute',
    left: '86%',
    backgroundColor: 'black',
    padding: 1,
    borderRadius: 5
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#94A0CA'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 16,
  },
  prograp: {
    color: '#1E3B8B',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    marginHorizontal: 10,
    marginVertical: 20,
  },
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
    lineHeight: 17
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
  outlineIcon: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 10,
  },
  tableborder: {
    width: '99%',
    borderColor: "#94A0CA",
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5
  },
  header: {
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  tableHeading: {
    color: '#1E3B8B',
    fontWeight: 'bold',
    fontSize: 14
  },
  tablebody: {
    borderColor: "##9384EB",
    borderWidth: 0.5,
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5
  },

})

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


export default function Viewpurachaserequest({ route }) {
    const { PurchaseRequestNumber } = route.params
    const navigation = useNavigation();

    const [value, setvalue] = useState({
        PurchaseRequest: PurchaseRequestNumber,
        EmployeeNumber: '', EmployeeName: '',
        Inclusive: '', Purpose: '',
        VendorCode: '', VendorCodeEmployeeName: '',
        Verifiedby: '', VerifiedbyEmployeeName: '',
        SUBTOTALAMOUNT: '0', VAT: '0', TOTALAMOUNT: '0'
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
    // DateRequired
    const [DateRequired, setDateRequired] = useState(new Date());
    const [showPickerDateRequired, setShowPickerDateRequired] = useState(false);
    const onChangeDateRequired = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPickerDateRequired(Platform.OS === 'ios');
        setDateRequired(currentDate);
    };
    const showDatepickerDateRequired = () => {
        setShowPickerDateRequired(true);
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
    const [EmployeeiddropdownVerifiedby, setEmployeeiddropdownVerifiedby] = useState([])

    useEffect(() => {
        axios.get('/api/EmployeeID_GET_LIST').then((response) => {
            const data = response.data.recordset.map((item) => ({
                labelEmployeeID: `${item.Firstname} (${item.EmployeeID})`,
                valueEmployeeID: item.EmployeeID,
                labelEmployeeIDname: item.Firstname
            }));
            setEmployeeiddropdownEmployeeNumber(data)
            setEmployeeiddropdownVerifiedby(data)
        }).catch((error) => {
            console.log('-----', error);
        });
        axios.get('/api/Filter_VendorMaster')
            .then((response) => {
                // const data = response?.data?.recordset;
                const data = response.data.recordset.map((item) => ({
                    labelVendorID: `${item.VendorID} (${item.VendorName})`,
                    valueVendorID: item.VendorID,
                    labelVendorNamename: item.VendorName
                }));
                setEmployeeiddropdownVendorCode(data)
            })
            .catch((error) => {
                console.log('-----', error);
            });
    }, [])
    const Inclusivedropdowwn = [
        { label: 'Y', value: 'Y' },
        { label: 'N', value: 'N' },
    ];

    const [datanumber, setdatanumber] = useState([])

    const getapi = () => {
        axios.get(`/api/PurchaseRequestDetail_GET_BY_PurchaseRequestNumber/${value.PurchaseRequest}`)
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
    const getapiget = () => {
        axios.get(`/api/PurchaseRequest_GET_BYID/${PurchaseRequestNumber}`)
            .then((res) => {
                console.log(res.data.recordset[0].VATInclude);
                setvalue((prevValue) => ({
                    ...prevValue,
                    EmployeeNumber: res.data.recordset[0].RequestByEmployeeID,
                    Purpose: res.data.recordset[0].Purpose,
                    PurchaseRequest: res.data.recordset[0].PurchaseRequestNumber,
                    assignEmployee,
                    VAT: res.data.recordset[0].VAT,
                    Verifiedby: res.data.recordset[0].VerifiedByEmpl,
                    Inclusive: res.data.recordset[0].VATInclude,
                    VendorCode: res.data.recordset[0].VendorID,
                }));

                const completeEmployee = res.data.recordset[0].RequestByEmployeeID
                axios.post(`/api/getworkRequest`, {
                    "EmployeeID": completeEmployee
                }).then((res) => {
                    if (res.data.recordsets && res.data.recordsets.length > 0 && res.data.recordsets[0].length > 0) {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            EmployeeName: res.data.recordsets[0][0].Firstname || '',
                        }));
                    } else {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            EmployeeName: '',
                        }));
                    }
                }).catch((err) => {
                    console.log(err);
                });
                const vendorcode = res.data.recordset[0].VendorID
                axios.get(`/api/VendorMaster_GET_BYID/${vendorcode}`).then((res) => {
                    
                    if (res.data.recordset && res.data.recordset.length > 0 && res.data.recordset[0].length > 0) {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            VendorCodeEmployeeName: res.data.recordset[0].VendorName || '',
                        }));
                    } else {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            VendorCodeEmployeeName: '',
                        }));
                    }
                }).catch((err) => {
                    console.log(err);
                });
                const assignEmployee = res.data.recordset[0].VerifiedByEmpl;
                axios.post(`/api/getworkRequest`, {
                    "EmployeeID": assignEmployee
                }).then((res) => {
                    if (res.data.recordsets && res.data.recordsets.length > 0 && res.data.recordsets[0].length > 0) {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            VerifiedbyEmployeeName: res.data.recordsets[0][0].Firstname || '',
                        }));
                    } else {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            VerifiedbyEmployeeName: '',
                        }));
                    }
                }).catch((err) => {
                    console.log(err);
                });

                setOverallTotalPricess(res.data.recordset[0].TOTAL_AMOUNT)
                const RequestDatever = res.data.recordset[0].RequestDate
                setDate(new Date(RequestDatever))
                const RequestedDatever = res.data.recordset[0].RequiredDate
                setDateRequired(new Date(RequestedDatever))

            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapiget()
    }, [])
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
        axios.delete(`/api/PurchaseRequestAsset_DELETE_BYID/${ASQS}`)
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

        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View >
                    <Text style={styles.prograp}>View Purchase Requests</Text>
                </View>
                {/* Purchase Request and Date Request */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Purchase Request</Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                            ]}
                            value={value.PurchaseRequest}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    PurchaseRequest: item.value,
                                }));
                            }}
                            editable={false}
                            placeholder="Purchase Request"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Request Date
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
                </View>
                {/* Requested by Number and Emp Name. */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Requested by
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
                            placeholder={'Requested by'}
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
                {/* Date requesed and VAT inclusing */}
                <View style={[styles.inputContainer]}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Date Required
                        </Text>

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative' }]}
                                    placeholder="dd/mm/yyyy"
                                    editable={true}
                                    value={DateRequired ? DateRequired.toISOString().split('T')[0] : 'YYYY-MM-DD'}
                                />
                                <TouchableOpacity
                                    onPress={showDatepickerDateRequired}
                                    style={styles.iconcontainer}
                                >
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerDateRequired &&
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={DateRequired || new Date()}
                                        mode="date"
                                        is24Hour={true}
                                        format="YYYY-MM-DD"
                                        display="default"
                                        onChange={onChangeDateRequired}
                                    />
                                </View>}
                        </View>
                    </View>
                    <View style={[styles.singleinputlable]}>
                        <Text style={styles.lableinput}>
                            VAT Inclusive(Y/N)?
                        </Text>
                        <Dropdown
                            style={[
                                styles.inputBox,
                                { height: 40 },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={Inclusivedropdowwn}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'select Inclusive Y/N'}
                            value={value.Inclusive}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Inclusive: item?.value || '',
                                }));
                            }}
                        />
                    </View>
                </View>
                {/* Purpose */}
                <View style={[styles.singleinputlable, { marginLeft: 10, marginBottom: 10, }]}>
                    <Text style={styles.lableinput}>Purpose
                    </Text>
                    <TextInput
                        style={[styles.inputBox, { width: 340 }]}
                        value={value.Purpose}
                        onChangeText={text => {
                            setvalue((prevValue) => ({
                                ...prevValue,
                                Purpose: text
                            }));
                        }}
                        multiline
                        numberOfLines={2}
                        placeholder="Please provide nature or purpose of the request"
                        placeholderTextColor="#94A0CA"
                        selectionColor="#1D3A9F"
                        underlineColorAndroid="transparent"
                    />
                </View>
                {/* ADD BUTTON */}
                <Button radius={"md"} type="solid" containerStyle={{
                    width: 200,
                    marginHorizontal: 20,
                    marginVertical: 20,
                }}
                    disabled
                >
                    <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
                    Purachase Requests
                </Button>
                {/* Table section */}
                <View style={[{ height: 300, marginBottom: 40 }]}>
                    <ScrollView horizontal >
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
                <View style={[styles.singleinputlable, { marginLeft: 10, marginBottom: 10, }]}>
                    <Text style={styles.lableinput}>TOTAL AMOUNT
                    </Text>
                    <TextInput
                        style={[styles.inputBox,]}
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
                {/* Verified by */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Verified by
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={EmployeeiddropdownVerifiedby}
                            maxHeight={200}
                            labelField="labelEmployeeID"
                            valueField="valueEmployeeID"
                            placeholder={'Verified by'}
                            search
                            searchPlaceholder='search Emp. Code'
                            value={value.Verifiedby}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Verifiedby: item?.valueEmployeeID || '',
                                    VerifiedbyEmployeeName: item?.labelEmployeeIDname || '',
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee Name
                        </Text>
                        <TextInput
                            style={styles.inputBox}
                            value={value.VerifiedbyEmployeeName}
                            onChange={text => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    VerifiedbyEmployeeName: text,
                                }));
                            }}
                            placeholder="Employee Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Button section */}
                <Button radius={"md"} type="solid" containerStyle={{
                    width: 350,
                    paddingHorizontal: 12,
                    marginRight: 40,
                    marginBottom: 20,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}
                    buttonStyle={{
                        backgroundColor: 'black',
                        borderRadius: 3,
                    }}
                    onPress={() => { navigation.goBack() }}
                >
                    <Ionicons name="arrow-back-circle" size={20} color="white" style={{ marginRight: 12 }} />
                    Back
                </Button>
                {/* Deleted  Dialog*/}
                <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
                    <Dialog.Title title="Are you sure?" />
                    <Text>{`You want to delete this  Purachase Requests`}</Text>
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
                    message={` Purachase Requests has been deleted.`}
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

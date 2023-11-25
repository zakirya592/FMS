import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Icon } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import PhoneInput from "react-native-phone-number-input";
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
 import { Ionicons } from '@expo/vector-icons';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
];

export default function Createworkrequest() {
    const [value, setvalue] = useState({
        Employeeid: null, WorkRequest: '', Datetime: '', RequestStatus: '', FirstMiddleName: '', LastName: '',
        DepartmentCode: '', DepartmentName: '', WorkType: '', WorkTypeDesc: '', WorkPriority: '', WorkTrade: '',
        Building: '', Location: '', WorkTradeDesc: '', MobileNumber: '', Landline: ''
    })

    const [isFocusedDepartmentName, setIsFocusedDepartmentName] = useState(false);
    const [isFocusedWorkTradeDesc, setIsFocusedWorkTradeDesc] = useState(false);
    const [isFocusedWorkTypeDesc, setIsFocusedWorkTypeDesc] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [isFocusRequestStatus, setIsFocusRequestStatus] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios'); // On iOS, the picker is not dismissed automatically
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };

    const [items, setItems] = React.useState([
        { _id: 1, WORKREQUEST: 'ASSET/STOCK NUMBER', REQUESTSTATUS: 'ASSET ITEM GROUP', REQUESTBYEMP: 'ASSET ITEM DESCRIPTION', PRIORITY: 'ASSET QTY', REQUESTDATE: 'MODEL', WORKTYPEDESC: 'MONIFACTURER', ACTIONS: 'Open', },
    ]);

    const [selectedItems, setSelectedItems] = useState([]);

   const handleCheckboxChange = (_id) => {
        const updatedItems = items.map((item) =>
            item._id === _id ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
        // Update selectedItems state
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

    return (

        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View >
                    <Text style={styles.prograp}>Create Work Request
                    </Text>
                </View>
                {/* Employee ID and Work Request Number */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee ID
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value.Employeeid}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Employeeid: item.value, // Update the Employeeid property
                                }));
                                setIsFocus(false);
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Request#
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.WorkRequest}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkRequest: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Work Request #"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocused(true);
                            })}
                            onBlur={(() => {
                                setIsFocused(false);
                            })}
                        />
                    </View>

                </View>
                {/* Time date and Request status */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Request Date/Time*
                        </Text>

                        <View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                            }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={date.toLocaleString()}
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
                        <Text style={styles.lableinput}>Request Status
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocusRequestStatus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value.RequestStatus}
                            onFocus={() => setIsFocusRequestStatus(true)}
                            onBlur={() => setIsFocusRequestStatus(false)}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    RequestStatus: item.value, // Update the Employeeid property
                                }));
                                setIsFocusRequestStatus(false);
                            }}

                        />
                    </View>

                </View>
                {/* FirstMiddleName and last name */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>First & Middle Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.FirstMiddleName}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    FirstMiddleName: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='First & Middle Name '
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Last Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.Datetime}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Datetime: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='LastName'
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocused(true);
                            })}
                            onBlur={(() => {
                                setIsFocused(false);
                            })}
                        />
                    </View>



                </View>
                {/* Landline  Mobile Number */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Mobile Number
                        </Text>
                        <PhoneInput
                            defaultCode="US"
                            layout="first"
                            value={value.MobileNumber}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    MobileNumber: item.value, // Update the Employeeid property
                                }));
                            }}
                            containerStyle={{ height: 40, borderRadius: 5, borderColor: "#94A0CA", borderWidth: 1, color: '94A0CA', width: 170 }}
                            // textContainerStyle={{ height: 30, borderRadius: 5}}
                            textInputStyle={{ height: 25, padding: 1, fontSize: 12 }}
                            codeTextStyle={{ height: 20, display: 'none' }}
                            flagButtonStyle={{ paddingHorizontal: 24, }}
                            countryPickerButtonStyle={{ padding: 1, width: 5 }}

                        />
                    </View>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Landline
                        </Text>
                        <PhoneInput
                            defaultCode="US"
                            layout="first"
                            value={value.Landline}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Landline: item.value, // Update the Employeeid property
                                }));
                            }}
                            containerStyle={{ height: 40, borderRadius: 5, borderColor: "#94A0CA", borderWidth: 1, color: '94A0CA', width: 170 }}
                            textInputStyle={{ height: 25, padding: 1, width: '100%', fontSize: 12 }}
                            codeTextStyle={{ height: 20, display: 'none' }}
                            flagButtonStyle={{ paddingHorizontal: 24, }}
                            countryPickerButtonStyle={{ padding: 1, width: 5 }}

                        />
                    </View>



                </View>
                {/* Building and Location*/}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Building
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Building'}
                            value={value.Building}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Building: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Location
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Location'}
                            value={value.Location}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Location: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                </View>
                {/* Department */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Department Code
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select DeptCode'}
                            value={value.DepartmentCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    DepartmentCode: item.value, // Update the Employeeid property
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Department Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedDepartmentName ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.DepartmentName}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    DepartmentName: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Department Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedDepartmentName(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedDepartmentName(false);
                            })}
                        />
                    </View>

                </View>
                {/* Work Type */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Type
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Work Type'}
                            value={value.WorkType}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkType: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Type Desc
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedWorkTypeDesc ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.WorkTypeDesc}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkTypeDesc: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Work Type Description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedWorkTypeDesc(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedWorkTypeDesc(false);
                            })}
                        />
                    </View>

                </View>
                {/* WorkTradeDesc ans Add Assetcode button*/}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Priority
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Work Priority'}
                            value={value.WorkPriority}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkPriority: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Trade
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Work Trade'}
                            value={value.WorkTrade}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkTrade: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>


                </View>
                {/* Work Trade Desc and Add asset button */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Trade Desc
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedWorkTradeDesc ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.WorkTradeDesc}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkTradeDesc: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Work Trade Desc"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedWorkTradeDesc(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedWorkTradeDesc(false);
                            })}
                        />
                    </View>

                    <Button radius={"md"} type="solid" containerStyle={{
                        width: 150,
                        marginVertical: 10,
                        marginTop: 30
                    }}
                    // onPress={() => navigation.navigate('Createworkrequest')}
                    >
                        <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
                        Asset code
                    </Button>

                </View>
                {/* Table section */}
                <View style={[styles.tableborder, { height: 300, marginBottom: 40 }]}>
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
                                <DataTable.Title style={[styles.header, { width: 180 }]} ><Text style={styles.tableHeading}>ASSET/STOCK NUMBER</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 150 }]} ><Text style={styles.tableHeading}>ASSET ITEM GROUP</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 200 }]}><Text style={styles.tableHeading}>ASSET ITEM DESCRIPTION</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 140 }]}><Text style={styles.tableHeading}>ASSET QTY</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>MODEL</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>MONIFACTURER</Text></DataTable.Title>
                                 <DataTable.Title style={[styles.header, { width: 140, borderRightWidth: 1, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>ACTIONS</Text></DataTable.Title>
                            </DataTable.Header>
                            {items.map((item) => (
                                <ScrollView>
                                    <DataTable.Row key={item._id}>
                                        <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                            <Checkbox
                                                status={item.selected ? 'checked' : 'unchecked'}
                                                onPress={() => handleCheckboxChange(item._id)}
                                            />
                                        </DataTable.Cell>
                                        <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>{item.WORKREQUEST}</DataTable.Cell>
                                        <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.REQUESTSTATUS}</DataTable.Cell>
                                        <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.REQUESTBYEMP}</DataTable.Cell>
                                        <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.PRIORITY}</DataTable.Cell>
                                        <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.REQUESTDATE}</DataTable.Cell>
                                        <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.WORKTYPEDESC}</DataTable.Cell>
                                        <DataTable.Cell style={[styles.tablebody, { width: 140, borderRightWidth: 1, borderBottomWidth: 1 }]}>  
                                      <DataTable.Cell style={[styles.bodytable, { width: 140 ,textAlign:'center',justifyContent:'center'}]}>ACTIONS <MaterialIcons name="delete" size={20} color="black" /> </DataTable.Cell>
</DataTable.Cell>
                                    </DataTable.Row>
                                </ScrollView>
                            ))}

                        </DataTable>
                    </ScrollView>
                </View>
                {/* Button section */}
                <Button radius={"md"} type="solid" containerStyle={{
                    width: 150,
                    marginLeft:15,
                }}
                // onPress={() => navigation.navigate('Createworkrequest')}
                >
                    <Ionicons name="md-save-outline" size={20} color="white" style={{marginRight:12}}/>
                    SAVE
                </Button>
                <View style={[styles.inputContainer,{marginTop:12}]}>
                    <Button radius={"md"} type="outline" containerStyle={{
                        width: 150,
                    }}
                    // onPress={() => navigation.navigate('Createworkrequest')}
                    >
                        <Ionicons name="md-print-outline" size={20} color="#0A2DAA" style={{ marginRight: 12 }} />
                        Print
                    </Button>
                    <Button radius={"md"} type="outline" containerStyle={{
                        width: 150,
                    }}
                    // onPress={() => navigation.navigate('Createworkrequest')}
                    >
                        <MaterialIcons name="save-alt" size={20} color="#0A2DAA" style={{ marginRight: 12 }} />
                        Export
                    </Button>

                </View>
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
        borderWidth: 1, // Border width
        fontSize: 14,
        color: 'black',
        marginVertical: 9,
        paddingVertical: 5,
        backgroundColor: '#FFFFFF',
    },
    outlineIcon: {
        backgroundColor: 'white',
        borderWidth: 1, // You can customize the border properties as needed
        borderRadius: 12, // Adjust the border radius to match the filled icon
        marginRight: 10, // Add spacing between the two icons
    },
    tableborder: {
        width: '99%',
        borderColor: "#94A0CA",
        borderWidth: 1, // Border width
        justifyContent: 'center',
        // marginLeft: 2,
        borderRadius:5
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
        justifyContent: 'center',
        borderBottomWidth:0.5
    },

})

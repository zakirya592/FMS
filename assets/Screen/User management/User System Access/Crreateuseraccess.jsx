import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Icon } from '@rneui/themed';
import PhoneInput from "react-native-phone-number-input";
import { Ionicons } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
];

export default function Crreateuseraccess() {
    const navigation = useNavigation();

    const [value, setvalue] = useState({
        Employeeid: null, MiddleName: '', LastName: '', FirstName: '', Title: '',
        DepartmentCode: '', DepartmentName: '', UserAuthority:'',
        Building: '', Location: '', MobileNumber: '', Landline: '', 
    })

    const [isFocusedDepartmentName, setIsFocusedDepartmentName] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
 
    const [items, setItems] = React.useState([
        { _id: 1, WORKREQUEST: 'SYSTEM MODULES', REQUESTSTATUS: 'ASSET ITEM GROUP', REQUESTBYEMP: 'ASSET ITEM DESCRIPTION', PRIORITY: 'ASSET QTY', REQUESTDATE: 'MODEL', WORKTYPEDESC: 'MONIFACTURER', ACTIONS: 'Open', },
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
                    <Text style={styles.prograp}>Create User Access
                    </Text>
                </View>
                {/* Employee ID User Authority */}
                <View style={[styles.inputContainer]}>
                    <View style={[styles.singleinputlable]}>
                        <Text style={styles.lableinput}>Employee ID
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40}, isFocus && { borderColor: 'blue' }]}
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
                    <View style={[styles.singleinputlable]}>
                        <Text style={styles.lableinput}>User Authority
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40 }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={' User Authority'}
                            value={value.UserAuthority}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    UserAuthority: item.value, // Update the Employeeid property
                                }));
                            }}

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
                {/* Title  and Firrst name */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Title
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.Title}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Title: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='Enter Title'
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>First Name
                        </Text>
                        <TextInput
                            style={[styles.inputBox]}
                            value={value.FirstName}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    FirstName: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='First Name'
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>



                </View>
                {/* FirstMiddleName and last name */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Middle Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.MiddleName}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    MiddleName: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='Enter Middle Name '
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
                            value={value.LastName}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    LastName: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='Enter Last Name'
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
                {/* Add asset button */}
                {/* <View style={styles.inputContainer}> */}

                    <Button radius={"md"} type="solid" containerStyle={{
                    width: 200,
                    marginBottom:20,
                    marginLeft: 5,
                }}
                    buttonStyle={{
                        backgroundColor: '#0A2DAA',
                        borderRadius: 3,
                    }}
                    onPress={() => navigation.navigate('Addystemaccessmodules')}
                    >
                        <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
                    Add Syetem Modules
                    </Button>

                {/* </View> */}
                {/* Table section */}
                <View style={{ height: 300, marginBottom: 40 }}>
                    <ScrollView horizontal >
                        <DataTable style={[styles.item, {
                            width: '100%', height: 400, margin: 0
                        }]} >
                            <DataTable.Header>
                                <DataTable.Title style={[styles.header, { width: 50, borderTopLeftRadius: 5 }]}><Text style={styles.tableHeading}>
                                    <Checkbox
                                        status={selectedItems.length === items.length ? 'checked' : 'unchecked'}
                                        onPress={handleSelectAllChange}
                                    /></Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 120}]} ><Text style={styles.tableHeading}>SEQ</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 180, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>SYSTEM MODULES</Text></DataTable.Title>
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
                                        <DataTable.Cell style={[styles.tablebody, { width: 120 }]}>{item.REQUESTSTATUS}</DataTable.Cell>
                                        <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>{item.WORKREQUEST}</DataTable.Cell>
                                        
                                    </DataTable.Row>
                                </ScrollView>
                            ))}

                        </DataTable>
                    </ScrollView>
                </View>
                {/* Button section */}
                <Button radius={"md"} type="solid" containerStyle={{
                    width: 200,
                    marginVertical: 20,
                    marginLeft: 5,
                }}
                    buttonStyle={{
                        backgroundColor: '#0A2DAA',
                        borderRadius: 3,
                    }}
                // onPress={() => navigation.navigate('Createworkrequest')}
                >
                    <Ionicons name="md-save-outline" size={20} color="white" style={{ marginRight: 12 }} />
                    SAVE
                </Button>

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
        borderRadius: 5
    },
    header: {
        textAlign: 'center',
        justifyContent: 'center',
        borderWidth:0.5
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
    icon: {
        position: 'absolute',
        left: '85%',
        top: '45%'
    },

})

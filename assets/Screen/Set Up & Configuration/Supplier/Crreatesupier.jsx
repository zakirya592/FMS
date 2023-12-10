import React, { useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '@rneui/themed';
import PhoneInput from "react-native-phone-number-input";
import { Ionicons } from '@expo/vector-icons';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
];

export default function Crreatesupier() {

    const [value, setvalue] = useState({
        Employeeid: null, MiddleName: '', LastName: '', FirstName: '', CompleteAddress: '', Vendorinformation:'',
         MobileNumber: '', Landline: '', VendorSupplierCode: '', passwordVendorSupplierCode: '', VendorSupplierName: '',  email: ''
    })

    const [isFocusedemail, setisFocusedemail] = useState(false)
    const [isFocusedVendorSupplierCode, setIsFocusedVendorSupplierCode] = useState(false);
    const [isFocusedVendorSupplierName, setIsFocusedVendorSupplierName] = useState(false);
    const [isFocusedVendorinformation, setIsFocusedVendorinformation] = useState(false);
    const [isFocusedCompleteAddress, setIsFocusedCompleteAddress] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    return (

        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View >
                    <Text style={styles.prograp}>Create Vendor/Supplier Master
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Vendor/Supplier Code
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedVendorSupplierCode ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.VendorSupplierCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    VendorSupplierCode: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Enter Vendor/Supplier Code"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedVendorSupplierCode(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedVendorSupplierCode(false);
                            })}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Vendor/Supplier Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedVendorSupplierName ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.VendorSupplierName}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    VendorSupplierName: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Enter Vendor/Supplier Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedVendorSupplierName(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedVendorSupplierName(false);
                            })}
                        />
                    </View>

                </View>
                {/* Complated Address */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Complete Address
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,{width:350},
                                { borderColor: isFocusedCompleteAddress ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.CompleteAddress}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    CompleteAddress: item.value, // Update the Employeeid property
                                }));
                            }} multiline
                            numberOfLines={1} // You can adjust the number of lines displayed
                            placeholder="Enter Complete Address"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedCompleteAddress(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedCompleteAddress(false);
                            })}
                        />
                    </View>
                </View>

                {/* Button */}
                <Button radius={"md"} type="solid" containerStyle={{
                    width: '100%',
                    marginBottom:30,
                }}
                    buttonStyle={{
                        backgroundColor: '#0A2DAA',
                        borderRadius: 3,
                    }}
                // onPress={() => navigation.navigate('Addassetcode')}
                >
                    Contact Person
                </Button>
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
                
                {/*  Firrst name and FirstMiddleName*/}
                <View style={styles.inputContainer}>

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


                </View>
                {/* Email and last name */}
                <View style={styles.inputContainer}>

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

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Email Address</Text>
                        <TextInput
                            style={[
                                styles.inputBox,,
                                { borderColor: isFocusedemail ? '#1D3A9F' : '#94A0CA' }, // Dynamic border color
                            ]}
                            value={value.email}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    email: item, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Enter email address"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            keyboardType="email-address"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setisFocusedemail(true);
                            })}
                            onBlur={(() => {
                                setisFocusedemail(false);
                            })}
                        />
                    </View>

                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Vendor Information
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox, { width: 350 },
                                { borderColor: isFocusedVendorinformation ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.Vendorinformation}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Vendorinformation: item.value, // Update the Employeeid property
                                }));
                            }} multiline
                            numberOfLines={1} // You can adjust the number of lines displayed
                            placeholder="Enter Vendor Information"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedVendorinformation(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedVendorinformation(false);
                            })}
                        />
                    </View>
                </View>

                {/* Button section */}
                <Button radius={"md"} type="solid" containerStyle={{
                    width: 200,
                    // marginVertical: 20,
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
        borderBottomWidth: 0.5
    },
    icon: {
        position: 'absolute',
        left: '85%',
        top: '45%'
    },

})

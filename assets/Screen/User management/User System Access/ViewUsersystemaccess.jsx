import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Icon, Dialog } from '@rneui/themed';
import PhoneInput from "react-native-phone-number-input";
import { Ionicons } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { MaterialIcons } from '@expo/vector-icons';

export default function ViewUsersystemaccess({ route }) {
    const navigation = useNavigation();
    const { myFunction } = route.params
    const { EmployeeID } = route.params

    const [value, setvalue] = useState({
        Employeeid: '', Middlename: '', Lastname: '', Firstname: '', Title: '',
        DepartmentCode: '', DepartmentName: '', UserAuthorityCode: '',
        BuildingCode: '', LocationCode: '', MobileNumber: '', LandlineNumber: '',
    })

    const [isFocusedDepartmentName, setIsFocusedDepartmentName] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const [items, setItems] = React.useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (SystemModuleCode) => {
        const updatedItems = items.map((item) =>
            item.SystemModuleCode === SystemModuleCode ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
        // Update selectedItems state
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.SystemModuleCode);
        setSelectedItems(selectedIds);
    };

    const handleSelectAllChange = () => {
        const allSelected = items.every((item) => item.selected);
        const updatedItems = items.map((item) => ({
            ...item,
            selected: !allSelected,
        }));
        setItems(updatedItems);
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.SystemModuleCode);
        setSelectedItems(selectedIds);
    };

    const [UserAuthoritydropdown, setUserAuthoritydropdown] = useState([])
    const [dropdownBuildingList, setDropdownBuildingList] = useState([]);
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [Employeeiddropdown, setEmployeeiddropdown] = useState([])

    useEffect(() => {
        axios.get('/api/EmployeeID_GET_LIST')
            .then((response) => {
                // const data = response.data.recordset;
                const data = response.data.recordset.map((item) => ({
                    labelEmployeeID: `${item.Firstname} (${item.EmployeeID})`, // Customize label as needed
                    valueEmployeeID: item.EmployeeID,
                }));
                setEmployeeiddropdown(data)
            }).catch((error) => {
                console.log('-----', error);
            });
        axios.get('/api/UserAuthority_GET_DropdownList')
            .then((res) => {
                setUserAuthoritydropdown(res.data.recordset)
            }).catch((error) => {
                console.log('-----', error);
            });
        axios.get(`/api/Building_LIST`)
            .then((res) => {
                setDropdownBuildingList(res.data.recordsets[0]);
            }).catch((err) => {
                console.error(err);
            });
        axios.get(`/api/Location_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/Department_LIST`).then((res) => {
            setdropdownDepartmentLIST(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    // EmployeeID
    function postapi(EmployeeID) {
        axios.post(`/api/getworkRequest_by_EPID`, {
            EmployeeID,
        }).then((res) => {
            const {
                Firstname,
                Middlename,
                Lastname,
                DepartmentCode,
                BuildingCode,
                LocationCode,
                MobileNumber,
                LandlineNumber
            } = res.data.recordsets[0][0];
            setvalue((prevValue) => ({
                ...prevValue,
                Firstname,
                Middlename,
                Lastname,
                DepartmentCode,
                BuildingCode,
                LocationCode,
                MobileNumber,
                LandlineNumber
            }));
            const Depauto = res.data.recordsets[0][0].DepartmentCode
            axios.get(`/api/Department_desc_LIST/${Depauto}`)
                .then((res) => {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        DepartmentName: res.data.recordset[0].DepartmentDesc,
                    }));
                }).catch((err) => {
                    console.log(err);;
                });
        }).catch((err) => {
            console.log(err);
        });
    }
    // Department
    const handleProvinceChange = (selectedValue) => {
        setvalue((prevValue) => ({
            ...prevValue,
            DepartmentCode: selectedValue.DepartmentCode,
        }));
        axios.get(`/api/Department_desc_LIST/${selectedValue.DepartmentCode}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    DepartmentName: res.data.recordset[0].DepartmentDesc,
                }));
            }).catch((err) => {
                console.log(err);
            });
    }

    const getapitable = () => {
        axios.get(`/api/usersystemAccess_get_Em_id/${EmployeeID}`)
            .then((res) => {
                setItems(res.data.recordset)
            }).catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapitable()
    }, [])

    const getapi = () => {
        axios.get(`/api/UserSystemAccess_GET_BYID/${EmployeeID}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    Employeeid: res.data.recordset[0].EmployeeID,
                    UserAuthorityCode: res.data.recordset[0].UserAuthorityCode
                }));

                const EmployeeID = res.data.recordset[0].EmployeeID
                axios.post(`/api/getworkRequest_by_EPID`, {
                    EmployeeID,
                }).then((res) => {
                    const {
                        Firstname,
                        Middlename,
                        Lastname,
                        DepartmentCode,
                        BuildingCode,
                        LocationCode,
                        MobileNumber,
                        LandlineNumber
                    } = res.data.recordsets[0][0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        Firstname,
                        Middlename,
                        Lastname,
                        DepartmentCode,
                        BuildingCode,
                        LocationCode,
                        MobileNumber,
                        LandlineNumber
                    }));
                    const Depauto = res.data.recordsets[0][0].DepartmentCode
                    axios.get(`/api/Department_desc_LIST/${Depauto}`)
                        .then((res) => {
                            setvalue((prevValue) => ({
                                ...prevValue,
                                DepartmentName: res.data.recordset[0].DepartmentDesc,
                            }));
                        }).catch((err) => {
                            console.log(err);;
                        });
                }).catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])

    return (

        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View >
                    <Text style={styles.prograp}>View - User Access
                    </Text>
                </View>
                {/* Employee ID User Authority */}
                <View style={[styles.inputContainer]}>
                    <View style={[styles.singleinputlable]}>
                        <Text style={styles.lableinput}>Employee ID
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40 }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={Employeeiddropdown}
                            search
                            maxHeight={200}
                            labelField="labelEmployeeID" // Displayed label
                            valueField="valueEmployeeID"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value.Employeeid}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Employeeid: item?.valueEmployeeID || '', // Use the correct value key
                                }));
                                setIsFocus(false);
                                postapi(item?.valueEmployeeID || '');

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
                            data={UserAuthoritydropdown}
                            maxHeight={200}
                            labelField="UserAuthorityCode"
                            valueField="UserAuthorityCode"
                            placeholder={' User Authority'}
                            value={value.UserAuthorityCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    UserAuthorityCode: item?.UserAuthorityCode || '',  // Update the Employeeid property
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
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    MobileNumber: item || '', // Update MobileNumber
                                }));
                            }}
                            containerStyle={{ height: 40, borderRadius: 5, borderColor: "#94A0CA", borderWidth: 1, color: '94A0CA', width: 170 }}
                            textInputStyle={{ height: 25, padding: 1, fontSize: 12 }}
                            codeTextStyle={{ height: 20, display: 'none' }}
                            flagButtonStyle={{ paddingHorizontal: 24, }}
                            countryPickerButtonStyle={{ padding: 1, width: 5 }}

                        />
                    </View>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Landline Number
                        </Text>
                        <PhoneInput
                            defaultCode="US"
                            layout="first"
                            value={value.LandlineNumber}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    LandlineNumber: item,
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
                            value={value.Firstname}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Firstname: item, // Update the Employeeid property
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
                            value={value.Middlename}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Middlename: item, // Update the Employeeid property
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
                            value={value.Lastname}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Lastname: item, // Update the Employeeid property
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
                            data={dropdownBuildingList}
                            maxHeight={200}
                            labelField="BuildingCode"
                            valueField="BuildingCode"
                            placeholder={'Select Building'}
                            value={value.BuildingCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    BuildingCode: item?.value || '', // Update the Building property
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
                            data={dropdownLocation}
                            maxHeight={200}
                            labelField="LocationCode"
                            valueField="LocationCode"
                            placeholder={'Select Location'}
                            value={value.LocationCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    LocationCode: item?.value || '',  // Update the Employeeid property
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
                            data={dropdownDepartmentLIST}
                            maxHeight={200}
                            labelField="DepartmentCode"
                            valueField="DepartmentCode"
                            placeholder={'Select DeptCode'}
                            value={value.DepartmentCode}
                            onChange={handleProvinceChange}
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
                                    DepartmentName: item.value,
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
                            editable={false}
                        />
                    </View>

                </View>
                {/* Add  button */}
                <Button radius={"md"} type="solid" containerStyle={{
                    width: 200,
                    marginBottom: 20,
                    marginLeft: 5,
                }}
                    buttonStyle={{
                        backgroundColor: '#0A2DAA',
                        borderRadius: 3,
                    borderWidth:1,
                        borderColor:'#0A2DAA',
                    }}
                    disabled={true}
                >
                    <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
                    Add Syetem Modules
                </Button>
                
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
                                <DataTable.Title style={[styles.header, { width: 120 }]} ><Text style={styles.tableHeading}>SEQ</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 180, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>SYSTEM MODULES</Text></DataTable.Title>
                            </DataTable.Header>
                            {items.map((item, index) => (
                                <DataTable.Row key={item.SystemModuleCode} index={item.SystemModuleCode}>
                                    <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                        <Checkbox
                                            status={item.selected ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange(item.SystemModuleCode)}
                                        />
                                    </DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 120 }]}>{index + 1}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>{item.SystemModuleCode}</DataTable.Cell>

                                </DataTable.Row>
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
                    onPress={() => { navigation.goBack() }}
                >
                    <Ionicons name="arrow-back-circle" size={20} color="white" style={{ marginRight: 12 }} />
                    Back
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
        borderWidth: 0.5
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

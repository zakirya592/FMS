import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Button, Icon, Dialog } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Dropdown } from 'react-native-element-dropdown';

export default function Employeeroomassignment() {
    const navigation = useNavigation();
    const [value, setvalue] = useState({
     Building: '', Location: '', FloorCode: '',
    })
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const [items, setItems] = useState([]);

    const getapi = () => {
        axios.get(`/api/EmployeeRooms_GET_List`)
            .then((res) => {
                const employeeRoomsData = res.data.data;
                const promises = employeeRoomsData.map((item) => {
                    const itid = item.RoomCode;
                    return axios.get(`/api/Rooms_newpage_GET_BYID/${itid}`).then((res) => {
                            return {
                                item,
                                data: res.data,
                            };
                        }).catch((err) => {
                            console.log(err);
                            return {
                                item,
                                data: [],
                            };
                        });
                });

                Promise.all(promises).then((results) => {
                        const recordsWithEmployeeID = employeeRoomsData.map((item, index) => ({
                            EmployeeID: item.EmployeeID,
                            records: results[index].data,
                        }));
                        setItems(recordsWithEmployeeID);
                    }).catch((err) => {
                        console.log(err);
                    });
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

    const handleCheckboxChange = (EmployeeID) => {
        const updatedItems = items.map((item) =>
            item.EmployeeID === EmployeeID ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
        // Update selectedItems state
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.EmployeeID);
        setSelectedItems(selectedIds);
    };

    const handleSelectAllChange = () => {
        const allSelected = items.every((item) => item.selected);
        const updatedItems = items.map((item) => ({
            ...item,
            selected: !allSelected,
        }));
        setItems(updatedItems);
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.EmployeeID);
        setSelectedItems(selectedIds);
    };
    const [showAlertstatus, setshowAlertstatus] = useState(false);
    const showSuccessAlertstatus = () => {
        setshowAlertstatus(true);
    };
    const updatbutton = () => {
        if (selectedItems.length >= 1) {
            navigation.navigate(`Updateemployeeroomassingment`, { employeeroomassignmentpage: selectedItems, myFunction: getapi })
        }
        else {
            showSuccessAlertstatus(true)
        }
    }
    const [dropdownBuildingList, setDropdownBuildingList] = useState([]);
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownFloorList, setdropdownFloorList] = useState([])

    // Fetch data from the API when the component mounts
    useEffect(() => {
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
        axios.get(`/api/Floor_GET_List`).then((res) => {
            setdropdownFloorList(res.data.data)
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    const [visible2, setVisible2] = useState(false);
    const [deleteItemCode, setDeleteItemCode] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const showSuccessAlert = () => {
        setShowAlert(true);
    };
    const toggleDialog2 = (EmployeeID) => {
        setDeleteItemCode(EmployeeID);
        setVisible2(!visible2);
    };


    const Deletedapi = (EmployeeID) => {
        axios.delete(`/api/EmployeeRooms_DELETE_BYID/${EmployeeID}`)
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
                <View >
                    <Text style={[styles.prograp,{marginBottom:15,marginTop:10}]}>Employee Room Assignments</Text>
                </View>
                {/* Building and Location*/}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Building</Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40 }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={[
                                { BuildingCode: 'Select All', BuildingName: 'Select All' },
                                ...dropdownBuildingList,
                            ]}
                            maxHeight={200}
                            labelField="BuildingCode"
                            valueField="BuildingCode"
                            placeholder={'Select Building'}
                            value={value.Building}
                            onChange={item => {
                                if (item?.BuildingCode === 'Select All') {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        Building: item?.BuildingCode || '',
                                    }));
                                } else {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        Building: item?.BuildingCode || '',
                                    }));
                                }
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Location</Text>

                        <Dropdown
                            style={[styles.inputBox, { height: 40 }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={[
                                { LocationCode: 'Select All', LocationName: 'Select All' },
                                ...dropdownLocation,
                            ]}
                            maxHeight={200}
                            labelField="LocationCode"
                            valueField="LocationCode"
                            placeholder={'Select Location '}
                            value={value.Location}
                            onChange={item => {
                                if (item?.LocationCode === 'Select All') {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        Location: item?.LocationCode || '',
                                    }));
                                } else {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        Location: item?.LocationCode || '',
                                    }));
                                }
                            }}
                        />
                    </View>

                </View>
                {/* Department */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Floor Code
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, width: 300, margin: 0, padding: 0 }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={[
                                { FloorCode: 'Select All', FloorCodeName: 'Select All' },
                                ...dropdownFloorList,
                            ]}
                            maxHeight={200}
                            labelField="FloorCode"
                            valueField="FloorCode"
                            placeholder={'Select Floor Code '}
                            value={value.FloorCode}
                            onChange={item => {
                                if (item?.FloorCode === 'Select All') {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        FloorCode: item?.FloorCode || '',
                                    }));
                                } else {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        FloorCode: item?.FloorCode || '',
                                    }));
                                }
                            }}
                        />
                    </View>
                </View>
                {/* table section */}
                <ScrollView horizontal >
                    <DataTable style={[styles.item, {
                        width: '100%', height: 450, margin: 0, marginTop: 20
                    }]} >
                        <DataTable.Header>
                            <DataTable.Title style={[styles.header, { width: 50, borderTopLeftRadius: 5 }]}><Text style={styles.tableHeading}><Checkbox
                                status={selectedItems.length === items.length ? 'checked' : 'unchecked'}
                                onPress={handleSelectAllChange}
                            /></Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 80 }]} ><Text style={styles.tableHeading}>SEQ</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]}><Text style={styles.tableHeading}>Employee Number</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]} ><Text style={styles.tableHeading}>Room Code</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 200 }]} ><Text style={styles.tableHeading}>DESCRIPTION</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]}><Text style={styles.tableHeading}>Floor Code</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>Building Code</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]}><Text style={styles.tableHeading}>Location Code</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140, borderRightWidth: 1, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>ACTIONS</Text></DataTable.Title>
                        </DataTable.Header>
                        {items.filter(item => (
                            (!value.Building || value.Building === 'Select All' || item.records.data?.[0]?.BuildingCode === value.Building) &&
                            (!value.Location || value.Location === 'Select All' || item.records.data?.[0]?.LocationCode === value.Location) &&
                            (!value.FloorCode || value.FloorCode === 'Select All' || item.records.data?.[0]?.FloorCode === value.FloorCode)
                        )).slice(from, to).map((item, index) => (
                            <DataTable.Row key={item.EmployeeID}>
                                <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                    <Checkbox
                                        status={item.selected ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange(item.EmployeeID)}
                                    />
                                </DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 80 }]}>{index + 1}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.EmployeeID || item.EmployeeID}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.records.data?.[0]?.RoomCode || item.RoomCode}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.records.data?.[0]?.RoomDesc || item.RoomDesc}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.records.data?.[0]?.FloorCode || item.FloorCode}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.records.data?.[0]?.BuildingCode || item.BuildingCode}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.records.data?.[0]?.LocationCode || item.LocationCode}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 140, borderRightWidth: 1, }]}><Menu>
                                    <MenuTrigger >
                                        <View style={styles.actions}>
                                            <Text>Action </Text>
                                            <AntDesign name="caretdown" size={18} color="black" />
                                        </View>
                                    </MenuTrigger>
                                    <MenuOptions optionsContainerStyle={{ width: 'auto', padding: 10 }}>
                                        <MenuOption onSelect={() => navigation.navigate(`Viewemployeeroomassignment`, { employeeroomassignmentpage: item.EmployeeID, myFunction: getapi })}>
                                            <View style={styles.actions}>
                                                <Text style={styles.actionstitle}>View</Text>
                                                <AntDesign name="eye" size={20} color="#0A2DAA" />
                                            </View>
                                        </MenuOption>
                                        <MenuOption onSelect={() => navigation.navigate(`Updateemployeeroomassingment`, { employeeroomassignmentpage: item.EmployeeID, myFunction: getapi })}>
                                            <View style={styles.actions}>
                                                <Text style={styles.actionstitle}>Update</Text>
                                                <FontAwesome5 name="pencil-alt" size={13} color="#0A2DAA" />
                                            </View>
                                        </MenuOption>
                                        <MenuOption onSelect={() => toggleDialog2(item.EmployeeID)}>
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
                        {items.filter(item => (
                            (!value.Building || value.Building === 'Select All' || item.records.data?.[0]?.BuildingCode === value.Building) &&
                            (!value.Location || value.Location === 'Select All' || item.records.data?.[0]?.LocationCode === value.Location) &&
                            (!value.FloorCode || value.FloorCode === 'Select All' || item.records.data?.[0]?.FloorCode === value.FloorCode)
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
                        onPress={() => navigation.navigate('Createemployeeroomassinment', { myFunction: getapi })}
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

                {/* Deleted  Dialog*/}
                <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
                    <Dialog.Title title="Are you sure?" />
                    <Text>{` Do you really want to Delete ${deleteItemCode} Employee Room Assignments!`}</Text>
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
                    message={`Employee Room Assignments ${deleteItemCode} has been deleted`}
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

                <AwesomeAlert
                    show={showAlertstatus}
                    title={
                        <View >
                            <MaterialIcons name="error-outline" color="red" size={30} style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 4, marginLeft: 5 }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Error!</Text>
                        </View>
                    }
                    message={`Select a Employee Room Assignments  by checking the check box`}
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
    prograp: {
        color: '#1E3B8B',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        marginHorizontal: 10,
        marginVertical: 10,
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
    },
    outlineIcon: {
        borderWidth: 1,
        borderRadius: 15,
        marginRight: 10,
        borderColor: 'white'
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

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, Icon, Dialog } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";
import moment from 'moment';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Buildingspacemanagement() {
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        Employeeid: '', WorkRequest: '', TransferNumber: ''
    })

    const [showAlert, setShowAlert] = useState(false);
    const showSuccessAlert = () => {
        setShowAlert(true);
    };
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const [items, setItems] = useState([]);

    const getapi = () => {
        axios.get(`/api/Building_newpage_GET_List`)
            .then((res) => {
                setItems(res.data.data)
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

    const handleCheckboxChange = (BuildingCode) => {
        const updatedItems = items.map((item) =>
            item.BuildingCode === BuildingCode ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
        // Update selectedItems state
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.BuildingCode);
        setSelectedItems(selectedIds);
    };

    const updatbutton = () => {
        if (selectedItems.length >= 1) {
            navigation.navigate(`Updatebuildingspace`, { BuildingCode: selectedItems, myFunction: getapi })
        }
        else {
            console.warn('Please select at least one item before updating.');
        }
    }

    const handleSelectAllChange = () => {
        const allSelected = items.every((item) => item.selected);
        const updatedItems = items.map((item) => ({
            ...item,
            selected: !allSelected,
        }));
        setItems(updatedItems);
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.BuildingCode);
        setSelectedItems(selectedIds);
    };

    // Deleting api
    const [visible2, setVisible2] = useState(false);
    const [deleteItemCode, setDeleteItemCode] = useState('');

    const toggleDialog2 = (BuildingCode) => {
        setDeleteItemCode(BuildingCode); // Store the system module code
        setVisible2(!visible2);
    };

    const Deletedapi = (BuildingCode) => {
        axios.delete(`/api/Building_newpage_DELETE_BYID/${BuildingCode}`)
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
                    <Text style={styles.prograp}>BUILDING MAINTENANCE</Text>
                </View>
                {/* table section */}
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
                            <DataTable.Title style={[styles.header, { width: 150 }]} ><Text style={styles.tableHeading}>Building Code</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 200 }]} ><Text style={styles.tableHeading}>DESCRIPTION</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]}><Text style={styles.tableHeading}>Capacity</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 180 }]}><Text style={styles.tableHeading}>GPS Latitude</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 180 }]} ><Text style={styles.tableHeading}>GPS Longtitude</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140, borderRightWidth: 1, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>ACTIONS</Text></DataTable.Title>
                        </DataTable.Header>
                        {items.slice(from, to).map((item) => (
                            <DataTable.Row key={item.BuildingCode}>
                                <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                    <Checkbox
                                        status={item.selected ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange(item.BuildingCode)}
                                    />
                                </DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.BuildingCode}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.BuildingDesc}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.Capacity}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>{item.Latitude}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>{item.Longtitude}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 140, borderRightWidth: 1, borderBottomWidth: 1 }]}>
                                    <Menu>
                                        <MenuTrigger >
                                            <View style={styles.actions}>
                                                <Text>Action </Text>
                                                <AntDesign name="caretdown" size={18} color="black" />
                                            </View>
                                        </MenuTrigger>
                                        <MenuOptions optionsContainerStyle={{ width: 'auto', padding: 10 }}>
                                            <MenuOption onSelect={() => navigation.navigate(`Viewbuildingspace`, { BuildingCode: item.BuildingCode, myFunction: getapi })}>
                                                <View style={styles.actions} >
                                                    <Text style={styles.actionstitle}>View</Text>
                                                    <AntDesign name="eye" size={20} color="#0A2DAA" />
                                                </View>
                                            </MenuOption>
                                            <MenuOption onSelect={() => navigation.navigate(`Updatebuildingspace`, { BuildingCode: item.BuildingCode, myFunction: getapi })}>
                                                <View style={styles.actions} >
                                                    <Text style={styles.actionstitle}>Update</Text>
                                                    <FontAwesome5 name="pencil-alt" size={13} color="#0A2DAA" />
                                                </View>
                                            </MenuOption>
                                            <MenuOption onSelect={() => toggleDialog2(item.BuildingCode)} >
                                                <View style={styles.actions} >
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
                    // numberOfItemsPerPage={itemsPerPage}
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
                        disabled={selectedItems.length < 1}
                    >
                        Update
                    </Button>
                    <Button radius={"md"} type="outline" containerStyle={{
                        width: 150,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                        onPress={() => navigation.navigate('Createbuilding', { myFunction: getapi })}
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
                        {/* <Icon name="file_download" color="#0A2DAA" size={15} /> */}
                        Export
                    </Button>
                </View>

                {/* Deleted  Dialog*/}
                <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
                    <Dialog.Title title="Are you sure?" />
                    <Text>{`You want to delete this ${deleteItemCode} Building Code`}</Text>
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
                    message={`Building Code ${deleteItemCode} has been deleted`}
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
        marginVertical: 40,
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
        borderWidth: 0.5,
    },
    tableHeading: {
        color: '#1E3B8B',
        fontWeight: 'bold',
        fontSize: 14
    },
    tablebody: {
        borderColor: "##9384EB",
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
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

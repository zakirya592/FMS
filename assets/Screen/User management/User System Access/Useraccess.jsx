import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Button, Icon, Dialog } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Useraccess() {
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        Employeeid: '', WorkRequest: '',
    })


    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const [items, setItems] = useState([]);

    const getapi = () => {
        axios.get(`/api/UserSystemAccess_GET_LIST`)
            .then((res) => {
                setItems(res.data.recordset)
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

    const [visible2, setVisible2] = useState(false);
    const [deleteItemCode, setDeleteItemCode] = useState('');

    const toggleDialog2 = (EmployeeID) => {
        setDeleteItemCode(EmployeeID); // Store the system module code
        setVisible2(!visible2);
    };
    const [showAlert, setShowAlert] = useState(false);
    const showSuccessAlert = () => {
        setShowAlert(true);
    };

    const Deletedapi = (EmployeeID) => {
        axios.delete(`/api/UserSystemAccess_DELETE_BYID/${EmployeeID}`).then((res) => {
            setVisible2(false);
            getapi()
            showSuccessAlert(true)
        }).catch((err) => {
            console.log('Error deleting', err);
        });
    }

    return (
        <ScrollView>
            <View>
                {/* Top section */}
                <View >
                    <Text style={styles.prograp}>User Access
                    </Text>
                    <View style={styles.inputContainer}>

                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.lableinput}>Employee ID
                            </Text>
                            <TextInput
                                style={styles.inputBox}
                                value={value.Employeeid}
                                onChangeText={item => {
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        Employeeid: item, // Update the Employeeid property
                                    }));
                                }}
                                placeholder="Select Employee ID"
                                placeholderTextColor="#94A0CA"
                                selectionColor="#1D3A9F"
                                underlineColorAndroid="transparent"
                            />
                            <Feather name="search" size={24} color="black" style={{ position: 'absolute', left: '87%', top: '45%' }} />
                        </View>
                    </View>
                </View>
                {/* table section */}
                <ScrollView horizontal vertical>
                    <DataTable style={[styles.item, {
                        width: '100%', height: 450, margin: 0
                    }]} >
                        <DataTable.Header>
                            <DataTable.Title style={[styles.header, { width: 50, borderTopLeftRadius: 5 }]}><Text style={styles.tableHeading}><Checkbox
                                status={selectedItems.length === items.length ? 'checked' : 'unchecked'}
                                onPress={handleSelectAllChange}
                            /></Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 80 }]} ><Text style={styles.tableHeading}>SEQ</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 200 }]} ><Text style={styles.tableHeading}>Employee ID#</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>UserAuthorityCode</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140, borderRightWidth: 1, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>ACTIONS</Text></DataTable.Title>
                        </DataTable.Header>

                        <ScrollView>
                        {items.filter((item) => item && item.EmployeeID && item.EmployeeID.includes(value.Employeeid)).slice(from, to).map((item, index) => (
                            <DataTable.Row key={item.EmployeeID}>
                                <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                    <Checkbox
                                        status={item.selected ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange(item.EmployeeID)}
                                    />
                                </DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 80 }]}>{index + 1}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.EmployeeID}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.UserAuthorityCode}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 140, borderRightWidth: 1, }]}><Menu onSelect={value => alert(`Selected number: ${value}`)}>
                                    <MenuTrigger >
                                        <View style={styles.actions}>
                                            <Text>Action </Text>
                                            <AntDesign name="caretdown" size={18} color="black" />
                                        </View>
                                    </MenuTrigger>
                                    <MenuOptions optionsContainerStyle={{ width: 'auto', padding: 10 }}>
                                        <MenuOption onSelect={() => navigation.navigate(`ViewUsersystemaccess`, { EmployeeID: item.EmployeeID })}>
                                            <View style={styles.actions}>
                                                <Text style={styles.actionstitle}>View</Text>
                                                <AntDesign name="eye" size={20} color="#0A2DAA" />
                                            </View>
                                        </MenuOption>
                                        <MenuOption onSelect={() => navigation.navigate(`Updateusersystemassecc`, { EmployeeID: item.EmployeeID, myFunction: getapi })} >
                                            <View style={styles.actions}>
                                                <Text style={styles.actionstitle}>Update</Text>
                                                <FontAwesome5 name="pencil-alt" size={13} color="#0A2DAA" />
                                            </View>
                                        </MenuOption>
                                        <MenuOption onSelect={() => toggleDialog2(item.EmployeeID)} >
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
                        </ScrollView>
                        {/* If the length is equal to the 0 than   */}
                        {items.filter((item) => item && item.EmployeeID && item.EmployeeID.includes(value.Employeeid)).length === 0 && (
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
                    >
                        Update
                    </Button>
                    <Button radius={"md"} type="outline" containerStyle={{
                        width: 150,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                        onPress={() => navigation.navigate('Crreateuseraccess', { myFunction: getapi })}
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
                    <Text>{`You want to delete this ${deleteItemCode} User System Access`}</Text>
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
                    message={`User System Access ${deleteItemCode} has been deleted`}
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
        marginLeft: 10,
        paddingBottom: 5,
        marginBottom: 10,
        position: 'relative',
        // justifyContent: 'space-around'
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
        width: 250,
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

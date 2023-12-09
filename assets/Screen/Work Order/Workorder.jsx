import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Button, Icon, Dialog } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios"; 
import moment from 'moment';
import {Menu,MenuOptions,MenuOption,MenuTrigger} from 'react-native-popup-menu';

export default function Workorder() {
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
        axios.get(`/api/WorkOrders_GET_LIST`)
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

    const [RequestStatusLIST, setRequestStatusLIST] = useState([])
    useEffect(() => {
        axios.get(`/api/RequestStatus_LIST`).then((res) => {
            setRequestStatusLIST(res.data.recordsets[0])
        })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

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

    // Deleting api
    const [visible2, setVisible2] = useState(false);
    const [deleteItemCode, setDeleteItemCode] = useState('');

    const toggleDialog2 = (WorkOrderNumber) => {
        setDeleteItemCode(WorkOrderNumber); // Store the system module code
        setVisible2(!visible2);
    };

    const Deletedapi = (WorkOrderNumber) => {
        axios.delete(`/api/WorkOrders_DELETE_BYID/${WorkOrderNumber}`)
            .then((res) => {
                setVisible2(false);
                getapi()
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
                    <Text style={styles.prograp}>Work Order
                    </Text>
                    <View style={styles.inputContainer}>

                        <View style={styles.singleinputlable}>
                            <Text style={styles.lableinput}>Order Number
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
                                placeholder="Order Number"
                                placeholderTextColor="#94A0CA"
                                selectionColor="#1D3A9F"
                                underlineColorAndroid="transparent"

                            />
                        </View>

                        <View style={styles.singleinputlable}>
                            <Text style={styles.lableinput}>Order Status
                            </Text>
                            <Dropdown
                                style={[styles.inputBox, { height: 40, }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={RequestStatusLIST}
                                maxHeight={200}
                                labelField="RequestStatusCode"
                                valueField="RequestStatusCode"
                                placeholder={'Select Status'}
                                value={value.RequestStatus}
                                onChange={item => {
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        RequestStatus: item.value, // Update the Employeeid property
                                    }));
                                }}
                            />
                        </View>

                    </View>
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
                            <DataTable.Title style={[styles.header, { width: 150 }]} ><Text style={styles.tableHeading}>WORK ORDER#</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>WORK STATUS </Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]}><Text style={styles.tableHeading}>WORK REQUEST NUMBER</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]}><Text style={styles.tableHeading}>PRIORITY</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>START DATE/TIME</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>FAILURE CODE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>ASSIGNED TO EMP#</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>SOLUTION CODE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>WORK CATEGORY CODE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140, borderRightWidth: 1, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>ACTIONS</Text></DataTable.Title>
                        </DataTable.Header>
                        {items.filter(
                            (item) =>
                                item.WorkOrderNumber.includes(value.Employeeid)
                        ).slice(from, to).map((item) => (
                             <DataTable.Row key={item.WorkOrderNumber}>
                                    <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                        <Checkbox
                                            status={item.selected ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange(item.WorkOrderNumber)}
                                        />
                                    </DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.WorkOrderNumber}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.WorkStatus === "Closed" ? "This Work Order is already closed.." : item.WorkStatus}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.WorkRequestNumber}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.WorkPriority}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{moment(item.StartWorkOrderDateTime).isValid() ? moment(item.StartWorkOrderDateTime).format('DD/MM/YYYY') : ''}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.FailureCode}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.AssignedtoEmployeeID}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.SolutionCode}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.WorkCategoryCode}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140, borderRightWidth: 1, borderBottomWidth: 1 }]}>
                                        <Menu>
                                            <MenuTrigger >
                                                <View style={styles.actions}>
                                                    <Text>Action </Text>
                                                    <AntDesign name="caretdown" size={18} color="black" />
                                                </View>
                                            </MenuTrigger>
                                        <MenuOptions optionsContainerStyle={{ width: 'auto', padding: 10 }}>
                                            <MenuOption onSelect={() => navigation.navigate(`ViewWorkorder`, { WorkOrderNumber: item.WorkOrderNumber })}>
                                                <View style={styles.actions} >
                                                        <Text style={styles.actionstitle}>View</Text>
                                                        <AntDesign name="eye" size={20} color="#0A2DAA" />
                                                    </View>
                                                </MenuOption>
                                            <MenuOption onSelect={() => navigation.navigate(`Updataworkorder`, { WorkOrderNumber: item.WorkOrderNumber, myFunction: getapi })}>
                                                <View style={styles.actions} >
                                                        <Text style={styles.actionstitle}>Update</Text>
                                                        <FontAwesome5 name="pencil-alt" size={13} color="#0A2DAA" />
                                                    </View>
                                                </MenuOption>
                                            <MenuOption onSelect={() => toggleDialog2(item.WorkOrderNumber)} >
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
                    >
                        Update
                    </Button>
                    <Button radius={"md"} type="outline" containerStyle={{
                        width: 150,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                        onPress={() => navigation.navigate('Createworkorder', { myFunction: getapi })}
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
                    <Text>{`You want to delete this ${deleteItemCode} Work Order Number`}</Text>
                    <Dialog.Actions >
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Dialog.Button onPress={() => setVisible2(!visible2)} ><Text style={{ backgroundColor: '#198754', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>No, cancel!</Text></Dialog.Button>
                            <Dialog.Button onPress={() => Deletedapi(deleteItemCode)} ><Text style={{ backgroundColor: '#EF643B', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>Yes, delete it!</Text></Dialog.Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
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

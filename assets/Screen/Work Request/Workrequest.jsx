import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

export default function Workrequest() {
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        Employeeid: '', WorkRequest: '',
    })
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10]);
    const [first, setItems] = useState()
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const [items] = React.useState([
        { key: 1, WORKREQUEST: 'WORKREQUEST1', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { key: 2, WORKREQUEST: 'WORKREQUEST2', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { key: 3, WORKREQUEST: 'WORKREQUEST3', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { key: 4, WORKREQUEST: 'WORKREQUEST4', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { key: 5, WORKREQUEST: 'WORKREQUEST5', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { key: 6, WORKREQUEST: 'WORKREQUEST6', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { key: 7, WORKREQUEST: 'WORKREQUEST7', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { key: 8, WORKREQUEST: 'WORKREQUEST8', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { key: 9, WORKREQUEST: 'WORKREQUEST9', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { key: 10, WORKREQUEST: 'WORKREQUEST10', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { key: 11, WORKREQUEST: 'WORKREQUEST11', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },

    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const handleCheckboxChange = (WORKREQUEST) => {
        const updatedItems = [...items];
        const selectedItem = updatedItems.find((item) => item.WORKREQUEST === WORKREQUEST);
        if (selectedItem) {
            selectedItem.selected = !selectedItem.selected;
        }
        // Update the state
        setItems(updatedItems);
    };

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
    ];

    return (
        <ScrollView>
            <View>
                {/* Top section */}
                <View >
                    <Text style={styles.prograp}>Work Request Transactions
                    </Text>
                    <View style={styles.inputContainer}>

                        <View style={styles.singleinputlable}>
                            <Text style={styles.lableinput}>Employee
                            </Text>
                            <TextInput
                                style={styles.inputBox}
                                value={value.Employeeid}
                                onChange={item => {
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        Employeeid: item.value, // Update the Employeeid property
                                    }));
                                }}
                                placeholder="Select Employee #"
                                placeholderTextColor="#94A0CA"
                                selectionColor="#1D3A9F"
                                underlineColorAndroid="transparent"

                            />
                        </View>

                        <View style={styles.singleinputlable}>
                            <Text style={styles.lableinput}>Request Status
                            </Text>
                            <Dropdown
                                style={[styles.inputBox, { height: 40, }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
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
                            <DataTable.Title style={[styles.header, { width: 50, borderTopLeftRadius: 5 }]}><Text style={styles.tableHeading}>SEQ</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]} ><Text style={styles.tableHeading}>WORK REQUEST# </Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>REQUEST STATUS</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]}><Text style={styles.tableHeading}>REQUEST BY EMP#</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]}><Text style={styles.tableHeading}>PRIORITY</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>REQUEST DATE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>WORK TYPE DESC</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>WORK TRADE DESC</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140, borderRightWidth: 1, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>ACTIONS</Text></DataTable.Title>
                        </DataTable.Header>
                        {items.slice(from, to).map((item) => (
                            <ScrollView>
                                <DataTable.Row key={item.key}>
                                    <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                        <Checkbox
                                            status={item.selected ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange(item.WORKREQUEST)}
                                        />
                                    </DataTable.Cell>
                                    {/* <DataTable.Cell>{item.name}</DataTable.Cell> */}
                                    <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.WORKREQUEST}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.REQUESTSTATUS}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.REQUESTBYEMP}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.PRIORITY}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.REQUESTDATE}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.WORKTYPEDESC}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.WORKTRADEDESC}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140, borderRightWidth: 1, borderBottomWidth: 1 }]}>Action 
                                    </DataTable.Cell>
                                </DataTable.Row>
                            </ScrollView>
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
                        onPress={() => navigation.navigate('Createworkrequest')}
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
    item: {
        // borderColor: "#0A2DAA",
        // borderWidth: 1, // Border width
        // borderRadius:5
    },
    tablebody: {
        borderColor: "##9384EB",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center'
    }
})

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, Icon } from '@rneui/themed';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Locationmanagement() {
    const [value, setvalue] = useState({
        Employeeid: '', WorkRequest: '', Building: '', Location: '', DepartmentCode: '',
        Building2: '', Location2: '', DepartmentCode2:'', TotalMinuites:'0'
    })


    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const [items, setItems] = useState([
        { _id: 1, WORKREQUEST: 'WORKREQUEST11', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', DEPARTMENT: 'DEPARTMENT', BUILDING: 'BUILDING', LOCATION: 'LOCATION', ACTIONS: 'Open' },
        { _id: 2, WORKREQUEST: 'WORKREQUEST2', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', DEPARTMENT: 'DEPARTMENT', BUILDING: 'BUILDING', LOCATION: 'LOCATION', ACTIONS: 'Open', },
        { _id: 3, WORKREQUEST: 'WORKREQUEST3', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', DEPARTMENT: 'DEPARTMENT', BUILDING: 'BUILDING', LOCATION: 'LOCATION', ACTIONS: 'Open', },
        { _id: 4, WORKREQUEST: 'WORKREQUEST4', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', DEPARTMENT: 'DEPARTMENT', BUILDING: 'BUILDING', LOCATION: 'LOCATION', ACTIONS: 'Open', },
        { _id: 5, WORKREQUEST: 'WORKREQUEST5', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', DEPARTMENT: 'DEPARTMENT', BUILDING: 'BUILDING', LOCATION: 'LOCATION', ACTIONS: 'Open', },
        { _id: 6, WORKREQUEST: 'WORKREQUEST6', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', DEPARTMENT: 'DEPARTMENT', BUILDING: 'BUILDING', LOCATION: 'LOCATION', ACTIONS: 'Open', },
        { _id: 7, WORKREQUEST: 'WORKREQUEST7', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { _id: 8, WORKREQUEST: 'WORKREQUEST8', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { _id: 9, WORKREQUEST: 'WORKREQUEST9', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { _id: 10, WORKREQUEST: 'WORKREQUEST10', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { _id: 11, WORKREQUEST: 'WORKREQUEST11', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },

    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
    ];

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
        <ScrollView>
            <View>
                {/* Top section */}
                <View >
                    <Text style={styles.prograp}>Location Management
                    </Text>
                    {/* Building and Location*/}
                    <View style={styles.inputContainer}>

                        <View style={styles.singleinputlable}>
                            <Text style={styles.lableinput}>Building
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
                                style={[styles.inputBox, { height: 40, }]}
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
                                style={[styles.inputBox, { height: 40,width:300,margin:0,padding:0 }]}
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
                            <DataTable.Title style={[styles.header, { width: 150 }]}><Text style={styles.tableHeading}>WORK TYPE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]}><Text style={styles.tableHeading}>PRIORITY</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>SCHEDULED DATE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>FINDING CODE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>ASSIGNED TO EMP#</Text></DataTable.Title>

                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>DEPARTMENT</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>BUILDING</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>LOCATION</Text></DataTable.Title>
                        </DataTable.Header>
                        {items.slice(from, to).map((item) => (
                            <ScrollView >
                                <DataTable.Row key={item._id}>
                                    <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                        <Checkbox
                                            status={item.selected ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange(item._id)}
                                        />
                                    </DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.WORKREQUEST}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.REQUESTSTATUS}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.REQUESTBYEMP}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.PRIORITY}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.REQUESTDATE}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.WORKTYPEDESC}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.WORKTRADEDESC}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.DEPARTMENT}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.BUILDING}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.LOCATION}</DataTable.Cell>
                                  
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
                {/* Building and Location*/}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Building
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
                            placeholder={'Select Building2'}
                            value={value.Building2}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Building2: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Location
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
                            placeholder={'Select Location'}
                            value={value.Location2}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Location2: item.value, // Update the Employeeid property
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
                            style={[styles.inputBox, { height: 40 }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select DeptCode'}
                            value={value.DepartmentCode2}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    DepartmentCode2: item.value, // Update the Employeeid property
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.TotalMinuites}
                            onChangeText={text => {
                                if (/^\d+$/.test(text) || text === "") {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        TotalMinuites: text,
                                    }));
                                }
                            }}
                            placeholder="Total Minuites"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric" // Allow only numeric input
                        />
                    </View>
                </View>
                {/* Button section */}
                <View style={styles.buttonsection} >
                    <Button radius={"md"} type="solid" containerStyle={{
                        width: 300,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    >
                        <Ionicons name="arrow-forward" color="white" size={15} style={styles.outlineIcon} />
                        PROCEED TO TRANSFER
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
        borderColor:'white'
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
        borderWidth:0.5,
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

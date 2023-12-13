import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, Icon } from '@rneui/themed';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';

export default function Locationmanagement() {
    const [value, setvalue] = useState({
        Employeeid: '', WorkRequest: '', Building: '', Location: '', DepartmentCode: '',
        Building2: '', Location2: '', DepartmentCode2: null, Totalnumber: '0'
    })

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const [items, setItems] = useState([]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (WorkOrderNumber) => {
        const updatedItems = items.map((item) =>
            item.WorkOrderNumber === WorkOrderNumber ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
        // Update selectedItems state
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.WorkOrderNumber);
        setSelectedItems(selectedIds);
    };

    const handleSelectAllChange = () => {
        const allSelected = items.every((item) => item.selected);
        const updatedItems = items.map((item) => ({
            ...item,
            selected: !allSelected,
        }));
        setItems(updatedItems);
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.WorkOrderNumber);
        setSelectedItems(selectedIds);
    };

    const [dropdownBuildingList, setDropdownBuildingList] = useState([]);
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])

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
        axios.get(`/api/Department_LIST`).then((res) => {
            setdropdownDepartmentLIST(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const getapi = () => {
        axios.get(`/api/location_managment_All`).then((res) => {
            setItems(res.data.recordset)
        }).catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])

    return (
        <ScrollView>
            <View>
                {/* Top section */}
                <View >
                    <Text style={styles.prograp}>Location Management</Text>
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
                            <Text style={styles.lableinput}>Department Code
                            </Text>
                            <Dropdown
                                style={[styles.inputBox, { height: 40, width: 300, margin: 0, padding: 0 }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={[
                                    { DepartmentCode: 'Select All', DepartmentCodeName: 'Select All' },
                                    ...dropdownDepartmentLIST,
                                ]}
                                maxHeight={200}
                                labelField="DepartmentCode"
                                valueField="DepartmentCode"
                                placeholder={'Select Department '}
                                value={value.DepartmentCode}
                                onChange={item => {
                                    if (item?.DepartmentCode === 'Select All') {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            DepartmentCode: item?.DepartmentCode || '',
                                        }));
                                    } else {
                                        setvalue(prevValue => ({
                                            ...prevValue,
                                            DepartmentCode: item?.DepartmentCode || '',
                                        }));
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
                {/* table section */}
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
                            <DataTable.Title style={[styles.header, { width: 150 }]} ><Text style={styles.tableHeading}>WORK ORDER#</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>WORK STATUS </Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]}><Text style={styles.tableHeading}>WORK TYPE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]}><Text style={styles.tableHeading}>PRIORITY</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>SCHEDULED DATE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>FINDING CODE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>ASSIGNED TO EMP#</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>DEPARTMENT</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>BUILDING</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>LOCATION</Text></DataTable.Title>
                        </DataTable.Header>
                        {items.filter(item => (
                            (!value.Building || value.Building === 'Select All' || item.BuildingCode === value.Building) &&
                            (!value.Location || value.Location === 'Select All' || item.LocationCode === value.Location) &&
                            (!value.DepartmentCode || value.DepartmentCode === 'Select All' || item.DepartmentCode === value.DepartmentCode)
                        )).slice(from, to).map((item) => (
                            <DataTable.Row key={item.WorkOrderNumber}>
                                <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                    <Checkbox
                                        status={item.selected ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange(item.WorkOrderNumber)}
                                    />
                                </DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.WorkOrderNumber[0]}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.WorkStatus}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.WorkType}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.WorkPriority[0]}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{moment(item.ScheduledDateTime).isValid() ? moment(item.ScheduledDateTime).format('DD/MM/YYYY') : ''}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.FailureCode}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.AssignedtoEmployeeID}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.DepartmentCode}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.BuildingCode}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.LocationCode}</DataTable.Cell>

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
                            data={dropdownBuildingList}
                            maxHeight={200}
                            labelField="BuildingCode"
                            valueField="BuildingCode"
                            placeholder={'Select Building'}
                            value={value.Building2}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Building2: item?.value || '',
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
                            data={dropdownLocation}
                            maxHeight={200}
                            labelField="LocationCode"
                            valueField="LocationCode"
                            placeholder={'Select Location'}
                            value={value.Location2}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Location2: item?.value || '',
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
                            data={dropdownDepartmentLIST}
                            maxHeight={200}
                            labelField="DepartmentCode"
                            valueField="DepartmentCode"
                            placeholder={'Select DeptCode'}
                            value={value.DepartmentCode2}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    DepartmentCode2: item?.value || '',
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                        </Text>
                        <TextInput
                            style={[styles.inputBox]}
                            value={items.length.toString()}
                            editable={false}
                            placeholder="Total length"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric" 
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

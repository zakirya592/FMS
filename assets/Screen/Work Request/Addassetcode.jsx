import React, { useState} from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';


export default function Addassetcode() {
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        Employeeid: '', WorkRequest: '',
    })

    const [items, setItems] = useState([
        { _id: 1, WORKREQUEST: 'WORKREQUEST11', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open' },
        { _id: 2, WORKREQUEST: 'WORKREQUEST2', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { _id: 3, WORKREQUEST: 'WORKREQUEST3', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { _id: 4, WORKREQUEST: 'WORKREQUEST4', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
        { _id: 5, WORKREQUEST: 'WORKREQUEST5', REQUESTSTATUS: 'Open', REQUESTBYEMP: 'REQUESTBYEMP', PRIORITY: 'PRIORITY', REQUESTDATE: '12/12/3003', WORKTYPEDESC: 'WORKTYPEDESC', WORKTRADEDESC: 'WORKTRADEDESC', ACTIONS: 'Open', },
      
    ]);

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
                    <Text style={styles.prograp}>Asset Master List
                    </Text>
                    <View style={styles.inputContainer}>

                        <View style={styles.singleinputlable}>
                            <Text style={styles.lableinput}>Asset Item Description
                            </Text>
                            <TextInput
                                style={[styles.inputBox]}
                                value={value.Employeeid}
                                onChange={item => {
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        Employeeid: item.value, // Update the Employeeid property
                                    }));
                                }}
                                placeholder="Select Filter Asset Description"
                                placeholderTextColor="#94A0CA"
                                selectionColor="#1D3A9F"
                                underlineColorAndroid="transparent"

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
                            <DataTable.Title style={[styles.header, { width: 50, borderTopLeftRadius: 5 }]}><Text style={styles.tableHeading}><Checkbox
                                    status={selectedItems.length === items.length ? 'checked' : 'unchecked'}
                                    onPress={handleSelectAllChange}
                                /></Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 180 }]} ><Text style={styles.tableHeading}>ASSET/STOCK NUMBER</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]} ><Text style={styles.tableHeading}>ASSET ITEM GROUP</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 200 }]}><Text style={styles.tableHeading}>ASSET ITEM DESCRIPTION</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]}><Text style={styles.tableHeading}>ASSET QTY</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>MODEL</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170,borderTopRightRadius:5 }]} ><Text style={styles.tableHeading}>MONIFACTURER</Text></DataTable.Title>
                                </DataTable.Header>
                        {items.map((item) => (
                                <DataTable.Row key={item._id}>
                                    <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                        <Checkbox
                                            status={item.selected ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange(item._id)}
                                        />
                                    </DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>{item.WORKREQUEST}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.REQUESTSTATUS}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.REQUESTBYEMP}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.PRIORITY}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.REQUESTDATE}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.WORKTYPEDESC}</DataTable.Cell>
                                   
                                </DataTable.Row>
                        ))}

                    </DataTable>
                </ScrollView>

                {/* Button section */}
                <View style={styles.buttonsection} >
                    <Button radius={"md"} type="solid" containerStyle={{
                        width: 250,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                        onPress={() => navigation.navigate('Createworkrequest')}
                    >
                        <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
                        Add to work request
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
        // alignItems: 'center',
        paddingBottom: 5,
        marginBottom: 10,
        position: 'relative',
        // justifyContent: 'space-around'
        paddingHorizontal:15
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
        marginVertical: 20,
    },
    inputBox: {
        width: 300,
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
        borderWidth:0.5,
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center'
    },
    outlineIcon: {
        backgroundColor: 'white',
        borderWidth: 1, // You can customize the border properties as needed
        borderRadius: 12, // Adjust the border radius to match the filled icon
        marginRight: 10, // Add spacing between the two icons
    },
})

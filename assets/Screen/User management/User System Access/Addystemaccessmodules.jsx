import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';


export default function Addystemaccessmodules() {
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        Employeeid: '', WorkRequest: '',
    })

    const [items, setItems] = useState([]);


    const getapi = () => {
        axios.get(`/api/SystemModules_GET_LIST`)
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

    return (
        <ScrollView>
            <View>
                {/* Top section */}
                <View >
                    <Text style={styles.prograp}>User Access</Text>
                    <View style={styles.inputContainer}>

                        <View style={styles.singleinputlable}>
                            <Text style={styles.lableinput}>System Module Code
                            </Text>
                            <TextInput
                                style={[styles.inputBox]}
                                value={value.Employeeid}
                                onChangeText={item => {
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        Employeeid: item, // Update the Employeeid property
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
                            <DataTable.Title style={[styles.header, { width: 200 }]} ><Text style={styles.tableHeading}>System Module Code</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 200 }]} ><Text style={styles.tableHeading}>System Module Desc</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]}><Text style={styles.tableHeading}>System Module Seq</Text></DataTable.Title>
                        </DataTable.Header>
                        {items.filter(
                            (item) =>
                                item &&
                                item.SystemModuleCode &&
                                item.SystemModuleCode.toLowerCase().includes(value.Employeeid.toLowerCase())
                        ).map((item) => (
                            <DataTable.Row key={item.SystemModuleCode}>
                                <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                    <Checkbox
                                        status={item.selected ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange(item.SystemModuleCode)}
                                    />
                                </DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.SystemModuleCode}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.SystemModuleDesc}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.SystemModuleSeq}</DataTable.Cell>

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
                        onPress={() => navigation.navigate('Crreateuseraccess')}
                    >
                        <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
                        Add Syetem Modules
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
        paddingHorizontal: 15
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
        borderWidth: 0.5,
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

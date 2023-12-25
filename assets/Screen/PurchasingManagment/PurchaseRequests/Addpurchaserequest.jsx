import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, Icon, Dialog } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Ionicons } from '@expo/vector-icons';

export default function Addpurchaserequest({ route }) {

    const { PurchaseRequestNumber } = route.params
    const { myFunction } = route.params
    const [value, setvalue] = useState({
        Employeeid: '', WorkRequest: '',
    })

    const [items, setItems] = useState([]);

    const getapi = () => {
        axios.get(`/api/AssetsMaster_GET_LIST`).then((res) => {
            setItems(res.data.recordset)
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        getapi()
    }, [])

    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (AssetItemDescription) => {
        const updatedItems = items.map((item) =>
            item.AssetItemDescription === AssetItemDescription ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.AssetItemDescription);
        setSelectedItems(selectedIds);
    };

    const handleSelectAllChange = () => {
        const allSelected = items.every((item) => item.selected);
        const updatedItems = items.map((item) => ({
            ...item,
            selected: !allSelected,
        }));
        setItems(updatedItems);
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.AssetItemDescription);
        setSelectedItems(selectedIds);
    };

    const [visible2, setVisible2] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const putapi = () => {
        axios.post(`/api/assetItemRequest_ADD_post`, {
            PurchaseRequestNumber: PurchaseRequestNumber,
            AssetItemDescriptions: selectedItems
        }).then((res) => {
            setSelectedItems([])
            myFunction()
        }).catch((err) => {
            console.log(err);
        });
    };

    const toggleDialog2 = () => {
        setVisible2(!visible2);
    };

    const showSuccessAlert = () => {
        setShowAlert(true);
        setVisible2(false)
        setSelectedItems('')
        putapi()
    };

    return (
        <ScrollView>
            <View>
                {/* Top section */}
                <View >
                    <Text style={styles.prograp}>Purchase Requests
                    </Text>
                    <View style={styles.inputContainer}>

                        <View style={styles.singleinputlable}>
                            <Text style={styles.lableinput}>Asset Item Description
                            </Text>
                            <TextInput
                                style={[styles.inputBox]}
                                value={value.Employeeid}
                                onChangeText={item => {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        Employeeid: item,
                                    }));
                                }}
                                placeholder="Select Filter Asset Description"
                                placeholderTextColor="#94A0CA"
                                selectionColor="#1D3A9F"
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <Text style={[styles.lableinput, { marginTop: 35 }]}>{PurchaseRequestNumber}</Text>
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
                            <DataTable.Title style={[styles.header, { width: 180 }]} ><Text style={styles.tableHeading}>ASSET ITEM DESCRIPTION</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 150 }]} ><Text style={styles.tableHeading}>ASSET ITEM GROUP</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 200 }]}><Text style={styles.tableHeading}>ASSET CATGORY</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 200 }]}><Text style={styles.tableHeading}>ASSET SUB_CATGORY</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]}><Text style={styles.tableHeading}>ON-HAND QTY</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>MODEL</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 170, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>MONIFACTURER</Text></DataTable.Title>
                        </DataTable.Header>
                        {items.filter(row => (
                            (!value.Employeeid || row.AssetItemDescription.toLowerCase().includes(value.Employeeid.toLowerCase()))
                        )).map((item) => (
                            <DataTable.Row key={item.AssetItemDescription}>
                                <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                    <Checkbox
                                        status={item.selected ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange(item.AssetItemDescription)}
                                    />
                                </DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>{item.AssetItemDescription}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{item.AssetItemGroup}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.AssetCategory}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.AssetSubCategory}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.OnHandQty}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{item.Model}</DataTable.Cell>
                                <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{item.Manufacturer}</DataTable.Cell>
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
                        onPress={toggleDialog2}
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

                {/* PurchaseRequestNumber add  Dialog*/}
                <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
                    <Dialog.Title title="Are you sure?" />
                    <Text>{`You want to Add the Purchase Request Number `}</Text>
                    <Dialog.Actions >
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Dialog.Button onPress={() => setVisible2(!visible2)} ><Text style={{ backgroundColor: '#198754', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>No, cancel!</Text></Dialog.Button>
                            <Dialog.Button onPress={showSuccessAlert} ><Text style={{ backgroundColor: '#EF643B', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>Yes, Add it!</Text></Dialog.Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
                {/* Pop message */}
                <AwesomeAlert
                    show={showAlert}
                    title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="ios-checkmark-circle" size={30} color="#4CAF50" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Success!</Text>
                        </View>
                    }
                    message={`The selected records are added to the Purchase Reques ${PurchaseRequestNumber}`}
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
        paddingBottom: 5,
        marginBottom: 10,
        position: 'relative',
        justifyContent: 'space-between',
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
        // width: 250,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: "#94A0CA",
        borderWidth: 1, // Border width
        fontSize: 14,
        color: 'black',
        marginVertical: 9,
        paddingVertical: 5,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10
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

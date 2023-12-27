import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Button, Dialog } from '@rneui/themed';
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import Createproblemcategory from '../../../Component/Setup and configuration/Problem Category/Createproblemcategory';

export default function Problemcategory() {
    const [value, setvalue] = useState({
        ProblemCategoryCodeserach: '', WorkRequest: '', ProblemCategoryCode: '', ProblemCategoryDesc: ''
    })

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const [items, setItems] = useState([]);

    const getapi = () => {
        axios.get(`/api/ProblemCategory_GET_LIST`)
            .then((res) => {
                setItems(res.data.recordset)
            }).catch((err) => {
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

    const handleCheckboxChange = (ProblemCategoryCode) => {
        const updatedItems = items.map((item) =>
            item.ProblemCategoryCode === ProblemCategoryCode ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
        // Update selectedItems state
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.ProblemCategoryCode);
        setSelectedItems(selectedIds);
    };

    const handleSelectAllChange = () => {
        const allSelected = items.every((item) => item.selected);
        const updatedItems = items.map((item) => ({
            ...item,
            selected: !allSelected,
        }));
        setItems(updatedItems);
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item.ProblemCategoryCode);
        setSelectedItems(selectedIds);
    };

    const [visible2, setVisible2] = useState(false);
    const [deleteItemCode, setDeleteItemCode] = useState('');

    const toggleDialog2 = (ProblemCategoryCode) => {
        setDeleteItemCode(ProblemCategoryCode); // Store the system module code
        setVisible2(!visible2);
    };

    const Deletedapi = (ProblemCategoryCode) => {
        axios.delete(`/api/ProblemCategory_DELETE_BYID/${ProblemCategoryCode}`)
            .then((res) => {
                setVisible2(false);
                getapi()
            })
            .catch((err) => {
                console.log('Error deleting', err);
            });
    }

    // Updata section
    const [showmodel, setshowmodel] = useState(false);
    const [updataItemCode, setupdataItemCode] = useState('');

    const toggleshowmodel = (ProblemCategoryCode) => {
        setshowmodel(!showmodel);
        setupdataItemCode(ProblemCategoryCode)
        axios.get(`/api/ProblemCategory_GET_BYID/${ProblemCategoryCode}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    ProblemCategoryDesc: res.data.recordset[0].ProblemCategoryDesc,
                    ProblemCategoryCode: res.data.recordset[0].ProblemCategoryCode,
                }))
            }).catch((err) => {
                console.log(err);
            });
    };

    const postapi = (updataItemCode) => {
        axios.put(`/api/ProblemCategory_Put/${updataItemCode}`, {
            ProblemCategoryDesc: value.ProblemCategoryDesc,
        },).then((res) => {
            getapi()
            setshowmodel(!showmodel);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <ScrollView>
            <View>
                {/* Top section */}
                <View >
                    <Text style={styles.prograp}>Problem Category Maintenance
                    </Text>
                </View>
                {/* table section */}
                <ScrollView horizontal vertical>
                    <DataTable style={[styles.item, {
                        width: '100%', height: 450, marginTop: 20
                    }]} >
                        <DataTable.Header>
                            <DataTable.Title style={[styles.header, { width: 50, borderTopLeftRadius: 5 }]}><Text style={styles.tableHeading}><Checkbox
                                status={selectedItems.length === items.length ? 'checked' : 'unchecked'}
                                onPress={handleSelectAllChange}
                            /></Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 80 }]} ><Text style={styles.tableHeading}>SEQ</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 200 }]} ><Text style={styles.tableHeading}>PROBLEM CATEGORY CODE</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 250 }]} ><Text style={styles.tableHeading}>DESCRIPTION</Text></DataTable.Title>
                            <DataTable.Title style={[styles.header, { width: 140, borderRightWidth: 1, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>ACTIONS</Text></DataTable.Title>
                        </DataTable.Header>

                        <ScrollView>
                            {items.slice(from, to).map((item, index) => (
                                <DataTable.Row key={item.ProblemCategoryCode}>
                                    <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                        <Checkbox
                                            status={item.selected ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange(item.ProblemCategoryCode)}
                                        />
                                    </DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 80 }]}>{index + 1}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item.ProblemCategoryCode}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 250 }]}>{item.ProblemCategoryDesc}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140, borderRightWidth: 1, }]}>
                                        <View>
                                            <View style={styles.actions}>
                                                <TouchableOpacity onPress={() => toggleshowmodel(item.ProblemCategoryCode)} style={[styles.actions, { marginRight: 10 }]}>
                                                    <FontAwesome5 name="sync-alt" size={20} color="black" />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => toggleDialog2(item.ProblemCategoryCode)} style={styles.actions}>
                                                    <AntDesign name="delete" size={20} color="red" />
                                                </TouchableOpacity>

                                            </View>

                                        </View>

                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </ScrollView>

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
                <View style={[styles.buttonsection, { justifyContent: 'flex-start', alignItems: 'flex-start' }]} >
                    <Createproblemcategory myFunction={getapi} />
                </View>
                <View style={styles.buttonsection} >
                    <Button radius={"md"} type="outline" containerStyle={{
                        width: 150,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    >
                        <AntDesign name="upload" color="#0A2DAA" size={20} style={{ marginRight: 7 }} />
                        Import
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
                    <Text>{`You want to delete this ${deleteItemCode} Problem Category`}</Text>
                    <Dialog.Actions >
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Dialog.Button onPress={() => setVisible2(!visible2)} ><Text style={{ backgroundColor: '#198754', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>No, cancel!</Text></Dialog.Button>
                            <Dialog.Button onPress={() => Deletedapi(deleteItemCode)} ><Text style={{ backgroundColor: '#EF643B', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>Yes, delete it!</Text></Dialog.Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>

                {/* Updata Diaog */}
                <Dialog isVisible={showmodel} >
                    <Dialog.Title title="Updata Problem Category" />

                    <View style={{ marginTop: 20 }}>
                        <View style={styles.singleinputlable}>
                            <Text style={styles.lableinput}>Problem Category Code
                            </Text>
                            <TextInput
                                style={[styles.inputBox, { width: 240 }]}
                                value={value.ProblemCategoryCode}
                                onChange={item => {
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        ProblemCategoryCode: item.value, // Update the Employeeid property
                                    }));
                                }}
                                placeholder="Problem Category Code"
                                placeholderTextColor="#94A0CA"
                                selectionColor="#1D3A9F"
                                underlineColorAndroid="transparent"
                                editable={false} // Set editable dynamically based on some condition
                            />
                        </View>
                        <View style={[styles.singleinputlable, { marginTop: 15 }]}>
                            <Text style={styles.lableinput}>Problem Category Desc
                            </Text>
                            <TextInput
                                style={[styles.inputBox, { width: 240 }]}
                                value={value.ProblemCategoryDesc}
                                onChangeText={item => {
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        ProblemCategoryDesc: item, // Update the Employeeid property
                                    }));
                                }}
                                placeholder="Problem Category Desc"
                                placeholderTextColor="#94A0CA"
                                selectionColor="#1D3A9F"
                                underlineColorAndroid="transparent"
                            />
                        </View>
                    </View>
                    <Dialog.Actions style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Dialog.Button onPress={() => postapi(updataItemCode)} ><Text style={{ backgroundColor: '#0A2DAA', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>Add New</Text></Dialog.Button>
                        <Dialog.Button onPress={() => setshowmodel(!showmodel)} ><Text style={{ backgroundColor: 'black', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>Back</Text></Dialog.Button>
                    </Dialog.Actions>
                </Dialog>
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

import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Button, Icon, Dialog } from '@rneui/themed';
import axios from 'axios';

export default function Createwarrantyperiod({ myFunction }) {
    const [value, setvalue] = useState({
        WarrantyPeriodCode: '', WarrantyPeriodDesc: '',
    })
    const [showmodel, setshowmodel] = useState(false);

    const toggleshowmodel = () => {
        setshowmodel(!showmodel);
    };

    const postapi = (e) => {
        e.preventDefault();
        axios.post(`/api/WarrantyPeriod_post`, {
            WarrantyPeriodCode: value.WarrantyPeriodCode,
            WarrantyPeriodDesc: value.WarrantyPeriodDesc
        },).then((res) => {
            setshowmodel(!showmodel);
            myFunction()
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <View>

            <Button radius={"md"} type="outline" containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
            }}
                onPress={toggleshowmodel}
            >
                <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
                Create
            </Button>

            <Dialog isVisible={showmodel} >
                <Dialog.Title title="Create Warranty Period" />

                <View style={{ marginTop: 20 }}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}> Warranty Period Code
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.WarrantyPeriodCode}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WarrantyPeriodCode: item, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Warranty Period Code"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={[styles.singleinputlable, { marginTop: 15 }]}>
                        <Text style={styles.lableinput}> Warranty Period Description
                        </Text>
                        <TextInput
                            style={[styles.inputBox]}
                            value={value.WarrantyPeriodDesc}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WarrantyPeriodDesc: item, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Warranty Period Description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                <Dialog.Actions style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Dialog.Button onPress={postapi}><Text style={{ backgroundColor: '#0A2DAA', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>Add New</Text></Dialog.Button>
                    <Dialog.Button onPress={() => setshowmodel(!showmodel)} ><Text style={{ backgroundColor: 'black', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>Back</Text></Dialog.Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    lableinput: {
        color: '#0A2DAA',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 17
    },
    inputBox: {
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
})
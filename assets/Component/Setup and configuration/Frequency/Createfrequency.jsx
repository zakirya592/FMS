import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Button, Icon, Dialog } from '@rneui/themed';
import axios from 'axios';

export default function Createfrequency({ myFunction }) {
    const [value, setvalue] = useState({
        FreqCode: '', FreqDesc: '', FreqSeq: ''
    })
    const [showmodel, setshowmodel] = useState(false);

    const toggleshowmodel = () => {
        setshowmodel(!showmodel);
    };

    const postapi = (e) => {
        e.preventDefault();
        axios.post(`/api/Frequency_post`, {
            FreqCode: value.FreqCode,
            FreqSeq: value.FreqSeq,
            FreqDesc: value.FreqDesc
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
                <View style={{ marginTop: 20 }}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Freq Code
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.FreqCode}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    FreqCode: item, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Freq Code"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={[styles.singleinputlable, { marginTop: 15 }]}>
                        <Text style={styles.lableinput}>Freq Seq
                        </Text>
                        <TextInput
                            style={[styles.inputBox]}
                            value={value.FreqSeq}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    FreqSeq: item, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Freq Seq"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={[styles.singleinputlable, { marginTop: 15 }]}>
                        <Text style={styles.lableinput}>Freq Description
                        </Text>
                        <TextInput
                            style={[styles.inputBox]}
                            value={value.FreqDesc}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    FreqDesc: item, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Freq Description"
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
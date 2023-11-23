import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
export default function Createworkrequest() {
    const [value, setvalue] = useState({
        Employeeid: null, WorkRequest:''
    })
    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View>
            <View >
                <Text className='color1 workitoppro my-auto' style={styles.prograp}>Create Work Request
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.singleinputlable}>
                    <Text style={styles.lableinput}>Employee ID
                    </Text>
                    <Dropdown
                        style={[styles.inputBox,{height:40,}, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={value.Employeeid}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setvalue((prevValue) => ({
                                ...prevValue,
                                Employeeid: item.value, // Update the Employeeid property
                            }));
                            setIsFocus(false);
                        }}
                       
                    />
                </View>

                <View style={styles.singleinputlable}>
                    <Text style={styles.lableinput}>Work Request#
                    </Text>
                    <TextInput
                        style={[
                            styles.inputBox,
                            { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                        ]}
                        value={value.WorkRequest}
                        onChange={item => {
                            setvalue((prevValue) => ({
                                ...prevValue,
                                WorkRequest: item.value, // Update the Employeeid property
                            }));
                        }}
                        placeholder="Work Request #"
                        placeholderTextColor="#94A0CA"
                        selectionColor="#fff"
                        underlineColorAndroid="transparent"
                        onFocus={(() => {
                            setIsFocused(true);
                        })}
                        onBlur={(() => {
                            setIsFocused(false);
                        })}
                    />
                </View>

            </View>
            
            
        </View>
    )
}
const styles = StyleSheet.create({

    placeholderStyle: {
        fontSize: 16,
        color:'#94A0CA'
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 30,
        fontSize: 16,
    },
    prograp: {
        color: '#1E3B8B',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        margin: 5
    },
    inputContainer: {
        marginTop:20,
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
        fontWeight: '400'
    },
    inputBox: {
        width: 160,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: "#94A0CA",
        borderWidth: 1, // Border width
        fontSize: 15,
        color: 'black',
        marginVertical: 9,
        paddingVertical: 5,
        backgroundColor: '#FFFFFF',
    },

})

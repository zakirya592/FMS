import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from "react-native"
import { Picker } from '@react-native-picker/picker';

export default function Createworkrequest() {
    const [selectedValue, setSelectedValue] = useState('');
    const [WorkRequest, setWorkRequest] = useState('')
     const [isFocused, setIsFocused] = useState(false);

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
                    <Picker
                        selectedValue={selectedValue}
                        style={[styles.inputBox, styles.dropdown]}
                        itemStyle={{ height: 10 }} // Set height for the items in the Picker
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item style={{height:12}} label="Option 1" value="option1" />
                        <Picker.Item style={{ height: 12 }} label="Option 2" value="option2" />
                        <Picker.Item style={{ height: 12 }} label="Option 3" value="option3" />
                        {/* Add more Picker.Item components for additional options */}
                    </Picker>

                </View>

                <View style={styles.singleinputlable}>
                    <Text style={styles.lableinput}>Work Request#
                    </Text>
                    <TextInput
                        style={[
                            styles.inputBox,
                            { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' }, // Dynamic border color
                        ]}
                        // value={WorkRequest}
                        // onChangeText={(text) => WorkRequest(text)}
                        placeholder="Work Request #"
                        placeholderTextColor="#94A0CA"
                        selectionColor="#fff"
                        // keyboardType="Work Request #"
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
    prograp: {
        color: '#1E3B8B',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        margin: 5
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
        marginBottom: 10,
        position: 'relative',
        justifyContent:'space-around'
    },
    lableinput:{
        color: '#0A2DAA',
        fontSize:16,
        fontWeight:'400'
    },
    picker: {
        width: 150, // Set the width directly
        height: 50, // Set the height directly
        borderWidth: 1,
        borderColor: 'red', // Set the border color to red
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
        paddingVertical:5,
        backgroundColor:'#FFFFFF',
    },
  
})

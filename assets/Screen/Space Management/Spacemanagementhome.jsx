import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function Spacemanagementhome() {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={{ marginTop: '30%' }}>
                <View style={{ display: 'flex', margin: 'auto 0' }}>
                    <Text style={styles.prograp}>
                        Select Space Management
                    </Text>
                    <View>
                        <Button
                            onPress={() => navigation.navigate('Buildingspacemanagement')}
                            radius={'md'}
                            type="solid"
                            containerStyle={{
                                width: 270,
                                marginHorizontal: 50,
                                marginVertical: 20,
                            }}
                            buttonStyle={{
                                backgroundColor: '#0A2DAA',
                                borderRadius: 3,
                            }}
                        >
                            BUILDING MAINTENANCE
                        </Button>

                    </View>
                    <View>
                        <Button
                            onPress={() => navigation.navigate('Floorcode')}
                            radius={'md'}
                            type="solid"
                            containerStyle={{
                                width: 270,
                                marginHorizontal: 50,
                                marginVertical: 20,
                            }}
                            buttonStyle={{
                                backgroundColor: '#0A2DAA',
                                borderRadius: 3,
                            }}
                        >
                            FLOOR MAINTENANCE
                        </Button>

                    </View>
                    <View>
                        <Button
                            onPress={() => navigation.navigate('Roomtable')}
                            radius={'md'}
                            type="solid"
                            containerStyle={{
                                width: 270,
                                marginHorizontal: 50,
                                marginVertical: 20,
                            }}
                            buttonStyle={{
                                backgroundColor: '#0A2DAA',
                                borderRadius: 3,
                            }}
                        >
                            ROOM MAINTENANCE
                        </Button>

                    </View>
                    <View>
                        <Button
                            onPress={() => navigation.navigate('Employeeroomassignment')}
                            radius={'md'}
                            type="solid"
                            containerStyle={{
                                width: 270,
                                marginHorizontal: 50,
                                marginVertical: 20,
                            }}
                            buttonStyle={{
                                backgroundColor: '#0A2DAA',
                                borderRadius: 3,
                            }}
                        >
                         EMPLOYEE ROOM ASSIGNMENTS
                        </Button>

                    </View>
                    <View>
                        <Button
                            onPress={() => navigation.navigate('Employeeroomtransfer')}
                            radius={'md'}
                            type="solid"
                            containerStyle={{
                                width: 270,
                                marginHorizontal: 50,
                                marginVertical: 20,
                            }}
                            buttonStyle={{
                                backgroundColor: '#0A2DAA',
                                borderRadius: 3,
                            }}
                        >
                            EMPLOYEE ROOM TRANSERS
                        </Button>

                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
        marginBottom: 10,
        position: 'relative',
        justifyContent: 'space-around',
    },
    lableinput: {
        color: '#0A2DAA',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 17,
    },

    prograp: {
        color: '#1E3B8B',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',

        marginHorizontal: 60,
        marginVertical: 10,
    },
    inputBox: {
        width: 170,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#94A0CA',
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
        fontSize: 14,
    },
    item: {
        // borderColor: "#0A2DAA",
        // borderWidth: 1, // Border width
        // borderRadius:5
    },
    tablebody: {
        borderColor: '##9384EB',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center',
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionstitle: {
        fontSize: 14,
        marginRight: 5,
        color: '#0A2DAA',
        fontWeight: '700',
    },
});

import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function Setupconfigurationrouting() {

    const navigation = useNavigation();
    return (
        <ScrollView>
            <Text style={styles.prograp}>Select Set Up & Configuration
            </Text>
            <View style={styles.containerscrollview} >
                {/* Left side */}
                <View>
                    {/* Work Type*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Worktype')}
                        title='Work Type'
                    />
                    {/*Work Trade*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Worktrade')}
                        title='Work Trade'
                    />
                    {/* Work Status*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Workstatus')}
                        title='Work Status'
                    />
                    {/* Work Priority*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Workpriority')}
                        title='Work Priority'
                    />
                    {/* Work Category*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Workcategory')}
                        title='Work Category'
                    />
                    {/* Department*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Department'
                    />
                    {/* Building */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Building '
                    />
                    {/* Location*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Location'
                    />
                    {/* Problem Category */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Problem Category'
                    />
                    {/* Request Status*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Request Status'
                    />
                    {/* Failure Codes */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Failure Codes'
                    />
                    {/* Solution Codes*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Solution Codes'
                    />
                    {/* Work Type*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Work Type'
                    />
                    {/* Days*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Days'
                    />
                    {/* Floor */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Floor'
                    />
                    {/* Room */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Room'
                    />
                </View>
                {/* Right  side */}
                <View>
                    {/*Frequency*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Frequency '
                    />
                    {/* Gender */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Gender'
                    />
                    {/* Title/Salutation */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Title/Salutation '
                    />
                    {/* Marital Status */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Marital Status'
                    />
                    {/* Nationality*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Nationality'
                    />
                    {/* Asset Type */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Asset Type '
                    />
                    {/* Asset Category*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Asset Category'
                    />
                    {/* Asset Sub  Category */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Asset Sub Category'
                    />
                    {/* Asset Condition*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Asset Condition'
                    />
                    {/* Warranty Period  */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Warranty Period '
                    />
                    {/* Employee Master*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Employee Master'
                    />
                    {/* Employee Status*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Employee Status'
                    />
                    {/* Employee Designation*/}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Employee Designation'
                    />
                    {/* Vendor/Supplier */}
                    <Button containerStyle={styles.containerstyle}
                        titleStyle={styles.titlestyle}
                        buttonStyle={styles.buttonstylesss}
                        onPress={() => navigation.navigate('Systemmodules')}
                        title='Vendor/Supplier'
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerscrollview: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    prograp: {
        color: '#1E3B8B',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    containerstyle: {
        paddingHorizontal: 12,
        marginTop: 5,
        alignItems: 'flex-start',
        color: '#1E3B8B',
    },
    buttonstylesss: {
        backgroundColor: 'transparent',
        color: '#1E3B8B',
    },
    titlestyle: {
        color: '#0A2DAA'
    }
})
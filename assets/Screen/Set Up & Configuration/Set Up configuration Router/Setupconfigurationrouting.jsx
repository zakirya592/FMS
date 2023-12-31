import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

export default function Setupconfigurationrouting () {
  const navigation = useNavigation ();
  return (
    <ScrollView>
      <Text style={styles.prograp}>
        Select Set Up & Configuration
      </Text>
      <View style={styles.containerscrollview}>
        {/* Left side */}
        <View>
          {/* Work Type*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Worktype')}
            title="Work Type"
          />
          {/*Work Trade*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Worktrade')}
            title="Work Trade"
          />
          {/* Work Status*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Workstatus')}
            title="Work Status"
          />
          {/* Work Priority*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Workpriority')}
            title="Work Priority"
          />
          {/* Work Category*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Workcategory')}
            title="Work Category"
          />
          {/* Department*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Department')}
            title="Department"
          />
          {/* Building */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Building')}
            title="Building "
          />
          {/* Location*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Location')}
            title="Location"
          />
          {/* Problem Category */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Problemcategory')}
            title="Problem Category"
          />
          {/* Request Status*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Requeststatus')}
            title="Request Status"
          />
          {/* Failure Codes */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Failurecode')}
            title="Failure Codes"
          />
          {/* Solution Codes*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Solutioncode')}
            title="Solution Codes"
          />
          {/* Work Type*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Worktype')}
            title="Work Type"
          />
          {/* Days*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Days')}
            title="Days"
          />
          {/* Floor */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Floorcode')}
            title="Floor"
          />
          {/* Room */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('RoomCode')}
            title="Room"
          />
        </View>
        {/* Right  side */}
        <View>
          {/*Frequency*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Frequency')}
            title="Frequency "
          />
          {/* Gender */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate('Gendercode')}
            title="Gender"
          />
          {/* Title/Salutation */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Titlesatutation')}
            title="Title/Salutation "
          />
          {/* Marital Status */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Maritalstatus')}
            title="Marital Status"
          />
          {/* Nationality*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Nationality')}
            title="Nationality"
          />
          {/* Asset Type */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Assettype')}
            title="Asset Type "
          />
          {/* Asset Category*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Assetcategory')}
            title="Asset Category"
          />
          {/* Asset Sub  Category */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('AssetSubCategory')}
            title="Asset Sub Category"
          />
          {/* Asset Condition*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Assectcondition')}
            title="Asset Condition"
          />
          {/* Warranty Period  */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('WarrantyPeriod')}
            title="Warranty Period "
          />
          {/* Employee Master*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Systemmodules')}
            title="Employee Master"
          />
          {/* Employee Status*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('EmployeeStatus')}
            title="Employee Status"
          />
          {/* Employee Designation*/}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('Employeedesignation')}
            title="Employee Designation"
          />
          {/* Vendor/Supplier */}
          <Button
            containerStyle={styles.containerstyle}
            titleStyle={styles.titlestyle}
            buttonStyle={styles.buttonstylesss}
            onPress={() => navigation.navigate ('supplier')}
            title="Vendor/Supplier"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create ({
  containerscrollview: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    color: '#0A2DAA',
  },
});

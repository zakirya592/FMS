import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, Icon} from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AntDesign} from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-number-input';
import {DataTable} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
];

export default function Createworkrequest () {
  const navigation = useNavigation ();
  const [value, setvalue] = useState ({
    Employeeid: null,
    WorkRequest: '',
    Datetime: '',
    RequestStatus: '',
    FirstMiddleName: '',
    LastName: '',
    DepartmentCode: '',
    DepartmentName: '',
    WorkType: '',
    WorkTypeDesc: '',
    WorkPriority: '',
    WorkTrade: '',
    Building: '',
    Location: '',
    WorkTradeDesc: '',
    MobileNumber: '',
    Landline: '',
  });

  const [isFocusedDepartmentName, setIsFocusedDepartmentName] = useState (
    false
  );
  const [isFocusedWorkTradeDesc, setIsFocusedWorkTradeDesc] = useState (false);
  const [isFocusedWorkTypeDesc, setIsFocusedWorkTypeDesc] = useState (false);
  const [isFocused, setIsFocused] = useState (false);
  const [isFocus, setIsFocus] = useState (false);
  const [isFocusRequestStatus, setIsFocusRequestStatus] = useState (false);
  const [date, setDate] = useState (new Date ());
  const [showPicker, setShowPicker] = useState (false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker (Platform.OS === 'ios'); // On iOS, the picker is not dismissed automatically
    setDate (currentDate);
  };

  const showDatepicker = () => {
    setShowPicker (true);
  };

  const [items, setItems] = React.useState ([
    {
      _id: 1,
      WORKREQUEST: 'ASSET/STOCK NUMBER',
      REQUESTSTATUS: 'ASSET ITEM GROUP',
      REQUESTBYEMP: 'ASSET ITEM DESCRIPTION',
      PRIORITY: 'ASSET QTY',
      REQUESTDATE: 'MODEL',
      WORKTYPEDESC: 'MONIFACTURER',
      ACTIONS: 'Open',
    },
  ]);

  const [selectedItems, setSelectedItems] = useState ([]);

  const handleCheckboxChange = _id => {
    const updatedItems = items.map (
      item => (item._id === _id ? {...item, selected: !item.selected} : item)
    );
    setItems (updatedItems);
    // Update selectedItems state
    const selectedIds = updatedItems
      .filter (item => item.selected)
      .map (item => item._id);
    setSelectedItems (selectedIds);
  };

  const handleSelectAllChange = () => {
    const allSelected = items.every (item => item.selected);
    const updatedItems = items.map (item => ({
      ...item,
      selected: !allSelected,
    }));
    setItems (updatedItems);
    const selectedIds = updatedItems
      .filter (item => item.selected)
      .map (item => item._id);
    setSelectedItems (selectedIds);
  };

  return (
    <ScrollView contentContainerStyle={styles.containerscrollview}>
      <View>
        <View>
          <Text style={styles.prograp}>
            Asset Transaction - Create
          </Text>
              </View>
               <View>
        
          <View style={styles.inputContainer}>
 <View style={styles.singleinputlable}>
              <Text style={styles.lableinput}>
                Asset/Stock Number
              </Text>
              <TextInput
                style={styles.inputBox}
                value={value.Employeeid}
                onChange={item => {
                  setvalue (prevValue => ({
                    ...prevValue,
                    Employeeid: item.value, // Update the Employeeid property
                  }));
                }}
                placeholder="Enter Generate Tag #"
                placeholderTextColor="#94A0CA"
                selectionColor="#1D3A9F"
                underlineColorAndroid="transparent"
              />
              <Feather
                name="search"
                size={24}
                color="black"
                style={{position: 'absolute', left: '85%', top: '45%'}}
              />
            </View>
            <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset Condition
            </Text>
            <Dropdown
              style={[
                styles.inputBox,
                {height: 40},
                isFocus && {borderColor: 'blue'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select asset condition' : '...'}
              searchPlaceholder="Search..."
              value={value.Employeeid}
              onFocus={() => setIsFocus (true)}
              onBlur={() => setIsFocus (false)}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  Employeeid: item.value, // Update the Employeeid property
                }));
                setIsFocus (false);
              }}
            />
          </View>

          </View>
        </View>
        
        {/* Employee ID and Employee Name */}
        <View style={styles.inputContainer}>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Employee ID
            </Text>
            <Dropdown
              style={[
                styles.inputBox,
                {height: 40},
                isFocus && {borderColor: 'blue'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Employee Number' : '...'}
              searchPlaceholder="Search..."
              value={value.Employeeid}
              onFocus={() => setIsFocus (true)}
              onBlur={() => setIsFocus (false)}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  Employeeid: item.value, // Update the Employeeid property
                }));
                setIsFocus (false);
              }}
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Employee Name
            </Text>
            <TextInput
              style={[
                styles.inputBox,
                {borderColor: isFocused ? '#1D3A9F' : '#94A0CA'},
              ]}
              value={value.WorkRequest}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  WorkRequest: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Employee Name"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              onFocus={() => {
                setIsFocused (true);
              }}
              onBlur={() => {
                setIsFocused (false);
              }}
            />
          </View>

        </View>
        {/* Asset Item Description */}
        <View style={styles.inputContainerdesc}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset Item Description
            </Text>
            <TextInput
              style={[
                styles.inputBoxdescription,
                {borderColor: isFocused ? '#1D3A9F' : '#94A0CA'},
              ]}
              value={value.FirstMiddleName}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  FirstMiddleName: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Enter Asset Item Description"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
            />
          </View>

        </View>

        {/* Asset Item Group and Item Group Desc.*/}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset Item Group
            </Text>
            <Dropdown
              style={[
                styles.inputBox,
                {height: 40},
                isFocus && {borderColor: 'blue'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={'Select Asset Group'}
              value={value.Building}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  Building: item.value, // Update the Employeeid property
                }));
              }}
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Item Group Desc.
            </Text>
            <TextInput
              style={[
                styles.inputBox,
                {borderColor: isFocused ? '#1D3A9F' : '#94A0CA'},
              ]}
              value={value.WorkRequest}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  WorkRequest: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Enter Description"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              onFocus={() => {
                setIsFocused (true);
              }}
              onBlur={() => {
                setIsFocused (false);
              }}
            />
          </View>

        </View>
        {/* Asset Type and Asset Type Desc  */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset category
            </Text>
            <Dropdown
              style={[
                styles.inputBox,
                {height: 40},
                isFocus && {borderColor: 'blue'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={'Select asset category'}
              value={value.DepartmentCode}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  DepartmentCode: item.value, // Update the Employeeid property
                }));
              }}
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset Category Desc
            </Text>
            <TextInput
              style={[
                styles.inputBox,
                {borderColor: isFocusedDepartmentName ? '#1D3A9F' : '#94A0CA'},
              ]}
              value={value.DepartmentName}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  DepartmentName: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Category Description"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              onFocus={() => {
                setIsFocusedDepartmentName (true);
              }}
              onBlur={() => {
                setIsFocusedDepartmentName (false);
              }}
            />
          </View>

              </View>
        {/* Asset Type and Asset Type Desc  */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset Sub Category
            </Text>
            <Dropdown
              style={[
                styles.inputBox,
                {height: 40},
                isFocus && {borderColor: 'blue'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={'Select Sub Category'}
              value={value.DepartmentCode}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  DepartmentCode: item.value, // Update the Employeeid property
                }));
              }}
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset Sub Cat Desc
            </Text>
            <TextInput
              style={[
                styles.inputBox,
                {borderColor: isFocusedDepartmentName ? '#1D3A9F' : '#94A0CA'},
              ]}
              value={value.DepartmentName}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  DepartmentName: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Sub Category desc"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              onFocus={() => {
                setIsFocusedDepartmentName (true);
              }}
              onBlur={() => {
                setIsFocusedDepartmentName (false);
              }}
            />
          </View>

        </View>      
        <View style={styles.line} />
        {/* Manufacturer and model */}
       <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Department Code
            </Text>
            <Dropdown
              style={[
                styles.inputBox,
                {height: 40},
                isFocus && {borderColor: 'blue'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={'Select dept code'}
              value={value.DepartmentCode}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  DepartmentCode: item.value, // Update the Employeeid property
                }));
              }}
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Department Name
            </Text>
            <TextInput
              style={[
                styles.inputBox,
                {borderColor: isFocusedDepartmentName ? '#1D3A9F' : '#94A0CA'},
              ]}
              value={value.DepartmentName}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  DepartmentName: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Department name"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              onFocus={() => {
                setIsFocusedDepartmentName (true);
              }}
              onBlur={() => {
                setIsFocusedDepartmentName (false);
              }}
            />
          </View>

        </View>
        {/* Brand*/}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Building
            </Text>
            <Dropdown
              style={[
                styles.inputBox,
                {height: 40},
                isFocus && {borderColor: 'blue'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={'Select building code'}
              value={value.DepartmentCode}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  DepartmentCode: item.value, // Update the Employeeid property
                }));
              }}
            />
          </View>

         <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
             Location
            </Text>
            <Dropdown
              style={[
                styles.inputBox,
                {height: 40},
                isFocus && {borderColor: 'blue'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={'Select location'}
              value={value.DepartmentCode}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  DepartmentCode: item.value, // Update the Employeeid property
                }));
              }}
            />
          </View>

        </View>
        {/* Manufacturer and model */}
               <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Manufacturer
            </Text>
            <TextInput
              style={[
                styles.inputBox,
                {borderColor: isFocusedWorkTypeDesc ? '#1D3A9F' : '#94A0CA'},
              ]}
              value={value.WorkTypeDesc}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  WorkTypeDesc: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Manufacturer"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              onFocus={() => {
                setIsFocusedWorkTypeDesc (true);
              }}
              onBlur={() => {
                setIsFocusedWorkTypeDesc (false);
              }}
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Model
            </Text>
            <TextInput
              style={[
                styles.inputBox,
                {borderColor: isFocusedWorkTypeDesc ? '#1D3A9F' : '#94A0CA'},
              ]}
              value={value.WorkTypeDesc}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  WorkTypeDesc: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Model"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              onFocus={() => {
                setIsFocusedWorkTypeDesc (true);
              }}
              onBlur={() => {
                setIsFocusedWorkTypeDesc (false);
              }}
            />
          </View>

        </View>
        {/* Manufacturer and model */}
               <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Brand
            </Text>
            <TextInput
              style={[
                styles.inputBox,
                {borderColor: isFocusedWorkTypeDesc ? '#1D3A9F' : '#94A0CA'},
              ]}
              value={value.WorkTypeDesc}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  WorkTypeDesc: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Brand"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              onFocus={() => {
                setIsFocusedWorkTypeDesc (true);
              }}
              onBlur={() => {
                setIsFocusedWorkTypeDesc (false);
              }}
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Serial Number
            </Text>
            <TextInput
              style={[
                styles.inputBox,
                {borderColor: isFocusedWorkTypeDesc ? '#1D3A9F' : '#94A0CA'},
              ]}
              value={value.WorkTypeDesc}
              onChange={item => {
                setvalue (prevValue => ({
                  ...prevValue,
                  WorkTypeDesc: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Serial Number"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              onFocus={() => {
                setIsFocusedWorkTypeDesc (true);
              }}
              onBlur={() => {
                setIsFocusedWorkTypeDesc (false);
              }}
            />
          </View>

        </View>

        {/* Button section */}
        <Button
          radius={'md'}
          type="solid"
          containerStyle={{
            width: 150,
            marginLeft: 15,
            marginTop: -10,
          }}
          // onPress={() => navigation.navigate('Createworkrequest')}
        >
          <Ionicons
            name="md-save-outline"
            size={20}
            color="white"
            style={{marginRight: 12}}
          />
          SAVE
        </Button>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create ({
  iconcontainer: {
    position: 'absolute',
    left: '86%',
    backgroundColor: 'black',
    padding: 1,
    borderRadius: 5,
  },
  placeholderStyle: {
    fontSize: 12,
    color: '#94A0CA',
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
    marginHorizontal: 10,
    marginVertical: 20,
  },
  Brand: {
    marginRight: 160,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'space-around',
  },
  inputContainerdesc: {
    flexDirection: 'row',
    marginRight: 50,
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
  warranty: {
    marginLeft: 5,
  },
  inputBoxdescription: {
    width: 300,
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
  outlineIcon: {
    backgroundColor: 'white',
    borderWidth: 1, // You can customize the border properties as needed
    borderRadius: 12, // Adjust the border radius to match the filled icon
    marginRight: 10, // Add spacing between the two icons
  },
  tableborder: {
    width: '99%',
    borderColor: '#94A0CA',
    borderWidth: 1, // Border width
    justifyContent: 'center',
    // marginLeft: 2,
    borderRadius: 5,
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
  tablebody: {
    borderColor: '##9384EB',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  line: {
    borderBottomColor: '#94A0CA', // Change the color as needed
    borderBottomWidth: 1,
    // Change the thickness as needed
    marginVertical: 10, // Adjust the vertical margin as needed
  },
});

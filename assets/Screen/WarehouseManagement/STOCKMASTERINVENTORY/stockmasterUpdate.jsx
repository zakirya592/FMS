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
import {Ionicons} from '@expo/vector-icons';
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
            Masterlist-Create
          </Text>
        </View>
        {/* Asset Category and Asset Category Desc. */}
        <View style={styles.inputContainer}>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset Category
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
              placeholder={!isFocus ? 'Select Asset Category' : '...'}
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
              Asset Category Desc.
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
              placeholder="Asset Category Desc."
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
        {/* Asset Sub Category and Asset Sub-Cat. Desc. */}
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
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Sub Category' : '...'}
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
              Asset Sub-Cat. Desc.
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
              placeholder="Sub-Asset Cat. desc."
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
              Asset Type
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
              placeholder={'Select asset type'}
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
              Asset Type Desc
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
              placeholder="Enter Description"
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
        {/* Brand*/}
        <View style={styles.inputContainer}>

          <View style={styles.Brand}>
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

          <View style={styles.singleinputlable} />

        </View>
        {/* Purchase Date and Purchased Amount */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Purchase Date
            </Text>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={[styles.inputBox, {position: 'relative'}]}
                  placeholder="dd/mm/yyyy -:- --"
                  editable={true}
                />
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.iconcontainer}
                >
                  <AntDesign name="calendar" size={20} color="white" />
                </TouchableOpacity>
              </View>
              {showPicker &&
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                </View>}
            </View>
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Purchased Amount
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
              placeholder="000"
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
        {/* Warranty Period and Warranty Start Date */}
        <View style={styles.inputContainer}>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Warranty Period
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
              placeholder={'Warranty Period'}
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
              Warranty Start Date
            </Text>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={[styles.inputBox, {position: 'relative'}]}
                  placeholder="dd/mm/yyyy -:- --"
                  editable={true}
                />
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.iconcontainer}
                >
                  <AntDesign name="calendar" size={20} color="white" />
                </TouchableOpacity>
              </View>
              {showPicker &&
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                </View>}
            </View>
          </View>

        </View>
        {/* Warranty Start Date and Warranty Start Date */}
        <View style={styles.warranty}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Warranty End Date
            </Text>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={[styles.inputBox, {position: 'relative'}]}
                  placeholder="dd/mm/yyyy -:- --"
                  editable={true}
                />
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.iconcontainer}
                >
                  <AntDesign
                    name="calendar"
                    style={{
                      position: 'relative',
                    }}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              {showPicker &&
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                </View>}
            </View>
          </View>

          <View style={styles.singleinputlable} />

        </View>
        {/* On Hand Qty and Re-Order Qty Level */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              On Hand Qty
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
              placeholder="0"
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
              Re-Order Qty Level
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
              placeholder="0"
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
        {/* Minimum Level and Maximum Level */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Minimum Level
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
              placeholder="0"
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
              Maximum Level
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
              placeholder="0"
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
        {/* Units and Units Description */}
        <View style={styles.inputContainer}>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Units
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
              placeholder={!isFocus ? 'Units' : '...'}
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
              Units Description
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
              placeholder="Units Description"
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
        <View style={styles.line} />
        {/* P.O Reference and Last Purchase Date */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Last Purchase Date
            </Text>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={[styles.inputBox, {position: 'relative'}]}
                  placeholder="dd/mm/yyyy -:- --"
                  editable={true}
                />
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.iconcontainer}
                >
                  <AntDesign name="calendar" size={20} color="white" />
                </TouchableOpacity>
              </View>
              {showPicker &&
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                </View>}
            </View>
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              P.O Reference
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
              placeholder="xxx xxx xxx"
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
        {/*  Purchase Amount and P.O Qty Units */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Purchase Amount
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
              placeholder="0"
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
              P.O Qty Units
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
              placeholder="0"
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
        {/*   Warranty End  */}
        <View style={styles.inputContainer}>

          <View style={styles.Brand}>
            <Text style={styles.lableinput}>
              Warranty End
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
              placeholder="0"
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

          <View style={styles.singleinputlable} />

        </View>
        {/*  Vendor Code and Vendor Name */}
        <View style={styles.inputContainer}>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Vendor Code
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
              placeholder={!isFocus ? 'Select Vendor Code' : '...'}
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
              Vendor Name
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
              placeholder="Vendor Name"
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

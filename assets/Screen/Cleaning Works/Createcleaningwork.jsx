import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
];

export default function Createcleaningwork() {
    const [value, setvalue] = useState({
        Employeeid: null, WorkRequestNo: '',
        WorkOrderNumber: '', Datetime: '', RequestStatus: '', FirstMiddleName: '', LastName: '',
        AssetCategory: '', Manufacturer: '', Model: '', Building: '', DepartmentCode: '', DepartmentName: '', CleaningGroup: '', InstructionRemarks:'',
        WorkPriority: '', GroupDescription: '', SchedulingPriority: '',
        WorkPrority: '', WorkStaus: '', AssetType: '', AssetTypeDesc: '', AssigntoEmployee: '', EmployeeName: '', TotalDays: '0', TotalHours: '0', TotalMinuites: '0', CostofWork: '0',
        CompletedbyEmp: '', ComplateEmployeeName: '',
    })

    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios'); // On iOS, the picker is not dismissed automatically
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };

    const [dateEndDatetime, setDateEndDatetime] = useState(null);
    const [showPickerEndDatetime, setShowPickerEndDatetime] = useState(false);
    const onChangeEndDatetime = (event, selectedDate) => {
        const currentDate = selectedDate || dateEndDatetime; // Use the existing date if no new date is selected
        setShowPickerEndDatetime(Platform.OS === 'ios'); // On iOS, the picker is not dismissed automatically
        setDateEndDatetime(currentDate);
    };

    const showDatepickerEndDatetime = () => {
        setShowPickerEndDatetime(true);
    };

    const [dateManufacturer, setDateManufacturer] = useState(null);
    const [showPickerManufacturer, setShowPickerManufacturer] = useState(false);
    const onChangeManufacturer = (event, selectedDate) => {
        const currentDate = selectedDate || dateManufacturer; // Use the existing date if no new date is selected
        setShowPickerManufacturer(Platform.OS === 'ios'); // On iOS, the picker is not dismissed automatically
        setDateManufacturer(currentDate);
    };

    const showDatepickerManufacturer = () => {
        setShowPickerManufacturer(true);
    };

    const [dateWarrantyenddata, setDateWarrantyenddata] = useState(null);
    const [showPickerWarrantyenddata, setShowPickerWarrantyenddata] = useState(false);
    const onChangeWarrantyenddata = (event, selectedDate) => {
        const currentDate = selectedDate || dateWarrantyenddata; // Use the existing date if no new date is selected
        setShowPickerWarrantyenddata(Platform.OS === 'ios'); // On iOS, the picker is not dismissed automatically
        setDateWarrantyenddata(currentDate);
    };

    const showDatepickerWarrantyenddata = () => {
        setShowPickerWarrantyenddata(true);
    };

    const [selectedOption, setSelectedOption] = React.useState('Daily');

    const handleRadioChange = (value) => {
        setSelectedOption(value);
    };

    return (

        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View >
                    <Text style={styles.prograp}>Cleaning Works
                    </Text>
                </View>
                {/* Employee ID and Work Request Number */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder='Employee Number'
                            searchPlaceholder="Search..."
                            value={value.Employeeid}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Employeeid: item.value, // Update the Employeeid property
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Request No.
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, },]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder='Work Request No'
                            value={value.WorkRequestNo}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkRequestNo: item.value, // Update the Employeeid property
                                }));
                            }}
                        />
                    </View>

                </View>
                {/* Start Date/Time  */}
                <View style={[styles.inputContainer, { alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 4 }]}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Request <Text style={{ fontSize: 12 }}> Date/Time</Text>
                        </Text>
                        <View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                            }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={date.toLocaleString()}
                                    editable={true}
                                />
                                <TouchableOpacity onPress={showDatepicker} style={styles.iconcontainer}>
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPicker && (
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode="datetime"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                {/* FirstMiddleName and last name */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>First & Middle Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.FirstMiddleName}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    FirstMiddleName: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='First & Middle Name '
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Last Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.Datetime}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Datetime: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='LastName'
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
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
                {/* Work Type */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Type
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Work Type'}
                            value={value.WorkType}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkType: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Type Desc
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                            ]}
                            value={value.WorkTypeDesc}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkTypeDesc: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Work Type Description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Work Priority*/}
                <View style={[styles.inputContainer, { alignItems: 'flex-start', justifyContent: 'flex-start', margin: 5 }]}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Priority
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Work Priority'}
                            value={value.WorkPriority}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkPriority: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                </View>
                {/* Loaction Building */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Location
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Location'}
                            value={value.Location}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Location: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Building
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Building'}
                            value={value.Building}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Building: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>
                </View>
                {/* Department */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Department Code
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select DeptCode'}
                            value={value.DepartmentCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    DepartmentCode: item.value, // Update the Employeeid property
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Department Name
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.DepartmentName}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    DepartmentName: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Department Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                
                {/* Cleaning Group*/}
                <View style={[styles.inputContainer, { justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5 }]}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Cleaning Group
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Cleaning Group'}
                            value={value.CleaningGroup}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    CleaningGroup: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                </View>
                {/* Group Description */}
                <View style={styles.inputContainer}>
                    <View style={[styles.singleinputlable]}>
                        <Text style={styles.lableinput}>Group Description
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox, { width: 350 },
                            ]}
                            value={value.GroupDescription}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    GroupDescription: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Describe group description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </View>

                {/* InstructionRemarks */}
                <View style={styles.inputContainer}>
                    <View style={[styles.singleinputlable]}>
                        <Text style={styles.lableinput}>Instruction/Remarks
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox, { width: 350 },
                            ]}
                            value={value.InstructionRemarks}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    InstructionRemarks : item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Describe the cleaning works"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </View>
                {/*Schedule Start Date/time and End Date/time */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Schedule <Text style={{ fontSize: 12 }}>Start Date</Text>
                        </Text>

                        <View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                            }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={dateManufacturer ? dateManufacturer.toLocaleString() : 'dd/mm/yyyy -:- -'} // Show placeholder text if dateEndDatetime is null
                                    editable={true}
                                />
                                <TouchableOpacity onPress={showDatepickerManufacturer} style={styles.iconcontainer}>
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerManufacturer && (
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateManufacturer || new Date()} // Use the existing date or the current date if dateEndDatetime is null
                                        mode="datetime"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeManufacturer}
                                    />
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Schedule <Text style={{ fontSize: 12 }}>End Date</Text>
                        </Text>
                        <View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                            }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={dateEndDatetime ? dateEndDatetime.toLocaleString() : 'dd/mm/yyyy -:- -'} // Show placeholder text if dateEndDatetime is null
                                    editable={true}
                                />
                                <TouchableOpacity onPress={showDatepickerEndDatetime} style={styles.iconcontainer}>
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerEndDatetime && (
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateEndDatetime || new Date()} // Use the existing date or the current date if dateEndDatetime is null
                                        mode="datetime"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeEndDatetime}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                {/* {Work Trade} */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Trade
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Work Trade'}
                            value={value.WorkTrade}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkTrade: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Scheduling Priority
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select sched priority'}
                            value={value.SchedulingPriority}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    SchedulingPriority: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>
                </View>
                {/* Frequency */}
                <View >
                    <Text style={[styles.lableinput, { marginLeft: 5 }]}>Frequency
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <RadioButton.Item
                            label="Daily"
                            value="Daily"
                            status={selectedOption === 'Daily' ? 'checked' : 'unchecked'}
                            onPress={() => handleRadioChange('Daily')}
                            labelStyle={{ color: '#0A2DAA', fontSize: 14, fontWeight: '400' }}
                            style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', ...styles.radiobutton }}
                            labelPosition='right'  // Set the label position to the left

                        />
                        <RadioButton.Item
                            label="Weekly"
                            value="Weekly"
                            status={selectedOption === 'Weekly' ? 'checked' : 'unchecked'}
                            onPress={() => handleRadioChange('Weekly')}
                            style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', ...styles.radiobutton }}
                            labelStyle={{ color: '#0A2DAA', fontSize: 14, fontWeight: '400' }}
                        />
                        <RadioButton.Item
                            label="Monthly"
                            value="Monthly"
                            status={selectedOption === 'Monthly' ? 'checked' : 'unchecked'}
                            onPress={() => handleRadioChange('Monthly')}
                            style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', ...styles.radiobutton }}
                            labelStyle={{ color: '#0A2DAA', fontSize: 14, fontWeight: '400' }}
                        />
                    </View>
                    
                </View>
                {/* Button section */}
                <Button radius={"md"} type="solid" containerStyle={{
                    // width: 400,
                    paddingHorizontal: 12,
                    marginRight: 40,
                    marginBottom: 10,
                    marginTop: 10,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}
                    buttonStyle={{
                        backgroundColor: '#0A2DAA',
                        borderRadius: 3,
                        width: 130
                    }}
                // onPress={() => navigation.navigate('CreateWorkOrderNumber')}
                >
                    <Ionicons name="md-save-outline" size={20} color="white" style={{ marginRight: 12 }} />
                    SAVE
                </Button>
                <Button radius={"md"} type="solid" containerStyle={{
                    width: 350,
                    paddingHorizontal: 12,
                    marginRight: 40,
                    marginBottom: 20,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}
                    buttonStyle={{
                        backgroundColor: '#029B5B',
                        borderRadius: 3,
                    }}
                // onPress={() => navigation.navigate('CreateWorkOrderNumber')}
                >
                    <Ionicons name="document-text-outline" size={23} color="white" style={{ marginRight: 12 }} />
                    GENERATE PM WORK ORDERS
                </Button>

            </View>
        </ScrollView>
    )
}
// Style section
const styles = StyleSheet.create({
    iconcontainer: {
        position: 'absolute',
        left: '86%',
        backgroundColor: 'black',
        padding: 1,
        borderRadius: 5
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#94A0CA'
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
    inputContainer: {
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
        fontWeight: '400',
        lineHeight: 17
    },
    inputBox: {
        width: 170,
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
    outlineIcon: {
        backgroundColor: 'white',
        borderWidth: 1, // You can customize the border properties as needed
        borderRadius: 12, // Adjust the border radius to match the filled icon
        marginRight: 10, // Add spacing between the two icons
    },
    tableborder: {
        width: '99%',
        borderColor: "#94A0CA",
        borderWidth: 1, // Border width
        justifyContent: 'center',
        // marginLeft: 2,
        borderRadius: 5
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
        justifyContent: 'center',
        borderBottomWidth: 0.5
    },
    radiobutton: {
        fontWeight: '400',
        fontSize: 12,
        color: '#0A2DAA'
    }

})

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
];

export default function Createpreventivemaintenance() {
    const [value, setvalue] = useState({
        Employeeid: null, WorkRequestNo:'',
         WorkOrderNumber: '', Datetime: '', RequestStatus: '',
        FailureCode: '', FailureCodeDesc: '', SolutionCode: '', SolutionCodeDesc: '', WorkPriority: '', WorkTrade: '', WorkDescription: '',
        WorkPrority: '', WorkStaus: '', WorkCategory: '', WorkCategoryDesc: '', AssigntoEmployee: '', EmployeeName: '', TotalDays: '0', TotalHours: '0', TotalMinuites: '0', CostofWork: '0',
        CompletedbyEmp: '', ComplateEmployeeName: '',
    })

    const [isFocusedWorkCategoryDesc, setIsFocusedWorkCategoryDesc] = useState(false);
    const [isFocusedWorkDescription, setIsFocusedWorkDescription] = useState(false);
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

    const [dateAppointment, setDateAppointment] = useState(null);
    const [showPickerAppointment, setShowPickerAppointment] = useState(false);
    const onChangeAppointment = (event, selectedDate) => {
        const currentDate = selectedDate || dateAppointment; // Use the existing date if no new date is selected
        setShowPickerAppointment(Platform.OS === 'ios'); // On iOS, the picker is not dismissed automatically
        setDateAppointment(currentDate);
    };

    const showDatepickerAppointment = () => {
        setShowPickerAppointment(true);
    };

    const [dateSchedule, setDateSchedule] = useState(null);
    const [showPickerSchedule, setShowPickerSchedule] = useState(false);
    const onChangeSchedule = (event, selectedDate) => {
        const currentDate = selectedDate || dateSchedule; // Use the existing date if no new date is selected
        setShowPickerSchedule(Platform.OS === 'ios'); // On iOS, the picker is not dismissed automatically
        setDateSchedule(currentDate);
    };

    const showDatepickerSchedule = () => {
        setShowPickerSchedule(true);
    };


    return (

        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View >
                    <Text style={styles.prograp}>Create Preventive  Maintenance
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
                {/* Request Date/Time and Schedule Date/time */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Request <Text style={{ fontSize: 12 }}> Date/Time</Text>
                        </Text>
                        <View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                            }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={dateAppointment ? dateAppointment.toLocaleString() : 'dd/mm/yyyy -:- -'} // Show placeholder text if dateEndDatetime is null
                                    editable={true}
                                />
                                <TouchableOpacity onPress={showDatepickerAppointment} style={styles.iconcontainer}>
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerAppointment && (
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateAppointment || new Date()} // Use the existing date or the current date if dateEndDatetime is null
                                        mode="datetime"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeAppointment}
                                    />
                                </View>
                            )}
                        </View>
                    </View>


                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Schedule <Text style={{ fontSize: 12 }}> Date/Time</Text>
                        </Text>
                        <View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                            }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={dateSchedule ? dateSchedule.toLocaleString() : 'dd/mm/yyyy -:- -'}
                                    editable={true}
                                />
                                <TouchableOpacity onPress={showDatepickerSchedule} style={styles.iconcontainer}>
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerSchedule && (
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateSchedule || new Date()}
                                        mode="datetime"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeSchedule}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                {/* WorkStaus and Work Prority */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Staus
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Work Staus '}
                            value={value.WorkStaus}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkStaus: item.value, // Update the Employeeid property
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Prority
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Work Prority '}
                            searchPlaceholder="Search..."
                            value={value.WorkPrority}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkPrority: item.value, // Update the Employeeid property
                                }));
                            }}
                        />
                    </View>

                </View>
                {/* WorkDescription */}
                <View style={styles.inputContainer}>
                    <View style={[styles.singleinputlable]}>
                        <Text style={styles.lableinput}>Work Description
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox, { width: 350 },
                                { borderColor: isFocusedWorkDescription ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.WorkDescription}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkDescription: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Work Description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedWorkDescription(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedWorkDescription(false);
                            })}
                        />
                    </View>
                </View>
                {/* WorkCategory and WorkCategoryDesc */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Category
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40 }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Work Category'}
                            value={value.WorkCategory}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkCategory: item.value,
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Category Desc.
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedWorkCategoryDesc ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.WorkCategoryDesc}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkCategoryDesc: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Work Category Desc"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedWorkCategoryDesc(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedWorkCategoryDesc(false);
                            })}
                        />
                    </View>

                </View>
                {/* Failure Code */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Failure Code
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
                            placeholder={'Select Failure Code'}
                            value={value.FailureCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    FailureCode: item.value, // Update the Employeeid property
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Failure Code Desc.
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.FailureCodeDesc}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    FailureCodeDesc: item.value,
                                }));
                            }}
                            placeholder="Failure Code Desc."
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Solution Code */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Solution Code
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Solution Code'}
                            value={value.SolutionCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    SolutionCode: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Solution Code Desc
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.SolutionCodeDesc}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    SolutionCodeDesc: item.value,
                                }));
                            }}
                            placeholder="Solution Code Description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Assign to Employee */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Assign to Employee
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Assign to Employee'}
                            search
                            searchPlaceholder='search Employee'
                            value={value.AssigntoEmployee}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    AssigntoEmployee: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.EmployeeName}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    EmployeeName: item.value,
                                }));
                            }}
                            placeholder="Employee Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Appointment and Schedule Date/time */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Appointment <Text style={{ fontSize: 12 }}> Date/Time</Text>
                        </Text>
                        <View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                            }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={dateAppointment ? dateAppointment.toLocaleString() : 'dd/mm/yyyy -:- -'} // Show placeholder text if dateEndDatetime is null
                                    editable={true}
                                />
                                <TouchableOpacity onPress={showDatepickerAppointment} style={styles.iconcontainer}>
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerAppointment && (
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateAppointment || new Date()} // Use the existing date or the current date if dateEndDatetime is null
                                        mode="datetime"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeAppointment}
                                    />
                                </View>
                            )}
                        </View>
                    </View>


                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Schedule <Text style={{ fontSize: 12 }}> Date/Time</Text>
                        </Text>
                        <View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                            }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={dateSchedule ? dateSchedule.toLocaleString() : 'dd/mm/yyyy -:- -'}
                                    editable={true}
                                />
                                <TouchableOpacity onPress={showDatepickerSchedule} style={styles.iconcontainer}>
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerSchedule && (
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateSchedule || new Date()}
                                        mode="datetime"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeSchedule}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                {/* Start Date/time and End Date/time */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Start Date/time
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

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>End Date/time
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
                {/* TotalHours TotalDays */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Total Days
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.TotalDays}
                            onChangeText={text => {
                                if (/^\d+$/.test(text) || text === "") {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        TotalDays: text,
                                    }));
                                }
                            }}
                            placeholder="Total Hours"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric" // Allow only numeric input
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Total Hours
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.TotalHours}
                            onChangeText={text => {
                                if (/^\d+$/.test(text) || text === "") {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        TotalHours: text,
                                    }));
                                }
                            }}
                            placeholder="Total Hours"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric" // Allow only numeric input
                        />
                    </View>

                </View>
                {/* TotalHours TotalDays */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Total Minuites
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.TotalMinuites}
                            onChangeText={text => {
                                if (/^\d+$/.test(text) || text === "") {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        TotalMinuites: text,
                                    }));
                                }
                            }}
                            placeholder="Total Minuites"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric" // Allow only numeric input
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Cost of Work
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.CostofWork}
                            onChangeText={text => {
                                if (/^\d+$/.test(text) || text === "") {
                                    setvalue(prevValue => ({
                                        ...prevValue,
                                        CostofWork: text,
                                    }));
                                }
                            }}
                            placeholder="Total Cost of Work"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric" // Allow only numeric input
                        />
                    </View>

                </View>
                {/* Completed by Emp. */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Completed by Emp.
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Completed by Emp.'}
                            search
                            searchPlaceholder='search Completed by Employee'
                            value={value.CompletedbyEmp}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    CompletedbyEmp: item.value, // Update the Employeeid property
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.Complate}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Complate: item.value,
                                }));
                            }}
                            placeholder="Employee Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Button section */}
                <Button radius={"md"} type="solid" containerStyle={{
                    width: 350,
                    paddingHorizontal: 12,
                    marginRight: 40,
                    marginBottom: 20,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                }}
                // onPress={() => navigation.navigate('CreateWorkOrderNumber')}
                >
                    <Ionicons name="md-save-outline" size={20} color="white" style={{ marginRight: 12 }} />
                    SAVE
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

})

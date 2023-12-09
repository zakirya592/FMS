import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

export default function Createworkorder() {

    const navigation = useNavigation();
    const [value, setvalue] = useState({
        Employeeid: null, WorkOrderNumber: '', Datetime: '', RequestStatus: '',
        FailureCode: '', FailureCodeDesc: '', solutionCode: '', SolutionCodeDesc: '', WorkPriority: '', WorkTrade: '', WorkDescription: '',
        WorkPrority: '', WorkStaus: 'open', WorkCategory: '', WorkCategoryDesc: '', AssigntoEmployee: '', EmployeeName: '', TotalDays: '0', TotalHours: '0', TotalMinuites: '0', CostofWork: '0',
        CompletedbyEmp: '', ComplateEmployeeName: '',
    })
    const [isFocusedWorkCategoryDesc, setIsFocusedWorkCategoryDesc] = useState(false);
    const [isFocusedWorkDescription, setIsFocusedWorkDescription] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    // Dropdown useState
    const [RequestStatusLIST, setRequestStatusLIST] = useState([])
    const [WorkPrioritlist, setWorkPrioritlist] = useState([])
    const [workCategorylist, setworkCategorylist] = useState([])
    const [failureStatusCodelist, setfailureStatusCodelist] = useState([])
    const [solutionCodelist, setsolutionCodelist] = useState([])
    const [EmployeeiddropdownAssigntoEmployee, setEmployeeiddropdownAssigntoEmployee] = useState([])
    const [EmployeeiddropdownCompletedbyEmp, setEmployeeiddropdownCompletedbyEmp] = useState([])
    const [dropdownRequestNumber, setdropdownRequestNumber] = useState([])
    const [dateEndDatetime, setDateEndDatetime] = useState(null);
    const [showPickerEndDatetime, setShowPickerEndDatetime] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
        if (endDate && endDate < currentDate) {
            setDateEndDatetime(currentDate);
        }
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };

    const onChangeEndDatetime = (event, selectedDate) => {
        const currentDate = selectedDate || dateEndDatetime;

        if (date && currentDate < date) {
            setDateEndDatetime(date);
        } else {
            setShowPickerEndDatetime(Platform.OS === 'ios');
            setDateEndDatetime(currentDate);

            // Calculate the time difference in milliseconds
            const timeDifference = currentDate.getTime() - date.getTime();

            // Calculate total days
            const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            // Calculate total hours
            const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
            const minutes = hours * 60
            // Update state with totalDays and totalHours
            setvalue(prevValue => ({
                ...prevValue,
                TotalDays: totalDays.toString(),
                TotalHours: hours.toString(),
                TotalMinuites: minutes.toString()
            }));

        }
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

    // Work Employes ID  Api
    const Requestnumberapi = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                const reqput = res.data.recordset[0].WorkOrderNumber;
                // const reqput=1000
                let formattedRequestNumber;
                if (reqput >= 1 && reqput <= 9) {
                    formattedRequestNumber = `000-000-00${reqput}`;
                } else if (reqput >= 10 && reqput <= 99) {
                    formattedRequestNumber = `000-000-0${reqput}`;
                } else if (reqput >= 100 && reqput <= 999) {
                    formattedRequestNumber = `000-000-${reqput}`;
                } else if (reqput >= 1000 && reqput <= 9999) {
                    formattedRequestNumber = `000-000-${reqput}`;
                } else {
                    formattedRequestNumber = `000-000-${reqput}`;
                }
                // localStorage.setItem('Requestnumbers', reqput)
                setvalue(prevState => ({ ...prevState, WorkOrderNumber: formattedRequestNumber }));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        Requestnumberapi()
    }, [])
    // Dropdown api
    useEffect(() => {
        axios.get('/api/EmployeeID_GET_LIST').then((response) => {
            // const data = response.data.recordset;
            const data = response.data.recordset.map((item) => ({
                labelEmployeeID: `${item.Firstname} (${item.EmployeeID})`, // Customize label as needed
                valueEmployeeID: item.EmployeeID,
                labelEmployeeIDname: item.Firstname
            }));
            setEmployeeiddropdownAssigntoEmployee(data)
            setEmployeeiddropdownCompletedbyEmp(data)
        }).catch((error) => {
            console.log('-----', error);
        });
        axios.get('/api/Filter_WR').then((response) => {
            const data = response.data.recordset.map((item) => ({
                labelRequestNumber: `${item.RequestNumber} (${item.RequestStatus})`, // Customize label as needed
                valueRequestNumber: item.RequestNumber,
                labelEmployeeIDname: item.RequestStatus
            }));
            setdropdownRequestNumber(data)
        }).catch((error) => {
            console.log('-----', error);
        });
        axios.get(`/api/RequestStatus_LIST`).then((res) => {
            setRequestStatusLIST(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/WorkPriority_LIST`).then((res) => {
            setWorkPrioritlist(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/WorkCatagres_GET_CODE_LIST`).then((res) => {
            setworkCategorylist(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/Failure_GET_CODELIST`).then((res) => {
            setfailureStatusCodelist(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/Solution_GET_CODE_LIST`).then((res) => {
            setsolutionCodelist(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
    }, [])
    // WorkCategory 
    const handleProvinceChange = (selectedValue) => {
        setvalue((prevValue) => ({
            ...prevValue,
            WorkCategory: selectedValue.WorkCategoryCode,
        }));
        axios.get(`/api/WorkCatagres_GET_BYID/${selectedValue.WorkCategoryCode}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    WorkCategoryDesc: res.data.recordset[0].WorkCategoryDesc,
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // failureCode
    const handleProvinceChangeFailure = (selectedValue) => {
        const Deptnale = selectedValue.FailureStatusCode;
        setvalue((prevValue) => ({
            ...prevValue,
            FailureCode: Deptnale,
        }));
        axios.get(`/api/Failure_GET_BYID/${Deptnale}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    FailureCodeDesc: res.data.recordset[0].FailureStatusDesc,
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // solutionCode
    const solutionCodeheeandly = (selectedValue) => {
        const Deptnale = selectedValue.SolutiontatusCode;
        setvalue((prevValue) => ({
            ...prevValue,
            solutionCode: Deptnale,
        }));
        axios.get(`/api/Solution_GET_BYID/${Deptnale}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    SolutionCodeDesc: res.data.recordset[0].SolutionStatusDesc,
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const requestincreas = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                const reqput = res.data.recordset[0].WorkOrderNumber + 1;
                axios.put(`/api/WorkOrderNumberCount_Put/1`, {
                    WorkOrderNumber: reqput
                })
                    .then((res) => {
                        const reqput = res.data.recordset[0].WorkOrderNumber + 1;
                        setvalue(prevState => ({ ...prevState, WorkOrderNumber: '000-000-' + '0' + `${reqput}` }));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const Createapi = async () => {
        await axios.post(`/api/WorkOrders_post`, {
            WorkOrderNumber: value.WorkOrderNumber,
            WorkRequestNumber: value.Employeeid,
            WorkStatus: value.WorkStaus,
            WorkPriority: value.WorkPrority,
            WorkCategoryCode: value.WorkCategory,
            WorkDescription: value.WorkDescription,
            FailureCode: value.FailureCode,
            SolutionCode: value.solutionCode,
            AssignedtoEmployeeID: value.AssigntoEmployee,
            AppointmentDateTime: dateAppointment,
            ScheduledDateTime: dateSchedule,
            StartWorkOrderDateTime: date,
            EndWorkOrderDateTime: dateEndDatetime,
            TotalDays: value.TotalDays,
            TotalHours: value.TotalHours,
            TotalMinutes: value.TotalMinuites,
            TotalCostofWork: value.CostofWork,
            CompletedByEmployeeID: value.CompletedbyEmp,
            CompletionDateTime: date.toISOString(),
        },).then((res) => {
                console.log('Add work api first api', res.data);
                navigation.navigate('Workorder')
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const postdatfunction = () => {
        Createapi()
        requestincreas()
    }

    return (

        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View >
                    <Text style={styles.prograp}>Create Work Orders
                    </Text>
                </View>
                {/* Employee ID and Work Request Number */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Order Number
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.WorkOrderNumber}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkOrderNumber: item.value, // Update the Employeeid property
                                }));
                            }}
                            editable={false}
                            placeholder="Work Order Number "
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
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Request No.
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownRequestNumber}
                            search
                            maxHeight={200}
                            labelField="labelRequestNumber"
                            valueField="valueRequestNumber"
                            placeholder={!isFocus ? 'Work Request No' : '...'}
                            searchPlaceholder="Search..."
                            value={value.Employeeid}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Employeeid: item?.valueRequestNumber || '', // Use the correct value key
                                }));
                                setIsFocus(false);
                            }}
                        />
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
                            data={RequestStatusLIST}
                            maxHeight={200}
                            labelField="RequestStatusCode"
                            valueField="RequestStatusCode"
                            placeholder={'Work Staus '}
                            value={value.WorkStaus}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkStaus: item?.RequestStatusCode || '', // Use the correct value key
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
                            data={WorkPrioritlist}
                            maxHeight={200}
                            labelField="WorkPriorityCode"
                            valueField="WorkPriorityCode"
                            placeholder={'Work Prority '}
                            searchPlaceholder="Search..."
                            value={value.WorkPrority}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkPrority: item?.WorkPriorityCode || '', // Update the Employeeid property
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
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkDescription: item, // Update the Employeeid property
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
                            data={workCategorylist}
                            maxHeight={200}
                            labelField="WorkCategoryCode"
                            valueField="WorkCategoryCode"
                            placeholder={'Work Category'}
                            value={value.WorkCategory}
                            onChange={handleProvinceChange}
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
                            editable={false}
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
                            data={failureStatusCodelist}
                            maxHeight={200}
                            labelField="FailureStatusCode"
                            valueField="FailureStatusCode"
                            placeholder={'Select Failure Code'}
                            value={value.FailureCode}
                            onChange={handleProvinceChangeFailure}
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
                            data={solutionCodelist}
                            maxHeight={200}
                            labelField="SolutiontatusCode"
                            valueField="SolutiontatusCode"
                            placeholder={'Select Solution Code'}
                            value={value.solutionCode}
                            onChange={solutionCodeheeandly}

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
                            data={EmployeeiddropdownAssigntoEmployee}
                            maxHeight={200}
                            labelField="labelEmployeeID"
                            valueField="valueEmployeeID"
                            placeholder={'Assign to Employee'}
                            search
                            searchPlaceholder='search Employee'
                            value={value.AssigntoEmployee}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    AssigntoEmployee: item?.valueEmployeeID || '',
                                    EmployeeName: item?.labelEmployeeIDname || '', // Update EmployeeName here
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee Name
                        </Text>
                        <TextInput
                            style={styles.inputBox}
                            value={value.EmployeeName}
                            onChange={text => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    EmployeeName: text,
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
                                    value={dateAppointment ? dateAppointment.toLocaleString() : 'dd/mm/yyyy -:- -'}
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
                                        value={dateAppointment || new Date()}
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
                        <Text style={styles.lableinput}>Start Date/time</Text>

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={date.toLocaleString()}
                                    editable={false}
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
                        <Text style={styles.lableinput}>End Date/time</Text>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={dateEndDatetime ? dateEndDatetime.toLocaleString() : 'dd/mm/yyyy -:- -'}
                                    editable={false}
                                />
                                <TouchableOpacity onPress={showDatepickerEndDatetime} style={styles.iconcontainer}>
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerEndDatetime && (
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateEndDatetime || new Date()} 
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
                {/* Total Minuites CostofWork */}
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
                            data={EmployeeiddropdownCompletedbyEmp}
                            maxHeight={200}
                            labelField="labelEmployeeID"
                            valueField="valueEmployeeID"
                            placeholder={'Completed by Emp.'}
                            search
                            searchPlaceholder='search Completed by Employee'
                            value={value.CompletedbyEmp}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    CompletedbyEmp: item?.valueEmployeeID || '',
                                    ComplateEmployeeName: item?.labelEmployeeIDname || '',
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee Name
                        </Text>
                        <TextInput
                            style={styles.inputBox}
                            value={value.ComplateEmployeeName}
                            onChange={text => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    ComplateEmployeeName: text,
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
                    onPress={postdatfunction}
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

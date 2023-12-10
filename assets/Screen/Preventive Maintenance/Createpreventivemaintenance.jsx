import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import axios from "axios";
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';

export default function Createpreventivemaintenance({ route }) {
    const { myFunction } = route.params
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        Employeeid: null, WorkRequestNo: '',
        WorkOrderNumber: '', Datetime: '', RequestStatus: '', Firstname: '', Middlename: '', Lastname: '',
        AssetCategory: '', Manufacturer: '', Model: '', BuildingCode: '', DepartmentCode: '', DepartmentName: '',
        WorkPriority: '', WorkDescription: '', SchedulingPriority: '',
        WorkPrority: '', WorkStaus: '', AssetType: '', AssetTypeDesc: '', AssigntoEmployee: '', EmployeeName: '',
        CompletedbyEmp: '', ComplateEmployeeName: '',
        LocationCode: '', WorkTypeCode: '', WorkTypeDesc: '', WorkTradeCode: ''
    })

    const [isFocusedAssetTypeDesc, setIsFocusedAssetTypeDesc] = useState(false);
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

    const [dropdownRequestNumber, setdropdownRequestNumber] = useState([])
    const [WorkPrioritlist, setWorkPrioritlist] = useState([])
    const [dropdownBuildingList, setDropdownBuildingList] = useState([]);
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [Employeeiddropdown, setEmployeeiddropdown] = useState([])
    const [dropdownworktypesLIST, setdropdownworktypesLIST] = useState([])
    const [dropdownWorkTradeLIST, setdropdownWorkTradeLIST] = useState([])
    const [schedulingprioritylist, setschedulingprioritylist] = useState([])
    const [assetTypelist, setassetTypelist] = useState([]);

    useEffect(() => {
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
        axios.get(`/api/WorkPriority_LIST`).then((res) => {
            setWorkPrioritlist(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get('/api/EmployeeID_GET_LIST').then((response) => {
            const data = response.data.recordset.map((item) => ({
                labelEmployeeID: `${item.Firstname} (${item.EmployeeID})`,
                valueEmployeeID: item.EmployeeID,
            }));
            setEmployeeiddropdown(data)
        }).catch((error) => {
            console.log('-----', error);
        });
        axios.get(`/api/Building_LIST`).then((res) => {
            setDropdownBuildingList(res.data.recordsets[0]);
        }).catch((err) => {
            console.error(err);
        });
        axios.get(`/api/Location_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/Department_LIST`).then((res) => {
            setdropdownDepartmentLIST(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/WorkType_LIST`).then((res) => {
            setdropdownworktypesLIST(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/SchedPriority_GET_LIST`).then((res) => {
            setschedulingprioritylist(res.data.recordsets[0]);
        }).catch((err) => {
            console.error("Gender API error:", err);
        });
        axios.get(`/api/AssetType_GET_LIST`).then((res) => {
            setassetTypelist(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    // Department
    const handleProvinceChange = (selectedValue) => {
        setvalue((prevValue) => ({
            ...prevValue,
            DepartmentCode: selectedValue.DepartmentCode,
        }));
        axios.get(`/api/Department_desc_LIST/${selectedValue.DepartmentCode}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    DepartmentName: res.data.recordset[0].DepartmentDesc,
                }));
            }).catch((err) => {
                console.log(err);
            });
    }
    // Work types desc
    const Workypesdesc = (selectedValue) => {
        const Deptnale = selectedValue.WorkTypeCode
        setvalue(prevValue => ({
            ...prevValue,
            WorkTypeCode: selectedValue.WorkTypeCode
        }))
        axios.get(`/api/WorkType_descri_LIST/${Deptnale}`).then((res) => {
            setvalue(prevValue => ({
                ...prevValue,
                WorkTypeDesc: res.data.recordset[0].WorkTypeDesc
            }))
        }).catch((err) => {
            console.log(err);
        });
        // WorkTrade_LIST
        axios.get(`/api/WorkTrade_LIST/${Deptnale}`).then((res) => {
            setdropdownWorkTradeLIST(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
    }
    // EmployeeID
    function postapi(EmployeeID) {
        axios.post(`/api/getworkRequest_by_EPID`, {
            EmployeeID,
        }).then((res) => {
            console.log(res.data.recordset);
            const {
                Firstname,
                Middlename,
                Lastname,
                DepartmentCode,
                BuildingCode,
                LocationCode,
            } = res.data.recordsets[0][0];
            setvalue((prevValue) => ({
                ...prevValue,
                Firstname,
                Middlename,
                Lastname,
                DepartmentCode,
                BuildingCode,
                LocationCode,
            }));
            const Depauto = res.data.recordsets[0][0].DepartmentCode
            axios.get(`/api/Department_desc_LIST/${Depauto}`)
                .then((res) => {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        DepartmentName: res.data.recordset[0].DepartmentDesc,
                    }));
                }).catch((err) => {
                    console.log(err);;
                });
        }).catch((err) => {
            console.log(err);
        });
    }
    const handleProvinceChangeassetType = (selectedValue) => {
        const Deptnale = selectedValue.AssetTypeCode;
        setvalue((prevValue) => ({
            ...prevValue,
            AssetType: selectedValue.AssetTypeCode,
        }));
        axios.get(`/api/AssetType_GET_BYID/${Deptnale}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    AssetTypeDesc: res.data.recordset[0].AssetTypeDesc,
                }));
            })
            .catch((err) => {
                console.log(err);;
            });

        axios.get(`/api/AssetType_GET_BYAssetType/${Deptnale}`)
            .then((res) => {
                if (res.data.recordset && res.data.recordset.length > 0) {
                    const responseData = res.data.recordset[0];

                    // Set values in state
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetCategory: responseData.AssetCategory || '',
                        Manufacturer: responseData.Manufacturer || '',
                        Model: responseData.Model || '',
                    }));
                } else {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetCategory: '',
                        Manufacturer: '',
                        Model: '',
                    }));
                }
            })
            .catch((err) => {
                console.log(err);;
            });
    }

    const [showAlert, setShowAlert] = useState(false);

    const showSuccessAlert = () => {
        setShowAlert(true);
    };

    const Createapi = () => {
        axios.post(`/api/PreventiveMaintenance_post`, {
            RequestNumber: value.WorkRequestNo,
            EmployeeID: value.Employeeid,
            RequestDateTime: date,
            WorkType: value.WorkTypeCode,
            WorkPriority: value.WorkPriority,
            AssetItemTagID: value.AssetType,
            DepartmentCode: value.DepartmentCode,
            BuildingCode: value.BuildingCode,
            LocationCode: value.LocationCode,
            MaintenanceDescription: value.WorkDescription,
            Frequency: selectedOption,
            ScheduleStartDateTime: dateManufacturer,
            ScheduleEndDateTime: dateEndDatetime,
            SchedulingPriority: value.SchedulingPriority,
        }).then((res) => {
            myFunction()
            showSuccessAlert(true)
        }).catch((err) => {
        });
    };

    return (

        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View >
                    <Text style={styles.prograp}>Create Preventive Maintenance</Text>
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
                            data={Employeeiddropdown}
                            search
                            maxHeight={200}
                            labelField="labelEmployeeID"
                            valueField="valueEmployeeID"
                            placeholder='Employee Number'
                            searchPlaceholder="Search..."
                            value={value.Employeeid}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Employeeid: item?.valueEmployeeID || '',
                                }));
                                postapi(item?.valueEmployeeID || '');

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
                            data={dropdownRequestNumber}
                            maxHeight={200}
                            labelField="labelRequestNumber"
                            valueField="valueRequestNumber"
                            placeholder='Work Request No'
                            value={value.WorkRequestNo}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkRequestNo: item?.valueRequestNumber || '',
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
                {/* FirstName and MiddleName */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>First Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.Firstname}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Firstname: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='First & Middle Name '
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Middle Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.Middlename}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Middlename: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='Middle Name'
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"

                        />
                    </View>

                </View>
                {/* Work Priority* and last name */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Last Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.Lastname}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Lastname: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder='Last Name'
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
                        <Text style={styles.lableinput}>Work Priority
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={WorkPrioritlist}
                            maxHeight={200}
                            labelField="WorkPriorityCode"
                            valueField="WorkPriorityCode"
                            placeholder={'Select Work Priority'}
                            value={value.WorkPriority}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkPriority: item?.WorkPriorityCode || '',
                                }));
                            }}

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
                            data={dropdownworktypesLIST}
                            maxHeight={200}
                            labelField="WorkTypeCode"
                            valueField="WorkTypeCode"
                            placeholder={'Select Work Type'}
                            value={value.WorkTypeCode}
                            onChange={Workypesdesc}

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
                {/* Asset Type and AssetTypeDesc */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Asset Type
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40 }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={assetTypelist}
                            maxHeight={200}
                            labelField="AssetTypeCode"
                            valueField="AssetTypeCode"
                            placeholder={'Asset Type'}
                            value={value.AssetType}
                            onChange={handleProvinceChangeassetType}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Asset Type Desc.
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedAssetTypeDesc ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.AssetTypeDesc}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    AssetTypeDesc: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Asset Type Desc."
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedAssetTypeDesc(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedAssetTypeDesc(false);
                            })}
                        />
                    </View>

                </View>
                {/* Asset Category Manufacturer */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Asset Category
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.AssetCategory}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    AssetCategory: item.value,
                                }));
                            }}
                            placeholder="Asset Category"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Manufacturer
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.Manufacturer}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Manufacturer: item.value,
                                }));
                            }}
                            placeholder="Manufacturer"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Model Building */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Model
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox
                            ]}
                            value={value.Model}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Model: item.value,
                                }));
                            }}
                            placeholder="Model"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
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
                            data={dropdownBuildingList}
                            maxHeight={200}
                            labelField="BuildingCode"
                            valueField="BuildingCode"
                            placeholder={'Select Building'}
                            value={value.BuildingCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    BuildingCode: item?.BuildingCode || '',
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
                            data={dropdownDepartmentLIST}
                            maxHeight={200}
                            labelField="DepartmentCode"
                            valueField="DepartmentCode"
                            placeholder={'Select DeptCode'}
                            value={value.DepartmentCode}
                            onChange={handleProvinceChange}
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
                {/* Warranty Period and Warrantyenddata Date/time */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Warranty Period
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
                        <Text style={styles.lableinput}>Warranty <Text style={{ fontSize: 12 }}>End Date</Text>
                        </Text>
                        <View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                            }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative', }]}
                                    value={dateWarrantyenddata ? dateWarrantyenddata.toLocaleString() : 'dd/mm/yyyy -:- -'}
                                    editable={true}
                                />
                                <TouchableOpacity onPress={showDatepickerWarrantyenddata} style={styles.iconcontainer}>
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerWarrantyenddata && (
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateWarrantyenddata || new Date()}
                                        mode="datetime"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeWarrantyenddata}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                {/* Location*/}
                <View style={[styles.inputContainer, { justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5 }]}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Location
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownLocation}
                            maxHeight={200}
                            labelField="LocationCode"
                            valueField="LocationCode"
                            placeholder={'Select Location'}
                            value={value.LocationCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    LocationCode: item?.value || '',
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
                            ]}
                            value={value.WorkDescription}
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkDescription: item, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Describe the nature of the Proplem"
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
                {/* {Work Trade} Scheduling Priority*/}
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
                            data={dropdownWorkTradeLIST}
                            maxHeight={200}
                            labelField="WorkTradeCode"
                            valueField="WorkTradeCode"
                            placeholder={'Select Work Trade'}
                            value={value.WorkTradeCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkTradeCode: item?.value || '',
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
                            data={schedulingprioritylist}
                            maxHeight={200}
                            labelField="SchedPriorityCode"
                            valueField="SchedPriorityCode"
                            placeholder={'Select sched priority'}
                            value={value.SchedulingPriority}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    SchedulingPriority: item?.SchedPriorityCode || '',
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
                    <View style={{ flexDirection: 'row' }}>

                        <RadioButton.Item
                            label="Bi-Monthly"
                            value="Bi-Monthly"
                            status={selectedOption === 'Bi-Monthly' ? 'checked' : 'unchecked'}
                            onPress={() => handleRadioChange('Bi-Monthly')}
                            style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', ...styles.radiobutton }}
                            labelStyle={{ color: '#0A2DAA', fontSize: 14, fontWeight: '400' }}
                        />

                        <RadioButton.Item
                            label="Quarterly"
                            value="Quarterly"
                            status={selectedOption === 'Quarterly' ? 'checked' : 'unchecked'}
                            onPress={() => handleRadioChange('Quarterly')}
                            labelStyle={{ color: '#0A2DAA', fontSize: 14, fontWeight: '400' }}
                            style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', ...styles.radiobutton }}
                        />

                        <RadioButton.Item
                            label="Yearly"
                            value="Yearly"
                            status={selectedOption === 'Yearly' ? 'checked' : 'unchecked'}
                            onPress={() => handleRadioChange('Yearly')}
                            labelStyle={{ color: '#0A2DAA', fontSize: 14, fontWeight: '400' }}
                            style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', ...styles.radiobutton }}
                        />
                    </View>
                </View>
                {/* Button section */}
                <Button radius={"md"} type="solid" containerStyle={{
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
                    onPress={Createapi}
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

                <AwesomeAlert
                    show={showAlert}
                    title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="ios-checkmark-circle" size={30} color="#4CAF50" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Success</Text>
                        </View>
                    }
                    message={`Preventive ${value.WorkRequestNo} has been created successfully`}
                    confirmButtonColor="#DD6B55"
                    confirmButtonStyle={{ backgroundColor: 'black' }}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    onConfirmPressed={() => {
                        navigation.navigate('Preventivemaintenance')
                        myFunction()
                    }}
                />

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

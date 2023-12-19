import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Icon, Dialog } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import PhoneInput from "react-native-phone-number-input";
import { DataTable } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AwesomeAlert from 'react-native-awesome-alerts';


export default function Viewworkrequest({ route }) {
    const { EmployeeIDS } = route.params
    const { RequestNumber } = route.params
    const navigation = useNavigation();

    const [value, setvalue] = useState({
        Employeeid: null, RequestNumber: '', Datetime: '', RequestStatus: '', Middlename: '', Lastname: '', Firstname: '',
        DepartmentCode: '', DepartmentName: '', WorkTypeCode: '', WorkTypeDesc: '', WorkPriority: '', WorkTrade: '', WorkTradeDesc: '',
        BuildingCode: '', LocationCode: '', MobileNumber: '', LandlineNumber: ''
    })

    const [isFocusedDepartmentName, setIsFocusedDepartmentName] = useState(false);
    const [isFocusedWorkTradeDesc, setIsFocusedWorkTradeDesc] = useState(false);
    const [isFocusedWorkTypeDesc, setIsFocusedWorkTypeDesc] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [isFocusRequestStatus, setIsFocusRequestStatus] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };

    const [items, setItems] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (_id) => {
        const updatedItems = items.map((item) =>
            item._id === _id ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item._id);
        setSelectedItems(selectedIds);
    };

    const handleSelectAllChange = () => {
        const allSelected = items.every((item) => item.selected);
        const updatedItems = items.map((item) => ({
            ...item,
            selected: !allSelected,
        }));
        setItems(updatedItems);
        const selectedIds = updatedItems.filter((item) => item.selected).map((item) => item._id);
        setSelectedItems(selectedIds);
    };

    const [WorkPrioritlist, setWorkPrioritlist] = useState([])
    const [dropdownBuildingList, setDropdownBuildingList] = useState([]);
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [Employeeiddropdown, setEmployeeiddropdown] = useState([])
    const [dropdownworktypesLIST, setdropdownworktypesLIST] = useState([])
    const [dropdownWorkTradeLIST, setdropdownWorkTradeLIST] = useState([])
    const [RequestStatusLIST, setRequestStatusLIST] = useState([])

    useEffect(() => {
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
        axios.get(`/api/RequestStatus_LIST`).then((res) => {
            setRequestStatusLIST(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
    }, [])
    // EmployeeID
    function postapi(EmployeeID) {
        axios.post(`/api/getworkRequest_by_EPID`, {
            EmployeeID,
        }).then((res) => {
            const {
                Firstname,
                Middlename,
                Lastname,
                DepartmentCode,
                BuildingCode,
                LocationCode,
                LandlineNumber,
            } = res.data.recordsets[0][0];
            setvalue((prevValue) => ({
                ...prevValue,
                Firstname,
                Middlename,
                Lastname,
                DepartmentCode,
                BuildingCode,
                LocationCode,
                MobileNumber: res.data.recordsets[0][0].MobileNumber || '',
                LandlineNumber
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
    const Worktrandedesc = (selectedValue) => {
        setvalue(prevValue => ({
            ...prevValue,
            WorkTrade: selectedValue.WorkTradeCode
        }))
        axios.get(`/api/WorkTrade_descri_LIST/${selectedValue.WorkTradeCode}`)
            .then((res) => {
                setvalue(prevValue => ({
                    ...prevValue,
                    WorkTradeDesc: res.data.recordset[0].WorkTradeDesc
                }))
            }).catch((err) => {
                console.log(err);
            });
    }

    const [datanumber, setdatanumber] = useState([])

    const getapi = () => {
        axios.get(`/api/assetworkrequest_GET_BYID/${RequestNumber}`)
            .then((res) => {
                const SAQ = res.data.recordset.map((item) => item.seq);
                const AssetItemDescriptionsss = res.data.recordset.map((item) => item.AssetItemDescription);
                const promises = res.data.recordset.map((item) => {
                    const itid = item.AssetItemDescription;
                    return axios.get(`/api/tblAssetsMaster_GET_BYID/${itid}`).then((res) => {
                        return {
                            item,
                            data: res.data.recordset,
                        };
                    }).catch((err) => {
                        console.log(err);
                        return {
                            item,
                            data: null
                        };
                    });
                });

                const promisesNumber = res.data.recordset.map((item) => {
                    const itid = item.AssetItemDescription;
                    return axios.get(`/api/AssetTransactions_GET_ItemDescription/${itid}`)
                        .then((res) => {
                            return {
                                item,
                                data: res.data.recordset,
                            };
                        }).catch((err) => {
                            console.log(err);
                            return {
                                item,
                                data: []
                            };
                        });
                });

                Promise.all([Promise.all(promises), Promise.all(promisesNumber)])
                    .then(([results1, results2]) => {
                        results1.forEach((itemRecords, index) => {
                            const recordsWithDescriptions = AssetItemDescriptionsss.map((description, index) => ({
                                description: description,
                                records: results1[index],
                                saq: SAQ[index],
                            }));
                            const recordsWithSAQ = SAQ.map((saq, index) => ({
                                saq: SAQ[index],
                                records: results1[index],
                            }));
                            setItems(recordsWithDescriptions, recordsWithSAQ);
                        });
                        results2.forEach((itemRecords, index) => {
                            const assetItemTagID = AssetItemDescriptionsss.map((assetItemTagID, index) => ({
                                assetItemTagID: assetItemTagID,
                                records: results2[index],
                                saq: SAQ[index],
                            }));
                            setdatanumber(assetItemTagID);
                        });

                    });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])
    const countDuplicates = (array, key) => {
        const counts = {};
        array.forEach(item => {
            const value = item[key];
            counts[value] = (counts[value] || 0) + 1;
        });
        return counts;
    };
    const duplicatesCount = countDuplicates(items, 'description');
    const uniqueDescriptions = Array.from(new Set(items.map(row => row.description)));
    // Deleting api
    const [visible2, setVisible2] = useState(false);
    const [deleteItemCode, setDeleteItemCode] = useState('');

    const toggleDialog2 = (ASQS) => {
        setDeleteItemCode(ASQS);
        setVisible2(!visible2);
    };
    const [showAlert, setShowAlert] = useState(false);
    const showSuccessAlert = () => {
        setShowAlert(true);
    };

    const Deletedapi = (ASQS) => {
        axios.delete(`/api/assetworkrequest_DELETE_BYID/${ASQS}`)
            .then((res) => {
                setVisible2(false);
                getapi()
                showSuccessAlert(true)
            })
            .catch((err) => {
                console.log('Error deleting', err);
            });
    }

    function Workrequestget() {
        axios.post(`/api/getworkRequestsecond`, {
            "RequestNumber": RequestNumber
        }).then((res) => {
            const {
                RequestNumber,
                WorkPriority,
                ProblemDescription,
                RequestStatus,
                ProblemCategory,
                AssetItemTagID,
                EmployeeID,
            } = res.data.recordsets[0][0];
            setvalue((prevValue) => ({
                ...prevValue,
                EmployeeID,
                WorkTrade: res.data.recordsets[0][0].WorkTrade,
                WorkPriority,
                ProblemDescription,
                RequestStatus,
                ProblemCategory,
                AssetItemTagID,
                RequestNumber,
                WorkTypeCode: res.data.recordsets[0][0].WorkType
            }));
            const RequestDateTimeess = res.data.recordset[0].RequestDateTime
            setDate(new Date(RequestDateTimeess))
            const workaout = res.data.recordsets[0][0].WorkType
            axios.get(`/api/WorkType_descri_LIST/${workaout}`)
                .then((res) => {
                    if (res.data.recordset && res.data.recordset.length > 0 && res.data.recordset[0].WorkTypeDesc) {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            WorkTypeDesc: res.data.recordset[0].WorkTypeDesc,
                        }));
                    } else {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            WorkTypeDesc: '',
                        }));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            const workaouts = res.data.recordsets[0][0].WorkTrade
            axios.get(`/api/WorkTrade_descri_LIST/${workaouts}`)
                .then((res) => {
                    const workTradeDesc = res.data.recordset[0]?.WorkTradeDesc || ''; // Default to empty string if undefined
                    setvalue(prevValue => ({
                        ...prevValue,
                        WorkTradeDesc: workTradeDesc
                    }));
                })
                .catch((err) => {
                    console.log(err);
                });
            // Employee ID
            const employees = res.data.recordsets[0][0].EmployeeID
            axios.post(`/api/getworkRequest`, {
                "EmployeeID": employees
            }).then((res) => {
                const {
                    Firstname,
                    Lastname,
                    Middlename,
                    MobileNumber,
                    LandlineNumber,
                    DepartmentCode,
                    BuildingCode,
                    LocationCode,
                } = res.data.recordsets[0][0];

                setvalue((prevValue) => ({
                    ...prevValue,
                    Employeeid: res.data.recordsets[0][0].EmployeeID,
                    Firstname,
                    Lastname,
                    Middlename,
                    MobileNumber,
                    LandlineNumber,
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
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        Workrequestget()
    }, [])

    return (

        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View >
                    <Text style={styles.prograp}>View Work Request</Text>
                </View>
                {/* Employee ID and Work Request Number */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee ID
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={Employeeiddropdown}
                            search
                            maxHeight={200}
                            labelField="labelEmployeeID"
                            valueField="valueEmployeeID"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value.Employeeid}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Employeeid: item?.valueEmployeeID || '',
                                }));
                                setIsFocus(false);
                                postapi(item?.valueEmployeeID || '');
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Request#</Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={RequestNumber}
                            editable={false}
                            placeholder="Work Request #"
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
                {/* Time date and Request status */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Request Date/Time*
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
                        <Text style={styles.lableinput}>Request Status
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }, isFocusRequestStatus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={RequestStatusLIST}
                            maxHeight={200}
                            labelField="RequestStatusCode"
                            valueField="RequestStatusCode"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value.RequestStatus}
                            onFocus={() => setIsFocusRequestStatus(true)}
                            onBlur={() => setIsFocusRequestStatus(false)}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    RequestStatus: item?.RequestStatusCode || '',
                                }));
                                setIsFocusRequestStatus(false);
                            }}

                        />
                    </View>

                </View>
                {/* FirstMiddleName and last name */}
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
                            placeholder='First  Name '
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Middle Name
                        </Text>
                        <TextInput
                            style={[styles.inputBox]}
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
                {/* last name */}
                <View style={[styles.inputContainer, { justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5 }]}>
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



                </View>
                {/* Landline  Mobile Number */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Mobile Number
                        </Text>
                        <PhoneInput
                            defaultCode="US"
                            layout="first"
                            value={value.MobileNumber}
                            onChange={(item) => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    MobileNumber: item?.value || '',
                                }));
                            }}
                            containerStyle={{ height: 40, borderRadius: 5, borderColor: "#94A0CA", borderWidth: 1, color: '94A0CA', width: 170 }}
                            textInputStyle={{ height: 25, padding: 1, fontSize: 12 }}
                            codeTextStyle={{ height: 20, display: 'none' }}
                            flagButtonStyle={{ paddingHorizontal: 24, }}
                            countryPickerButtonStyle={{ padding: 1, width: 5 }}
                        />
                    </View>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Landline
                        </Text>
                        <PhoneInput
                            defaultCode="US"
                            layout="first"
                            value={value.LandlineNumber}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    LandlineNumber: item.value, // Update the Employeeid property
                                }));
                            }}
                            containerStyle={{ height: 40, borderRadius: 5, borderColor: "#94A0CA", borderWidth: 1, color: '94A0CA', width: 170 }}
                            textInputStyle={{ height: 25, padding: 1, width: '100%', fontSize: 12 }}
                            codeTextStyle={{ height: 20, display: 'none' }}
                            flagButtonStyle={{ paddingHorizontal: 24, }}
                            countryPickerButtonStyle={{ padding: 1, width: 5 }}
                        />
                    </View>

                </View>
                {/* Building and Location*/}
                <View style={styles.inputContainer}>

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
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedDepartmentName ? '#1D3A9F' : '#94A0CA' },
                            ]}
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
                            onFocus={(() => {
                                setIsFocusedDepartmentName(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedDepartmentName(false);
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
                                { borderColor: isFocusedWorkTypeDesc ? '#1D3A9F' : '#94A0CA' },
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
                            onFocus={(() => {
                                setIsFocusedWorkTypeDesc(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedWorkTypeDesc(false);
                            })}
                        />
                    </View>

                </View>
                {/* Work Priority and Work Trade*/}
                <View style={styles.inputContainer}>

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
                            value={value.WorkTrade}
                            onChange={Worktrandedesc}
                        />
                    </View>


                </View>
                {/* Work Trade Desc and Add asset button */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Work Trade Desc
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedWorkTradeDesc ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.WorkTradeDesc}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    WorkTradeDesc: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Work Trade Desc"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setIsFocusedWorkTradeDesc(true);
                            })}
                            onBlur={(() => {
                                setIsFocusedWorkTradeDesc(false);
                            })}
                        />
                    </View>

                    <Button radius={"md"} type="solid" containerStyle={{
                        width: 150,
                        marginVertical: 10,
                        marginTop: 30
                    }}
                    disabled
                    >
                        <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
                        Asset code
                    </Button>

                </View>
                {/* Table section */}
                <View style={[{ height: 300, marginBottom: 40 }]}>
                    <ScrollView horizontal >
                        <DataTable style={[styles.item, {
                            width: '100%', height: 450, margin: 0
                        }]} >
                            <DataTable.Header>
                                <DataTable.Title style={[styles.header, { width: 50, borderTopLeftRadius: 5 }]}><Text style={styles.tableHeading}>
                                    <Checkbox
                                        status={selectedItems.length === items.length ? 'checked' : 'unchecked'}
                                        onPress={handleSelectAllChange}
                                    /></Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 180 }]} ><Text style={styles.tableHeading}>ASSET/STOCK NUMBER</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 150 }]} ><Text style={styles.tableHeading}>ASSET ITEM GROUP</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 200 }]}><Text style={styles.tableHeading}>ASSET ITEM DESCRIPTION</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 140 }]}><Text style={styles.tableHeading}>ASSET QTY</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 140 }]} ><Text style={styles.tableHeading}>MODEL</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 170 }]} ><Text style={styles.tableHeading}>MONIFACTURER</Text></DataTable.Title>
                                <DataTable.Title style={[styles.header, { width: 140, borderRightWidth: 1, borderTopRightRadius: 5 }]} ><Text style={styles.tableHeading}>ACTIONS</Text></DataTable.Title>
                            </DataTable.Header>
                            {uniqueDescriptions.map((item, index) => (
                                <DataTable.Row key={item}>
                                    <DataTable.Cell style={[styles.tablebody, { width: 50 }]} >
                                        <Checkbox
                                            status={item.selected ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange(item)}
                                        />
                                    </DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 180 }]}>{datanumber[index]?.records?.data[0]?.AssetItemTagID || ""}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 150 }]}>{items[index].records ? items[index].records.data[0].AssetItemGroup : ''}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 200 }]}>{item}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{duplicatesCount[item] || 0}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140 }]}>{items[index].records ? items[index].records.data[0].Model : ''}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 170 }]}>{items[index].records ? items[index].records.data[0].Manufacturer : ''}</DataTable.Cell>
                                    <DataTable.Cell style={[styles.tablebody, { width: 140, textAlign: 'center', justifyContent: 'center', }]}><TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: 'aut' }}
                                        onPress={() => {
                                            const ASQS = items[index]?.records.item.seq
                                            // items[index]?.records?.data[0]?.saq
                                            toggleDialog2(ASQS)
                                        }}
                                    >
                                        <Text>Delete</Text>
                                        <MaterialIcons name="delete" size={20} color="black" />
                                    </TouchableOpacity>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}

                        </DataTable>
                    </ScrollView>
                </View>
                {/* Button section */}
               
                <View style={[styles.inputContainerbutton, { marginTop: 12 }]}>
                    <Button radius={"md"} type="solid"
                        onPress={() => { navigation.goBack() }}
                    >
                        <Ionicons name="arrow-back-circle" size={20} color="white" style={{ marginRight: 12 }}  />
                        Back
                    </Button>
                    <Button radius={"md"} type="outline"
                    // onPress={() => navigation.navigate('Createworkrequest')}
                    >
                        <Ionicons name="md-print-outline" size={20} color="#0A2DAA" style={{ marginRight: 12 }} />
                        Print
                    </Button>
                </View>
                {/* Deleted  Dialog*/}
                <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
                    <Dialog.Title title="Are you sure?" />
                    <Text>{`You want to delete this AssetCode`}</Text>
                    <Dialog.Actions >
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Dialog.Button onPress={() => setVisible2(!visible2)} ><Text style={{ backgroundColor: '#198754', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>No, cancel!</Text></Dialog.Button>
                            <Dialog.Button onPress={() => Deletedapi(deleteItemCode)} ><Text style={{ backgroundColor: '#EF643B', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, color: 'white', fontSize: 14 }}>Yes, delete it!</Text></Dialog.Button>
                        </View>
                    </Dialog.Actions>
                </Dialog>
                {/* Pop message */}
                <AwesomeAlert
                    show={showAlert}
                    title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="delete" color="red" size={20} style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Deleted!</Text>
                        </View>
                    }
                    message={`Asset Code has been deleted.`}
                    confirmButtonColor="#DD6B55"
                    confirmButtonStyle={{ backgroundColor: 'black' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showConfirmButton={true}
                    confirmText="OK"
                    onConfirmPressed={() => {
                        setShowAlert(false)
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
    inputContainerbutton: {
        flexDirection: 'row',
        paddingBottom: 5,
        marginBottom: 10,
        justifyContent: 'space-between',
        marginHorizontal:15,
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
        borderWidth: 1,
        fontSize: 14,
        color: 'black',
        marginVertical: 9,
        paddingVertical: 5,
        backgroundColor: '#FFFFFF',
    },
    outlineIcon: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        marginRight: 10,
    },
    tableborder: {
        width: '99%',
        borderColor: "#94A0CA",
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 5
    },
    header: {
        textAlign: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
    },
    tableHeading: {
        color: '#1E3B8B',
        fontWeight: 'bold',
        fontSize: 14
    },
    tablebody: {
        borderColor: "##9384EB",
        borderWidth: 0.5,
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5
    },

})

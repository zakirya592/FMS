import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '@rneui/themed';
import { Ionicons, } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';

export default function Updateemployeeroomtransfer({ route }) {
    const { myFunction } = route.params
    const { TransferRequestNumber } = route.params
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        LocationCode: '', LocationDesc: '', TransferRequestNumber: '',
        RoomCode: '', RoomName: '', BuildingCode: '', BuildingDesc: '', AreaTable: '', FloorCode: '',
        EmployeeNumber: '', EmployeeName: '',
        TransferRoomCode: '', RoomName2: '', BuildingCode2: '', BuildingDesc2: '', AreaTable2: '', FloorCode2: '',
        Level2ndEmpCode: '', Level2ndEmpCodeEmployeeName: '', Flag2nd: '',
        Level1stEmpCode: '', Level1stEmpCodeEmployeeName: '', Flag1st: '',
        Level3rdEmpCode: '', Level3rdEmpCodeEmployeeName: '', Flag3rd: '',
    });
    const [isFocusedRoomCode, setIsFocusedRoomCode] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    // Image section
    const [image, setImage] = useState(require('./../../Image/RoomMaintence.png'));
    // Api section dropdown
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownFloor, setdropdownFloor] = useState([])
    const [EmployeeiddropdownEmployeeNumber, setEmployeeiddropdownEmployeeNumber] = useState([])
    const [dropdownRoomLIST, setdropdownRoomLIST] = useState([])
    const [EmployeeiddropdownLevel1stEmpCode, setEmployeeiddropdownLevel1stEmpCode] = useState([])
    const [EmployeeiddropdownLevel2ndEmpCode, setEmployeeiddropdownLevel2ndEmpCode] = useState([])
    const [EmployeeiddropdownLevel3rdEmpCode, setEmployeeiddropdownLevel3rdEmpCode] = useState([])
    useEffect(() => {
        axios.get('/api/EmployeeID_GET_LIST').then((response) => {
            const data = response.data.recordset.map((item) => ({
                labelEmployeeID: `${item.Firstname} (${item.EmployeeID})`,
                valueEmployeeID: item.EmployeeID,
                labelEmployeeIDname: item.Firstname
            }));
            const datas = response.data.recordset.map((item) => ({
                labelEmployeeID: `${item.Firstname} (${item.EmployeeID})`,
                valueEmployeeID: item.EmployeeID,
                labelEmployeeIDname: item.Firstname
            }));
            setEmployeeiddropdownEmployeeNumber(data)
            setEmployeeiddropdownLevel1stEmpCode(datas)
            setEmployeeiddropdownLevel2ndEmpCode(data)
            setEmployeeiddropdownLevel3rdEmpCode(data)
        }).catch((error) => {
            console.log('-----', error);
        });
        // Building_LIST
        axios.get(`/api/Building_GET_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        // Floor
        axios.get(`/api/Floor_GET_List`).then((res) => {
            setdropdownFloor(res.data.data)
        }).catch((err) => {
            console.log(err);
        });
        // Room list
        axios.get(`/api/Rooms_newpage_GET_List`).then((res) => {
            setdropdownRoomLIST(res.data.data)
        }).catch((err) => {
            console.log(err);
        });

    }, [])

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };
    // Approval1stDate
    const [Approval1stDate, setApproval1stDate] = useState(null);
    const [showPickerApproval1stDate, setShowPickerApproval1stDate] = useState(false);
    const onChangeApproval1stDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPickerApproval1stDate(Platform.OS === 'ios');
        setApproval1stDate(currentDate);
    };
    const showDatepickerApproval1stDate = () => {
        setShowPickerApproval1stDate(true);
    };
    // Approval2ndDate
    const [Approval2ndDate, setApproval2ndDate] = useState(null);
    const [showPickerApproval2ndDate, setShowPickerApproval2ndDate] = useState(false);
    const onChangeApproval2ndDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPickerApproval2ndDate(Platform.OS === 'ios');
        setApproval2ndDate(currentDate);
    };
    const showDatepickerApproval2ndDate = () => {
        setShowPickerApproval2ndDate(true);
    };

    // Approval3rdDate
    const [Approval3rdDate, setApproval3rdDate] = useState(null);
    const [showPickerApproval3rdDate, setShowPickerApproval3rdDate] = useState(false);
    const onChangeApproval3rdDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPickerApproval3rdDate(Platform.OS === 'ios');
        setApproval3rdDate(currentDate);
    };
    const showDatepickerApproval3rdDate = () => {
        setShowPickerApproval3rdDate(true);
    };

    const handleProvinceChangeBuildingCode = (selectedValue) => {
        const Deptnale = selectedValue.BuildingCode;
        setvalue((prevValue) => ({
            ...prevValue,
            BuildingCode: Deptnale,
        }));
        axios.get(`/api/Building_GET_BYID/${Deptnale}`)
            .then((res) => {
                const apiImage = res.data.recordset[0].BuildingImage;
                if (apiImage) {
                    setImage({ uri: apiImage });
                } else {
                    setImage(require('./../../Image/RoomMaintence.png'));
                }
                if (res.data.recordset && res.data.recordset.length > 0) {
                    const responseData = res.data.recordset[0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        BuildingDesc: responseData.BuildingDesc || '',
                        LocationCode: responseData.LocationCode || '',
                    }));
                    const loactioncaodee = res.data.recordset[0].LocationCode
                    axios.get(`/api/Location_GET_BYID/${loactioncaodee}`)
                        .then((res) => {
                            if (res.data.recordset && res.data.recordset.length > 0) {
                                const responseData = res.data.recordset[0];
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    LocationDesc: responseData.LocationDesc || '',
                                }));
                            } else {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    LocationDesc: '',
                                }));

                            }
                        }).catch((err) => {
                            console.log(err);;
                        });
                } else {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        BuildingDesc: '',
                    }));

                }
            })
            .catch((err) => {
                console.log(err);;
            });
    }
    const handleProvinceChangeBuildingCode2 = (selectedValue) => {
        const Deptnale = selectedValue.BuildingCode;
        setvalue((prevValue) => ({
            ...prevValue,
            BuildingCode2: Deptnale,
        }));
        axios.get(`/api/Building_GET_BYID/${Deptnale}`)
            .then((res) => {
                if (res.data.recordset && res.data.recordset.length > 0) {
                    const responseData = res.data.recordset[0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        BuildingDesc2: responseData.BuildingDesc || '',
                    }));
                } else {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        BuildingDesc2: '',
                    }));

                }
            })
            .catch((err) => {
                console.log(err);;
            });
    }

    const RoomCodehandleProvinceChange = (selectedValue) => {
        const Deptnale = selectedValue.RoomCode
        setvalue((prevValue) => ({
            ...prevValue,
            RoomCode: Deptnale,
        }));

        axios.get(`/api/Rooms_newpage_GET_BYID/${Deptnale}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    RoomName: res.data.data[0].RoomDesc,
                    AreaTable: res.data.data[0].Area,
                    FloorCode: res.data.data[0].FloorCode,
                    BuildingCode: res.data.data[0].BuildingCode,
                }));

                const RoomCodes = res.data.data[0].BuildingCode
                axios.get(`/api/Building_GET_BYID/${RoomCodes}`)
                    .then((res) => {
                        const apiImage = res.data.recordset[0].BuildingImage;
                        if (apiImage) {
                            setImage({ uri: apiImage });
                        } else {
                            setImage(require('./../../Image/RoomMaintence.png'));
                        }
                        if (res.data.recordset && res.data.recordset.length > 0) {
                            const responseData = res.data.recordset[0];
                            setvalue((prevValue) => ({
                                ...prevValue,
                                BuildingDesc: responseData.BuildingDesc || '',
                            }));
                        } else {
                            setvalue((prevValue) => ({
                                ...prevValue,
                                BuildingDesc: '',
                            }));

                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    const RoomCodehandleProvinceChangeTransferRoomCode = (selectedValue) => {
        const Deptnale = selectedValue.RoomCode
        setvalue((prevValue) => ({
            ...prevValue,
            TransferRoomCode: Deptnale,
        }));

        axios.get(`/api/Rooms_newpage_GET_BYID/${Deptnale}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    RoomName2: res.data.data[0].RoomDesc,
                    AreaTable2: res.data.data[0].Area,
                    FloorCode2: res.data.data[0].FloorCode,
                    BuildingCode2: res.data.data[0].BuildingCode,
                }));

                const RoomCodes = res.data.data[0].BuildingCode
                axios.get(`/api/Building_GET_BYID/${RoomCodes}`)
                    .then((res) => {
                        if (res.data.recordset && res.data.recordset.length > 0) {
                            const responseData = res.data.recordset[0];
                            setvalue((prevValue) => ({
                                ...prevValue,
                                BuildingDesc2: responseData.BuildingDesc || '',
                            }));
                        } else {
                            setvalue((prevValue) => ({
                                ...prevValue,
                                BuildingDesc2: '',
                            }));

                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                // console.log(err);;
            });
    }

    const getapi = () => {
        axios.get(`/api/EmployeeRoomTransfers_GET_BYID/${TransferRequestNumber}`)
            .then((res) => {
                setvalue((prevValue) => ({
                    ...prevValue,
                    TransferRequestNumber: res.data.data[0].TransferRequestNumber,
                    EmployeeNumber: res.data.data[0].EmployeeID,
                    RoomCode: res.data.data[0].FROM_RoomCode,
                    TransferRoomCode: res.data.data[0].TO_RoomCode,
                    Level1stEmpCode: res.data.data[0].EmployeeID_Approval_1,
                    Level2ndEmpCode: res.data.data[0].EmployeeID_Approval_2,
                    Level3rdEmpCode: res.data.data[0].EmployeeID_Approval_3,
                    Flag1st: res.data.data[0].ApprovedFlag_Approval_1,
                    Flag2nd: res.data.data[0].ApprovedFlag_Approval_2,
                    Flag3rd: res.data.data[0].ApprovedFlag_Approval_3,
                }));

                const RequesttimeDate = res.data.data[0].TransferRequestDate
                const DateApprovedApproval1 = res.data.data[0].DateApproved_Approval_1
                const DateApprovedApproval2 = res.data.data[0].DateApproved_Approval_2
                const DateApprovedApproval3 = res.data.data[0].DateApproved_Approval_3
                setDate(new Date(RequesttimeDate))
                setApproval1stDate(new Date(DateApprovedApproval1))
                setApproval2ndDate(new Date(DateApprovedApproval2))
                setApproval3rdDate(new Date(DateApprovedApproval3))
                const EmployeeID = res.data.data[0].EmployeeID
                axios.post(`/api/getworkRequest_by_EPID`, {
                    EmployeeID,
                }).then((res) => {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        EmployeeName: res.data.recordsets[0][0].Firstname,
                    }));
                }).catch((err) => {
                    console.log(err);
                });
                const EmpCode1stLevel = res.data.data[0].EmployeeID_Approval_1
                console.log('EmpCode1stLevel', EmpCode1stLevel);
                axios.get(`/api/EmployeeMaster_GET_BYID/${EmpCode1stLevel}`).then((res) => {
                    if (res.data.recordset && res.data.recordset.length > 0) {
                        const first = res.data.recordset[0].Firstname
                        const middle = res.data.recordset[0].Middlename
                        const last = res.data.recordset[0].Lastname
                        setvalue(prevValue => ({
                            ...prevValue,
                            Level1stEmpCodeEmployeeName: `${first} ${middle} ${last}`
                        }))
                    } else {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            Level1stEmpCodeEmployeeName: '',
                        }));
                    }

                }).catch((err) => {
                    console.log(err);
                });
                const EmpCode2ndLevel = res.data.data[0].EmployeeID_Approval_2
                console.log('EmpCode2ndLevel', EmpCode2ndLevel);
                axios.get(`/api/EmployeeMaster_GET_BYID/${EmpCode2ndLevel}`).then((res) => {
                    if (res.data.recordset && res.data.recordset.length > 0) {
                        const first = res.data.recordset[0].Firstname
                        const middle = res.data.recordset[0].Middlename
                        const last = res.data.recordset[0].Lastname
                        setvalue(prevValue => ({
                            ...prevValue,
                            Level2ndEmpCodeEmployeeName: `${first} ${middle} ${last}`
                        }))
                    } else {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            Level2ndEmpCodeEmployeeName: '',
                        }));
                    }
                }).catch((err) => {
                    console.log(err);
                });
                const EmpCode3rdLevel = res.data.data[0].EmployeeID_Approval_3
                axios.get(`/api/EmployeeMaster_GET_BYID/${EmpCode3rdLevel}`).then((res) => {
                    if (res.data.recordset && res.data.recordset.length > 0) {
                        const first = res.data.recordset[0].Firstname
                        const middle = res.data.recordset[0].Middlename
                        const last = res.data.recordset[0].Lastname
                        setvalue(prevValue => ({
                            ...prevValue,
                            Level3rdEmpCodeEmployeeName: `${first} ${middle} ${last}`
                        }))
                    } else {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            Level3rdEmpCodeEmployeeName: '',
                        }));
                    }
                }).catch((err) => {
                    console.log(err);
                });
                const Roomcodess = res.data.data[0].FROM_RoomCode
                axios.get(`/api/Rooms_newpage_GET_BYID/${Roomcodess}`)
                    .then((res) => {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            RoomName: res.data.data[0].RoomDesc,
                            AreaTable: res.data.data[0].Area,
                            FloorCode: res.data.data[0].FloorCode,
                            BuildingCode: res.data.data[0].BuildingCode,
                            LocationCode: res.data.data[0].LocationCode
                        }));

                        const RoomCodes = res.data.data[0].BuildingCode

                        axios.get(`/api/Building_GET_BYID/${RoomCodes}`)
                            .then((res) => {
                                const apiImage = res.data.recordset[0].BuildingImage;
                                if (apiImage) {
                                    setImage({ uri: apiImage });
                                } else {
                                    setImage(require('./../../Image/RoomMaintence.png'));
                                }
                                if (res.data.recordset && res.data.recordset.length > 0) {
                                    const responseData = res.data.recordset[0];
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        BuildingDesc: responseData.BuildingDesc || '',
                                    }));
                                } else {
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        BuildingDesc: '',
                                    }));

                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }).catch((err) => {
                        console.log(err);
                    });

                const RoomcodeTran = res.data.data[0].TO_RoomCode
                axios.get(`/api/Rooms_newpage_GET_BYID/${RoomcodeTran}`)
                    .then((res) => {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            RoomName2: res.data.data[0].RoomDesc,
                            AreaTable2: res.data.data[0].Area,
                            FloorCode2: res.data.data[0].FloorCode,
                            BuildingCode2: res.data.data[0].BuildingCode,
                        }));

                        const RoomCodes = res.data.data[0].BuildingCode
                        axios.get(`/api/Building_GET_BYID/${RoomCodes}`)
                            .then((res) => {
                                if (res.data.recordset && res.data.recordset.length > 0) {
                                    const responseData = res.data.recordset[0];
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        BuildingDesc2: responseData.BuildingDesc || '',
                                    }));
                                } else {
                                    setvalue((prevValue) => ({
                                        ...prevValue,
                                        BuildingDesc2: '',
                                    }));

                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }).catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])

    const [showAlert, setShowAlert] = useState(false);
    const showSuccessAlert = () => {
        setShowAlert(true);
    };

    const [errorshow, seterrorshow] = useState(false)
    const [errorstatues, seterrorstatues] = useState('')
    const errorshowmessage = () => {
        seterrorshow(true)
    }

    const postapi = () => {
        axios.put(`/api/EmployeeRoomTransfers_Put/${TransferRequestNumber}`, {
            TransferRequestDate: date,
            EmployeeID: value.EmployeeNumber,
            FROM_RoomCode: value.RoomCode,
            TO_RoomCode: value.TransferRoomCode,
            EmployeeID_Approval_1: value.Level1stEmpCode,
            DateApproved_Approval_1: Approval1stDate,
            ApprovedFlag_Approval_1: value.Flag1st,
            EmployeeID_Approval_2: value.Level2ndEmpCode,
            DateApproved_Approval_2: Approval2ndDate,
            ApprovedFlag_Approval_2: value.Flag2nd,
            EmployeeID_Approval_3: value.Level3rdEmpCode,
            DateApproved_Approval_3: Approval3rdDate,
            ApprovedFlag_Approval_3: value.Flag3rd,

        }).then((res) => {
            showSuccessAlert(true)
            myFunction()
            console.log(res.data);
        }).catch((err) => {
            const statuss = err.response.data.error
            console.log(statuss);
            errorshowmessage(true)
            seterrorstatues(statuss)
        });
    }

    return (
        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View>
                    <Text style={styles.prograp}>
                        Modify Employee Room Transfers
                    </Text>
                </View>
                <View style={styles.line} />
                {/* images section */}
                <View style={styles.imagebackgrounddd}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                        {image && <Image source={image} style={{ width: 300, height: 150 }} />}
                    </View>
                </View>
                {/* Employee ID and Work Request Number */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Transfer Request</Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.TransferRequestNumber}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    TransferRequestNumber: item.value,
                                }));
                            }}
                            editable={false}
                            placeholder="Request Number "
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

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
                </View>
                {/* Employee Number and Emp Name. */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee Number
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={EmployeeiddropdownEmployeeNumber}
                            maxHeight={200}
                            labelField="labelEmployeeID"
                            valueField="valueEmployeeID"
                            placeholder={'Employee Number'}
                            search
                            searchPlaceholder='search by Employee ID'
                            value={value.EmployeeNumber}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    EmployeeNumber: item?.valueEmployeeID || '',
                                    EmployeeName: item?.labelEmployeeIDname || '',
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
                <View style={styles.line} />
                {/* RoomCode and RoomName */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Room Code
                        </Text>
                        <Dropdown
                            style={[
                                styles.inputBox, { height: 40, },
                                { borderColor: isFocusedRoomCode ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownRoomLIST}
                            maxHeight={200}
                            labelField="RoomCode"
                            valueField="RoomCode"
                            placeholder={'Room Code'}
                            search
                            searchPlaceholder='search by Room Code'
                            value={value.RoomCode}
                            onChange={RoomCodehandleProvinceChange}
                            onFocus={() => {
                                setIsFocusedRoomCode(true);
                            }}
                            onBlur={() => {
                                setIsFocusedRoomCode(false);
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Room Name
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.RoomName}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    RoomName: item,
                                }));
                            }}
                            placeholder="Room Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* AreaTable and Floor Code */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Area/Table
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                            ]}
                            value={value.AreaTable}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    AreaTable: item,
                                }));
                            }}
                            placeholder="Area/Table"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Floor Code
                        </Text>
                        <Dropdown
                            style={[
                                styles.inputBox,
                                { height: 40 },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownFloor}
                            maxHeight={200}
                            labelField="FloorCode"
                            valueField="FloorCode"
                            placeholder={'select Floor Code'}
                            value={value.FloorCode}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    FloorCode: item?.FloorCode || '',
                                }));
                            }}
                        />
                    </View>

                </View>
                {/* Building and Building Desc.*/}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Building
                        </Text>
                        <Dropdown
                            style={[
                                styles.inputBox,
                                { height: 40 },
                                isFocus && { borderColor: 'blue' },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownBuildingLIST}
                            maxHeight={200}
                            labelField="BuildingCode"
                            valueField="BuildingCode"
                            placeholder={'Select Asset Group'}
                            value={value.BuildingCode}
                            onChange={handleProvinceChangeBuildingCode}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Buildiing Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.BuildingDesc}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    BuildingDesc: item
                                }));
                            }}
                            placeholder="Enter Description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={() => {
                                setIsFocused(true);
                            }}
                            onBlur={() => {
                                setIsFocused(false);
                            }}
                        />
                    </View>

                </View>
                <View style={styles.line} />
                {/* RoomCode and RoomName */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Transfer - Room Code
                        </Text>
                        <Dropdown
                            style={[
                                styles.inputBox, { height: 40, },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownRoomLIST}
                            maxHeight={200}
                            labelField="RoomCode"
                            valueField="RoomCode"
                            placeholder={'Room Code'}
                            search
                            searchPlaceholder='search by Room Code'
                            value={value.TransferRoomCode}
                            onChange={RoomCodehandleProvinceChangeTransferRoomCode}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Room Name
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.RoomName2}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    RoomName2: item,
                                }));
                            }}
                            placeholder="Room Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* AreaTable and Floor Code */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Area/Table
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                            ]}
                            value={value.AreaTable2}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    AreaTable2: item,
                                }));
                            }}
                            placeholder="Area/Table"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Floor Code
                        </Text>
                        <Dropdown
                            style={[
                                styles.inputBox,
                                { height: 40 },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownFloor}
                            maxHeight={200}
                            labelField="FloorCode"
                            valueField="FloorCode"
                            placeholder={'select Floor Code'}
                            value={value.FloorCode2}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    FloorCode2: item?.FloorCode || '',
                                }));
                            }}
                        />
                    </View>

                </View>
                {/* Building and Building Desc.*/}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Building
                        </Text>
                        <Dropdown
                            style={[
                                styles.inputBox,
                                { height: 40 },
                                isFocus && { borderColor: 'blue' },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownBuildingLIST}
                            maxHeight={200}
                            labelField="BuildingCode"
                            valueField="BuildingCode"
                            placeholder={'Select Asset Group'}
                            value={value.BuildingCode2}
                            onChange={handleProvinceChangeBuildingCode2}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Buildiing Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                            ]}
                            value={value.BuildingDesc2}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    BuildingDesc2: item
                                }));
                            }}
                            placeholder="Enter Description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                <View style={styles.line} />
                <Text style={styles.prograp}>
                    APPROVING OFFICERS
                </Text>
                {/* 1st employ id to Employee */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>1st Level - Emp. Code
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={EmployeeiddropdownLevel1stEmpCode}
                            maxHeight={200}
                            labelField="labelEmployeeID"
                            valueField="valueEmployeeID"
                            placeholder={'1st Level - Emp. Code'}
                            search
                            searchPlaceholder='search Employee'
                            value={value.Level1stEmpCode}
                            onChange={item => {
                                console.log(item?.valueEmployeeID);
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Level1stEmpCode: item?.valueEmployeeID || '',
                                    Level1stEmpCodeEmployeeName: item?.labelEmployeeIDname || '',

                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee Name
                        </Text>
                        <TextInput
                            style={styles.inputBox}
                            value={value.Level1stEmpCodeEmployeeName}
                            onChange={text => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Level1stEmpCodeEmployeeName: text,
                                }));
                            }}
                            placeholder="Employee Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Approval Date
                        </Text>

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative' }]}
                                    placeholder="dd/mm/yyyy "
                                    editable={true}
                                    value={Approval1stDate ? Approval1stDate.toISOString().split('T')[0] : 'YYYY-MM-DD'}
                                />
                                <TouchableOpacity
                                    onPress={showDatepickerApproval1stDate}
                                    style={styles.iconcontainer}
                                >
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerApproval1stDate &&
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={Approval1stDate || new Date()}
                                        mode="date"
                                        is24Hour={true}
                                        format="YYYY-MM-DD"
                                        display="default"
                                        onChange={onChangeApproval1stDate}
                                    />
                                </View>}
                        </View>
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Flag
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.Flag1st}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Flag1st: item
                                }));
                            }}
                            placeholder="XX"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Level2ndEmpCode by Emp. */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>2nd Level - Emp. Code
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={EmployeeiddropdownLevel2ndEmpCode}
                            maxHeight={200}
                            labelField="labelEmployeeID"
                            valueField="valueEmployeeID"
                            placeholder={'2nd Level - Emp. Code'}
                            search
                            searchPlaceholder='search Emp. Code'
                            value={value.Level2ndEmpCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Level2ndEmpCode: item?.valueEmployeeID || '',
                                    Level2ndEmpCodeEmployeeName: item?.labelEmployeeIDname || '',
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee Name
                        </Text>
                        <TextInput
                            style={styles.inputBox}
                            value={value.Level2ndEmpCodeEmployeeName}
                            onChange={text => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Level2ndEmpCodeEmployeeName: text,
                                }));
                            }}
                            placeholder="Employee Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Approval Date 2nd  */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Approval Date
                        </Text>

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative' }]}
                                    placeholder="dd/mm/yyyy -:- --"
                                    editable={true}
                                    value={Approval2ndDate ? Approval2ndDate.toISOString().split('T')[0] : 'YYYY-MM-DD'}
                                />
                                <TouchableOpacity
                                    onPress={showDatepickerApproval2ndDate}
                                    style={styles.iconcontainer}
                                >
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerApproval2ndDate &&
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={Approval2ndDate || new Date()}
                                        mode="date"
                                        is24Hour={true}
                                        format="YYYY-MM-DD"
                                        display="default"
                                        onChange={onChangeApproval2ndDate}
                                    />
                                </View>}
                        </View>
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Flag
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.Flag2nd}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Flag2nd: item
                                }));
                            }}
                            placeholder="XX"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>2nd Level - Emp. Code
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={EmployeeiddropdownLevel3rdEmpCode}
                            maxHeight={200}
                            labelField="labelEmployeeID"
                            valueField="valueEmployeeID"
                            placeholder={'3rd Level - Emp. Code'}
                            search
                            searchPlaceholder='search Emp. Code'
                            value={value.Level3rdEmpCode}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Level3rdEmpCode: item?.valueEmployeeID || '',
                                    Level3rdEmpCodeEmployeeName: item?.labelEmployeeIDname || '',
                                }));
                            }}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Employee Name
                        </Text>
                        <TextInput
                            style={styles.inputBox}
                            value={value.Level3rdEmpCodeEmployeeName}
                            onChange={text => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Level3rdEmpCodeEmployeeName: text,
                                }));
                            }}
                            placeholder="Employee Name"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Approval Date and Purchased Amount */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Approval Date
                        </Text>

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative' }]}
                                    placeholder="dd/mm/yyyy"
                                    editable={true}
                                    value={Approval3rdDate ? Approval3rdDate.toISOString().split('T')[0] : 'YYYY-MM-DD'}
                                />
                                <TouchableOpacity
                                    onPress={showDatepickerApproval3rdDate}
                                    style={styles.iconcontainer}
                                >
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerApproval3rdDate &&
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={Approval3rdDate || new Date()}
                                        mode="date"
                                        is24Hour={true}
                                        format="YYYY-MM-DD"
                                        display="default"
                                        onChange={onChangeApproval3rdDate}
                                    />
                                </View>}
                        </View>
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Flag
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.Flag3rd}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Flag3rd: item
                                }));
                            }}
                            placeholder="XX"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Button section */}
                <Button radius={'md'} type="solid" containerStyle={{
                    width: 150,
                    marginLeft: 15,
                    marginBottom: 15,
                }}
                    onPress={postapi}
                >
                    <Ionicons
                        name="md-save-outline"
                        size={20}
                        color="white"
                        style={{ marginRight: 12 }}
                    />
                    SAVE
                </Button>

                <AwesomeAlert
                    show={showAlert}
                    title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="ios-checkmark-circle" size={30} color="#4CAF50" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Success</Text>
                        </View>
                    }
                    message={`Employee Room Assignments ${TransferRequestNumber} has been Update successfully`}
                    confirmButtonColor="#DD6B55"
                    confirmButtonStyle={{ backgroundColor: 'black' }}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    onConfirmPressed={() => {
                        navigation.navigate('Employeeroomtransfer')
                        myFunction()
                    }}
                />
                <AwesomeAlert
                    show={errorshow}
                    title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="error-outline" size={30} color="red" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>Error</Text>
                        </View>
                    }
                    message={`${errorstatues}`}
                    confirmButtonColor="#DD6B55"
                    confirmButtonStyle={{ backgroundColor: 'black' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showConfirmButton={true}
                    confirmText="OK"
                    onConfirmPressed={() => {
                        seterrorshow(false)
                    }}
                />

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    iconcontainer: {
        position: 'absolute',
        left: '86%',
        backgroundColor: 'black',
        padding: 1,
        borderRadius: 5,
    },
    iconcontainerwarrantdata: {
        position: 'absolute',
        left: '40%',
        backgroundColor: 'black',
        padding: 1,
        borderRadius: 5,
    },
    imagebackgrounddd: {
        backgroundColor: '#e9e2e2',
        borderColor: "#94A0CA",
        borderWidth: 1,
        paddingVertical: 5,
        width: '98%',
        marginLeft: 2.5,
        borderRadius: 10,
        marginBottom: 20,
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
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer: {
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    errorText: {
        color: "red",
        marginTop: 16,
    },
    header: {
        fontSize: 20,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
});

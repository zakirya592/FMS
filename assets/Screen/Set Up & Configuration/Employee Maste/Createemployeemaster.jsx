import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import PhoneInput from "react-native-phone-number-input";

export default function Createemployeemaster({ route }) {
    const { myFunction } = route.params
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        EmployeeID: '', RequestNumber: '', Middlename: '', Lastname: '', Firstname: '',
        DepartmentCode: '', DepartmentName: '', WorkTypeCode: '', WorkTypeDesc: '', WorkPriority: '', WorkTrade: '', WorkTradeDesc: '',
        BuildingCode: '', LocationCode: '', MobileNumber: '', LandlineNumber: '',
        PassportNumber: '', NationalIQAMANumber: '', MaritalStatus: '', NationalityDescription: '', NationalityCode:'',
        Age: '', Gender: '', Title: '', DesignationCode: '', DesignationName: '', EmailAddress:'',
    })

    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedDepartmentName, setIsFocusedDepartmentName] = useState(false);
    // Image section
    const [image, setImage] = useState(require('./../../Image/printer.jpeg'));
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage({ uri: result.assets[0].uri });
        }
    };
    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage({ uri: result.assets[0].uri });
        }
    }
    // BirthDate
    const [BirthDate, setBirthDate] = useState(null);
    const [showPickerBirthDate, setShowPickerBirthDate] = useState(false);
    const onChangeBirthDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPickerBirthDate(Platform.OS === 'ios');
        setBirthDate(currentDate);
    };
    const showDatepickerBirthDate = () => {
        setShowPickerBirthDate(true);
    };
    // JoiningDate
    const [JoiningDate, setJoiningDate] = useState(new Date());
    const [showPickerJoiningDate, setShowPickerJoiningDate] = useState(false);
    const onChangeJoiningDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPickerJoiningDate(Platform.OS === 'ios');
        setJoiningDate(currentDate);
    };
    const showDatepickerJoiningDate = () => {
        setShowPickerJoiningDate(true);
    };
    // Api section dropdown
    const [MaritalStatusdropdown, setMaritalStatusdropdown] = useState([]);
    const [dropdownNationality, setdropdownNationality] = useState([]);
    const [dropdownGender, setdropdownGender] = useState([]);
    const [dropdownTitle, setdropdownTitle] = useState([])
    const [dropdownBuildingList, setDropdownBuildingList] = useState([]);
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [DesignationCodelist, setDesignationCodelist] = useState([]);
    useEffect(() => {
        axios.get(`/api/Gender_GET_LIST`).then((res) => {
            setdropdownGender(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`api/Title_GET_LIST`)
            .then((res) => {
                setdropdownTitle(res.data.recordsets[0]);
            }).catch((err) => {
                console.error("Gender API error:", err);
            });
        axios.get(`/api/Nationality_GET_LIST`).then((res) => {
            setdropdownNationality(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/MaritalStatus_GET_LIST`).then((res) => {
            setMaritalStatusdropdown(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
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
        axios.get(`/api/Designation_GET_LIST`).then((res) => {
            setDesignationCodelist(res.data.recordsets[0])
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
    // Work Employes ID  Api
    const Requestnumberapi = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                const reqput = res.data.recordset[0].EmployeeID;
                let formattedRequestNumber;
                if (reqput >= 1 && reqput <= 9) {
                    formattedRequestNumber = `000${reqput}`;
                } else if (reqput >= 10 && reqput <= 99) {
                    formattedRequestNumber = `00${reqput}`;
                } else if (reqput >= 100 && reqput <= 999) {
                    formattedRequestNumber = `0${reqput}`;
                } else if (reqput >= 1000 && reqput <= 9999) {
                    formattedRequestNumber = `${reqput}`;
                } else {
                    formattedRequestNumber = `${reqput}`;
                }
                setvalue(prevState => ({ ...prevState, EmployeeID: formattedRequestNumber }));
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        Requestnumberapi()
    }, [])

    const requestincreas = () => {
        axios.get(`/api/workRequestCount_GET_BYID/1`)
            .then((res) => {
                const reqput = res.data.recordset[0].EmployeeID + 1;
                axios.put(`/api/EmployeeIDCount_Put/1`, {
                    EmployeeID: reqput
                }).then((res) => {
                        const reqput = res.data.recordset[0].EmployeeID + 1;
                        setvalue(prevState => ({ ...prevState, EmployeeID: '000-000-' + '0' + `${reqput}` }));
                    }).catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const [showAlert, setShowAlert] = useState(false);
    const showSuccessAlert = () => {
        setShowAlert(true);
    };
    const formData = new FormData();
    const imageUri = image && typeof image === 'object' ? image.uri : image;

    formData.append('EmployeeID', value.EmployeeID);
    formData.append('Gender', value.Gender);
    formData.append('Title', value.Title);
    formData.append('BirthDate', BirthDate);
    formData.append('Age', value.Age);
    formData.append('Lastname', value.Lastname);
    formData.append('Middlename', value.Middlename);
    formData.append('Firstname', value.Firstname);
    formData.append('NationalityCode', value.NationalityCode);
    formData.append('MaritalStatus', value.MaritalStatus);
    formData.append('NationalID', value.NationalIQAMANumber);
    formData.append('PassportNumber', value.PassportNumber);
    formData.append('MobileNumber', value.MobileNumber);
    formData.append('LandlineNumber', value.LandlineNumber);
    formData.append('DesignationCode', value.DesignationCode);
    formData.append('Email', value.EmailAddress);
    formData.append('DepartmentCode', value.DepartmentCode);
    formData.append('BuildingCode', value.BuildingCode);
    formData.append('LocationCode', value.LocationCode);
    formData.append('JoiningDate', JoiningDate);
    formData.append('EmployeeImage', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'asset_image.jpg',
    })
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    const postapi = () => {
        axios.post(`/api/EmployeeMaster_post`, formData, config)
            .then((res) => {
                showSuccessAlert(true)
                requestincreas()
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View>
                    <Text style={styles.prograp}>
                        Create Set-Up-Employee Master
                    </Text>
                </View>
                {/* images section */}
                <View style={styles.imagebackgrounddd}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                        {image && <Image source={image} style={{ width: 200, height: 150 }} />}
                        <View style={{ marginLeft: 20 }}>
                            <TouchableOpacity onPress={pickImage} style={{ marginBottom: 20, }}>
                                <FontAwesome5 name="file-upload" size={30} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={takePhoto} >
                                <FontAwesome name="camera" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={styles.line} />
                <View style={[styles.singleinputlable,{marginLeft:8,marginBottom:5}]}>
                    <Text style={styles.lableinput}>Employee Number</Text>
                    <TextInput
                        style={[
                            styles.inputBox,{width:300}
                        ]}
                        value={value.EmployeeID}
                        onChange={item => {
                            setvalue((prevValue) => ({
                                ...prevValue,
                                EmployeeID: item.value,
                            }));
                        }}
                        editable={false}
                        placeholder="Employee Number"
                        placeholderTextColor="#94A0CA"
                        selectionColor="#1D3A9F"
                        underlineColorAndroid="transparent"
                    />
                </View>
                {/* Gender and  title */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Gender
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
                            data={dropdownGender}
                            maxHeight={200}
                            labelField="GenderDesc"
                            valueField="GenderDesc"
                            placeholder={'Gender'}
                            value={value.Gender}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Gender: item?.GenderDesc || '',
                                }));
                            }}
                        />
                    </View>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Title
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
                            data={dropdownTitle}
                            maxHeight={200}
                            labelField="TitleCode"
                            valueField="TitleCode"
                            placeholder={'Select Title Code'}
                            value={value.Title}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Title: item?.TitleCode || '',
                                }));
                            }}
                        />
                    </View>
                </View>
                {/* Birth Date andAge */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Birth Date
                        </Text>

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative' }]}
                                    placeholder="dd/mm/yyyy -:- --"
                                    editable={true}
                                    value={BirthDate ? BirthDate.toISOString().split('T')[0] : 'YYYY-MM-DD'}
                                />
                                <TouchableOpacity
                                    onPress={showDatepickerBirthDate}
                                    style={styles.iconcontainer}
                                >
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerBirthDate &&
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={BirthDate || new Date()}
                                        mode="date"
                                        is24Hour={true}
                                        format="YYYY-MM-DD"
                                        display="default"
                                        onChange={onChangeBirthDate}
                                    />
                                </View>}
                        </View>
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                           Age
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.Age}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Age: item
                                }));
                            }}
                            placeholder="000"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
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
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Firstname: item,
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
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Middlename: item
                                }));
                            }}
                            placeholder='Middle Name'
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* last name Marital Status*/}
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
                            onChangeText={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    Lastname: item
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
                        <Text style={styles.lableinput}>
                            Marital Status
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
                            data={MaritalStatusdropdown}
                            maxHeight={200}
                            labelField="MaritalDesc"
                            valueField="MaritalDesc"
                            placeholder={'Select Marital Status'}
                            value={value.MaritalStatus}
                            // onChange={handleProvinceChangeassetType}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    MaritalStatus: item?.MaritalDesc || '', // Update the Employeeid property
                                }));
                            }}
                        />
                    </View>
                </View>
                {/*Nationality Code andNationality Code Desc  */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                           Nationality Code
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
                            data={dropdownNationality}
                            maxHeight={200}
                            labelField="NationalityCode"
                            valueField="NationalityCode"
                            placeholder={'SelectNationality Code'}
                            value={value.NationalityCode}
                            // onChange={handleProvinceChangeNationalityCode}
                            onChange={e => {
                                const selectedCode = e.NationalityCode;
                                const selectedDescription = dropdownNationality.find(item => item.NationalityCode === selectedCode)?.NationalityDesc || '';

                                setvalue(prevValue => ({
                                    ...prevValue,
                                    NationalityCode: selectedCode,
                                    NationalityDescription: selectedDescription
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Nationality Description
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                            ]}
                            value={value.NationalityDescription}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    NationalityDescription: item.value, 
                                }));
                            }}
                            placeholder="Enter Description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* National/IQAMA Number and PassportNumber */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            National/IQAMA Number
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                            ]}
                            value={value.NationalIQAMANumber}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    NationalIQAMANumber: item,
                                }));
                            }}
                            placeholder="XXXXXXXXX"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Passport Number
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.PassportNumber}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    PassportNumber: item,
                                }));
                            }}
                            placeholder="XXXXXXXXX"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
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

                <View style={styles.line} />

                {/* Building and Location*/}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>Building
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
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
                            style={[styles.inputBox, { height: 40, },]}
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
                                    LocationCode: item?.LocationCode || '',
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
                            style={[styles.inputBox, { height: 40, }, ]}
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
                {/* Designation Code and Designation Code Desc  */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Designation Code
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
                            data={DesignationCodelist}
                            maxHeight={200}
                            labelField="DesignationCode"
                            valueField="DesignationCode"
                            placeholder={'Select Designation Code'}
                            value={value.DesignationCode}
                            onChange={e => {
                                const selectedCode = e.DesignationCode;
                                const selectedDescription = DesignationCodelist.find(item => item.DesignationCode === selectedCode)?.DesignationDesc || '';
                                console.log(selectedDescription);
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    DesignationCode: selectedCode,
                                    DesignationName: selectedDescription
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Designation Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                            ]}
                            value={value.DesignationName}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    DesignationName: item.value, 
                                }));
                            }}
                            placeholder="Enter Description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Join  Date andEmail Address */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                          Joining Date
                        </Text>

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.inputBox, { position: 'relative' }]}
                                    placeholder="dd/mm/yyyy -:- --"
                                    editable={true}
                                    value={JoiningDate ? JoiningDate.toISOString().split('T')[0] : 'YYYY-MM-DD'}
                                />
                                <TouchableOpacity
                                    onPress={showDatepickerJoiningDate}
                                    style={styles.iconcontainer}
                                >
                                    <AntDesign name="calendar" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            {showPickerJoiningDate &&
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={JoiningDate || new Date()}
                                        mode="date"
                                        is24Hour={true}
                                        format="YYYY-MM-DD"
                                        display="default"
                                        onChange={onChangeJoiningDate}
                                    />
                                </View>}
                        </View>
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                           Email Address
                        </Text>
                        <TextInput
                            style={[styles.inputBox]}
                            value={value.EmailAddress}
                            onChangeText={(item) => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    EmailAddress: item,
                                }));
                            }}
                            placeholder="Email Address"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="email-address" // Set the keyboard type to "email-address"
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
                    message={`Employee Master has been created successfully`}
                    confirmButtonColor="#DD6B55"
                    confirmButtonStyle={{ backgroundColor: 'black' }}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    onConfirmPressed={() => {
                        navigation.navigate('Employeemaste')
                        myFunction()
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

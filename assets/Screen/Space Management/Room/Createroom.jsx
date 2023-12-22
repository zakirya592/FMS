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
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';


const Vacancy = [
    { label: 'Y', value: 'Yes' },
    { label: 'N', value: 'No' },
];

export default function Createroom({ route }) {
    const { myFunction } = route.params
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        LocationCode: '', LocationDesc: '',
        RoomCode: '', RoomName: '', BuildingCode: '', BuildingDesc: '', AreaTable: '', FloorCode:'',
        RoomCapacity: '0', NoofOccupancy: '0', Vacancy:''
    });

    const [isFocusedLocationCodeDesc, setIsFocusedLocationCodeDesc] = useState(
        false
    );
    const [isFocusedRoomCode, setIsFocusedRoomCode] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
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
    };
    // Api section dropdown
    const [dropdownBuildingLIST, setdropdownBuildingLIST] = useState([])
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownFloor, setdropdownFloor] = useState([])

    useEffect(() => {
        // Building_LIST
        axios.get(`/api/Building_GET_LIST`).then((res) => {
            setdropdownBuildingLIST(res.data.recordsets[0])
        }).catch((err) => {
                console.log(err);
            });
        // Location_LIST
        axios.get(`/api/Location_GET_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
        }).catch((err) => {
                console.log(err);
            });
        // Floor
        axios.get(`/api/Floor_GET_List`).then((res) => {
            setdropdownFloor(res.data.data)
        }).catch((err) => {
                console.log(err);
            });

    }, [])

    const handleProvinceChangeLocationCode = (selectedValue) => {
        const Deptnale = selectedValue.LocationCode;
        setvalue((prevValue) => ({
            ...prevValue,
            LocationCode: selectedValue.LocationCode,
        }));
        axios.get(`/api/Location_GET_BYID/${Deptnale}`)
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
    }
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
                    setImage(require('./../../Image/printer.jpeg'));
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
    const [showAlert, setShowAlert] = useState(false);
    const showSuccessAlert = () => {
        setShowAlert(true);
    };
   
    const postapi = () => {
        axios.post(`/api/Rooms_newpage_post`, {
            RoomCode: value.RoomCode,
            RoomDesc: value.RoomName,
            Area: value.AreaTable,
            FloorCode: value.FloorCode,
            BuildingCode: value.BuildingCode,
            LocationCode: value.LocationCode,
            Capacity: value.RoomCapacity,
            Occupants: value.NoofOccupancy,
            VacancyFlag: value.Vacancy
        }).then((res) => {
                showSuccessAlert(true)
                console.log(res.data);
            myFunction()
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View>
                    <Text style={styles.prograp}>
                        ROOM MAINTENANCE - CREATE
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
                {/* RoomCode and RoomName */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Room Code
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedRoomCode ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.RoomCode}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    RoomCode: item,
                                }));
                            }}
                            placeholder="Room Code"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
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
                                    FloorCode: item?.value || '',
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
                {/* Location and Location Desc  */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Location
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
                            data={dropdownLocation}
                            maxHeight={200}
                            labelField="LocationCode"
                            valueField="LocationCode"
                            placeholder={'Select Location'}
                            value={value.LocationCode}
                            onChange={handleProvinceChangeLocationCode}

                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Location Desc
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedLocationCodeDesc ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.LocationDesc}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    LocationDesc: item.value, 
                                }));
                            }}
                            placeholder="Enter Description"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={() => {
                                setIsFocusedLocationCodeDesc(true);
                            }}
                            onBlur={() => {
                                setIsFocusedLocationCodeDesc(false);
                            }}
                        />
                    </View>

                </View>
                <View style={styles.line} />
                {/* Room Capacity Level and No. of Occupancy */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Room Capacity
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.RoomCapacity}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    RoomCapacity: item,
                                }));
                            }}
                            placeholder="0"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            No. of Occupancy
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.NoofOccupancy}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    NoofOccupancy: item,
                                }));
                            }}
                            placeholder="0"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                        />
                    </View>

                </View>
                {/* Vacancy(Y/N) ? */}
                <View style={[styles.singleinputlable,{marginLeft:10,marginBottom:10}]}>
                    <Text style={styles.lableinput}>
                        Vacancy(Y/N) ?
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
                        data={Vacancy}
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={'select Floor Code'}
                        value={value.Vacancy}
                        onChange={item => {
                            setvalue(prevValue => ({
                                ...prevValue,
                                Vacancy: item?.value || '',
                            }));
                        }}
                    />
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
                    message={`Room  has been created successfully`}
                    confirmButtonColor="#DD6B55"
                    confirmButtonStyle={{ backgroundColor: 'black' }}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    onConfirmPressed={() => {
                        navigation.navigate('Roomtable')
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

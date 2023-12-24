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

export default function Viewbuildingspace({ route }) {
    const { myFunction } = route.params
    const { BuildingCode } = route.params
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        LocationCode: '', LocationDesc: '', BuildingCode: '', BuildingDesc: '',
        Latitude: '', Longtitude: '', BuildingCapacity: '0'
    });

    const [isFocusedLocationCodeDesc, setIsFocusedLocationCodeDesc] = useState(
        false
    );
    const [isFocused, setIsFocused] = useState(false);
    // Image section
    const [image, setImage] = useState(require('./../../Image/RoomMaintence.png'));
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
    const [dropdownLocation, setdropdownLocation] = useState([])

    useEffect(() => {
        // Location_LIST
        axios.get(`/api/Location_GET_LIST`).then((res) => {
            setdropdownLocation(res.data.recordsets[0])
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
    const getapi = () => {
        axios.get(`/api/Building_newpage_GET_BYID/${BuildingCode}`).then((res) => {
            const buildingData = res.data.data[0];

            if (buildingData) {
                setvalue((prevValue) => ({
                    ...prevValue,
                    BuildingCode: buildingData.BuildingCode || '', // Handle null value
                    BuildingDesc: buildingData.BuildingDesc || '',
                    BuildingCapacity: buildingData.Capacity ? buildingData.Capacity.toString() : '',
                    Latitude: buildingData.Latitude ? buildingData.Latitude.toString() : '',
                    Longtitude: buildingData.Longtitude ? buildingData.Longtitude.toString() : '',
                    LocationCode: buildingData.LocationCode || '',
                }));

                const apiImage = buildingData.BuildingImage;
                if (apiImage) {
                    setImage({ uri: apiImage });
                } else {
                    setImage(require('./../../Image/RoomMaintence.png'));
                }
            } else {
                console.error('Building data not found in the response.');
            }
                const loactiondesc = res.data.data[0].LocationCode
            axios.get(`/api/Location_GET_BYID/${loactiondesc}`)
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
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])



    return (
        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View>
                    <Text style={styles.prograp}>
                        Building Maintenance - View
                    </Text>
                </View>
                <View style={styles.line} />
                {/* images section */}
                <View style={styles.imagebackgrounddd}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                        {image && <Image source={image} style={{ width: 300, height: 150 }} />}
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
                {/* Building and Building Desc.*/}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Building
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.BuildingCode}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    BuildingCode: item,
                                }));
                            }}
                            placeholder="Building Code"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
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
                {/*Latitude Level and Longtitude */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Latitude
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.Latitude}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Latitude: item,
                                }));
                            }}
                            placeholder="Latitude"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Longtitude
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.Longtitude}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Longtitude: item,
                                }));
                            }}
                            placeholder="Longtitude"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                        />
                    </View>

                </View>
                {/* Building Capacity */}
                <View style={[styles.singleinputlable, { marginLeft: 12, }]}>
                    <Text style={styles.lableinput}>
                        Building Capacity
                    </Text>
                    <TextInput
                        style={[styles.inputBox,]}
                        value={value.BuildingCapacity}
                        onChangeText={item => {
                            setvalue(prevValue => ({
                                ...prevValue,
                                BuildingCapacity: item,
                            }));
                        }}
                        placeholder="BuildingCapacity"
                        placeholderTextColor="#94A0CA"
                        selectionColor="#1D3A9F"
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                    />
                </View>

                {/* Button section */}
                <Button radius={"md"} type="solid" containerStyle={{
                    width: 350,
                    paddingHorizontal: 12,
                    marginRight: 40,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginVertical:20,
                }}
                    buttonStyle={{
                        backgroundColor: 'black',
                        borderRadius: 3,
                    }}
                    onPress={() => { navigation.goBack() }}
                >
                    <Ionicons name="arrow-back-circle" size={20} color="white" style={{ marginRight: 12 }} />
                    Back
                </Button>

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

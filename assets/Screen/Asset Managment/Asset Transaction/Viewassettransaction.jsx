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
import { Button, Icon } from '@rneui/themed';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
export default function Viewassettransaction({ route }) {
    const { AssetItemTagID } = route.params
    const navigation = useNavigation();
    const [value, setvalue] = useState({
        Employeeid: null,
        AssetItemGroup: '', ItemGroupDesc: '',
        AssetCategoryCode: '', AssetCategoryDesc: '',
        AssetSubCategory: '', AssetSubCategoryDesc: '',
        AssetConditionCode: '', AssetItemTagID: '',
        EmployeeidNumber: '', EmployeeName: '',
        BuildingCode: '', LocationCode: '',
        DepartmentCode: '', DepartmentName: '',
        Manufacturer: '', Model: '',
        Brand: '', SerialNumber: '',
        AssetItemDescriptionss: '',
    });

    const [isFocusedDepartmentName, setIsFocusedDepartmentName] = useState(
        false
    );
    const [isFocusedManufacturer, setIsFocusedManufacturer] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    // Image section
    const [image, setImage] = useState(require('./../../Image/printer.jpeg'));
    const [AssetItemGrouplist, setAssetItemGrouplist] = useState([]);
    const [assetSubCategorylist, setassetSubCategorylist] = useState([]);
    const [listAssetCondition, setlistAssetCondition] = useState([])
    const [assetCategorylist, setassetCategorylist] = useState([]);
    const [EmployeeiddropdownEmployeeidNumber, setEmployeeiddropdownEmployeeidNumber] = useState([])
    const [dropdownBuildingList, setDropdownBuildingList] = useState([]);
    const [dropdownLocation, setdropdownLocation] = useState([])
    const [dropdownDepartmentLIST, setdropdownDepartmentLIST] = useState([])
    const [dropdownAssetItemDescription, setdropdownAssetItemDescription] = useState([])

    useEffect(() => {
        axios.get(`/api/AssetItemGroup_GET_LIST`).then((res) => {
            setAssetItemGrouplist(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/AssetCategory_GET_LIST`).then((res) => {
            setassetCategorylist(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/AssetSubCategory_GET_LIST`).then((res) => {
            setassetSubCategorylist(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`/api/AssetCondition_GET_LIST`).then((res) => {
            setlistAssetCondition(res.data.recordsets[0])
        }).catch((err) => {
            console.log(err);
        });
        axios.get('/api/EmployeeID_GET_LIST').then((response) => {
            const data = response.data.recordset.map((item) => ({
                labelEmployeeID: `${item.Firstname} (${item.EmployeeID})`,
                valueEmployeeID: item.EmployeeID,
                labelEmployeeIDname: item.Firstname
            }));
            setEmployeeiddropdownEmployeeidNumber(data)
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
        axios.get('/api/Filter_AssetsMaster').then((response) => {
            setdropdownAssetItemDescription(response.data.recordset)
        }).catch((error) => {
            console.log('-----', error);
        });
    }, [])

    const handleProvinceChangeAssetItemGroup = (selectedValue) => {
        const Deptnale = selectedValue.AssetItemGroupCode;
        setvalue((prevValue) => ({
            ...prevValue,
            AssetItemGroup: Deptnale,
        }));
        axios.get(`/api/AssetItemGroup_GET_BYID/${Deptnale}`)
            .then((res) => {
                if (res.data.recordset && res.data.recordset.length > 0) {
                    const responseData = res.data.recordset[0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        ItemGroupDesc: responseData.AssetItemGroupCodeDesc || '',
                    }));
                } else {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        ItemGroupDesc: '',
                    }));
                }
            })
            .catch((err) => {
                console.log(err);;
            });
    }
    const handleProvinceChangeasassetCategory = (selectedValue) => {
        const Deptnale = selectedValue.AssetCategoryCode;
        setvalue((prevValue) => ({
            ...prevValue,
            AssetCategoryCode: Deptnale,
        }));
        axios.get(`/api/AssetCategory_GET_BYID/${Deptnale}`)
            .then((res) => {
                if (res.data.recordset && res.data.recordset.length > 0) {
                    const responseData = res.data.recordset[0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetCategoryDesc: responseData.AssetCategoryDesc || '',
                    }));
                } else {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetCategoryDesc: '',
                    }));
                }
            })
            .catch((err) => {
                console.log(err);;
            });
    }
    const handleProvinceChangeassetSubCategory = (selectedValue) => {
        const Deptnale = selectedValue.AssetSubCategoryCode;
        setvalue((prevValue) => ({
            ...prevValue,
            AssetSubCategory: selectedValue.AssetSubCategoryCode,
        }));
        setIsFocus(false);
        axios.get(`/api/AssetSubCategory_GET_BYID/${Deptnale}`)
            .then((res) => {
                if (res.data.recordset && res.data.recordset.length > 0) {
                    const responseData = res.data.recordset[0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetSubCategoryDesc: responseData.AssetSubCategoryDesc || '',
                    }));
                } else {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetSubCategoryDesc: '',
                    }));
                }
            }).catch((err) => {
                console.log(err);;
            });
    } // Department
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

    // Get api
    const getapi = () => {
        axios.get(`/api/AssetTransactions_GET_BYID/${AssetItemTagID}`)
            .then((res) => {
                const Departmentcode = res.data.recordset[0].DepartmentCode
                setvalue((prevValue) => ({
                    ...prevValue,
                    AssetItemTagID: res.data.recordset[0].AssetItemTagID,
                    AssetConditionCode: res.data.recordset[0].AssetCondition,
                    AssetItemDescriptionss: res.data.recordset[0].AssetItemDescription,
                    SerialNumber: res.data.recordset[0].SerialNumber,
                    LocationCode: res.data.recordset[0].LocationCode,
                    BuildingCode: res.data.recordset[0].BuildingCode,
                    DepartmentCode: Departmentcode,
                    EmployeeidNumber: res.data.recordset[0].EmployeeID
                }));

                const EmployeeID = res.data.recordset[0].EmployeeID
                axios.post(`/api/getworkRequest_by_EPID`, {
                    EmployeeID,
                }).then((res) => {
                    if (res.data && res.data.recordsets && res.data.recordsets[0] && res.data.recordsets[0][0]) {
                        setvalue((prevValue) => ({
                            ...prevValue,
                            EmployeeName: res.data.recordsets[0][0].Firstname,
                        }));
                    } else {
                        // console.error('Invalid response structure:', res.data);
                    }
                }).catch((err) => {
                    console.error(err);
                });
                // Department_desc_LIST
                axios.get(`/api/Department_desc_LIST/${Departmentcode}`).then((res) => {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        DepartmentName: res.data.recordset[0].DepartmentDesc,
                    }));
                }).catch((err) => {
                    console.log(err);
                });
                const AssetItemDescriptionss = res.data.recordset[0].AssetItemDescription
                axios.get(`/api/AssetsMaster_GET_BYID/${AssetItemDescriptionss}`).then((res) => {
                    const AssetType = res.data.recordset[0].AssetType
                    const AssetItemGroup = res.data.recordset[0].AssetItemGroup
                    const AssetCategory = res.data.recordset[0].AssetCategory
                    const AssetSubCategory = res.data.recordset[0].AssetSubCategory
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetType: AssetType,
                        AssetItemGroup: AssetItemGroup,
                        AssetCategoryCode: AssetCategory,
                        AssetSubCategory: AssetSubCategory,
                        Brand: res.data.recordset[0].Brand,
                        Model: res.data.recordset[0].Model,
                        Manufacturer: res.data.recordset[0].Manufacturer,
                    }));
                    const apiImage = res.data.recordsets[0][0].AssetImage;
                    if (apiImage) {
                        setImage({ uri: apiImage });
                    } else {
                        setImage(require('./../../Image/printer.jpeg'));
                    }
                    axios.get(`/api/AssetItemGroup_GET_BYID/${AssetItemGroup}`).then((res) => {
                        if (res.data.recordset && res.data.recordset.length > 0) {
                            const responseData = res.data.recordset[0];
                            setvalue((prevValue) => ({
                                ...prevValue,
                                ItemGroupDesc: responseData.AssetItemGroupCodeDesc || '',
                            }));
                        } else {
                            setvalue((prevValue) => ({
                                ...prevValue,
                                ItemGroupDesc: '',
                            }));
                        }
                    }).catch((err) => {
                        console.log(err);;
                    });
                    axios.get(`/api/AssetCategory_GET_BYID/${AssetCategory}`).then((res) => {
                        if (res.data.recordset && res.data.recordset.length > 0) {
                            const responseData = res.data.recordset[0];
                            setvalue((prevValue) => ({
                                ...prevValue,
                                AssetCategoryDesc: responseData.AssetCategoryDesc || '',
                            }));
                        } else {
                            setvalue((prevValue) => ({
                                ...prevValue,
                                AssetCategoryDesc: '',
                            }));
                        }
                    }).catch((err) => {
                        console.log(err);;
                    });
                    axios.get(`/api/AssetSubCategory_GET_BYID/${AssetSubCategory}`).then((res) => {
                        if (res.data.recordset && res.data.recordset.length > 0) {
                            const responseData = res.data.recordset[0];
                            setvalue((prevValue) => ({
                                ...prevValue,
                                AssetSubCategoryDesc: responseData.AssetSubCategoryDesc || '',
                            }));
                        } else {
                            setvalue((prevValue) => ({
                                ...prevValue,
                                AssetSubCategoryDesc: '',
                            }));
                        }
                    }).catch((err) => {
                        console.log(err);;
                    });

                }).catch((err) => {
                    console.log(err);
                });

            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getapi()
    }, [])

    // Api whith the AssetItemDescription
    function getAssetItemDescriptionapi(AssetItemDescription) {
        axios.get(`/api/AssetsMaster_GET_BYID/${AssetItemDescription}`).then((res) => {
            const AssetType = res.data.recordset[0].AssetType
            const AssetItemGroup = res.data.recordset[0].AssetItemGroup
            const AssetCategory = res.data.recordset[0].AssetCategory
            const AssetSubCategory = res.data.recordset[0].AssetSubCategory
            setvalue((prevValue) => ({
                ...prevValue,
                AssetType: AssetType,
                AssetItemGroup: AssetItemGroup,
                AssetCategoryCode: AssetCategory,
                AssetSubCategory: AssetSubCategory,
                Brand: res.data.recordset[0].Brand,
                Model: res.data.recordset[0].Model,
                Manufacturer: res.data.recordset[0].Manufacturer,
            }));
            const apiImage = res.data.recordsets[0][0].AssetImage;
            if (apiImage) {
                setImage({ uri: apiImage });
            } else {
                setImage(require('./../../Image/printer.jpeg'));
            }
            axios.get(`/api/AssetItemGroup_GET_BYID/${AssetItemGroup}`).then((res) => {
                if (res.data.recordset && res.data.recordset.length > 0) {
                    const responseData = res.data.recordset[0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        ItemGroupDesc: responseData.AssetItemGroupCodeDesc || '',
                    }));
                } else {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        ItemGroupDesc: '',
                    }));
                }
            }).catch((err) => {
                console.log(err);;
            });
            axios.get(`/api/AssetCategory_GET_BYID/${AssetCategory}`).then((res) => {
                if (res.data.recordset && res.data.recordset.length > 0) {
                    const responseData = res.data.recordset[0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetCategoryDesc: responseData.AssetCategoryDesc || '',
                    }));
                } else {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetCategoryDesc: '',
                    }));
                }
            }).catch((err) => {
                console.log(err);;
            });
            axios.get(`/api/AssetSubCategory_GET_BYID/${AssetSubCategory}`).then((res) => {
                if (res.data.recordset && res.data.recordset.length > 0) {
                    const responseData = res.data.recordset[0];
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetSubCategoryDesc: responseData.AssetSubCategoryDesc || '',
                    }));
                } else {
                    setvalue((prevValue) => ({
                        ...prevValue,
                        AssetSubCategoryDesc: '',
                    }));
                }
            }).catch((err) => {
                console.log(err);;
            });

        }).catch((err) => {
            console.log(err);
        });
    }
  

    return (
        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View>
                <View>
                    <Text style={styles.prograp}>
                        Asset Transaction - View
                    </Text>
                </View>
                {/* images section */}
                <View style={styles.imagebackgrounddd}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                        {image && <Image source={image} style={{ width: 200, height: 150 }} />}
                        <View style={{ marginLeft: 20 }}>
                            <TouchableOpacity style={{ marginBottom: 20, }} disabled>
                                <FontAwesome5 name="file-upload" size={30} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity disabled >
                                <FontAwesome name="camera" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                {/* Asset/Stock Number andd  Asset Condition*/}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Asset/Stock Number
                        </Text>
                        <TextInput
                            style={styles.inputBox}
                            value={AssetItemTagID}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    AssetItemTagID: item
                                }));
                            }}
                            editable={false}
                            placeholder="Enter Generate Tag #"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                        <Feather
                            name="search"
                            size={24}
                            color="black"
                            style={{ position: 'absolute', left: '85%', top: '45%' }}
                        />
                    </View>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Asset Condition
                        </Text>
                        <Dropdown
                            style={[
                                styles.inputBox,
                                { height: 40 },
                                isFocus && { borderColor: 'blue' },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={listAssetCondition}
                            maxHeight={200}
                            labelField="AssetConditionCode"
                            valueField="AssetConditionCode"
                            placeholder={'Select asset condition'}
                            value={value.AssetConditionCode}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    AssetConditionCode: item?.AssetConditionCode || '',
                                }));
                            }}
                        />
                    </View>

                </View>
                {/* Employee ID and Employee Name */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Employee ID
                        </Text>
                        <Dropdown
                            style={[styles.inputBox, { height: 40, }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={EmployeeiddropdownEmployeeidNumber}
                            maxHeight={200}
                            labelField="labelEmployeeID"
                            valueField="valueEmployeeID"
                            placeholder={'Employee Number'}
                            search
                            searchPlaceholder='search Employee'
                            value={value.EmployeeidNumber}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    EmployeeidNumber: item?.valueEmployeeID || '',
                                    EmployeeName: item?.labelEmployeeIDname || '', // Update EmployeeName here
                                }));
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Employee Name
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
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
                            onFocus={() => {
                                setIsFocused(true);
                            }}
                            onBlur={() => {
                                setIsFocused(false);
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
                        <Dropdown
                            style={[
                                styles.inputBoxdescription,
                                { height: 40 },
                                isFocus && { borderColor: 'blue' },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownAssetItemDescription}
                            search
                            maxHeight={200}
                            labelField="AssetItemDescription"
                            valueField="AssetItemDescription"
                            placeholder={'Enter Asset Item Description'}
                            searchPlaceholder="Search..."
                            value={value.AssetItemDescriptionss}
                            onChange={item => {
                                setvalue((prevValue) => ({
                                    ...prevValue,
                                    AssetItemDescriptionss: item?.AssetItemDescription || '',
                                }));
                                getAssetItemDescriptionapi(item?.AssetItemDescription || '');
                            }}
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
                                { height: 40 },
                                isFocus && { borderColor: 'blue' },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={AssetItemGrouplist}
                            maxHeight={200}
                            labelField="AssetItemGroupCode"
                            valueField="AssetItemGroupCode"
                            placeholder={'Select Asset Group'}
                            value={value.AssetItemGroup}
                            onChange={handleProvinceChangeAssetItemGroup}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Item Group Desc.
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.ItemGroupDesc}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    ItemGroupDesc: item
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
                {/* Asset Category and Asset Category Desc. */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Asset Category
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
                            data={assetCategorylist}
                            maxHeight={200}
                            labelField="AssetCategoryCode"
                            valueField="AssetCategoryCode"
                            placeholder={!isFocus ? 'Select Asset Category' : '...'}
                            searchPlaceholder="Search..."
                            value={value.AssetCategoryCode}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={handleProvinceChangeasassetCategory}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Asset Category Desc.
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.AssetCategoryDesc}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    AssetCategoryDesc: item.value,
                                }));
                            }}
                            placeholder="Asset Category Desc."
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
                {/* Asset Sub Category and Asset Sub-Cat. Desc. */}
                <View style={styles.inputContainer}>
                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Asset Sub Category
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
                            data={assetSubCategorylist}
                            search
                            maxHeight={200}
                            labelField="AssetSubCategoryCode"
                            valueField="AssetSubCategoryCode"
                            placeholder={!isFocus ? 'Select Sub Category' : '...'}
                            searchPlaceholder="Search..."
                            value={value.AssetSubCategory}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={handleProvinceChangeassetSubCategory}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Asset Sub-Cat. Desc.
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.AssetSubCategoryDesc}
                            onChange={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    AssetSubCategoryDesc: item.value, // Update the Employeeid property
                                }));
                            }}
                            placeholder="Sub-Asset Cat. desc."
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
                                    LocationCode: item?.LocationCode || '',
                                }));
                            }}

                        />
                    </View>

                </View>
                {/* Manufacturer and model */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Manufacturer
                        </Text>
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedManufacturer ? '#1D3A9F' : '#94A0CA' },
                            ]}
                            value={value.Manufacturer}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Manufacturer: item,
                                }));
                            }}
                            placeholder="Manufacturer"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                            onFocus={() => {
                                setIsFocusedManufacturer(true);
                            }}
                            onBlur={() => {
                                setIsFocusedManufacturer(false);
                            }}
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Model
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.Model}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Model: item,
                                }));
                            }}
                            placeholder="Model"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Manufacturer and model */}
                <View style={styles.inputContainer}>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Brand
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.Brand}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    Brand: item,
                                }));
                            }}
                            placeholder="Brand"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={styles.singleinputlable}>
                        <Text style={styles.lableinput}>
                            Serial Number
                        </Text>
                        <TextInput
                            style={[styles.inputBox,]}
                            value={value.SerialNumber}
                            onChangeText={item => {
                                setvalue(prevValue => ({
                                    ...prevValue,
                                    SerialNumber: item,
                                }));
                            }}
                            placeholder="Serial Number"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#1D3A9F"
                            underlineColorAndroid="transparent"
                        />
                    </View>

                </View>
                {/* Button section */}
                <View style={styles.buttonsection}>
                    <Button radius={"md"} type="solid"
                        onPress={() => { navigation.goBack() }}
                    >
                        <Ionicons name="arrow-back-circle" size={20} color="white" style={{ marginRight: 12 }} />
                        Back
                    </Button>
                    <Button
                        radius={'md'}
                        type="outline"
                    >
                        <Icon
                            name="print"
                            color="#0A2DAA"
                            size={20}
                            style={{ marginRight: 7 }}
                        />
                       Printe
                    </Button>
                </View>
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
    buttonsection: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom:10,
        marginHorizontal:5,
    },
});

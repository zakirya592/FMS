import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image, Alert
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

export default function AssetMasterUpdate({ route }) {
  const { AssetItemDescription } = route.params
  const { myFunction } = route.params
  const navigation = useNavigation();
  const [value, setvalue] = useState({
    Employeeid: null, Datetime: '', AssetType: '', AssetTypeDesc: '',
    WorkType: '', Manufacturer: '', Model: '', Brand: '', WorkPriority: '', WorkTrade: '',
    AssetSubCategory: '', AssetSubCategoryDesc: '', AssetCategoryCode: '', AssetCategoryDesc: '',
    AssetItemDescription: '', AssetItemGroup: '', ItemGroupDesc: '', WarrantyPeriodCode: '', Units: '', UnitsDescriptions: '',
    VendorID: '', VendorName: '', PurchasedAmount: '0', OnHandQty: '0', ReOrderQtyLevel: '0', MinimumLevel: '0', MaximumLevel: '0',
    POQtyUnits: '0', WarrantyEnd: '0', PurchaseAmount: '0', POReference: '', lastPurchaseAmount: '',
  });

  const [isFocusedAssetTypeDesc, setIsFocusedAssetTypeDesc] = useState(
    false
  );
  const [isFocusedManufacturer, setIsFocusedManufacturer] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  // Time section 
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
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
  // PurchaseDate
  const [PurchaseDate, setPurchaseDate] = useState(null);
  const [showPickerPurchaseDate, setShowPickerPurchaseDate] = useState(false);
  const onChangePurchaseDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPickerPurchaseDate(Platform.OS === 'ios');
    setPurchaseDate(currentDate);
  };
  const showDatepickerPurchaseDate = () => {
    setShowPickerPurchaseDate(true);
  };
  // Last Purchase Date
  const [LastPurchaseDate, setLastPurchaseDate] = useState(null);
  const [showPickerLastPurchaseDate, setShowPickerLastPurchaseDate] = useState(false);
  const onChangeLastPurchaseDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPickerLastPurchaseDate(Platform.OS === 'ios');
    setLastPurchaseDate(currentDate);
  };
  const showDatepickerLastPurchaseDate = () => {
    setShowPickerLastPurchaseDate(true);
  };
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
  const [assetTypelist, setassetTypelist] = useState([]);
  const [assetSubCategorylist, setassetSubCategorylist] = useState([]);
  const [assetCategorylist, setassetCategorylist] = useState([]);
  const [AssetItemGrouplist, setAssetItemGrouplist] = useState([]);
  const [WarrentyPeriodlist, setWarrentyPeriodlist] = useState([]);
  const [Unitscodelist, setUnitscodelist] = useState([]);
  const [Vendorcodelist, setVendorcodelist] = useState([]);

  useEffect(() => {
    axios.get(`/api/AssetType_GET_LIST`).then((res) => {
      setassetTypelist(res.data.recordsets[0])
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
    axios.get(`/api/AssetItemGroup_GET_LIST`).then((res) => {
      setAssetItemGrouplist(res.data.recordsets[0])
    }).catch((err) => {
      console.log(err);
    });
    axios.get(`/api/WarrantyPeriod_GET_LIST`).then((res) => {
      setWarrentyPeriodlist(res.data.recordsets[0])
    }).catch((err) => {
      console.log(err);
    });
    axios.get(`/api/MaterialUnits_GET_LIST`).then((res) => {
      setUnitscodelist(res.data.recordsets[0])
    }).catch((err) => {
      console.log(err);
    });
    axios.get(`/api/Filter_VendorMaster`).then((res) => {
      setVendorcodelist(res.data.recordsets[0])
    }).catch((err) => {
      console.log(err);
    });
  }, [])

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
      }).catch((err) => {
        console.log(err);;
      });

    axios.get(`/api/AssetType_GET_BYAssetType/${Deptnale}`)
      .then((res) => {
        if (res.data.recordset && res.data.recordset.length > 0) {
          const responseData = res.data.recordset[0];
          setvalue((prevValue) => ({
            ...prevValue,
            AssetCategory: responseData.AssetCategory || '',
          }));
        } else {
          setvalue((prevValue) => ({
            ...prevValue,
            AssetCategory: '',
          }));
        }
      }).catch((err) => {
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
  }
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
  const handleProvinceChangeUnitscode = (selectedValue) => {
    const Deptnale = selectedValue.MaterialUnitCode;
    setvalue((prevValue) => ({
      ...prevValue,
      Units: Deptnale,
    }));
    axios.get(`/api/MaterialUnits_GET_BYID/${Deptnale}`)
      .then((res) => {
        if (res.data.recordset && res.data.recordset.length > 0) {
          const responseData = res.data.recordset[0];
          setvalue((prevValue) => ({
            ...prevValue,
            UnitsDescriptions: responseData.MaterialUnitDesc || '',
          }));
        } else {
          setvalue((prevValue) => ({
            ...prevValue,
            UnitsDescriptions: '',
          }));
        }
      })
      .catch((err) => {
        console.log(err);;
      });
  }
  const handleProvinceChangeVendorcode = (selectedValue) => {
    const Deptnale = selectedValue.VendorID;
    setvalue((prevValue) => ({
      ...prevValue,
      VendorID: selectedValue.VendorID,
    }));
    axios.get(`/api/VendorMaster_GET_BYID/${Deptnale}`)
      .then((res) => {
        if (res.data.recordset && res.data.recordset.length > 0) {
          const responseData = res.data.recordset[0];
          setvalue((prevValue) => ({
            ...prevValue,
            VendorName: responseData.VendorName || '',
          }));
        } else {
          setvalue((prevValue) => ({
            ...prevValue,
            VendorName: '',
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

  const getapi = () => {
    axios.get(`/api/AssetsMaster_GET_BYID/${AssetItemDescription}`)
      .then((res) => {
        const AssetCategory = res.data.recordset[0].AssetCategory
        const AssetType = res.data.recordset[0].AssetType
        const AssetItemGroup = res.data.recordset[0].AssetItemGroup
        const AssetSubCategory = res.data.recordset[0].AssetSubCategory
        const PurchaseAmount = res.data.recordset[0].PurchaseAmount
        const WarrantyPeriod = res.data.recordset[0].WarrantyPeriod
        const LastVendorID = res.data.recordset[0].LastVendorID
        const MaterialUnitCode = res.data.recordset[0].MaterialUnitCode
        const OnHandQty = res.data.recordset[0].OnHandQty
        const ReOrderLevel = res.data.recordset[0].ReOrderLevel
        const MinimumOrderLevel = res.data.recordset[0].MinimumOrderLevel
        const MaximumOrderLevel = res.data.recordset[0].MaximumOrderLevel
        const LastPOReference = res.data.recordset[0].LastPOReference
        const LastPOQty = res.data.recordset[0].LastPOQty
        const Warranty = res.data.recordset[0].Warranty
        const PurchaseDate = res.data.recordset[0].PurchaseDate;
        const lastPurchaselaat = res.data.recordset[0].LastPurchaseDate;
        const WarrantyStartDate = res.data.recordset[0].WarrantyStartDate;
        const WarrantyEndDate = res.data.recordset[0].WarrantyEndDate;

        const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());

        const parseDate = (dateString) => {
          const parsedDate = Date.parse(dateString);
          return !isNaN(parsedDate) ? new Date(parsedDate) : null;
        };

        setLastPurchaseDate(
          isValidDate(lastPurchaselaat) ? new Date(lastPurchaselaat) : parseDate(lastPurchaselaat)
        );
        setDateEndDatetime(
          isValidDate(WarrantyEndDate) ? new Date(WarrantyEndDate) : parseDate(WarrantyEndDate)
        );
        setPurchaseDate(
          isValidDate(PurchaseDate) ? new Date(PurchaseDate) : parseDate(PurchaseDate)
        );
        setDate(
          isValidDate(WarrantyStartDate) ? new Date(WarrantyStartDate) : parseDate(WarrantyStartDate)
        );

        const apiImage = res.data.recordsets[0][0].AssetImage;
        if (apiImage) {
          setImage({ uri: apiImage });
        } else {
          setImage(require('./../../Image/printer.jpeg'));
        }
        setvalue((prevValue) => ({
          ...prevValue,
          AssetCategoryCode: AssetCategory,
          AssetItemDescription: res.data.recordset[0].AssetItemDescription,
          AssetType: AssetType,
          AssetItemGroup: AssetItemGroup,
          AssetSubCategory: AssetSubCategory,
          PurchasedAmount: PurchaseAmount.toString(),
          WarrentyPeriod: WarrantyPeriod,
          VendorID: LastVendorID,
          Units: MaterialUnitCode,
          OnHandQty: OnHandQty.toString(),
          ReOrderQtyLevel: ReOrderLevel.toString(),
          MinimumLevel: MinimumOrderLevel.toString(),
          MaximumLevel: MaximumOrderLevel.toString(),
          POReference: LastPOReference,
          LastPOQty: LastPOQty.toString(),
          Warranty: Warranty,
          Brand: res.data.recordset[0].Brand,
          Model: res.data.recordset[0].Model,
          Manufacturer: res.data.recordset[0].Manufacturer,
          POQtyUnits: res.data.recordset[0].LastPOQty.toString(),
          WarrantyEnd: res.data.recordset[0].Warranty.toString(),
          WarrantyPeriodCode: res.data.recordset[0].WarrantyPeriod,
          lastPurchaseAmount: res.data.recordset[0].LastPOAmount.toString()
        }));
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
        axios.get(`/api/AssetType_GET_BYID/${AssetType}`).then((res) => {
          ;
          setvalue((prevValue) => ({
            ...prevValue,
            AssetTypeDesc: res.data.recordset[0].AssetTypeDesc,
          }));
        }).catch((err) => {
          console.log(err);;
        });
        axios.get(`/api/MaterialUnits_GET_BYID/${MaterialUnitCode}`).then((res) => {
          if (res.data.recordset && res.data.recordset.length > 0) {
            const responseData = res.data.recordset[0];
            setvalue((prevValue) => ({
              ...prevValue,
              UnitsDescriptions: responseData.MaterialUnitDesc || '',
            }));
          } else {
            setvalue((prevValue) => ({
              ...prevValue,
              UnitsDescriptions: '',
            }));
          }
        }).catch((err) => {
          console.log(err);;
        });
        axios.get(`/api/VendorMaster_GET_BYID/${LastVendorID}`).then((res) => {
          if (res.data.recordset && res.data.recordset.length > 0) {
            const responseData = res.data.recordset[0];
            setvalue((prevValue) => ({
              ...prevValue,
              VendorName: responseData.VendorName || '',
            }));
          } else {
            setvalue((prevValue) => ({
              ...prevValue,
              VendorName: '',
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


  const formData = new FormData();
  const imageUri = image && typeof image === 'object' ? image.uri : image;
  formData.append('AssetItemGroup', value.AssetItemGroup);
  formData.append('AssetType', value.AssetType);
  formData.append('AssetCategory', value.AssetCategoryCode);
  formData.append('AssetSubCategory', value.AssetSubCategory);
  formData.append('Manufacturer', value.Manufacturer);
  formData.append('Model', value.Model);
  formData.append('Brand', value.Brand);
  formData.append('PurchaseDate', PurchaseDate);
  formData.append('PurchaseAmount', value.PurchaseAmount);
  formData.append('WarrantyPeriod', value.WarrantyPeriodCode);
  formData.append('WarrantyStartDate', date);
  formData.append('WarrantyEndDate', dateEndDatetime);
  formData.append('Warranty', value.WarrantyEnd);
  formData.append('OnHandQty', value.OnHandQty);
  formData.append('ReOrderLevel', value.ReOrderQtyLevel);
  formData.append('MinimumOrderLevel', value.MinimumLevel);
  formData.append('MaximumOrderLevel', value.MaximumLevel);
  formData.append('MaterialUnitCode', value.POQtyUnits);
  formData.append('LastPOReference', value.POReference);
  formData.append('LastPOAmount', value.lastPurchaseAmount);
  formData.append('LastPOQty', value.POQtyUnits);
  formData.append('LastVendorID', value.VendorID);
  formData.append('LastPurchaseDate', LastPurchaseDate);
  formData.append('Details_Remarks_Notes', 'sjdksd');
  if (imageUri) {
    formData.append('AssetImage', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'asset_image.jpg',
    });
  }
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const postapi = () => {
    axios.put(`/api/AssetsMaster_Put/${AssetItemDescription}`, formData, config)
      .then((res) => {
        showSuccessAlert(true)
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
            Asset Masterlist-Update
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
        {/* Asset Item Description */}
        <View style={styles.inputContainerdesc}>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset Item Description
            </Text>
            <TextInput
              style={[
                styles.inputBoxdescription,
                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' },
              ]}
              value={value.AssetItemDescription}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  AssetItemDescription: item
                }));
              }}
              editable={false}
              placeholder="Enter Asset Item Description"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
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
        {/* Asset Type and Asset Type Desc  */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset Type
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
              data={assetTypelist}
              maxHeight={200}
              labelField="AssetTypeCode"
              valueField="AssetTypeCode"
              placeholder={'Select asset type'}
              value={value.AssetType}
              onChange={handleProvinceChangeassetType}

            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Asset Type Desc
            </Text>
            <TextInput
              style={[
                styles.inputBox,
                { borderColor: isFocusedAssetTypeDesc ? '#1D3A9F' : '#94A0CA' },
              ]}
              value={value.AssetTypeDesc}
              onChange={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  AssetTypeDesc: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Enter Description"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              onFocus={() => {
                setIsFocusedAssetTypeDesc(true);
              }}
              onBlur={() => {
                setIsFocusedAssetTypeDesc(false);
              }}
            />
          </View>

        </View>
        <View style={styles.line} />

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
        {/* Brand*/}
        <View style={styles.inputContainer}>

          <View style={styles.Brand}>
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

          <View style={styles.singleinputlable} />

        </View>
        {/* Purchase Date and Purchased Amount */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Purchase Date
            </Text>

            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.inputBox, { position: 'relative' }]}
                  placeholder="dd/mm/yyyy -:- --"
                  editable={true}
                  value={PurchaseDate ? PurchaseDate.toISOString().split('T')[0] : 'YYYY-MM-DD'}
                />
                <TouchableOpacity
                  onPress={showDatepickerPurchaseDate}
                  style={styles.iconcontainer}
                >
                  <AntDesign name="calendar" size={20} color="white" />
                </TouchableOpacity>
              </View>
              {showPickerPurchaseDate &&
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={PurchaseDate || new Date()}
                    mode="date"
                    is24Hour={true}
                    format="YYYY-MM-DD"
                    display="default"
                    onChange={onChangePurchaseDate}
                  />
                </View>}
            </View>
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Purchased Amount
            </Text>
            <TextInput
              style={[styles.inputBox,]}
              value={value.PurchasedAmount}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  PurchasedAmount: item
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
        {/* Warranty Period and Warranty Start Date */}
        <View style={styles.inputContainer}>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Warranty Period
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
              data={WarrentyPeriodlist}
              maxHeight={200}
              labelField="WarrantyPeriodCode"
              valueField="WarrantyPeriodCode"
              placeholder={'Warranty Period'}
              value={value.WarrantyPeriodCode}
              onChange={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  WarrantyPeriodCode: item?.value || '',
                }));
              }}
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Warranty Start Date
            </Text>

            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.inputBox, { position: 'relative', }]}
                  value={date ? date.toISOString().split('T')[0] : 'YYYY-MM-DD'}
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
                    value={date || new Date()}
                    mode="date"
                    format="YYYY-MM-DD"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                </View>
              )}
            </View>

          </View>

        </View>
        {/* Warranty End Date*/}
        <View style={styles.warranty}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Warranty End Date
            </Text>

            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.inputBox, { position: 'relative', }]}
                  value={dateEndDatetime ? dateEndDatetime.toISOString().split('T')[0] : 'YYYY-MM-DD'}
                  editable={false}
                />
                <TouchableOpacity onPress={showDatepickerEndDatetime} style={styles.iconcontainerwarrantdata}>
                  <AntDesign name="calendar" size={20} color="white" />
                </TouchableOpacity>
              </View>
              {showPickerEndDatetime && (
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={dateEndDatetime || new Date()}
                    mode="date"
                    format="YYYY-MM-DD"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeEndDatetime}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.singleinputlable} />

        </View>
        {/* On Hand Qty and Re-Order Qty Level */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              On Hand Qty
            </Text>
            <TextInput
              style={[styles.inputBox,]}
              value={value.OnHandQty}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  OnHandQty: item
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
              Re-Order Qty Level
            </Text>
            <TextInput
              style={[styles.inputBox,]}
              value={value.ReOrderQtyLevel}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  ReOrderQtyLevel: item,
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
        {/* Minimum Level and Maximum Level */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Minimum Level
            </Text>
            <TextInput
              style={[styles.inputBox,]}
              value={value.MinimumLevel}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  MinimumLevel: item,
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
              Maximum Level
            </Text>
            <TextInput
              style={[styles.inputBox,]}
              value={value.MaximumLevel}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  MaximumLevel: item,
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
        {/* Units and Units Description */}
        <View style={styles.inputContainer}>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Units
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
              data={Unitscodelist}
              maxHeight={200}
              labelField="MaterialUnitCode"
              valueField="MaterialUnitCode"
              placeholder={'Select Units'}
              value={value.Units}
              onChange={handleProvinceChangeUnitscode}
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Units Description
            </Text>
            <TextInput
              style={[styles.inputBox]}
              value={value.UnitsDescriptions}
              onChange={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  UnitsDescriptions: item.value, // Update the Employeeid property
                }));
              }}
              placeholder="Units Description"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
            />
          </View>

        </View>
        <View style={styles.line} />
        {/* P.O Reference and Last Purchase Date */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Last Purchase Date
            </Text>

            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.inputBox, { position: 'relative' }]}
                  placeholder="dd/mm/yyyy -:- --"
                  editable={true}
                  value={LastPurchaseDate ? LastPurchaseDate.toISOString().split('T')[0] : 'YYYY-MM-DD'}
                />
                <TouchableOpacity
                  onPress={showDatepickerLastPurchaseDate}
                  style={styles.iconcontainer}
                >
                  <AntDesign name="calendar" size={20} color="white" />
                </TouchableOpacity>
              </View>
              {showPickerLastPurchaseDate &&
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={LastPurchaseDate || new Date()}
                    mode="date"
                    is24Hour={true}
                    format="YYYY-MM-DD"
                    display="default"
                    onChange={onChangeLastPurchaseDate}
                  />
                </View>}
            </View>
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              P.O Reference
            </Text>
            <TextInput
              style={[styles.inputBox,]}
              value={value.POReference}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  POReference: item,
                }));
              }}
              placeholder="xxx xxx xxx"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"

            />
          </View>

        </View>
        {/*  Purchase Amount and P.O Qty Units */}
        <View style={styles.inputContainer}>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Purchase Amount
            </Text>
            <TextInput
              style={[styles.inputBox,]}
              value={value.lastPurchaseAmount}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  lastPurchaseAmount: item,
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
              P.O Qty Units
            </Text>
            <TextInput
              style={[styles.inputBox,]}
              value={value.POQtyUnits}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  POQtyUnits: item
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
        {/*   Warranty End  */}
        <View style={styles.inputContainer}>

          <View style={styles.Brand}>
            <Text style={styles.lableinput}>
              Warranty End
            </Text>
            <TextInput
              style={[styles.inputBox,]}
              value={value.WarrantyEnd}
              onChangeText={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  WarrantyEnd: item
                }));
              }}
              placeholder="0"
              placeholderTextColor="#94A0CA"
              selectionColor="#1D3A9F"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.singleinputlable} />

        </View>
        {/*  Vendor Code and Vendor Name */}
        <View style={styles.inputContainer}>
          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Vendor Code
            </Text>
            <Dropdown
              style={[styles.inputBox, { height: 40 },]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={Vendorcodelist}
              maxHeight={200}
              labelField="VendorID"
              valueField="VendorID"
              placeholder={'Select Vendor Code'}
              value={value.VendorID}
              onChange={handleProvinceChangeVendorcode}
            />
          </View>

          <View style={styles.singleinputlable}>
            <Text style={styles.lableinput}>
              Vendor Name
            </Text>
            <TextInput
              style={[styles.inputBox]}
              value={value.VendorName}
              onChange={item => {
                setvalue(prevValue => ({
                  ...prevValue,
                  VendorName: item.value,
                }));
              }}
              placeholder="Vendor Name"
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
        {/* Button section */}
        <View style={[styles.inputContainerbutton, { marginTop: 12 }]}>
          <Button radius={"md"} type="solid"
            buttonStyle={{
              backgroundColor: 'black',
              borderRadius: 3,
            }}
            onPress={() => { navigation.goBack() }}
          >
            <Ionicons name="arrow-back-circle" size={20} color="white" style={{ marginRight: 12 }} />
            Back
          </Button>
          <Button
            radius={'md'}
            type="solid"
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

        </View>
        <AwesomeAlert
          show={showAlert}
          title={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="ios-checkmark-circle" size={30} color="#4CAF50" style={{ marginRight: 5 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Success</Text>
            </View>
          }
          message={`Assets Master ${AssetItemDescription} has been Updated`}
          confirmButtonColor="#DD6B55"
          confirmButtonStyle={{ backgroundColor: 'black' }}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          onConfirmPressed={() => {
            navigation.navigate('AssetManagementMasterList')
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
  inputContainerbutton: {
    flexDirection: 'row',
    paddingBottom: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
});

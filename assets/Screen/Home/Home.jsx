// Home.js

import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Home = () => {

    const navigation = useNavigation();
    return (

        <ScrollView contentContainerStyle={styles.containerscrollview}>
          
            {/* menue secontion */}
            <View style={styles.topborder}>
                <View style={styles.imgrow}>
                    <View style={styles.imgsingle}>
                        <TouchableOpacity onPress={() => navigation.navigate('Workrequest')}>

                        <Image
                            source={require('../Image/worksrequest.png')}
                            style={styles.image}
                            resizeMode="cover" 
                        />
                        <Text style={styles.prograp}>Work Request</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/worksorders.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Work Order</Text>
                    </View>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/Preventive.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Preventive Maintenance</Text>
                    </View>

                </View>

                <View style={styles.imgrow}>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/cleaningwork.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Cleaning Works</Text>
                    </View>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/Locationmanagment.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Location Management</Text>
                    </View>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/Assetmanagment.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Asset Management</Text>
                    </View>

                </View>

                <View style={styles.imgrow}>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/usermanagment.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>User Management</Text>
                    </View>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/Purchasingmangment.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Purchasing Management</Text>
                    </View>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/Warehousemanagment.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Warehouse Management</Text>
                    </View>

                </View>

                <View style={styles.imgrow}>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/Spacemanagment.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Space Management</Text>
                    </View>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/setupconfiguration.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Set Up & Configuration</Text>
                    </View>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/Dashboard.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Dashboard</Text>
                    </View>

                </View>

                <View style={styles.imgrow}>
                    <View style={styles.imgsingle}>
                        <Image
                            source={require('../Image/Reports.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.prograp}>Reports</Text>
                    </View>
                    <View style={styles.imgsingle} >
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Image
                                source={require('../Image/Logout.png')}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <Text style={styles.prograp}>Log Out</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerscrollview: {
        paddingTop: 30,
        // marginTop: 30,
    },
    imagelog:{
width:200
    },
    imgrow: {
        display: 'flex',
        width: '100%',
        marginTop:10,
        marginLeft: 5,
        flexDirection: 'row',
        // justifyContent: 'space-around', // Adjust as needed
    },
    imgsingle: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topborder: {
        borderColor: "#94A0CA",
        borderWidth: 1, // Border width
        borderRadius: 5,
        paddingBottom:20
    },
    prograp: {
        color: '#1E3B8B',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        textAlign:'center'
    },
});

export default Home;




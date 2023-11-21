import React, { useState, useRef } from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // If using Expo, otherwise import from 'react-native-vector-icons/Ionicons';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedemail, setisFocusedemail] = useState(false)
    const secondInputRef = useRef(null);

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const focusNextInput = () => {
        if (secondInputRef.current) {
            secondInputRef.current.focus();
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.containerscrollview}>
            <View style={styles.container} >
                <View style={styles.topeimgesection}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../Image/log.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Image
                            source={require('../Image/log1.png')}
                            style={styles.imagesecondlog}
                            resizeMode="cover"
                        />
                        <Text className='color1 workitoppro my-auto' style={styles.heading}>FACILITY MANAGEMENT SYSTEMS
                        </Text>
                    </View>
                </View>
                <View style={styles.topborder}>
                    {/* text second  */}
                    <View className="d-flex justify-content-between my-auto">
                        <Text className='color1 workitoppro my-auto' style={styles.prograp}>Welcome Back FMS
                        </Text>
                    </View>
                    {/* Email second */}
                    <View style={styles.inputContainer}>
                        <Entypo name="email" size={22} color="black" style={{ position: 'absolute', marginLeft: 3 }} />
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocusedemail ? '#1D3A9F' : '#94A0CA' }, // Dynamic border color
                            ]}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder="User ID"
                            placeholderTextColor="#94A0CA"
                            selectionColor="#fff"
                            keyboardType="email-address"
                            underlineColorAndroid="transparent"
                            onFocus={(() => {
                                setisFocusedemail(true);
                            })}
                            onBlur={(() => {
                                setisFocusedemail(false);
                            })}
                            onSubmitEditing={focusNextInput}
                        />
                    </View >
                    {/* Password second */}
                    <View style={styles.inputContainer}>
                        <AntDesign name="lock" size={24} color="black" style={{ position: 'absolute' }} />
                        <TextInput
                            style={[
                                styles.inputBox,
                                { borderColor: isFocused ? '#1D3A9F' : '#94A0CA' }, // Dynamic border color
                            ]}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={!showPassword}
                            placeholder="Enter Password"
                            placeholderTextColor="#94A0CA"
                            ref={secondInputRef}
                            underlineColorAndroid="transparent"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="#94A0CA"
                            />
                        </TouchableOpacity>
                    </View>
                    {/* Forgot passwaord second */}
                    <TouchableOpacity style={styles.ForgotPasswordview}><Text style={styles.ForgotPassword}>Forgot Password?</Text></TouchableOpacity>
                    {/* Login button */}
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerscrollview: {
        paddingTop: 40,
        marginTop: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
        marginBottom: 10,
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        left: '76%'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Set width to 100%
        marginBottom: 30,
    },
    imagesecondlog: {
        width: 120,
        height: 100,
        marginTop: 30
    },
    heading: {
        color: '#1E3B8B',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 30
    },

    topborder: {
        width: '99%', // Set width to 100%
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#94A0CA",
        borderWidth: 1, // Border width
        borderRadius: 5,
    },
    prograp: {
        color: '#1E3B8B',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        margin: 20
    },
    inputBox: {
        width: 299,
        borderRadius: 5,
        paddingHorizontal: 15,
        borderColor: "#94A0CA",
        borderWidth: 1, // Border width
        fontSize: 15,
        color: 'black',
        marginVertical: 9,
        paddingLeft: 30,
        paddingTop: 7,
        paddingBottom: 7,
    },
    ForgotPasswordview: {
        width: '90%',
        marginBottom: 20,
    },
    ForgotPassword: {
        color: '#1E3B8B',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        width: '100%',
        textAlign: 'right',
    },
    button: {
        width: 299,
        backgroundColor: '#1D3A9F',
        borderRadius: 24,
        marginVertical: 9,
        paddingVertical: 11,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
});

export default Login;

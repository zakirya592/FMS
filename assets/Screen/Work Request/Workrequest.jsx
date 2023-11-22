import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '@rneui/themed';
import { Icon } from '@rneui/themed';
export default function Workrequest() {
    return (
        <View>
            <Text>Workrequest</Text>
            <View style={styles.buttonsection} >
                <Button radius={"md"} type="solid" containerStyle={{
                    width: 150,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                >
                    Update
                </Button>
                <Button radius={"md"} type="outline" containerStyle={{
                    width: 150,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                >
                    <Icon name="add" color="#0A2DAA" size={15} style={styles.outlineIcon} />
                    Create
                </Button>
            </View>
            <View style={styles.buttonsection} >
                <Button radius={"md"} type="outline" containerStyle={{
                    width: 150,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                >
                    <Icon name="print" color="#0A2DAA" size={20} style={{ marginRight: 7 }} />
                    Print
                </Button>
                <Button radius={"md"} type="outline" containerStyle={{
                    width: 150,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                >
                    {/* <Icon name="file_download" color="#0A2DAA" size={15} /> */}
                    Export
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsection: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    outlineIcon: {
        borderWidth: 1, // You can customize the border properties as needed
        borderRadius: 15, // Adjust the border radius to match the filled icon
        marginRight: 10, // Add spacing between the two icons
    },
})

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView,} from 'react-native';
import {Button} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

export default function Workrequest () {
  const navigation = useNavigation ();

  return (
    <ScrollView>
      <View style={{marginTop: '30%'}}>
        <View style={{display: 'flex', margin: 'auto 0'}}>
          <Text style={styles.prograp}>
            Select Purchase Management
          </Text>
          <View>
            <Button
              onPress={() => navigation.navigate ('Purchaserequesttable')}
              radius={'md'}
              type="solid"
              containerStyle={{
                width: 250,
                marginHorizontal: 50,
                marginVertical: 40,
              }}
            >
              Purchase Requests
            </Button>

          </View>
          <View>
            <Button
              onPress={() => navigation.navigate ('PurchaseOrdertable')}
              radius={'md'}
              type="solid"
              containerStyle={{
                width: 250,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            >
             Purchase Orders
            </Button>

          </View>
<View>
            <Button
              onPress={() => navigation.navigate ('GoodReceiptable')}
              radius={'md'}
              type="solid"
              containerStyle={{
                width: 250,
                marginHorizontal: 50,
                marginVertical: 40,
              }}
            >
             Goods Receipts
            </Button>

          </View>
          <View>
            <Button
              onPress={() => navigation.navigate ('GoodReturntable')}
              radius={'md'}
              type="solid"
              containerStyle={{
                width: 250,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            >
              Goods Returns
            </Button>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create ({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

  prograp: {
    color: '#1E3B8B',
    fontSize: 16,
    fontStyle: 'normal',
      fontWeight: '600',
    
    marginHorizontal: 60,
    marginVertical: 10,
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
  item: {
    // borderColor: "#0A2DAA",
    // borderWidth: 1, // Border width
    // borderRadius:5
  },
  tablebody: {
    borderColor: '##9384EB',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionstitle: {
    fontSize: 14,
    marginRight: 5,
    color: '#0A2DAA',
    fontWeight: '700',
  },
});

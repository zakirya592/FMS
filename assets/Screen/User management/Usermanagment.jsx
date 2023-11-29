import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button} from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function Usermanagment() {

    const navigation = useNavigation();
  return (
    <View>
          <Text style={styles.prograp}>Select Transactions
          </Text>
          {/* System Modules */}
          <Button radius={"md"} type="solid" containerStyle={{
              paddingHorizontal: 12,
              marginBottom: 10,
              marginTop: 30,
          }}
              buttonStyle={{
                  backgroundColor: '#0A2DAA',
                  borderRadius: 3,
              }}
              onPress={() => navigation.navigate('Systemmodules')}
          >
              System Modules
          </Button>
          {/* User Authority Levels */}
          <Button radius={"md"} type="solid" containerStyle={{
              paddingHorizontal: 12,
              marginBottom: 10,
              marginTop: 30,
          }}
              buttonStyle={{
                  backgroundColor: '#0A2DAA',
                  borderRadius: 3,
              }}
          onPress={() => navigation.navigate('Userauthoritylevels')}
          >
              User Authority Levels
          </Button>
          {/* User Credientials */}
          <Button radius={"md"} type="solid" containerStyle={{
              paddingHorizontal: 12,
              marginBottom: 10,
              marginTop: 30,
          }}
              buttonStyle={{
                  backgroundColor: '#0A2DAA',
                  borderRadius: 3,
              }}
          // onPress={() => navigation.navigate('CreateWorkOrderNumber')}
          >
              User Credientials
          </Button>
          {/* User System Access */}
          <Button radius={"md"} type="solid" containerStyle={{
              paddingHorizontal: 12,
              marginBottom: 10,
              marginTop: 30,
          }}
              buttonStyle={{
                  backgroundColor: '#0A2DAA',
                  borderRadius: 3,
              }}
          // onPress={() => navigation.navigate('CreateWorkOrderNumber')}
          >
              User System Access
          </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    prograp: {
        color: '#1E3B8B',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign:'center',
        marginTop:60,
        marginBottom:20,
    },
})
import React from 'react'
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SplashScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', width: '80%', height: '10%', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon name="question-circle-o" size={30} color="black" onPress={() => navigation.navigate('Help')} />
            </View>
            <View style={{ flex: 1, height: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>Contract Builder</Text>
                <View>
                    <Text style={{ fontSize: 10 }}>you can build a contract file regularly...</Text>
                    <Text style={{ fontSize: 10 }}>you need your id card image...</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', height: '20%', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: '30%', marginLeft: '5%', marginRight: '5%' }}>
                </View>
                <View style={{ width: '30%', marginLeft: '5%', marginRight: '5%' }}>
                    <Button title="Next" onPress={() => navigation.navigate("Contract")} >
                        START
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default SplashScreen;

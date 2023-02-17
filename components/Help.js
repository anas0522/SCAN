import { View, Button, Text } from 'react-native';
import React from 'react'

const HelpScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, width: '80%', height: '80%', alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <Text style={{ fontSize: 20, marginBottom: 20 }}><Text style={{ fontWeight: 'bold' }}>First</Text>, you need to upload a contract file.</Text>
                    <Text style={{ fontSize: 20, marginBottom: 20 }}><Text style={{ fontWeight: 'bold' }}>Next</Text>, please upload or capture the image of your ID Card.</Text>
                    <Text style={{ fontSize: 20, marginBottom: 20 }}><Text style={{ fontWeight: 'bold' }}>Then</Text>, you have to fill all the fields.</Text>
                    <Text style={{ fontSize: 20, marginBottom: 20 }}><Text style={{ fontWeight: 'bold' }}>Finally</Text>, you can be able to send the completed contract to others using email or whatsapp</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', height: '20%', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: '30%', marginLeft: '5%', marginRight: '5%' }}>
                    <Button title="Prev" onPress={() => navigation.goBack()} />
                </View>
                <View style={{ width: '30%', marginLeft: '5%', marginRight: '5%' }}>
                </View>
            </View>
        </View>
    )
}

export default HelpScreen;

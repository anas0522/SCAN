import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Linking,Button } from 'react-native'
import { openComposer } from "react-native-email-link";
const SendEmail = ({ to, email2, subject, body }) => {
    const handleEmail = () => {
        setTimeout(() => {
            openComposer({
                to: email2,
                subject,
                body,
            });
        }, 1000)
        openComposer({
            to,
            subject,
            body,
        });
    }
    return (
        <View>
            <Button onPress={handleEmail} title="SEND"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        display: 'flex',
        width: '90%',
        maxWidth:'100%',
        position:'absolute',
        marginTop:'50%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
})
export default SendEmail;

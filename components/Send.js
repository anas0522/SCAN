import * as React from 'react';
import SendEmail from '../sendEmail';
import { View, Text, Button, TextInput, } from 'react-native';
import sendWhatsApp from '../whastapp'


function SendScreen() {


    const [emailA, setEmailA] = React.useState("")
    const [selectedForm, setSelectedForm] = React.useState("")
    const [emailB, setEmailB] = React.useState("")
    const [number1, setNumber1] = React.useState()
    const [number2, setNumber2] = React.useState()
    var dataSend = "2222";
    
    return (
      <View style={{ justifyContent: 'center', flexDirection: 'column', marginLeft: '15%' }}>
        <View style={{ marginTop: '5%' }}>
          <Text style={{ fontSize: 20 }}>Email</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: '10%' }}>Company</Text>
            <TextInput value={emailA} onChangeText={setEmailA} style={{ borderBottomWidth: 1, width: '50%', marginLeft: '5%', marginTop: '6%' }} placeholder="" /></View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: '10%',marginLeft:'3%' }}>Client</Text>
            <TextInput value={emailB} onChangeText={setEmailB}  style={{ borderBottomWidth: 1, width: '50%', marginLeft: '8%', marginTop: '6%' }} placeholder="" /></View>
          
          <View style={{maxWidth:'80%',marginTop:'7%'}}>
          <SendEmail to={emailA} subject={selectedForm} email2={emailB} body={dataSend} /></View>
        </View>
        <View style={{ marginTop: '20%' }}>
          <Text style={{ fontSize: 20 }}>Whatsapp</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: '10%' }}>Company</Text>
            <TextInput value={number2} onChangeText={setNumber2} style={{ borderBottomWidth: 1, width: '50%', marginLeft: '5%', marginTop: '6%' }} placeholder="" /></View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: '10%',marginLeft:'3%' }}>Client</Text>
            <TextInput value={number1} onChangeText={setNumber1} style={{ borderBottomWidth: 1, width: '50%', marginLeft: '8%', marginTop: '6%' }} placeholder="" /></View>
          <View style={{maxWidth:'80%',marginTop:'7%'}}>
          <Button title='SEND' onPress={() => sendWhatsApp(dataSend, number1,number2)}></Button></View>
        </View>
      </View>
    );
  }

export default SendScreen
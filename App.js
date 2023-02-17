// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HelpScreen from './components/Help';
import SplashScreen from './components/Splash'
import { View, Text, Button, Image, TouchableOpacity, PermissionsAndroid, ScrollView, TextInput, RefreshControl } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'
import TextRecognition from 'react-native-text-recognition';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome'
import Mailer from 'react-native-mail';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
//First project I did it using React Native to client by Freelancer Website
//I know its wrong now to put "var" cuz we should use const or states
var resultBefore = ''
var resultFile = "";
var LASTNAMEGET; var LASTNAMEGET2; var res_LASTNAMEGET;
var FIRSTNAMEGET; var FIRSTNAMEGET2; var res_FIRSTNAMEGET;
var ADDRESSGET; var ADDRESSGET2; var res_ADDRESSGET;
var CNPGET; var CNPGET2; var res_CNPGET;
var resultImage;
var resultString;
var NAMEGET;
var NRGET;
var NRGET2;
var nameRes = ""
var resultNR;
var reamin_file = ''
var array_placeholder = []
var array_end = []
var array_start = []
var auto_array = [] // @
var array_ = []
var manual_array = [] // !
var contras1;
var contra = ""
var resultDATE;
var dataSend = "";
var EXPIRED;
var EXPIRED2;
var resultEXPIRED;
var local_path;
function ReadImage({ navigation }) {
  const [image, SetImage] = React.useState()
  const [loadImage, setLoadImage] = React.useState(false)
  const [isParsed, setParsingFinished] = React.useState(false)
  const [dManualArray, setManualArray] = React.useState([])
  var file__;
  const createPDF = async () => {
    var options = {
      html: `<div style ="font-size:25px;width:700;height;860;margin:auto;"><h1 style="width:100%;text-align:center;font-size:40;font-weight:bold;">Contract</h1><br/><pre style="white-space:pre-wrap;">${dataSend}</pre></div>`,
      fileName: 'Contract',
      directory: 'Documents',
      width:716,
      height:925,
    }
    file__ = await RNHTMLtoPDF.convert(options)
    local_path = file__.filePath
    //alert(file__.filePath)
  }
  const requestCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const requestFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "File Permission",
          message:
            "To acess to File",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the File");
      } else {
        console.log("File permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const requestFileWrite = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "File Permission",
          message:
            "To acess to File",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the File");
      } else {
        console.log("File permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  /*
  const [resultNR,setResultNR] = React.useState("")
  const [resultDATE,setResultDATE] = React.useState("")
  const [NAMEGET,setNAMEGET] = React.useState("")
  const [res_ADDRESSGET,setRes_ADDRESSGET] = React.useState("")
  const [resultEXPIRED,setResultEXPIRED] = React.useState("")
  const [res_CNPGET,setRes_CNPGET] = React.useState("")*/
  React.useEffect(() => {
    if (image) {
      //console.log(imageGlobal);
    }
    (async () => {
      if (image) {
        resultImage = (await TextRecognition.recognize(image.assets[0].uri));
        resultString = (JSON.stringify(resultImage))
        console.log(resultString)
        //console.log(resultString.replace(/[]/g, ""));
        NRGET = resultString.search("NR")
        NRGET2 = resultString.search("NR")
        // setResultNR(resultString.slice(NRGET + 2, NRGET2 + 9))
        resultNR = resultString.slice(NRGET + 2, NRGET2 + 9)

        EXPIRED = resultString.search("-")
        EXPIRED2 = resultString.search("-")

        // setResultEXPIRED(resultString.slice(EXPIRED+1, EXPIRED2+11))
        // setResultDATE(new Date().toLocaleDateString())
        resultEXPIRED = resultString.slice(EXPIRED + 1, EXPIRED2 + 11)
        resultDATE = new Date().toLocaleDateString()
        LASTNAMEGET = resultString.search("Last")
        LASTNAMEGET2 = resultString.search("Prenume")
        res_LASTNAMEGET = resultString.slice(LASTNAMEGET + 11, LASTNAMEGET2 - 2)


        FIRSTNAMEGET = resultString.search("First")
        FIRSTNAMEGET2 = resultString.search("Cet")
        res_FIRSTNAMEGET = resultString.slice(FIRSTNAMEGET + 12, FIRSTNAMEGET2 - 2)


        ADDRESSGET = resultString.search("Adresse")
        ADDRESSGET2 = resultString.search("Emisa")
        // setRes_ADDRESSGET(resultString.slice(ADDRESSGET+17,ADDRESSGET2-2))
        res_ADDRESSGET = resultString.slice(ADDRESSGET + 17, ADDRESSGET2 - 2)
        if (res_ADDRESSGET.length >= 70) {
          ADDRESSGET = resultString.search("Adresse")
          ADDRESSGET2 = resultString.search("Sex")
          res_ADDRESSGET = resultString.slice(ADDRESSGET + 17, ADDRESSGET2 - 2)
        }

        NAMEGET = (res_FIRSTNAMEGET + " " + res_LASTNAMEGET)
        CNPGET = resultString.search("CNP")
        CNPGET2 = resultString.search("CNP")
        // setRes_CNPGET(resultString.slice(CNPGET+4,CNPGET2+17))
        res_CNPGET = resultString.slice(CNPGET + 4, CNPGET2 + 17)
        setLoadImage(true)
        loop_()
        loop_2()
        texts_array()
        setParsingFinished(true)
        console.log("manual arrayis:", manual_array)
        //alert(resultFile) // after its looped the resultFile with auto filled already  by loop_()
        //parseFile()
      }
    })();
  }, [image])
  const fromGallery = async () => {
    launchImageLibrary({}, SetImage);
    imageGlobal = image
    bol = true
  }
  const fromCamera = () => {
    requestCamera()
    launchCamera({}, SetImage)
    imageGlobal = image

  }
  const remove_ = (x) => {
    for (let index = 0; index < x.length; index++) {
      const element = x[index];
      if (element == "[") {
        x = x.replace(element, "")
      }
      if (element == "]") {
        x = x.replace(element, "")
      }

    }
    return x
  }
  const loop_ = () => {
    contra = resultFile
    while (contra.indexOf("@") > 0) {
      var start = contra.indexOf("[@")
      var end = contra.indexOf("]")
      var value = contra.slice(start + 3, end - 1)
      if (value == "") {
        contra = contra.slice(end + 1)
      }
      else {
        auto_array.push({ start, end, value })
        if (value == "no") {
          resultFile = resultFile.replace("[@ " + value + " ]", resultNR)
        } else if (value == "date") {
          resultFile = resultFile.replace("[@ " + value + " ]", resultDATE)
        } else if (value == "name") {
          resultFile = resultFile.replace("[@ " + value + " ]", NAMEGET)
        } else if (value == "address") {
          resultFile = resultFile.replace("[@ " + value + " ]", res_ADDRESSGET)
        } else if (value == "cnp") {
          resultFile = resultFile.replace("[@ " + value + " ]", res_CNPGET)
        } else if (value == "expired") {
          resultFile = resultFile.replace("[@ " + value + " ]", resultEXPIRED)
        }
        contra = contra.slice(end + 1)
      }

    }
  }
  
  const loop_2 = () => {
    contras1 = resultFile
    while (contras1.indexOf("!") > 0) {
      var start = contras1.indexOf("[!")
      var end = contras1.indexOf("]")
      var placeholder = contras1.slice(start + 2, end)
      manual_array.push({ start, end, placeholder })
      array_placeholder.push(placeholder)
      array_start.push(start)
      array_end.push(end)
      contras1 = contras1.slice(end + 1)

      setManualArray((dManualArray) => {
        return [...dManualArray, ""]
      })
    }
    array_start.sort(function(a, b){return a-b});
    array_end.sort(function(a, b){return a-b});
  }

  const Picker2 = async () => {
    if (loadImage == true) {
      setLoadImage(false)
    }
    try {
      requestFile()
      requestFileWrite()
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles]
      })
      nameRes = JSON.stringify(res.name)
      nameRes = nameRes.substring(1)
      nameRes = nameRes.slice(0, -1)
      const a = await RNFS.exists(RNFS.DocumentDirectoryPath + '/' + nameRes)
      const b = await RNFS.exists(RNFS.DownloadDirectoryPath + '/' + nameRes)
      const c = await RNFS.exists(RNFS.ExternalDirectoryPath + '/' + nameRes)
      const d = await RNFS.exists(RNFS.CachesDirectoryPath + '/' + nameRes)
      const e = await RNFS.exists(RNFS.ExternalCachesDirectoryPath + '/' + nameRes)
      const f = await RNFS.exists(RNFS.ExternalStorageDirectoryPath + '/' + nameRes)
      const g = await RNFS.exists(RNFS.FileProtectionKeys + '/' + nameRes)
      const h = await RNFS.exists(RNFS.LibraryDirectoryPath + '/' + nameRes)
      const i = await RNFS.exists(RNFS.MainBundlePath + '/' + nameRes)
      const j = await RNFS.exists(RNFS.TemporaryDirectoryPath + '/' + nameRes)



      RNFS.readDir(RNFS.DownloadDirectoryPath)
        .then((statResult) => {
          if (statResult[0].isFile()) {
            if (a) {
              return RNFS.readFile(RNFS.DocumentDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if (b) {
              return RNFS.readFile(RNFS.DownloadDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if (c) {
              return RNFS.readFile(RNFS.ExternalDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if (d) {
              return RNFS.readFile(RNFS.CachesDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if (e) {
              return RNFS.readFile(RNFS.ExternalCachesDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if (f) {
              return RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if (g) {
              return RNFS.readFile(RNFS.FileProtectionKeys + '/' + nameRes, 'utf8');
            }
            else if (h) {
              return RNFS.readFile(RNFS.LibraryDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if (i) {
              return RNFS.readFile(RNFS.MainBundlePath + '/' + nameRes, 'utf8');
            }
            else if (j) {
              return RNFS.readFile(RNFS.TemporaryDirectoryPath + '/' + nameRes, 'utf8');
            }
          }
          return 'no file';
        })
        .then((contents) => {
          console.log("contents", contents);
          resultFile = contents
          resultBefore = contents

        })

    } catch (err) {
      if (DocumentPicker.isCancel) {
        console.log("Canceld")

      } else { console.log("UNKNOW ERROR", err) }
    }
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    try {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    } catch {
      console.log("Hi")
      setRefreshing(false)
    }

  }, []);


  const onHandleManual = (idx, e) => {
    setManualArray((dManualArray) => {
      dManualArray[idx] = e;
      return [...dManualArray]
    })
  }
  const texts_array = () =>{
    
    var xx = resultFile
    var www =0
    while (xx.includes("[!") == true){
    var start = xx.indexOf("[!")
    var end = xx.indexOf("]")
    var placeholder22 = xx.slice(start+2, end)
    console.log("this palce holder: ",placeholder22)
    if (www == 0){
      var text_ = xx.slice(www,end)
    }
    else{
      var text_ = xx.slice(www-1,end)

    }
    text_ = text_.replace('[!'+placeholder22,"")
    
    array_.push(text_)
    xx=xx.replace("[!","")
    xx=xx.replace("]","") 
    www = end
    }
    reamin_file = xx.slice(end,999999999)
    return array_
  }
  const sum_dataSend = () =>{
      inj = 0
      while(inj != array_.length){
        console.log("1 :",array_," 2:",dManualArray)
        dataSend += ' '+array_[inj]+' '+dManualArray[inj]
        inj+=1
      }
    dataSend+=reamin_file
    console.log("this is data to send :",dataSend)
    dataSend = dataSend.replace(/[/\#]/g,'')
    return dataSend
  }

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: '6%', flexDirection: 'row' }}>
      <ScrollView style={{height:'100%'}} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <View style={{ marginLeft: '20%', width: '50%', marginTop: '5%', }}>
          <Icon.Button name='file' backgroundColor="#3b5998" onPress={Picker2}>File</Icon.Button>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: '17%', marginTop: '5%' }}>
          <Icon.Button name='camera' backgroundColor="#3b5998" onPress={fromCamera}>Camera</Icon.Button>
          <View style={{ paddingLeft: '5%' }}>
            <Icon.Button name='image' backgroundColor="#3b5998" onPress={fromGallery}>Gallery</Icon.Button>
          </View>
        </View>

        {/*loadImage == false && resFile != null && <Image source={image.assets[0]} style={{ width: '80%', height: '30%', marginLeft: '5%', resizeMode: 'stretch', }} />
        manual_*/}
        {isParsed == true ? <View style={{maxHeight:'30%',marginTop:'5%'}}>
        <Image source={image.assets[0]} style={{ width: '80%', height: '100%', marginLeft: '5%', resizeMode: 'stretch', }} />
        </View>:null}
        {isParsed && manual_array.map((item, index) => (
          <View key={"gfg"+index} style={{flexDirection:'row', flexWrap:'wrap'}}>
            <Text style={{flexDirection:'row',flexWrap:'wrap-reverse'}}>{array_[index]}</Text>
            <TextInput placeholder={array_placeholder[index]} style={{borderWidth:1,height:40,width:'75%'}} defaultValue={dManualArray[index]} onChangeText={(e) => onHandleManual(index, e)}/>
          </View>
        ))}
        <View>
          {isParsed == true ? <Text>{reamin_file}</Text>:null}
        </View>
        <View>
        {isParsed == false ? <Text>{resultBefore}</Text>:null}
        </View>
        {isParsed == true?       <View style={{ marginTop: '25%', marginLeft: '7%', width: '80%' }}>
          <Button title='Complete' onPress={() => { navigation.navigate("Send");sum_dataSend();createPDF(); }} />
        </View>:null}
        <View style={{marginTop:'75%'}}></View>

 
      </ScrollView>
    </View>
  );
};
function SendScreen() {

  const [emailA, setEmailA] = React.useState("")
  const [selectedForm, setSelectedForm] = React.useState("")
  const [emailB, setEmailB] = React.useState("")
  const [number1, setNumber1] = React.useState()
  const [number2, setNumber2] = React.useState()
  const shareOptions = {
    url: "file://"+local_path,
    message: 'sssss',
    social: Share.Social.WHATSAPP,
    whatsAppNumber: number1,  // country code + phone number
  };
  const shareOptions1 = {
    url: "file://"+local_path,
    message: 'ssss',
    social: Share.Social.WHATSAPP,
    whatsAppNumber: number2,  // country code + phone number
  };
  const share = () =>{
  setTimeout(() => {
      Share.shareSingle(shareOptions1)
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err); });
  }, 1000)
    Share.shareSingle(shareOptions)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });

  }
  const send_Email = (w,e) => {
    Mailer.mail({
      subject: 'Send Contract',
      recipients: [w],
      ccRecipients: [e],
      body: dataSend,
      customChooserTitle: 'This is my new title', // Android only (defaults to "Send Mail")
      //isHTML: true,
      attachments: [{
        // Specify either `path` or `uri` to indicate where to find the file data.
        // The API used to create or locate the file will usually indicate which it returns.
        // An absolute path will look like: /cacheDir/photos/some image.jpg
        // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
        path: local_path, // The absolute path of the file from which to read data.
        //uri: '', // The uri of the file from which to read the data.
        // Specify either `type` or `mimeType` to indicate the type of data.
        type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        mimeType: '', // - use only if you want to use custom type
        name: '', // Optional: Custom filename for attachment
      }]
    }, (error, event) => {
      alert(
        error,
        event,
        [
          { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
          { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
        ],
        { cancelable: true }
      )
    });
  }
  return (
    <View style={{ justifyContent: 'center', flexDirection: 'column', marginLeft: '15%' }}>
      <View style={{ marginTop: '5%' }}>
        <Text style={{ fontSize: 20 }}>Email</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: '10%' }}>Company</Text>
          <TextInput value={emailA} onChangeText={setEmailA} style={{ borderBottomWidth: 1, width: '50%', marginLeft: '5%', marginTop: '6%' }} placeholder="" /></View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: '10%', marginLeft: '3%' }}>Client</Text>
          <TextInput value={emailB} onChangeText={setEmailB} style={{ borderBottomWidth: 1, width: '50%', marginLeft: '8%', marginTop: '6%' }} placeholder="" /></View>

        <View style={{ maxWidth: '80%', marginTop: '7%' }}>
          <Button onPress={()=>{send_Email(emailA,emailB)}} title="SEND"/></View>
      </View>
      <View style={{ marginTop: '20%' }}>
        <Text style={{ fontSize: 20 }}>Whatsapp</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: '10%' }}>Company</Text>
          <TextInput value={number2} onChangeText={setNumber2} style={{ borderBottomWidth: 1, width: '50%', marginLeft: '5%', marginTop: '6%' }} placeholder="" /></View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: '10%', marginLeft: '3%' }}>Client</Text>
          <TextInput value={number1} onChangeText={setNumber1} style={{ borderBottomWidth: 1, width: '50%', marginLeft: '8%', marginTop: '6%' }} placeholder="" /></View>
        <View style={{ maxWidth: '80%', marginTop: '7%' }}>
        <Button title='SEND' onPress={() => share()}></Button></View>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Contract" component={ReadImage} />
        <Stack.Screen name="Send" component={SendScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
import * as React from 'react';
import { View, Text, Button, TouchableOpacity, PermissionsAndroid, ScrollView, TextInput, RefreshControl } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'
import TextRecognition from 'react-native-text-recognition';
import * as RNFS from 'react-native-fs';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome'
import SendEmail from '../sendEmail';
import sendWhatsApp from '../whastapp'
var stop = true;
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
var resultNR;
var resultDATE;
var dataSend = "";
var EXPIRED;
var theallfile = "";
var EXPIRED2;
var resultEXPIRED;
var place_1; var place_11; var res_place1='';
var place_2; var place_22; var res_place2='';
var place_3; var place_33; var res_place3='';
var place_4; var place_44; var res_place4='';
var secondInput;
var thirdInput;
var fourthInput
var fifthInput; var firstInput; var firstPlace; var reslutplace;
var resultInput5 = "";

function ReadImage({ navigation }) {
  const [image, SetImage] = React.useState()
  const [input1, setInput1] = React.useState()
  const [input2, setInput2] = React.useState()
  const [input3, setInput3] = React.useState()
  const [input4, setInput4] = React.useState()
  const [resFile, setResFile] = React.useState(null)
  const [theallfile, setTheallfile] = React.useState(null)
  const [resultInput1, setResultInput1] = React.useState("")
  const [resultInput2, setResultInput2] = React.useState("")
  const [resultInput3, setResultInput3] = React.useState("")
  const [resultInput4, setResultInput4] = React.useState("")
  const [resultInput5, setResultInput5] = React.useState("")
  const [loadImage, setLoadImage] = React.useState(false)
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
        console.log("After reomving symplols ", resultString.replace(/[^a-zA-Z0-9 ]/g, "**"));
        console.log(resultString)
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
        parseFile()
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
  const replace = () => {
    resultFile = resultFile.replace("[@ no ]", resultNR)
    resultFile = resultFile.replace("[@ date ]", resultDATE)
    resultFile = resultFile.replace("[@ name ]", NAMEGET)
    resultFile = resultFile.replace("[@ address ]", res_ADDRESSGET)
    resultFile = resultFile.replace("[@ expired ]", resultEXPIRED)
    resultFile = resultFile.replace("[@ cnp ]", res_CNPGET)
    resultFile = resultFile.replace("[@ no ]", resultNR)
    resultFile = resultFile.replace("[@ date ]", resultDATE)
    resultFile = resultFile.replace("[@ name ]", NAMEGET)
    resultFile = resultFile.replace("[@ address ]", res_ADDRESSGET)
    resultFile = resultFile.replace("[@ expired ]", resultEXPIRED)
    resultFile = resultFile.replace("[@ cnp ]", res_CNPGET)
    resultFile = resultFile.replace("[@ no ]", resultNR)
    resultFile = resultFile.replace("[@ date ]", resultDATE)
    resultFile = resultFile.replace("[@ name ]", NAMEGET)
    resultFile = resultFile.replace("[@ address ]", res_ADDRESSGET)
    resultFile = resultFile.replace("[@ expired ]", resultEXPIRED)
    resultFile = resultFile.replace("[@ cnp ]", res_CNPGET)
    resultFile = resultFile.replace("[@ no ]", resultNR)
    resultFile = resultFile.replace("[@ date ]", resultDATE)
    resultFile = resultFile.replace("[@ name ]", NAMEGET)
    resultFile = resultFile.replace("[@ address ]", res_ADDRESSGET)
    resultFile = resultFile.replace("[@ expired ]", resultEXPIRED)
    resultFile = resultFile.replace("[@ cnp ]", res_CNPGET)
    resultFile = resultFile.replace("[@ no ]", resultNR)
    resultFile = resultFile.replace("[@ date ]", resultDATE)
    resultFile = resultFile.replace("[@ name ]", NAMEGET)
    resultFile = resultFile.replace("[@ address ]", res_ADDRESSGET)
    resultFile = resultFile.replace("[@ expired ]", resultEXPIRED)
    resultFile = resultFile.replace("[@ cnp ]", res_CNPGET)
    resultFile = resultFile.replace("[@ no ]", resultNR)
    resultFile = resultFile.replace("[@ date ]", resultDATE)
    resultFile = resultFile.replace("[@ name ]", NAMEGET)
    resultFile = resultFile.replace("[@ address ]", res_ADDRESSGET)
    resultFile = resultFile.replace("[@ expired ]", resultEXPIRED)
    resultFile = resultFile.replace("[@ cnp ]", res_CNPGET)
    resultFile = resultFile.replace("[@ no ]", resultNR)
    resultFile = resultFile.replace("[@ date ]", resultDATE)
    resultFile = resultFile.replace("[@ name ]", NAMEGET)
    resultFile = resultFile.replace("[@ address ]", res_ADDRESSGET)
    resultFile = resultFile.replace("[@ expired ]", resultEXPIRED)
    resultFile = resultFile.replace("[@ cnp ]", res_CNPGET)
    resultFile = resultFile.replace("[@ no ]", resultNR)
    resultFile = resultFile.replace("[@ date ]", resultDATE)
    resultFile = resultFile.replace("[@ name ]", NAMEGET)
    resultFile = resultFile.replace("[@ address ]", res_ADDRESSGET)
    resultFile = resultFile.replace("[@ expired ]", resultEXPIRED)
    resultFile = resultFile.replace("[@ cnp ]", res_CNPGET)


    var rcnp = '@ cnp'
    var rexpired = '@ expired'
    var raddress = '@ address'
    var rdate = '@ date'
    var rno = '@ no'
    var rname = '@ name'

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
  const loop_ = (res) => {
    for (let index = 0; index < res.length; index++) {
      const element = res[index];

    }
  }
  const parseFile = () => {
    replace()
    firstInput = resultFile.indexOf("!")
    var xx = resultFile.slice(0, firstInput)
    xx = remove_(xx)
    setResultInput1(xx)
    resultFile = resultFile.replace(/!/, "")

    place_1 = resultFile.indexOf("[")
    place_11 = resultFile.indexOf("]")
    res_place1 = resultFile.slice(place_1, place_11 + 1)
    resultFile = resultFile.replace(res_place1, "")
    res_place1 = remove_(res_place1)

    secondInput = resultFile.indexOf("!")
    var xx = resultFile.slice(firstInput, secondInput)
    xx = remove_(xx)
    setResultInput2(xx)
    resultFile = resultFile.replace(/!/, "")

    place_2 = resultFile.indexOf("[")
    place_22 = resultFile.indexOf("]")
    res_place2 = resultFile.slice(place_2, place_22 + 1)
    resultFile = resultFile.replace(res_place2, "")
    res_place2 = remove_(res_place2)

    thirdInput = resultFile.indexOf("!")
    var xx = resultFile.slice(secondInput, thirdInput)
    xx = remove_(xx)
    setResultInput3(xx)
    resultFile = resultFile.replace(/!/, "")

    place_3 = resultFile.indexOf("[")
    place_33 = resultFile.indexOf("]")
    res_place3 = resultFile.slice(place_3, place_33 + 1)
    resultFile = resultFile.replace(res_place3, "")
    res_place3 = remove_(res_place3)

    fourthInput = resultFile.indexOf("!")    
    var xx = resultFile.slice(thirdInput, fourthInput)
    xx = remove_(xx)
    setResultInput4(xx)
    resultFile = resultFile.replace(/!/, "")

    place_4 = resultFile.indexOf("[")
    place_44 = resultFile.indexOf("]")
    res_place4 = resultFile.slice(place_4, place_44 + 1)
    resultFile = resultFile.replace(res_place4, "")
    res_place4 = remove_(res_place4)

    setResultInput5(resultFile.slice(fourthInput))

  }
  const Picker2 = async () => {
    if (loadImage == true) {
      setLoadImage(false)
    }
    try {
      requestFile()
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles]
      })
      var nameRes = JSON.stringify(res.name)
      nameRes = nameRes.substring(1)
      nameRes = nameRes.slice(0, -1)
      const a = await RNFS.exists(RNFS.DocumentDirectoryPath + '/' +nameRes)
      const b = await RNFS.exists(RNFS.DownloadDirectoryPath + '/' +nameRes)
      const c = await RNFS.exists(RNFS.ExternalDirectoryPath + '/' +nameRes)
      const d = await RNFS.exists(RNFS.CachesDirectoryPath + '/' +nameRes)
      const e = await RNFS.exists(RNFS.ExternalCachesDirectoryPath + '/' +nameRes)
      const f = await RNFS.exists(RNFS.ExternalStorageDirectoryPath + '/' +nameRes)
      const g = await RNFS.exists(RNFS.FileProtectionKeys + '/' +nameRes)
      const h = await RNFS.exists(RNFS.LibraryDirectoryPath + '/' +nameRes)
      const i = await RNFS.exists(RNFS.MainBundlePath + '/' +nameRes)
      const j = await RNFS.exists(RNFS.TemporaryDirectoryPath + '/' +nameRes)



      RNFS.readDir(RNFS.DownloadDirectoryPath)
        .then((statResult) => {
          if (statResult[0].isFile()) {
            if(a){
              return RNFS.readFile(RNFS.DocumentDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if(b){
              return RNFS.readFile(RNFS.DownloadDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if(c){
              return RNFS.readFile(RNFS.ExternalDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if(d){
              return RNFS.readFile(RNFS.CachesDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if(e){
              return RNFS.readFile(RNFS.ExternalCachesDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if(f){
              return RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if(g){
              return RNFS.readFile(RNFS.FileProtectionKeys + '/' + nameRes, 'utf8');
            }
            else if(h){
              return RNFS.readFile(RNFS.LibraryDirectoryPath + '/' + nameRes, 'utf8');
            }
            else if(i){
              return RNFS.readFile(RNFS.MainBundlePath + '/' + nameRes, 'utf8');
            }
            else if(j){
              return RNFS.readFile(RNFS.TemporaryDirectoryPath + '/' + nameRes, 'utf8');
            }
          }
          return 'no file';
        })
        .then((contents) => {
          console.log("contents", contents);
          resultFile = contents
          setTheallfile(contents)
          setResFile(2)

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




  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: '6%', flexDirection: 'row' }}>
      <ScrollView refreshControl={
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
        {loadImage == false && resFile != null ? <Text>{theallfile}</Text> : resFile == null ? null : <View>
          <View>
            <Text style={styles.onBehalfTextStyle}>{resultInput1 + '\n'}</Text>
            <TextInput
              value={input1}
              onChangeText={setInput1}
              placeholder={res_place1}
              style={{ borderWidth: 1, maxWidth: '70%' }}
            />
          </View>
          <View>
            <Text style={styles.onBehalfTextStyle}>{resultInput2 + '\n'}</Text>
            <TextInput
              value={input2}
              onChangeText={setInput2}
              placeholder={res_place2}
              style={{ borderWidth: 1, maxWidth: '70%' }}
            />
          </View>
          <View>
            <Text style={styles.onBehalfTextStyle}>{resultInput3 + '\n'}</Text>
            <TextInput
              value={input3}
              onChangeText={setInput3}
              placeholder={res_place3}
              style={{ borderWidth: 1, maxWidth: '70%' }}
            />
          </View>
          <View>
            <Text style={styles.onBehalfTextStyle}>{resultInput4 + '\n'}</Text>
            <TextInput
              value={input4}
              onChangeText={setInput4}
              placeholder={res_place4}
              style={{ borderWidth: 1, maxWidth: '70%' }}
            />

          </View>
          <View>
            <Text style={styles.onBehalfTextStyle}>{resultInput5 + '\n'}</Text>
          </View>
        </View>}
        <View style={{ marginTop: '5%' }}>
          <Button title='Complete' onPress={() => { navigation.navigate("Send"); dataSend += resultInput1 + input1 + resultInput2 + input2 + resultInput3 + input3 + resultInput4 + input4 + resultInput5 }} />
        </View>
      </ScrollView>
    </View>
  );
};
export default ReadImage;
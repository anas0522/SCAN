import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Button } from "react-native";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import { Picker } from "@react-native-picker/picker";
import * as RNFS from 'react-native-fs';
import sendWhatsApp from "./whastapp";
import SendEmail from './sendEmail'
import styles from "./styles";

const App = () => {
  const [selectedForm, setSelectedForm] = useState("Normal");
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [image, SetImage] = useState("")
  const [fileName, setFileName] = useState("")
  const [custom3, setCustom3] = useState("")
  const [date, setDate] = useState("")
  const [content, setContent] = useState(null);
  const [CNP, setCNP] = useState("")
  const [expired, setExpired] = useState("")
  const [NR, setNR] = useState("")
  const [custom, setCustom] = useState("")
  const [address, setAddress] = useState("")
  const [custom2, setCustom2] = useState("")
  const [emailA, setEmailA] = useState("")
  const [emailB, setEmailB] = useState("")
  var dataaa;



  const fromGallery = () => {
    launchImageLibrary({}, SetImage);
  }
  const fromCamera = () => {
    launchCamera({}, SetImage)
  }
  const readFile = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        console.log('GOT RESULT', result);
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        if (statResult[0].isFile()) {
          //statResult[1]
          return RNFS.readFile(RNFS.DownloadDirectoryPath + '/' + fileName, 'utf8');
          //return RNFS.readFile(RNFS.DownloadDirectoryPath+'/example.docx', 'utf8');
        }
        return 'no file';
      })
      .then((contents) => {
        setContent(contents);
        console.log(contents);
        var cnp = contents.split('\n')[1];
        var lastname = contents.split('\n')[2];
        var firstname = contents.split('\n')[3];
        var address = contents.split('\n')[4];
        cnp = cnp.substring(4)
        lastname = lastname.substring(10)
        firstname = firstname.substring(11)
        address = address.substring(8)
        console.log(cnp)
        console.log(lastname)
        console.log(firstname)
        console.log(address)

        setCNP(cnp)
        setName(firstname + lastname)
        setAddress(address)
      })
      .catch((err) => {
        console.log(err.message, err.code);
        alert('Your file name is incorrect or its not in Downloads or type file is not .txt ')
      });
  }
  useEffect(() => {
    if (image) {
      //console.log(image);
    } else { }
    (async () => {
      if (image) {
        const result = await TextRecognition.recognize(image.assets[0].uri);
        var resultString = JSON.stringify(result)
        console.log(resultString)
        var NRGET = resultString.substring(
          resultString.lastIndexOf("XP NR") + 6,
          resultString.lastIndexOf("CNP") - 3
        )
        setNR(NRGET)
        var LASTNAMEGET = resultString.substring(
          resultString.lastIndexOf("last name") + 152,
          resultString.lastIndexOf("Prenum") - 2
        )
        if (LASTNAMEGET.length >= 12) {
          LASTNAMEGET = resultString.substring(
            resultString.lastIndexOf("last name") + 12,
            resultString.lastIndexOf("Prenum") - 2
          )
        }
        var FIRSTNAMEGET = resultString.substring(
          resultString.lastIndexOf("First name") + 12,
          resultString.lastIndexOf("Ceta") - 2
        )
        setName(FIRSTNAMEGET + " " + LASTNAMEGET)
        var ADDRESSGET = resultString.substring(
          resultString.lastIndexOf("Address") + 9,
          resultString.lastIndexOf("Emisa") - 11
        )
        setAddress(ADDRESSGET)

        var CNPGET = resultString.substring(
          resultString.lastIndexOf("CNP") + 4,
          resultString.lastIndexOf(","),
        )
        CNPGET = CNPGET.substring(0, 13)
        if (CNPGET.length >= 10) {
          setCNP(CNPGET)
        }
        console.log("LAST NAME IS: ", LASTNAMEGET)
        console.log("CNP IS: ", CNPGET)
        console.log("FIRST NAME IS: ", FIRSTNAMEGET)
        console.log("NR NAME IS: ", NRGET)
        console.log("ADDRESS NAME IS: ", ADDRESSGET)

      }
    })();
  }, [image]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1, maxWidth: '50%', alignContent: 'center', alignSelf: 'center' }}>
          <Button title="USE YOUR CAMERA" onPress={fromCamera} />
          <Text>{""}</Text>
          <Button title="USE YOUR GALLERY" onPress={fromGallery} />
        </View>
        <View style={styles.NRContainer}>
          <Text style={{ fontSize: 20 }}>Nr. {NR} din {date}</Text>
          <Text style={{ fontSize: 20 }}>Intervenit între:</Text>
          <Text style={{ fontSize: 20 }}>A.                          sediul in Bucuresti  Romania</Text>
          <TextInput placeholder="xxxxxx" style={styles.inputCompany} value={company} onChangeText={setCompany} />
          <Text style={{ fontSize: 20 }}>{"\n"}B. Name is: {name}{"\n"} Address is: {address}{"\n"} CNP is : {CNP}{"\n"} Expired on : {expired}{"\n"}</Text>
          <Text style={{ fontSize: 20 }}>A intervenit prezentul contract cu respectarea următoarelor clauze: </Text>
          <View style={styles.firstLineContainer}>
            <Text style={styles.onBehalfTextStyle}>{"\n"}<Text style={{ fontSize: 25 }}>Art. 1</Text> Comisionul perceput este de </Text>
            <TextInput
              style={styles.onBehalfTextInputStyle}
              placeholder="xxxxxxxxxxxx"
              value={custom}
              onChangeText={setCustom}
            />
          </View>
          <View style={styles.secondLineContainer}>
            <Text style={styles.onBehalfTextStyle2}>{"\n"}platit in lei la cursul BNR din ziua emiterii facturii. Comision platit pentru intermedierea vanzarii imobilului situat in </Text>
            <TextInput
              style={styles.onBehalfTextInputStyle2}
              placeholder="xxxxxxxxxxxx"
              value={custom2}
              onChangeText={setCustom2}
            />
          </View>
          <View style={styles.thirdLineContainer}>
            <Text style={styles.onBehalfTextStyle3}>{"\n"}<Text style={{ fontSize: 25 }}>Art. 2</Text> Cumparatorul se obligă să plătească societăţii comerciale COMPANY NAME.pentru serviciul de intermediere vanzare,un comision de  </Text>
            <TextInput
              style={styles.onBehalfTextInputStyle3}
              placeholder="xxxxxxxxxxxx"
              value={custom3}
              onChangeText={setCustom3}
            />
          </View>
          <Text style={{ fontSize: 20 }}>platit in lei la cursul BNR din ziua emiterii facturii{"\n"}</Text>
          <Text style={{ fontSize: 20 }}><Text style={{ fontSize: 25 }}>Art. 3</Text> Plata comisionului se va face în cazul în care vanzarea se face prin intermediul agenţiei imobiliare COMPANY NAME.{"\n"} </Text>
          <Text style={{ fontSize: 20 }}><Text style={{ fontSize: 25 }}>Art. 4</Text> Cumparatorul se obligă să nu trateze şi să nu contracteze în nici un mod, direct sau indirect, prin persoane fizice şi/sau juridice, cu potenţialii locatori prezentaţi de agenţia imobiliară COMPANY NAME.{"\n"}</Text>
          <Text style={{ fontSize: 20 }}><Text style={{ fontSize: 25 }}>Art. 5</Text>  În cazul  în care potenţialul cumparator nu achită  comisionul datorat   COMPANY NAME. aceasta va putea solicita să plătească daune în valoare de 100%  din suma datorata. În cazul în care nu se achită comisionul pe cale amiabilă şi se ajunge în instanţă de judecată,se va achita de către potenţialul cumparator cheltuielile de judecată. {"\n"}</Text>
          <Text style={{ fontSize: 20 }}><Text style={{ fontSize: 25 }}>Art. 6</Text> Agenţia imobiliară COMPANY NAME nu răspunde de viciile ascunse ale imobilului de care nu a luat cunoştinţă. {"\n"}</Text>
          <Text style={{ fontSize: 20 }}><Text style={{ fontSize: 25 }}>Art. 7</Text> Agenţia imobiliară  COMPANY NAME se obligă să desfăşoare activitatea de identificare a ofertelor şi intermediere pentru vanzarea imobilului descris la cerinţe şi să acţioneze prin orice mijloace specifice,facand cheltuieli de publicitate în vederea promovării cererii potenţialului vanzator. {"\n"}</Text>
          <Text style={{ fontSize: 20 }}><Text style={{ fontSize: 25 }}>Art. 8</Text> Agenţia imobiliară COMPANY NAME se obligă să asiste potenţialul vanzator la negocierea pretului imobilului precum şi la semnarea contractului de vanzare în formă autentică.{"\n"}</Text>
          <Text style={{ fontSize: 20 }}><Text style={{ fontSize: 25 }}>Art. 9</Text> Prezenrul contract s-a încheiat azi  {date} ,în 2 exemplare,din care unul s-a înmanat potenţialului vanzator. {"\n"}</Text>
          <Text style={{ fontSize: 20 }}><Text style={{ fontSize: 25 }}>Art. 10</Text>  Prezentul contract nu are clauză de exclusivitate. {"\n"}</Text>
          <Text style={{ fontSize: 20 }}><Text style={{ fontSize: 25 }}>Art. 11</Text> Prezentul contract constituie titlu executoriu. {"\n"}</Text>
          <View style={styles.aAndBContainer}>
            <View style={styles.inputContainerA}>
              <TextInput
                style={styles.textInputStyleA}
                placeholder="A email"
                value={emailA}
                onChangeText={setEmailA}
              />
            </View>
            <View style={styles.inputContainerB}>
              <TextInput
                style={styles.textInputStyleB}
                placeholder="B email"
                value={emailB}
                onChangeText={setEmailB}
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <SendEmail to={emailA} subject={selectedForm} email2={emailB} body={dataaa} />
            <TouchableOpacity onPress={() => sendWhatsApp(dataaa)}><Text style={{ marginRight: 90, }}>to whastapp</Text></TouchableOpacity>
          </View>
          </View>
      </ScrollView>
    </View>
  );
};

export default App;
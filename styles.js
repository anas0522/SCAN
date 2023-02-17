import {StyleSheet} from "react-native";



const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: '3%',
      marginLeft:'3%',
    },
    NRContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        alignContent:'flex-start',
        alignSelf:'flex-start',
    },
    inputCompany:{
        position:'absolute',
        borderWidth:1,
        maxHeight:35,
        maxWidth:'100%',
        width:'28%',
        marginTop:'13%',
        marginLeft:'5%',
        alignContent:'center',
    },
    inputCustom:{
        position:'absolute',
        borderWidth:1,
        maxHeight:35,
        maxWidth:'100%',
        marginTop:'48%',
        marginLeft:'50%',
        alignContent:'center',
    },
    inputCustom2:{
        borderWidth:1,
        maxHeight:35,
        marginTop:'46%',
        marginLeft:'50%',
        alignContent:'center',

    },
    onBehalfTextStyle: {
        display: "flex",
        flexDirection: 'column',
        fontSize: 20,
        // maxWidth : 50
      },
      onBehalfTextInputStyle: {
        borderWidth: 1,
        width: '55%',
        marginTop: '16%',
        marginLeft:'-84%',
        maxHeight: 36,
        
      },
      firstLineContainer: {
        display: "flex",
        flexDirection: "row",
        // marginTop: 10,
        width: "100%"
      },
      onBehalfTextStyle2: {
        display: "flex",
        flexDirection: 'column',
        fontSize: 16,
        // maxWidth : 50
      },
      onBehalfTextInputStyle2: {
        borderWidth: 1,
        width: '55%',
        marginTop: '22%',
        marginLeft:'-90%',
        maxHeight: 36,
        
      },
      secondLineContainer: {
        display: "flex",
        flexDirection: "row",
        // marginTop: 10,
        width: "100%"
      },
      onBehalfTextStyle3: {
        display: "flex",
        flexDirection: 'column',
        fontSize: 16,
        // maxWidth : 50
      },
      onBehalfTextInputStyle3: {
        borderWidth: 1,
        width: '55%',
        marginTop: '25%',
        marginLeft:'-91%',
        maxHeight: 36,
        
      },
      thirdLineContainer: {
        display: "flex",
        flexDirection: "row",
        // marginTop: 10,
        width: "100%"
      },
      inputContainerA: {
        marginTop: '-20%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "54%",
        paddingRight: 40,
        marginLeft: '0%',
      },
      textInputStyleA: {
        borderWidth: 1,
        width: "100%"
      },
      inputContainerB: {
        marginTop: '-20%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "30%",
      },
      textInputStyleB: {
        borderWidth: 1,
        width: "160%"
      },
      aAndBContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: '20%',
      },
  })
export default styles;
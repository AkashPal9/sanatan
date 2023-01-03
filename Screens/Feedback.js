import React from 'react'
import { View ,Text,TextInput,StyleSheet,TouchableOpacity, ScrollView,Alert, SafeAreaView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import logout from "../assets/logout.png"

function FeedBack({navigation}) {

const [subject,SetSubject]=React.useState("")
const [relation,setrelation]=React.useState("")
const [message,setmessage]=React.useState("")
const [isParent,setIsParent]=React.useState(1)

const dataPost = async () => {

 const SID= await AsyncStorage.getItem('ID');
 const Auth=await AsyncStorage.getItem('AUTH');
    await fetch("https://erp.sdcollegemzn.in/api/apifeedback", {
      method: "post",
      headers: {
        Accept: "application/json", 
        Auth:Auth,
        platform: "Android",
        "content-type": "application/json",
      },
      body: JSON.stringify(
        {
      IsParent:isParent,
      Id:SID,
      subject:subject,
      message:message,
      relation:relation,
      LedgerGroupId:3
        }
      )
    }).then(response => response.text()).then(async responseText => { 
      try {
        Alert.alert(
            "Marwari Software",
              responseText,
            [
              { text: "OK", onPress: () =>  navigation.navigate('Dashboard') }
            ])
        }
     
      catch (error) {
        console.log(error)
      }

    })
  

  };
  

    return (
    <ScrollView>
      <Header showBack={true} title={"FeedBack"} rightIcon={logout}/>
        <Text style={{fontSize:20,color:"#154c79",textAlign:"center",margin:10}}>Parent FeedBack</Text>
        <View style={{marginTop:20}}>
        <Text style={Styles.text}>Feedback Title</Text>
         <TextInput  style={Styles.input}  onChangeText={(text) => {
             SetSubject(text)
            }}
            value={subject}></TextInput>
            <Text style={Styles.text}>Relation with Student</Text>
         <TextInput  style={Styles.input}  onChangeText={(text) => {
             setrelation(text)
            }}
            value={relation}></TextInput>
        <Text style={Styles.text}>Message</Text>
         <TextInput  style={Styles.message}  onChangeText={(text) => {
             setmessage(text)
            }}
            value={message}></TextInput>
        <TouchableOpacity style={Styles.button} onPress={dataPost}><Text style={{ textAlign: "center" ,color:"white"}}>Submit</Text></TouchableOpacity>
 </View>

    </ScrollView>
    )
}

export default FeedBack;

const Styles=StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
    message:{
        marginBottom: 20,
        height: 80,
        marginLeft: 30,
        borderRadius: 10,
        padding: 10,
        width: "80%",
        backgroundColor: "#fffafa",
        borderColor:"#154c79",
        borderWidth:1
    },
    input: {
        marginBottom: 20,
        height: 40,
        marginLeft: 30,
        borderRadius: 10,
        padding: 10,
        width: "80%",
        backgroundColor: "#fffafa",
        borderColor:"#154c79",
        borderWidth:1
      },  
      text: {
        marginLeft: 35,
        paddingBottom: 10,
        color: "#000",
        // fontWeight:"bold"
      },
      button: {
        height: 45,
        marginLeft: 63,
        borderRadius: 10,
        padding: 10,
        width: "60%",
        textAlign: "center",
        backgroundColor: "#154c79",
        marginTop: 20,
        marginBottom:0
      }

})
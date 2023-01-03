import React from 'react'
import { View ,Text,TextInput,StyleSheet,TouchableOpacity,Alert} from 'react-native'

function ChangePassword({navigation}) {

const [user,SetUser]=React.useState("")
const [oldPass,setOldPass]=React.useState("")
const [newPass,setNewPass]=React.useState("")

    const ChangePass=async()=>{
        await  fetch("https://erp.sdcollegemzn.in/api/apichangepassword", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Username":user,
              "OldPassword": oldPass,
              "NewPassword":newPass,
              platform: "Android",
            },
          }).then(response => response.text()).then(async responseText => {
            try {
        var respObject = responseText
        var obj=JSON.parse(respObject)
        if(obj.Message=="Updated Successfully.")
        {
            Alert.alert(
                "Marwari Software",
                obj.Message,
                [
                  { text: "OK", onPress: () => navigation.navigate("Login") }
                ]
              );
        }else{
            Alert.alert(
                "Marwari Software",
                obj.Message,
                [
                  { text: "OK" }
                ]
              );
        }
        console.log(obj)
            } catch (error) {
                console.log(error)
            }
          })
    }


    return (
        <View style={{marginTop:20}}>
            <Text style={Styles.text}>UserName</Text>
         <TextInput placeholder='UserName' style={Styles.input}  onChangeText={(text) => {
              if (text.includes(' ')) {
                SetUser(text.trim());
              } else {
                SetUser(text);
              }
            }}
            value={user}></TextInput>
         <Text style={Styles.text}>Old Password</Text>

         <TextInput placeholder='Old Password' style={Styles.input}  onChangeText={(text) => {
              if (text.includes(' ')) {
                setOldPass(text.trim());
              } else {
                setOldPass(text);
              }
            }}
            value={oldPass}></TextInput>
         <Text style={Styles.text}>New Password</Text>

         <TextInput placeholder='New Password' style={Styles.input}  onChangeText={(text) => {
              if (text.includes(' ')) {
                setNewPass(text.trim());
              } else {
                setNewPass(text);
              }
            }}
            value={newPass}></TextInput>
        <TouchableOpacity style={Styles.button} onPress={ChangePass}><Text style={{ textAlign: "center" ,color:"white"}}>Submit</Text></TouchableOpacity>
        </View>
    )
}

export default ChangePassword

const Styles=StyleSheet.create({
    input: {
        marginBottom: 20,
        height: 40,
        marginLeft: 30,
        borderRadius: 10,
        padding: 10,
        width: "80%",
        backgroundColor: "#fffafa",
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
        borderRadius: 40,
        padding: 10,
        width: "60%",
        textAlign: "center",
        backgroundColor: "#353838",
        marginTop: 20,
        
      }

})
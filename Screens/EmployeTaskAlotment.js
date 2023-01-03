import React from 'react'
import { View ,Text,TextInput,StyleSheet,TouchableOpacity, ScrollView,Alert, SafeAreaView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import logout from "../assets/logout.png"

function FeedBack({navigation,route}) {
   
    const {EmpId}=route.params;

// console.log(EmpId,"empid")
// const [subject,SetSubject]=React.useState("")
const [task,setTask]=React.useState();
// const [relation,setrelation]=React.useState("")
// const [message,setmessage]=React.useState("")
// const [isParent,setIsParent]=React.useState(1)

const dataPost = async () => {
if(!task)
{
  Alert.alert("Marwari Software",
  "Please Fill Task!")
}else{


 const Auth=await AsyncStorage.getItem('AUTH');
    await fetch("https://erp.sdcollegemzn.in/internaltask/allot", {
      method: "POST",
      headers: {
        Accept: "application/json", 
        Auth:Auth,
        platform: "Android",
        "content-type": "application/json",
      },
      body: JSON.stringify(
        {
     EmpId:EmpId,
     Task:task,
     GroupId:1
        }
      )
    }).then(response => response.text()).then(async responseText => { 
         var respobj=JSON.parse(responseText);
        console.log(respobj.Message,"response text")
      try {
if(respobj.Message==="Task Alloted")
{
    Alert.alert("Marwari Software", "Alloted SuccesFully",[{
        text: 'OK',
        onPress: () => {
            navigation.navigate("Dashboard")
        }
    }]);
}
       
        }
      catch (error) {
        console.log(error)
      }

    })
  

  };
  
}
    return (
    <SafeAreaView>
      <Header showBack={true} title={"Allot Task"} rightIcon={logout}/>
        <Text style={{fontSize:20,color:"#154c79",textAlign:"center",margin:10}}>Allot Task</Text>
        <View style={{marginTop:20}}>
        <Text style={Styles.text}>Task</Text>
         <TextInput  style={Styles.input}  onChangeText={(text) => {
             setTask(text)
            }}
            placeholder="Enter Task"
            value={task}></TextInput>
        <TouchableOpacity style={Styles.button} onPress={dataPost}><Text style={{ textAlign: "center" ,color:"white"}}>Submit</Text></TouchableOpacity>
 </View>

    </SafeAreaView>
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
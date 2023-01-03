import React,{useEffect} from 'react'
import { View ,Text,StyleSheet,Image, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import logout from "../assets/logout.png";

function Profile() {

const [data,setData]=React.useState("")
// const [course,setCourse]=React.useState("")
// const [age,setAge]=React.useState("")
// const [refno,setRegNO]=React.useState("")

    const fetchStudentData=async()=>{
        const Sid=await AsyncStorage.getItem('ID')
        await  fetch("https://erp.sdcollegemzn.in/api/apistudent", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "StudentId": Sid,
              platform: "Android",
            },
          }).then(response => response.text()).then(async responseText => {
            try {
        var respObject = responseText
        var obj=JSON.parse(respObject)
        setData(obj)
        console.log(obj.Subject1)
            } catch (error) {
                console.log(error)
            }
          })
    }

useEffect(()=>{
fetchStudentData()
},[])


    return (
        <View>
<Header showBack={true} title={"Profile"} rightIcon={logout}/>
            <View style={{marginTop:50,marginBottom:15}}>
            <Image  style={Styles.ProfileImg}  source={require('../assets/profile.png')}/>
            <Text style={{fontWeight:"bold",textAlign:"center"}}>{data.Name}</Text>
            </View>
            <View style={Styles.details}>          
             <Text style={Styles.text}><Text style={{fontWeight:"bold"}}>RollNo :-</Text>   {data.RollNo}</Text>
            <Text style={Styles.text}><Text style={{fontWeight:"bold"}}>Father Name :-</Text>   {data.FatherName}</Text>
            <Text style={Styles.text}><Text style={{fontWeight:"bold"}}>Course :-</Text>    {data.CourseName}</Text>
            <Text style={Styles.text}><Text style={{fontWeight:"bold"}}>Stream :-</Text>    {data.StreamName}</Text>
            <Text style={Styles.text}><Text style={{fontWeight:"bold"}}>Year Of Admission :-</Text>   {data.YOA}</Text>
            <Text style={Styles.text}><Text style={{fontWeight:"bold"}}>Academic Year :-</Text>    {data.AcademicName}</Text>
            <Text style={Styles.text}><Text style={{fontWeight:"bold"}}>College Code :-</Text>    {data.Code}</Text>
            <Text style={Styles.text}><Text style={{fontWeight:"bold"}}>Aadhar Number :-</Text>    {data.Aadhar}</Text>
            <Text style={Styles.text}><Text style={{fontWeight:"bold"}}>Student Type :-</Text>    {data.StudentType}</Text>
            <Text style={Styles.text}><Text style={{fontWeight:"bold"}}>Category :-</Text>    {data.CategoryName}</Text>
            </View>
 
        </View>
    )
}

export default Profile


const Styles=StyleSheet.create({
    text:{
        padding:2,
        color:"#fff",
        marginTop:5,
        marginLeft:10
    },
    ProfileImg: {
        width: 100,
        height: 100,
        borderRadius:100,
        alignSelf:"center"
      },
      details:{
        height:"100%",
        backgroundColor:"#154c79",          //"#001151",     //"#001563",
        borderRadius:15,
        
      }
})
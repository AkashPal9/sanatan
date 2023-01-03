import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,FlatList, SafeAreaView, ScrollView} from 'react-native'
import Header from './Header';
import logout from "../assets/logout.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const AllotedTask = () => {
 const [assignment,setAssignment]=useState();
const [StudentId,setStudentId]=useState();
const [data,setData]=useState();
const [Message,setMessage]=useState()


const fetchAssignments = async () => {
    const Eid=await AsyncStorage.getItem('AID');
    const token=await AsyncStorage.getItem('AUTH')
    console.log(Eid,"skjlkf")
     fetch(`https://erp.sdcollegemzn.in/internaltask/alloted?EmpId=${Eid}`, {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             platform: "Android",
             Auth:token,
         },
         redirect: 'follow'
     }).then(response => response.text()).then(async responseText => {
         try {
             let respObject = JSON.parse(responseText);
             setData(respObject)
          console.log(respObject,"messagejaskj") 

         } catch (error) {
             console.log("1", error);
             alert("There is some problem. Please try again");
         }
     })
         .catch(error => {
             alert("There is some problem. Please try again");
         });
 }

useEffect(()=>{
fetchAssignments()
},[])


// const ToDate=(date)=>{
//     const d=date%100;
// const m=(date/100)%100;
// const y=date/10000;

// const newdate=d + "-" + m +"-"+ y;
// console.log(newdate,"date") 

// }

// alert(new Date(1273185387).toUTCString());
const renderItem = ({ item }) =>{
    // console.log(item,"iteddata")
    return(
        <ScrollView style={styles.item} >
            
            <Text style={{fontSize:13}}>
            <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Name:</Text> {item.Name} {"\n"}
            <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Task:</Text> {item.Task} {"\n"}
          <Text>
            <Text style={{fontWeight:"bold",fontStyle:"italic"}}> Date:</Text>  {moment(item.Date.toString()).format('DD MMM YYYY')}</Text>
    
            </Text>
             
        </ScrollView>
    )
};

    return (
        <View >
             <Header showBack={true} title="Task" rightIcon={logout}/>
             <Text style={{fontSize:17,color:"#154c79",textAlign:"center",margin:10}}>Alloted Tasks</Text>
             <FlatList
        data={data}
        contentContainerStyle={{ paddingBottom: "50%" }}
        renderItem={renderItem}
        keyExtractor={item => item.StudentId}
      />

        </View>
    )
}

export default AllotedTask;

const styles = StyleSheet.create({
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // backgroundColor:"#ccc",
        borderRadius:10,
        borderWidth:1,
        borderColor:"#154c79",
        // bottom:"8%"
      },
      
})

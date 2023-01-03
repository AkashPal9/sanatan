import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,FlatList} from 'react-native'
import Header from './Header';
import logout from "../assets/logout.png";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import moment from 'moment';

const FetchAssignment = () => {
 const [assignment,setAssignment]=useState();
const [StudentId,setStudentId]=useState();
const [data,setData]=useState();
const [Message,setMessage]=useState()


const fetchAssignments = async () => {
    const Eid=await AsyncStorage.getItem('Id');

     fetch(`https://erp.sdcollegemzn.in/internaltask/fetch?EmpId=${Eid}`, {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             platform: "Android",
         },
         redirect: 'follow'
     }).then(response => response.text()).then(async responseText => {
         try {
             let respObject = JSON.parse(responseText);
             setData(respObject)
          console.log(respObject,"message") 

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


const renderItem = ({ item }) =>{
    return(
        <View style={styles.item}>
            <Text style={{fontSize:15}}>
            <Text style={{fontWeight:"bold",fontWeight:"bold",fontSize:18}}>Assigned By Principal Sir</Text>  {"\n"} 
             <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Task:</Text> {item.Task} {"\n"} 
               <Text><Text style={{fontWeight:"bold",fontStyle:"italic"}}>Date:</Text>  {moment(item.Date.toString()).format('DD MMM YYYY')}</Text>
            </Text>
             
        </View>
    )
};

    return (
        <View >
             <Header showBack={true} title="Teachers Tasks" rightIcon={logout}/>
             {/* <Text style={{fontSize:17,color:"#154c79",textAlign:"center",margin:10}}>Message Fo</Text> */}
           
             <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: "50%" }}
        keyExtractor={item => item.Id}
      />
        </View>
    )
}

export default FetchAssignment;

const styles = StyleSheet.create({
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // backgroundColor:"#ccc",
        borderRadius:10,
        borderWidth:1,
        borderColor:"#154c79",
        bottom:"1%"
      },
      
})

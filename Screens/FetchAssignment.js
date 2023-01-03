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
    const sid=await AsyncStorage.getItem('ID');
    console.log(sid,"skjlkf")
     fetch(`https://erp.sdcollegemzn.in/assignment/fetch?SId=${sid}`, {
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


// const ToDate=(date)=>{
//     const d=date%100;
// const m=(date/100)%100;
// const y=date/10000;

// const newdate=d + "-" + m +"-"+ y;
// console.log(newdate,"date") 

// }

// alert(new Date(1273185387).toUTCString());
const renderItem = ({ item }) =>{
    return(
        <View style={styles.item}>
            <Text style={{fontSize:13}}> 
            <Text style={{fontWeight:"bold"}}>Subject:</Text> {item.Subject} {"\n"}
             <Text style={{fontWeight:"bold"}}>Assignment-Title:</Text> {item.Title} {"\n"}
             <Text style={{fontWeight:"bold"}}>Description:</Text> {item.Description} {"\n"}
            <Text style={{fontWeight:"bold"}}>Date:</Text>  {moment(item.Date.toString()).format('DD MMM YYYY')}</Text>
        </View>
    )
};

    return (
        <View >
             <Header showBack={true} title="Assignment" rightIcon={logout}/>
             <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.Id}
        contentContainerStyle={{ paddingBottom: "50%" }}
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
        borderColor:"#154c79"
      },
      
})

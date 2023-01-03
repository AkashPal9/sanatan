import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,FlatList,TouchableOpacity} from 'react-native'
import Header from './Header';
import logout from "../assets/logout.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import CalendarPopUp from "./CalenderPopup";

const AllotedAssignments = () => {

const [data,setData]=useState();
const [fromDate,setfromDate]=React.useState(moment(new Date()).format('YYYYMMDD'))
const [toDate,settoDate]=React.useState(moment(new Date()).format('YYYYMMDD'))
const [isOpenCalender1,setisOpenCalender1]=React.useState(false)
const [isOpenCalender2,setisOpenCalender2]=React.useState(false)


const fetchAssignments = async () => {
    const Eid=await AsyncStorage.getItem('Id');
    const token=await AsyncStorage.getItem('AUTH')
    console.log(Eid,"skjlkf")
     fetch(`https://erp.sdcollegemzn.in/assignment/alloted?EmpId=${Eid}`, {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
             platform: "Android",
             Auth:token,
             FromDate: fromDate,
             ToDate: toDate,
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

const   onToDateChange = (date) => {
    settoDate( moment(date).format('YYYYMMDD'))
    setisOpenCalender2(false)
  
  }
  const   onFromDateChange = (date) => {
    setfromDate(moment(date).format('YYYYMMDD'))
    setisOpenCalender1(false)
  
}



  

const renderItem = ({ item }) =>{
    console.log(item,"iteddata")
    return(
        <View style={styles.item} key={item.AssignmentId}>
            <Text style={{fontSize:13}}>
            <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Student Name:</Text> {item.StudentName} {"\n"}
           <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Course:</Text> {item.Course} {"\n"} 
           <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Stream:</Text> {item.Stream} {"\n"} 
            <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Year:</Text> {item.Year} {"\n"}
            <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Subject:</Text> {item.Subject} {"\n"}
            <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Title:</Text> {item.Title} {"\n"}
            <Text style={{fontWeight:"bold",fontStyle:"italic"}}>Description:</Text> {item.Description} {"\n"}
            <Text>
            <Text style={{fontWeight:"bold",fontStyle:"italic"}}> Date:</Text>  {moment(item.Date.toString()).format('DD MMM YYYY')}</Text>
            </Text>
        </View>
    )
};

    return (
        <View>
             <Header showBack={true} title="Assignments" rightIcon={logout}/>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
           <View style={{ flex: 2, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>From Date</Text>
                                <TouchableOpacity onPress={() => setisOpenCalender1(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(fromDate).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 2, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>To Date</Text>
                                <TouchableOpacity onPress={() => setisOpenCalender2(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(toDate).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <TouchableOpacity style={{ marginTop: 20, width: 50, borderRadius: 10, borderWidth: 1, borderColor: "#fff", backgroundColor: "#154c79", height: 40, marginBottom: 5, alignSelf: 'center', justifyContent: 'center' }} onPress={() =>fetchAssignments()}>
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>Go</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                            <CalendarPopUp isOpenToCalender={isOpenCalender1} heading="Select Date" onToDateChange={onFromDateChange} selectedDate={fromDate} />
                        <CalendarPopUp isOpenToCalender={isOpenCalender2} heading="Select Date" onToDateChange={onToDateChange} selectedDate={toDate} />
             <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.AssignmentId}
        contentContainerStyle={{ paddingBottom: "50%" }}
      />
        </View>
    )
}

export default AllotedAssignments;

const styles = StyleSheet.create({
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:10,
        borderWidth:1,
        borderColor:"#154c79",
      },
      TextInputStyle: {
        fontSize: 14 ,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        height: 40,
        padding: 10,
        backgroundColor: "#fff",
        color: "#000000",
        borderColor: "#11245a",
        textAlignVertical: "center"
    },
})

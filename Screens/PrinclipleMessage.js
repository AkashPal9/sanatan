import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,Image,  ScrollView, TouchableOpacity} from 'react-native'
import Header from './Header';
import logout from "../assets/logout.png";

const PrinclipleMessage = () => {
const [data,setData]=useState({});
  const fetchPricipalData= async () => {
    // const sid=await AsyncStorage.getItem('ID');
     fetch(`https://erp.sdcollegemzn.in/principalmessage`, {
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
        //   console.log(respObject,"message") 

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
    fetchPricipalData()
},[])
//  console.log(data,"===data")
    return (
        <ScrollView>
             <Header showBack={true} title={"Principal"}  rightIcon={logout}/>
               <Image  style={Styles.ProfileImg} source={{uri: `data:image/jpg;base64,${data.Pic}`}}/>
            <Text style={{fontSize:17,color:"#154c79",textAlign:"center",fontWeight:"bold"}}>Principal Message</Text>
          <Text style={{margin:5}}>{data.Message}</Text>
        </ScrollView>
    )
}

export default PrinclipleMessage

const Styles = StyleSheet.create({
    ProfileImg: {
        width: 100,
        height: 100,
        borderRadius:100,
        alignSelf:"center",
        marginTop:20
      }
})

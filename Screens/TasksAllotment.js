import React,{useEffect} from "react";
import { View, Text, StyleSheet ,FlatList, TouchableOpacity, ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from '@react-navigation/native';
import Header from "./Header";
import logout from "../assets/logout.png"

function Tasks({navigation}) {

  const [courses, setCourses] = React.useState({});
  const fetchCourses = async () => {
    const token = await AsyncStorage.getItem("AUTH");
    await fetch(`https://erp.sdcollegemzn.in/assignment/course`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Auth: token,
        platform: "Android",
      },
      redirect: "follow",
    })
      .then((response) => response.text())
      .then(async (responseText) => {
        try {
         var  respObject=JSON.parse(responseText)
          setCourses(respObject);
        } catch (error) {
          console.log("1", error);
          alert("There is some problem. Please try again");
        }
      })
      .catch((error) => {
        console.log("2", error);
        alert("There is some problem. Please try again");
      });
  };

// console.log("==course",courses)
useEffect(()=>{
    fetchCourses()
},[])


  return (
  <View>

 <Header showBack={true} title={"All Courses"} rightIcon={logout}/>
    <FlatList
    data={courses}
    // contentContainerStyle={{ paddingBottom: "50%" }}
    renderItem={({ item }) => (
      <View>
        <View key={item.Id}>
            <TouchableOpacity onPress={()=>{
             navigation.navigate('CourseStream', {
              itemId: item.CourseId,
             
            })
            }}>
              <View style={styles.btn}>
              <Text style={styles.txt}>
            <Text style={{fontWeight:"bold"}}>Select Course</Text> : {item.Course}    
          </Text>
              </View>
        
            </TouchableOpacity>
        </View>
      </View>
    )}
  />
   </View>
  );
}

export default Tasks;

const styles = StyleSheet.create({
  btn: {
    elevation: 15,
    flexDirection: "row",
    margin: 5,
    backgroundColor: "white", //"#3f51b5",#07d2ec
    color: "#000",
    borderRadius: 5,
    boxShadow: "0px 2px 2px lightgray",
    opacity: 0.8,
  },
  message: {
    marginBottom: 20,
    height: 80,
    marginLeft: 30,
    borderRadius: 10,
    padding: 10,
    width: "80%",
    backgroundColor: "#fffafa",
  },
});

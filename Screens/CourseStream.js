import React,{useEffect} from "react";
import { View, Text, StyleSheet ,FlatList, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import logout from "../assets/logout.png"

function CourseStream({route,navigation}) {
  const [courses, setCourses] = React.useState();

const { itemId} = route.params;
// console.log(itemId,"CSID")

  const fetchCourses = async () => {
    const token = await AsyncStorage.getItem("AUTH");
    await fetch(`https://erp.sdcollegemzn.in/assignment/stream?CourseId=${itemId}`, {
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
          // console.log(respObject, "===data");
           setCourses(respObject)
        } catch (error) {
          // this.setState({ isLoading: false });
          // setisLoading(false)
          console.log("1", error);
          alert("There is some problem. Please try again");
        }
      })
      .catch((error) => {
        console.log("2", error);
        // this.setState({ isLoading: false });
        // setisLoading(false)
        alert("There is some problem. Please try again");
      });
  };


useEffect(()=>{
    fetchCourses()
},[])


  return (
 <View>   
<Header showBack={true} title={"Select Group"} rightIcon={logout}/>
    <FlatList
    data={courses}
    contentContainerStyle={{ paddingBottom: "50%" }}
    renderItem={({ item }) => (
      <View>
        <View style={styles.btn} key={item.Id}>
            <TouchableOpacity onPress={()=>{
             navigation.navigate('Students', {
              CourseId:itemId,
              StreamId:item.StreamId,
              YearId:item.AcademicYrId
            })
            }}>
            <Text style={styles.txt}>
            <Text style={{fontWeight:"bold",padding:5}}>Course Group</Text> : {item.Stream} {item.Year}
          </Text>
            </TouchableOpacity>
        </View>
      </View>
    )}
  />
   </View>
  );
}

export default CourseStream;

const styles = StyleSheet.create({
  btn: {
    elevation: 15,
    flexDirection: "row",
    margin: 10,
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

import React,{useEffect} from 'react'
import { View,Text,Image,StyleSheet, TouchableOpacity,BackHandler,Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
function Dashboard({navigation}) {

    const [type,setType]=React.useState();

    return (
        <View>
      <Header/>
            <TouchableOpacity onPress={()=>{navigation.navigate("FeedBack")}}>
          <View style={styles.btn}>
          <Image
          style={styles.tinyLogo}
          source={require('../assets/feedback.jpg')}
        />
              <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 ,fontWeight:"bold"}}>Parent FeedBack</Text>
         </View> 
            </TouchableOpacity>

          <TouchableOpacity  onPress={()=>{navigation.navigate("StudentFeedBack")}}>
          <View style={styles.btn}>
          <Image
          style={styles.tinyLogo}
          source={require('../assets/feedback.jpg')}
        />
            <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1,fontWeight:"bold" }}>Student FeedBack</Text>
         </View>
            </TouchableOpacity>
        </View>
    )
}

export default Dashboard

const styles=StyleSheet.create({
    btn: {
        elevation: 15,
        flexDirection: "row",
        margin: 15,
        backgroundColor: "white",//"#3f51b5",#07d2ec
        color: "#000",
        borderRadius: 10,
        boxShadow: "0px 2px 2px lightgray",
        opacity: 0.8
    },
    tinyLogo: {
        width: 70,
        height: 70,
        borderRadius:10,
        margin:3
      }
})
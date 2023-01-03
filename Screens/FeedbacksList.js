import React from 'react'
import { View,Text,Image,StyleSheet, TouchableOpacity} from 'react-native'
// import Header from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage';


const FeedbacksList = ({navigation}) => {

const  FeedBackList1=async()=>{
setIsParent("1")
// const IP=isParent.toString();
await AsyncStorage.setItem('isParent',"1");
// console.log(isParent,"isparentfeed1")
navigation.navigate("ListofFeedback")
}
const  FeedBackList2=async()=>{
    setIsParent("0")
    // console.log(typeof(isParent))
    // const IP=isParent.toString();
    await AsyncStorage.setItem('isParent',"0");
    navigation.navigate("ListofFeedback")
    }

    // const checkParent=async()=>{
    //     const  IP=isParent.toString();
    //     console.log(typeof(IP))
    //     // await AsyncStorage.setItem('isParent',IP);
    // }

    // React.useEffect(()=>{
    //     checkParent()
    // })

    return (
        <View>
        {/* <Header/> */}
              <TouchableOpacity onPress={FeedBackList1}>
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/feedback.jpg')}
          />
                <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 ,fontWeight:"bold"}}>Parent FeedBacks</Text>
           </View> 
              </TouchableOpacity>
  
            <TouchableOpacity  onPress={FeedBackList2}>
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/feedback.jpg')}
          />
              <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1,fontWeight:"bold" }}>Student FeedBacks</Text>
           </View>
              </TouchableOpacity>
          </View>
    )
}

export default FeedbacksList

const styles = StyleSheet.create({
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

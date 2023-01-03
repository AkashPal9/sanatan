import React,{useEffect} from 'react'
import { View,Text,Image,StyleSheet, TouchableOpacity,BackHandler,Alert, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import logout from "../assets/logout.png";

function Dashboard({navigation}) {
  const [LedgerGroupId,setLedgerGroupId]=React.useState(null)
  const [user,setUser]=React.useState();
  const  handleBackButton = () => {
    if (!navigation.isFocused()) {
        // The screen is not focused, so don't do anything
        return false;
    }
    Alert.alert(
        'Exit App',
        'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => {
                global.selectedBusiness = '';               
                BackHandler.exitApp();
                navigation.navigate("Login")
            }
        },],{
        cancelable: false
    })
    return true;
}



const setGID=async()=>{
 const LGID=await AsyncStorage.getItem('GID');
 setLedgerGroupId(LGID)
}

const displayUserName = async () => {
  const UN = await AsyncStorage.getItem("SRNAME");
  setUser(UN);
};
const  FeedBackList1=async()=>{
  // const IP=isParent.toString();
  await AsyncStorage.setItem('isParent',"1");
  // console.log(isParent,"isparentfeed1")
  navigation.navigate("ListofFeedback")
  }
  const  FeedBackList2=async()=>{
      // console.log(typeof(isParent))
      // const IP=isParent.toString();
      await AsyncStorage.setItem('isParent',"0");
      navigation.navigate("ListofFeedback")
      }
  

React.useEffect(() => {
  setGID()
  displayUserName()
  BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  return () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  }
}, [])

    return (
      <View>
        {
          LedgerGroupId==1 && <View>
            <Header showBack={false} title={user} rightIcon={logout}/>
            <TouchableOpacity onPress={FeedBackList1}>
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/Feedback2.jpg')}
          />
                <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 }}>Parent FeedBacks</Text>
           </View> 
              </TouchableOpacity>
  
            <TouchableOpacity  onPress={FeedBackList2}>
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/Feedback2.jpg')}
          />
              <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 }}>Student FeedBacks</Text>
           </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("Internal")}>
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/task.jpg')}
            />
              <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 }}>Allot Task</Text>
            </View>
              </TouchableOpacity>
            
              <TouchableOpacity onPress={()=>navigation.navigate("AllotedTasks")}>
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/task.jpg')}
            />
              <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 }}>Alloted Task</Text>
            </View>
              </TouchableOpacity>

            </View>

            

        }
        {LedgerGroupId==2  &&  <View>
            <Header showBack={false} title={user} rightIcon={logout}/>
          <TouchableOpacity  onPress={()=>{navigation.navigate("Tasks")}}>
          <View style={styles.btn}>
          <Image
          style={styles.tinyLogo}
          source={require('../assets/assignment.png')}
        />
            <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1,fontWeight:"bold" }}>Assignment</Text>
         </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.navigate("AllotedAssignment")}}>
          <View style={styles.btn}>
          <Image
          style={styles.tinyLogo}
          source={require('../assets/assignment.png')}
        />
            <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1,fontWeight:"bold" }}>Alloted Assignment</Text>
         </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.navigate("ReadTask")}}>
          <View style={styles.btn}>
          <Image
          style={styles.tinyLogo}
          source={require('../assets/task.jpg')}
        />
            <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1,fontWeight:"bold" }}>Alloted Task</Text>
         </View>
            </TouchableOpacity >
            <TouchableOpacity  onPress={()=>{navigation.navigate("PrinclipleMessage")}}>
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/feedback.jpg')}
            />
              <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1,fontWeight:"bold" }}>Principal Message</Text>
            </View>
              </TouchableOpacity>
              {/* <TouchableOpacity >
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/task.jpg')}
            />
              <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1,fontWeight:"bold" }}>Chairman Message</Text>
            </View>
              </TouchableOpacity> */}
              {/* <TouchableOpacity  onPress={()=>{navigation.navigate("Add")}}>
              <View style={styles.btn}>
              <Image
            style={styles.tinyLogo}
            source={require('../assets/penass.jpg')}
            />
                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#000", padding: 25, flex: 1 }}>Assignments</Text>
            </View>
              </TouchableOpacity> */}
            </View>
            }
            {LedgerGroupId==3  &&  <ScrollView>
            <Header showBack={false} title={user}  rightIcon={logout}/>
              <TouchableOpacity onPress={()=>{navigation.navigate("Profile")}}>
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/profile.png')}
            />
                <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 }}>Profile</Text>
            </View> 
              </TouchableOpacity>

              <TouchableOpacity  onPress={()=>{navigation.navigate("FetchAssignment")}}>
          <View style={styles.btn}>
          <Image
          style={styles.tinyLogo}
          source={require('../assets/assignment.png')}
        />
            <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 }}>Assignment</Text>
         </View>
            </TouchableOpacity>
              <TouchableOpacity onPress={()=>{navigation.navigate("FeedBack")}}>
          <View style={styles.btn}>
          <Image
          style={styles.tinyLogo}
          source={require('../assets/Feedback2.jpg')}
        />
              <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 }}>Parent FeedBack</Text>
         </View> 
            </TouchableOpacity>

          <TouchableOpacity  onPress={()=>{navigation.navigate("StudentFeedBack")}}>
          <View style={styles.btn}>
          <Image
          style={styles.tinyLogo}
          source={require('../assets/Feedback2.jpg')}
        />
            <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 }}>Student FeedBack</Text>
         </View>
            </TouchableOpacity>
            
            <TouchableOpacity  onPress={()=>{navigation.navigate("PrinclipleMessage")}}>
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/feedback.jpg')}
            />
              <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1 }}>Principal Message</Text>
            </View>
              </TouchableOpacity>
              
              {/* <TouchableOpacity >
            <View style={styles.btn}>
            <Image
            style={styles.tinyLogo}
            source={require('../assets/task.jpg')}
            />
              <Text style={{ textTransform: "uppercase", fontSize: 17, color: "#000", padding: 25, flex: 1}}>Chairman Message</Text>
            </View>
              </TouchableOpacity> */}
              {/* <TouchableOpacity  onPress={()=>{navigation.navigate("Add")}}>
              <View style={styles.btn}>
              <Image
            style={styles.tinyLogo}
            source={require('../assets/penass.jpg')}
            />
                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#000", padding: 25, flex: 1 }}>Assignments</Text>
            </View>
              </TouchableOpacity> */}
            </ScrollView>
            }
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
        opacity: 0.8,
        borderColor: "white",
        borderWidth:1
        },
      tinyLogo: {
        width: 70,
        height: 70,
        borderRadius:10,
        margin:3
      }
})
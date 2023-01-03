import React from 'react'
import { View ,Text,TouchableOpacity,Image,StyleSheet} from 'react-native'
import Header from './Header'

function Sceduling() {
    return (
        <View>
           {/* <Header /> */}
          <View style={styles.btn}>
        <Text>
        <Text style={{fontWeight:"bold",padding:3}}>Monday 21-11-2022 {"\n"}</Text>
        <Text style={{color: "#000", padding:10,flex: 1 ,fontSize:12,margin:1}}> 
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
        </Text>
         </View> 
         <View style={styles.btn}>
        <Text>
        <Text style={{fontWeight:"bold",margin:3}}>Monday 21-11-2022 {"\n"}</Text>
        <Text style={{color: "#000", padding:10,flex: 1 ,fontSize:12,margin:1}}> 
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
        </Text>
         </View> 
         <View style={styles.btn}>
        <Text>
        <Text style={{fontWeight:"bold",margin:3}}>Monday 21-11-2022 {"\n"}</Text>
        <Text style={{color: "#000", padding:10,flex: 1 ,fontSize:12,margin:1}}> 
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
        </Text>
         </View> 
         <View style={styles.btn}>
        <Text>
        <Text style={{fontWeight:"bold",margin:3}}>Monday 21-11-2022 {"\n"}</Text>
        <Text style={{color: "#000", padding:10,flex: 1 ,fontSize:12,margin:1}}> 
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
        </Text>
         </View> 
         <View style={styles.btn}>
        <Text>
        <Text style={{fontWeight:"bold",margin:3}}>Monday 21-11-2022 {"\n"}</Text>
        <Text style={{color: "#000", padding:10,flex: 1 ,fontSize:12,margin:1}}> 
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
        </Text>
         </View> 
         <View style={styles.btn}>
        <Text>
        <Text style={{fontWeight:"bold",margin:3}}>Monday 21-11-2022 {"\n"}</Text>
        <Text style={{color: "#000", padding:10,flex: 1 ,fontSize:12,margin:1}}> 
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
        </Text>
         </View> 
         <View style={styles.btn}>
        <Text>
        <Text style={{fontWeight:"bold",margin:3}}>Monday 21-11-2022 {"\n"}</Text>
        <Text style={{color: "#000", padding:10,flex: 1 ,fontSize:12,margin:1}}> 
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
        </Text>
         </View> 
        
        </View>
    )
}

export default Sceduling


const styles=StyleSheet.create({
      btn: {
        elevation: 15,
        flexDirection: "row",
        margin: 10,
        backgroundColor: "white",//"#3f51b5",#07d2ec
        color: "#000",
        borderRadius: 10,
        boxShadow: "0px 2px 2px lightgray",
        opacity: 0.8,
    }
})
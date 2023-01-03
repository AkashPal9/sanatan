import React, { useEffect,useState } from "react";
import { Alert, StyleSheet, TextInput, Text, TouchableOpacity,Image, View, ScrollView } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';


const data = [
  { label: 'Admin', value: '1' },
  { label: 'Teacher', value: '2' },
  { label: 'Student', value: '3' },
];


const Login = ({ navigation }) => {
  const [username, setusername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [statuscode,setStatusCode]=React.useState();
  const [isLoading,setIsLoading]=React.useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // const myIcon1 = <Icon name="user" size={19} color="#fff" />
  // const myIcon2 = <Icon name="lock" size={19} color="#fff" />
  const loginUser=async()=>{
    const nm=   await AsyncStorage.getItem('SRNAME');
    // console.log(nm,"user")
    if(nm)
    {
      navigation.navigate("Dashboard")
    }
  }
  React.useEffect(()=>{
    loginUser()
  })



const _SignIn = () => {
  if (username.length <= 0) {
      Alert.alert("Marwari Software", "Username Can't Be Left Empty")
  }else if(password.length<0){
      Alert.alert("Marwari Software", "Password Can't Be Left Empty")
  }
  else {
      setIsLoading(true);
      fetch(`https://erp.sdcollegemzn.in/api/apiuserlogin?GroupId=${value}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "username": username,
              "Password": password,
              platform: "Android"
          },
          redirect: 'follow'
      }).then((response) =>response.text()).then(async responseText => {
          try {
              var respObject = JSON.parse(responseText);
              console.log("data==data",respObject)
              // console.log("respobj",statuscode);
              if (respObject.Message==="OK" && respObject.LedgerGroupId==1) {
                // console.log(respObject.EmpId,"adminid")
                  await AsyncStorage.setItem('SRNAME', respObject.Name);
                  await AsyncStorage.setItem('AUTH', respObject.Auth);
                  const  Eid=respObject.EmpId.toString();
                  await AsyncStorage.setItem('AID',Eid);
                  const  Gid=respObject.LedgerGroupId.toString();
                  await AsyncStorage.setItem('GID',Gid );
                  navigation.navigate('Dashboard')
                  setusername("")
                  setPassword("")
                  //    const BussName = respObject[0]["BusinessName"];
                  setIsLoading(false)
              }else if(respObject.Message==="OK" && respObject.LedgerGroupId==2)
              {
                console.log(respObject.EmpId,"responseteacher")
                await AsyncStorage.setItem('SRNAME', respObject.Name);
                await AsyncStorage.setItem('AUTH', respObject.Auth);
                const  Eid=respObject.EmpId.toString();
                await AsyncStorage.setItem('Id',Eid);
                const  Gid=respObject.LedgerGroupId.toString();
                await AsyncStorage.setItem('GID',Gid );
                navigation.navigate('Dashboard')
                setusername("")
                setPassword("")
                //    const BussName = respObject[0]["BusinessName"];
                setIsLoading(false)
              }
              else if(respObject.Message==="OK" && respObject.LedgerGroupId==3)
              {
                await AsyncStorage.setItem('SRNAME', respObject.Name);
                await AsyncStorage.setItem('AUTH', respObject.Auth);
                const  Sid=respObject.Id.toString();
                await AsyncStorage.setItem('ID',Sid);
                const  Gid=respObject.LedgerGroupId.toString();
                await AsyncStorage.setItem('GID',Gid );
                navigation.navigate('Dashboard')
                setusername("")
                setPassword("")
                //    const BussName = respObject[0]["BusinessName"];
                setIsLoading(false)
              }
              else {
                // console.log(responseT)
                setIsLoading(false)
                  Alert.alert("Marwari Software", respObject.Message)

              }
          }
          catch (error) {
      setIsLoading(false)
              console.log(error);
              Alert.alert("Marwari Software", "1. There is some problem. Please try again"); 
          }
      }).catch(error => {
          console.log(error);
          // this.setState({ isLoading: false });
          setIsLoading(false)
          Alert.alert("Marwari Software", "2. There is some problem. Please try again" + error);
      });
  }
}


  return (
   

      <ScrollView style={styles.container}>
      {/* <Text style={{fontSize:20,fontFamily:"sans-serif",textAlign:"center"}}>SD DEGREE COLLEGE</Text> */}
      <View>
    <Image
        style={styles.tinyLogo}
        source={require('../assets/sddp.png')}
      />
    </View>
        <View style={{marginTop:55}}>
          <Text style={styles.text}>Username</Text>

          <View style={styles.searchSection}>
          <Icon style={styles.searchIcon} name="user" size={19} color="#000" />
          <TextInput
          
          style={styles.input1}
          onChangeText={(text) => {
            if (text.includes(' ')) {
              setusername(text.trim());
            } else {
              setusername(text);
            }
          }}
          
          value={username}
          placeholder="Username"
          textContentType="email"
        />
          </View>
          

          <Text style={styles.text}>Password</Text>
          <View style={styles.searchSection}>
          <Icon style={styles.searchIcon} name="lock" size={19} color="#000" /> 
            <TextInput
            style={styles.input1}
            onChangeText={(text) => {
              if (text.includes(' ')) {
                setPassword(text.trim());
              } else {
                setPassword(text);
              }
            }}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          />
          
         
          </View>
         

     
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          // inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          // search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select User Type' : '...'}
          // searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
        </View>
          <TouchableOpacity style={styles.button} onPress={_SignIn}><Text style={{ textAlign: "center" ,color:"#000"}}>Sign In</Text></TouchableOpacity>
        </ScrollView>


  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#154c79',//#41bea5,,

  },
  // #0b0b50
  input: {
    marginBottom: 10,
    height: 40,
    alignSelf:"center",
    borderRadius: 10,
    padding: 10,
    width: "75%",
    backgroundColor: "white",
  
  },
  text: {
    marginLeft: 35,
    paddingBottom: 10,
    color: "white",
    fontSize:15,
    marginTop:10
  },
  button: {
    height: 45,
    // marginLeft: 63,
    alignSelf:"center",
    borderRadius: 10,
    padding: 10,
    width: "40%",
    textAlign: "center",
    backgroundColor: "#c8e1f6",//#353838
    marginTop: 10,
    
    
  },
  error: {
    color: "orange",
    marginLeft: 40,
    marginTop: 15
  },
    tinyLogo: {
    width: 180,
    height: 160,
    borderRadius:20,
    alignSelf:"center",
    marginTop:55,
    marginBottom:20
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor:"white",
    width:"80%",
    alignSelf:"center",
    bottom:"100%"
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

    // marginBottom: 10,
    // height: 40,
    alignSelf:"center",
    borderRadius: 10,
    // padding: 10,
    width: "80%",
    // backgroundColor: "white",
},
searchIcon: {
    padding: 10,
},
input1: {
    // flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    // paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 10,
    // padding: 10,
    // width: "80%",
    marginBottom: 10,
    height: 40,
    alignSelf:"center",
    // borderRadius: 10,
    // padding: 10,
    width: "80%",
    // backgroundColor: "white",
},

});

export default Login;


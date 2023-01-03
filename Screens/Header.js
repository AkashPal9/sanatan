import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
// import { View, Text } from 'react-native';
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BackIcon from '../assets/back.png';
import { useNavigation } from "@react-navigation/native";


const Header = ({showBack,rightIcon,title}) => {

  const navigation = useNavigation();
  const  logout = ()=>{
      AsyncStorage.clear(); 
     global.selectedBusiness = ''; 
      navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
      });
  }

  // const [visible, setVisible] = useState(false);
  // const [user, setUser] = React.useState("");

 

  // const hideMenu = () => {
  //   setVisible(false);
  // };
  // const showMenu = () => setVisible(true);
  // const GoToProfile = () => {
  //   navigation.navigate("Profile");
  //   setVisible(false);
  // };
  // const Logout = () => {
  //   navigation.navigate("Login");
  //   setVisible(false);
  // };

  // const PassChange=()=>{
  //   navigation.navigate("ChangePass")
  //   setVisible(false)
  // }
  return (
    
    <View  style={{ height: 50, backgroundColor: "#154c79", flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
           {showBack && <TouchableOpacity onPress={() => { navigation.goBack()}}>
                <Image style={{ width: 25, height: 25, marginRight: 0, resizeMode: 'contain', tintColor: "#ffffff", marginLeft: 10 }} source={BackIcon}></Image>
            </TouchableOpacity>}                       
        </View>
        <Text style={{ flex: 1, fontSize: 14, color: "#ffffff", alignSelf: "center",marginLeft:"10%" }}>{title}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
           <TouchableOpacity onPress={logout}>
                <Image style={{ width: 25, height: 25, marginRight: 0, tintColor: "#ffffff", marginRight: 10, resizeMode: 'contain' }} source={rightIcon}></Image>
            </TouchableOpacity>
        </View>
    </View>

  );
};

export default Header;






// <View
//       style={{
//         height: 45,
//         backgroundColor: "#154c79",
//         marginTop: 1,
//         marginBottom: 14,
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <View style={{ flex: 1, marginBottom: 15 }}>
//         <Menu
//           visible={visible}
//           anchor={
//             <TouchableOpacity onPress={showMenu}>
//               <Image
//                 style={{
//                   width: 25,
//                   height: 25,
//                   marginRight: 0,
//                   resizeMode: "contain",
//                   tintColor: "#ffffff",
//                   marginLeft: 15,
//                   marginTop: 20,
              
//                 }}
//                 onPress={showMenu}
//                 source={rightIcon}
//               ></Image>
//             </TouchableOpacity>
//           }
//           onRequestClose={hideMenu}
//         >
//           {/* <MenuItem onPress={PassChange}>CHANGE PASSWORD</MenuItem> */}
//           <MenuItem onPress={Logout}>LOGOUT</MenuItem>
//           {/* <MenuItem disabled>Disabled RESULT</MenuItem> */}
//           {/* <MenuDivider /> */}
//         </Menu>
//       </View>
//       <Text
//         style={{
//           flex: 1,
//           fontSize: 16,
//           color: "#ffffff",
//           alignSelf: "center",
//           textAlign: "center",
//         }}
//       >
//         {user}
//       </Text>
//       <View style={{ flex: 1, alignItems: "flex-end" }}></View>
//     </View>
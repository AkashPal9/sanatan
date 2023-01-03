
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity ,Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from './Header';
import logout from "../assets/logout.png";
import { Dropdown } from 'react-native-element-dropdown';

const Assignment = ({route,navigation}) => {
  const [title,setTitle]=useState();
  // const [subject,setSubject]=useState();
  const [desc,setDesc]=useState("");
  const [isDisabled,setIsDisable]=useState(false);
  const [subject,setSubjectList]=useState();
  const [subjectId,setSubjectId]=useState();
  const [isFocus,setisFocus]=React.useState(false)
  const {STID}=route.params;
  // console.log(STID,"ArrayofStudent")
  
  const postdata= async()=>{
setIsDisable(true);
    if (!title) {
      console.log(title,"titlwe")
      Alert.alert("Marwari Software", "Please fill Title !");
  }else if(!subject)
  {
    Alert.alert("Marwari Software", "Please fill Subject !");
  } 
  else {
      // this.setState({ isDisabled: true });
      
      // this.setState({ isLoading: true });
      let body = {
        StdId: STID,
        Title: title,
        Subject:subjectId,
        Description:desc,
        GroupId:2
      }
      const getCircularReplacer = () => { 
        const seen = new WeakSet();
        return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
        };
    };
  const token= await AsyncStorage.getItem('AUTH')
 await fetch( "https://erp.sdcollegemzn.in/assignment/allot", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Auth":token,
        // "Mode": this.state.Mode,
        platform: "Android",
    },
    body: JSON.stringify(body,getCircularReplacer()),
    redirect: 'follow'
})
    .then(response => response.text())
    .then(responseText => {
        try {
            console.log(responseText,1);
            var respObject = JSON.parse(responseText);
            console.log(respObject,"response")
            if (respObject.Message == "Alloted") {
                alert(respObject.Message);
                
                // navigation.goBack();
                navigation.navigate("AllotedAssignment")
                // setTitle("");
                // setSubject("");
                // setDesc("");
            } else {
                alert(responseText);
            }

        } catch (error) {
            alert("There is some problem. Please try again");
        }
    })
    .catch(error => {
        alert("There is some problem. Please try again");
    });
}
  }

  const  fetchSubjectList = async () => {
    const token= await AsyncStorage.getItem('AUTH')
   await  fetch("https://erp.sdcollegemzn.in/assignment/subject", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Auth": token,
            // "Mode": this.state.Mode,
            platform: "Android",
            // "ToDate": this.state.toDate
        },
        redirect: 'follow'
    }).then(response => response.text()).then(async responseText => {

        // this.setState({ isLoading: false });
        // setisLoading(false)
        try {
            let respObject = JSON.parse(responseText);
            if (respObject.Message) {
            
                alert(respObject.Message);
                navigation.goBack();
            } else {
              //  var fullData = respObject;
               const  List = [];
              const   selectedType = '';
                respObject.forEach(object => {
                    console.log("object",object)
                    let dropdownObject = { label:object.Subject, value:object.SubjectId };
                    List.push(dropdownObject)
                });
            setSubjectList(List)
                // this.setState({ PumpList1: List });
                // this.setState({ PumpList2: List });
            }
        } catch (error) {
            // this.setState({ isLoading: false });
            // setisLoading(false)
            console.log("1", error);
            alert("There is some problem. Please try again");
        }
    })
        .catch(error => {
            console.log("2", error);
            // this.setState({ isLoading: false });
            // setisLoading(false)
            alert("There is some problem. Please try again");
        });
}
useEffect(()=>{
fetchSubjectList();
},[])

    return (
        <View>
            <Header showBack={true} title={"Assignments"} rightIcon={logout}/>
            <Text style={Styles.text}>Subject</Text>

    <View style={Styles.input}>
<Dropdown
                                style={[Styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={Styles.placeholderStyle}
                                selectedTextStyle={Styles.selectedTextStyle}
                                inputSearchStyle={Styles.inputSearchStyle}
                                iconStyle={Styles.iconStyle}
                                data={subject}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select item' : '...'}
                                searchPlaceholder="Search..."
                                value={subjectId}
                                onFocus={() => setisFocus(true)}
                                onBlur={() => setisFocus(false)}
                                onChange={item => {
                                 setSubjectId(item.value)
                                 setisFocus
                                }}
                          
                            />
</View>
         <Text style={Styles.text}>Assignment Title</Text>
         <TextInput  style={Styles.input} 
           onChangeText={setTitle}
           value={title}  
           keyboardType="default"
          placeholder="Title"></TextInput>
            
         {/* <Text style={Styles.text}>Upload File</Text> */}
         
         <Text style={Styles.text}>Description</Text>
         <TextInput  style={Styles.input} 
           onChangeText={setDesc}
           value={desc}  
           keyboardType="default"
          placeholder="Description"></TextInput>
         <TouchableOpacity style={Styles.submitbtn} onPress={postdata} disabled={isDisabled}><Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>Submit</Text></TouchableOpacity>
        </View>
    );
}

export default Assignment;

const Styles = StyleSheet.create({
      input: {
        marginBottom: 20,
        height: 40,
        marginLeft: 30,
        borderRadius: 10,
        padding: 10,
        width: "80%",
        backgroundColor: "#fffafa",
        borderColor:"#154c79",
        borderWidth:1
      },  
      text: {
        marginLeft: 35,
        paddingBottom: 10,
        color: "#000",
        fontWeight:"bold",
        marginTop:10,
      },
      submitbtn:{
        marginBottom: 20,
        height: 40,
        borderRadius: 10,
        padding: 10,
        width: "50%",
        backgroundColor: "#154c79",  
        justifyContent:"center",
       alignSelf:"center"
        
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: "#000",
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#000",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#000",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        backgroundColor: 'white',
        color: "#000",
        borderColor: 'blue',
    },
    lableStyle: {
        color: "#000",
        marginLeft: 15,
        fontSize: 14
    },
})


// import React, { useState } from 'react';
// // Import core components
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity
// } from 'react-native';
// import Header from './Header';
// import logout from "../assets/logout.png";
// // Import Document Picker
// import DocumentPicker from 'react-native-document-picker';

// const Assignment = () => {
//   const [singleFile, setSingleFile] = useState(null);

//   const uploadImage = async () => {
//     // Check if any file is selected or not
//     if (singleFile != null) {
//       // If file selected then create FormData
//       const fileToUpload = singleFile;
//       const data = new FormData();
//       data.append('name', 'Image Upload');
//       data.append('file_attachment', fileToUpload);
//       // Please change file upload URL
//       let res = await fetch(
//         'http://localhost/upload.php',
//         {
//           method: 'post',
//           body: data,
//           headers: {
//             'Content-Type': 'multipart/form-data; ',
//           },
//         }
//       );
//       let responseJson = await res.json();
//       if (responseJson.status == 1) {
//         alert('Upload Successful');
//       }
//     } else {
//       // If no file selected the show alert
//       alert('Please Select File first');
//     }
//   };

//   const selectFile = async () => {
//     // Opening Document Picker to select one file
//     try {
//       const res = await DocumentPicker.pick({
//         // Provide which type of file you want user to pick
//         type: [DocumentPicker.types.allFiles],
//         // There can me more options as well
//         // DocumentPicker.types.allFiles
//         // DocumentPicker.types.images
//         // DocumentPicker.types.plainText
//         // DocumentPicker.types.audio
//         // DocumentPicker.types.pdf
//       });
//       // Printing the log realted to the file
//       console.log('res : ' + JSON.stringify(res));
//       // Setting the state to show single file attributes
//       setSingleFile(res);
//     } catch (err) {
//       setSingleFile(null);
//       // Handling any exception (If any)
//       if (DocumentPicker.isCancel(err)) {
//         // If user canceled the document selection
//         alert('Canceled');
//       } else {
//         // For Unknown Error
//         alert('Unknown Error: ' + JSON.stringify(err));
//         throw err;
//       }
//     }
//   };
//   return (
//     <View>   
//         <Header showBack={true} title="Assignment" rightIcon={logout}/>
//        <View style={styles.mainBody}>
//       {/* <View style={{ alignItems: 'center' }}>
  
//       </View> */}
//       {/*Showing the data of selected Single file*/}
//       {singleFile != null ? (
//         <Text style={styles.textStyle}>
//           File Name: {singleFile.name ? singleFile.name : ''}
//           {'\n'}
//           Type: {singleFile.type ? singleFile.type : ''}
//           {'\n'}
//           File Size: {singleFile.size ? singleFile.size : ''}
//           {'\n'}
//           URI: {singleFile.uri ? singleFile.uri : ''}
//           {'\n'}
//         </Text>
//       ) : null}
//       <TouchableOpacity
//         style={styles.buttonStyle}
//         activeOpacity={0.5}
//         onPress={selectFile}>
//         <Text style={styles.buttonTextStyle}>Select File</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.buttonStyle}
//         activeOpacity={0.5}
//         onPress={uploadImage}>
//         <Text style={styles.buttonTextStyle}>Upload File</Text>
//       </TouchableOpacity>
//     </View>
//     </View>

//   );
// };

// const styles = StyleSheet.create({
//   mainBody: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   buttonStyle: {
//     backgroundColor: '#307ecc',
//     borderWidth: 0,
//     color: '#FFFFFF',
//     borderColor: '#307ecc',
//     height: 40,
//     alignItems: 'center',
//     borderRadius: 30,
//     marginLeft: 35,
//     marginRight: 35,
//     marginTop: 15,
//   },
//   buttonTextStyle: {
//     color: '#FFFFFF',
//     paddingVertical: 10,
//     fontSize: 16,
//   },
//   textStyle: {
//     backgroundColor: '#fff',
//     fontSize: 15,
//     marginTop: 16,
//     marginLeft: 35,
//     marginRight: 35,
//     textAlign: 'center',
//   },
// });

// export default Assignment;





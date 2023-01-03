
import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView
} from 'react-native';
import Header from './Header';
import logout from "../assets/logout.png"
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubmitIcon from "../assets/right.png";
import SearchInput, { createFilter } from 'react-native-search-filter';
import { FloatingAction } from "react-native-floating-action";

// const ItemView = ({ item }) => {
//   return (
//     // Flat List Item
//     <Text style={styles.itemStyle} onPress={() => getItem(item)}>
//       {item.id}
//       {'.'}
//       {item.title.toUpperCase()}
//     </Text>
//   );
// };

const ListItem = ({item, selected, onPress, onLongPress}) => (
  <>
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      // style={styles.message}
      >
      <View style={styles.item} key={item.Id}>
      <Text style={styles.txt} >
             <Text style={{fontWeight:"bold",padding:5}}>StudentName</Text>  : {item.StudentName.toUpperCase()} {"\n"}
             <Text style={{fontWeight:"bold",padding:5}}>CourseName</Text>   :  {item.Course}  {"\n"}
             <Text style={{fontWeight:"bold",padding:5}}>AcademicYear</Text> :  {item.Year}  {"\n"}
             <Text style={{fontWeight:"bold",padding:5}}>Group</Text>                :  {item.Stream}
           </Text>

      </View>
      {selected && <View style={styles.overlay}/>}
      
    </TouchableOpacity>
  </>
);

const Students = ({route,navigation}) => {

const {CourseId,StreamId,YearId}=route.params;
  const [selectedItems, setSelectedItems] = useState([]);
  const [students, setStudents] = useState();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);




  const fetchStudents = async () => {
         const token = await AsyncStorage.getItem("AUTH");
         await fetch(`https://erp.sdcollegemzn.in/assignment/student?CourseId=${CourseId}&StreamId=${StreamId}&YearId=${YearId}`, {
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
               setStudents(respObject)
               setFilteredDataSource(respObject);
               setMasterDataSource(respObject);
             //    setCourses(respObject)
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
useEffect(()=>{
fetchStudents()

},[])



const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource and update FilteredDataSource
    const newData = masterDataSource.filter(function (item) {
      // Applying filter for the inserted text in search bar
      const itemData = item.StudentName
        ? item.StudentName.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(masterDataSource);
    setSearch(text);
  }
};



const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
      }}
    />
  );
};



  const handleOnPress = contact => {
    console.log(contact,"contact")
    if (selectedItems.length) {
      return selectItems(contact);
    }

    // here you can add you code what do you want if user just do single tap
    console.log('pressed');
  };

  const getSelected = student => selectedItems.includes(student.StudentId);

  const deSelectItems = () => setSelectedItems([]);

  const selectItems = item => {
    if (selectedItems.includes(item.StudentId)) {
      const newListItems = selectedItems.filter(
        listItem => listItem !== item.StudentId,
      );
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, item.StudentId]);
  };
  return (
<View>  
  <View>
    <Pressable onPress={deSelectItems}>
      <Header showBack={true} title={"Students List"} rightIcon={logout}/>
      <TouchableOpacity><Text style={{fontWeight:"bold",fontSize:15,margin:4,marginLeft:10, borderColor:"#000",borderWidth:1,width:"24%",padding:2,borderRadius:10,backgroundColor:"#154c79",color:"white",textAlign:"center",alignSelf:"flex-end"}}>SelectAll</Text></TouchableOpacity>
      <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
         <FlatList
          data={filteredDataSource}
          contentContainerStyle={{ paddingBottom: "100%" }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({item}) => (
          <ListItem
            onPress={() => handleOnPress(item)}
            onLongPress={() => selectItems(item)}
            selected={getSelected(item)}
            item={item}
          />
        )}
        />
  
    </Pressable>

  <TouchableOpacity style={styles.submitButton} onPress={()=>{
    navigation.navigate("Assign",{
      STID: selectedItems,
    })
  }}>
  </TouchableOpacity>
  <Image
          style={{ width: 56, height: 56, resizeMode: 'contain' ,borderRadius:40,borderColor:"#154c79",borderWidth:1,bottom:10}}
          source={require('../assets/right.png')}
        />
    </View>
    {/* <FloatingAction
    // actions={actions}
    onPress={()=>{ navigation.navigate("Assign",{
      STID: selectedItems,
    })}}
  /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
        elevation: 15,
        flexDirection: "row",
        margin: 10,
        backgroundColor: "white",  
        color: "#000",
        borderRadius: 10,
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
      checkbox: {
        alignSelf:"center",
        margin:1
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth:1,
        borderColor:"#154c79",
        borderRadius:10,
        // bottom:10
      },
      title: {
        fontSize: 32,
      },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'hsla(0, 100%, 90%, 0.3);',
    borderColor:"#154c79",
    // borderWidth:1
    borderRadius:20,

  },
  submitButton: {
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignSelf:"flex-end",
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    // bottom: "100%", 
    backgroundColor: '#03A9F4', 
    borderRadius: 30, 
    elevation: 8 ,
  // bottom:0
},
textInputStyle: {
  height: 40,
  borderWidth: 1,
  paddingLeft: 20,
  margin: 5,
  borderColor: '#154c79',
  backgroundColor: '#FFFFFF',
  borderRadius:10
},
/////////////////////////////////////////////////////////////Model

});

export default Students;
//    style={{ width: 56, height: 56, resizeMode: 'contain' ,borderRadius:40,borderColor:"#154c79",borderWidth:1}}
// submitButton: {
//   position: 'absolute', 
//   width: 56, 
//   height: 56, 
//   alignSelf:"flex-end",
//   alignItems: 'center', 
//   justifyContent: 'center', 
//   right: 20, 
//   // bottom: "100%", 
//   backgroundColor: '#03A9F4', 
//   borderRadius: 30, 
//   elevation: 8 ,
// // bottom:0
// },
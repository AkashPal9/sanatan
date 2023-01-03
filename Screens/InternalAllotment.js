import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,FlatList,Pressable,TouchableOpacity,Image, SafeAreaView} from 'react-native'
import Header from './Header';
import logout from "../assets/logout.png";
import AsyncStorage from "@react-native-async-storage/async-storage";



const ListItem = ({item, selected, onPress, onLongPress}) => (
    <>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        // style={styles.message}
        >
        <SafeAreaView style={styles.item} key={item.Id}>
      
               <Text style={{fontWeight:"bold",padding:5}}>Name : {item.Name}</Text>  
          {/* <Text style={{fontWeight:"bold",padding:5}}>{item.StudentName}</Text> */}
          {/* <Text style={styles.message}>{item.StudentName}</Text> */}
        </SafeAreaView>
        {selected && <View style={styles.overlay}/>}
        
      </TouchableOpacity>
    </>
  );

const InternalAllotment = ({navigation}) => {
    const [data, setData] = useState();
    const [selectedItems, setSelectedItems] = useState([]);
    const [students, setStudents] = useState();
    const fetchEmploye = async () => {
        const token = await AsyncStorage.getItem("AUTH");
        await fetch(`https://erp.sdcollegemzn.in/internaltask/employees?GroupId=${1}`, {
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
    fetchEmploye()

},[])


const handleOnPress = contact => {
    console.log(contact,"contact")
    if (selectedItems.length) {
      return selectItems(contact);
    }

    // here you can add you code what do you want if user just do single tap
    console.log('pressed');
  };
// console.log(selectedItems,"araay")
  const getSelected = student => selectedItems.includes(student.Id);

  const deSelectItems = () => setSelectedItems([]);

  const selectItems = item => {
    if (selectedItems.includes(item.Id)) {
      const newListItems = selectedItems.filter(
        listItem => listItem !== item.Id,
      );
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, item.Id]);
  };
    return (
        <View>  
        <Pressable onPress={deSelectItems}>
          <Header showBack={true} title={"Employee List"} rightIcon={logout}/>
          
          <FlatList
            data={students}
            contentContainerStyle={{ paddingBottom: "50%" }}
            renderItem={({item}) => (
              <ListItem
                onPress={() => handleOnPress(item)}
                onLongPress={() => selectItems(item)}
                selected={getSelected(item)}
                item={item}
              />
            )}
            keyExtractor={item => item.Id}
          />
        </Pressable>
      <TouchableOpacity style={styles.submitButton} onPress={()=>{
        navigation.navigate("EmployeTask",{
          EmpId: selectedItems,
         
        })
      }}>
     <Image
              style={{ width: 56, height: 56, resizeMode: 'contain' ,borderRadius:40,borderColor:"#154c79",borderWidth:1}}
              source={require('../assets/right.png')}
            />
      </TouchableOpacity>
        </View>
    
    )
}

export default InternalAllotment

const styles = StyleSheet.create({

      btn: {
        elevation: 15,
        flexDirection: "row",
        margin: 10,
        backgroundColor: "white", //"#3f51b5",#07d2ec
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
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    // backgroundColor: '#03A9F4', 
    borderRadius: 30, 
    elevation: 8 ,
    marginBottom:70
    
},
})

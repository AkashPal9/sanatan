import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import CalendarPopUp from "./CalenderPopup";
import Header from './Header';
import logout from "../assets/logout.png";
import DateTimePicker from '@react-native-community/datetimepicker';

const ListofFeedbacks = () => {
  const [data, setData] = React.useState([]);
  const [fromDate,setfromDate]=React.useState(moment(new Date()).format('YYYYMMDD'))
  const [toDate,settoDate]=React.useState(moment(new Date()).format('YYYYMMDD'))
  const [isOpenCalender1,setisOpenCalender1]=React.useState(false)
  const [isOpenCalender2,setisOpenCalender2]=React.useState(false)

  // const [item,setItem]=React.useState()
 
  const fetchFeedbacks = async () => {
    // setisLoading(true)
    const isParent = await AsyncStorage.getItem("isParent");
    console.log(isParent, "isparenthkjgyufyt");
    const token = await AsyncStorage.getItem("AUTH");
    await fetch(
      `https://erp.sdcollegemzn.in/api/apifeedback?IsParent=${isParent}&GroupId=${1}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Auth: token,
          platform: "Android",
          FromDate: fromDate,
          ToDate: toDate,
        },
        redirect: "follow",
      }
    )
      .then((response) => response.text())
      .then(async (responseText) => {
        try {
          var respObject = JSON.parse(responseText);
          setData(respObject);
          console.log(respObject, "===data");
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

  console.log(fromDate,"fromdate",toDate,"todate")
  // React.useEffect(() => {
  //   fetchFeedbacks();
  // }, []);

 
  
 const   onToDateChange = (date) => {
  settoDate( moment(date).format('YYYYMMDD'))
  setisOpenCalender2(false)

}
const   onFromDateChange = (date) => {
  setfromDate(moment(date).format('YYYYMMDD'))
  setisOpenCalender1(false)

}
  // console.log("flatdata",item)
  return (
    <View>   
           <Header showBack={true} title={"Feedbacks"} rightIcon={logout}/>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
           <View style={{ flex: 2, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>From Date</Text>
                                <TouchableOpacity onPress={() => setisOpenCalender1(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(fromDate).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 2, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>To Date</Text>
                                <TouchableOpacity onPress={() => setisOpenCalender2(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(toDate).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <TouchableOpacity style={{ marginTop: 20, width: 50, borderRadius: 10, borderWidth: 1, borderColor: "#fff", backgroundColor: "#154c79", height: 40, marginBottom: 5, alignSelf: 'center', justifyContent: 'center' }} onPress={() =>fetchFeedbacks()}>
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>Go</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                            <CalendarPopUp isOpenToCalender={isOpenCalender1} heading="Select Date" onToDateChange={onFromDateChange} selectedDate={fromDate} />
                        <CalendarPopUp isOpenToCalender={isOpenCalender2} heading="Select Date" onToDateChange={onToDateChange} selectedDate={toDate} />
       <FlatList
      data={data}
      contentContainerStyle={{ paddingBottom: "50%" }}
      renderItem={({ item }) => (
        <View>
          <View style={styles.item} key={item.Id}>
            <Text style={styles.txt}>
              <Text style={{ fontWeight: "bold" }}> Subject:</Text>{" "}
              {item.Subject}
              {"\n"}
              <Text style={{ fontWeight: "bold" }}> Message:</Text>{" "}
              {item.Message}
              {"\n"}
              <Text style={{ fontWeight: "bold" }}> Name:</Text>{" "}
              {item.StudentName}
              {"\n"}
              <Text style={{ fontWeight: "bold" }}> Class:</Text> {item.Course}
              {"\n"}
              <Text style={{ fontWeight: "bold" }}> Year:</Text> {item.Year}
              {"\n"}
              <Text>
              <Text style={{fontWeight:"bold"}}> Date:</Text>  {moment(item.Date.toString()).format('DD MMM YYYY')}</Text>
              {"\n"}
             <Text style={{ fontWeight: "bold" }}> Relation:</Text> {item.Relation}

            </Text>
            </View>
        </View>
      )}
    />
    </View>

  );
};

export default ListofFeedbacks;

const styles = StyleSheet.create({
  btn: {
    elevation: 15,
    flexDirection: "row",
    margin: 15,
    backgroundColor: "white", //"#3f51b5",#07d2ec
    color: "#000",
    borderRadius: 5,
    boxShadow: "0px 2px 2px lightgray",
    opacity: 0.8,
    borderColor:"#154c79",
    borderWidth:1
  },
  txt: {
    flex: 1,
    fontSize: 13,
  },
  row: {
    margin: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,

    width: "100%",
    padding: 5,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    // backgroundColor:"#ccc",
    borderRadius:10,
    borderWidth:1,
    borderColor:"#154c79",
    // bottom:"100%"
  },
  TextInputStyle: {
    fontSize: 14 ,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    padding: 10,
    backgroundColor: "#fff",
    color: "#000000",
    borderColor: "#11245a",
    textAlignVertical: "center"
},
});

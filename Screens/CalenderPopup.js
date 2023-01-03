import React from 'react';
import {Modal,View,Text} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

// export default class CalendarPopUp extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             visibleModal : false,
//         }
//     }
const CalendarPopUp=({isOpenToCalender,onToDateChange,heading,selectedDate})=>{

const [visibleModal,setvisibleModel]=React.useState(false)


  const  setModalVisible=()=>{
        isOpenToCalender(false);
    }
    // render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpenToCalender}
                onRequestClose={onToDateChange}>
                <View style={{ flex: 1, backgroundColor: "#000000ee", alignItems: 'baseline', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: "#ffffff", paddingTop: 10, paddingBottom: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#434343", margin: 15 }}>{heading}</Text>
                        <View style={{ backgroundColor: "#434343", height: 1, marginBottom: 10 }}></View>
                        <CalendarPicker
                            onDateChange={onToDateChange}
                            selectedDayTextColor="#ffffff"
                            selectedDayColor="#11245a"
                            initialDate={selectedDate}
                            selectedStartDate={selectedDate}
                            nextTitleStyle={{
                                textAlign: 'left',
                                color: '#000'
                            }}
                            previousTitleStyle={{
                                textAlign: 'left',
                                color: '#000'
                            }}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    export default CalendarPopUp;
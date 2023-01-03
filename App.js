import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UserLogin from './Screens/UserLogin';
import Dashboard from './Screens/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Sceduling from './Screens/Sceduling';
import Tasks from './Screens/TasksAllotment';
import Reminders from './Screens/Reminders';
import Profile from './Screens/Profile';
import ChangePassword from './Screens/ChangePassword';
// import Add from './Screens/Assignments';
import Feedback from './Screens/Feedback';
import StudentFeedBack from './Screens/StudentFeedBack';
import FeedbacksList from './Screens/FeedbacksList';
import ListofFeedbacks from './Screens/ListofFeedbacks';
import CourseStream from "./Screens/CourseStream";
import Students from './Screens/Students';
import Assignment from './Screens/Assignment';
import React from 'react';
import FetchAssignment from './Screens/FetchAssignment';
import InternalAllotment from './Screens/InternalAllotment';
import EmployeTaskAlotment from './Screens/EmployeTaskAlotment';
import ReadTasks from './Screens/ReadTasks';
import AllotedAssignments from './Screens/AllotedAssignments';
import PrinclipleMessage from './Screens/PrinclipleMessage';
import AllotedTask from './Screens/AllotedTasks';
// import MenuBar from './Screens/Menu';
const Stack=createNativeStackNavigator();
export default function App() {  



  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={UserLogin} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false,statusBarStyle:"dark"}}/>
      <Stack.Screen name="Scheduling" component={Sceduling} />
      <Stack.Screen name="Tasks" component={Tasks} options={{headerShown:false,statusBarStyle:"dark"}}/>
      <Stack.Screen name="Reminders" component={Reminders} options={{headerShown:false,statusBarStyle:"dark"}}/>
      <Stack.Screen name="Profile" component={Profile} options={{headerShown:false,statusBarStyle:"dark"}}/>
      <Stack.Screen name="ChangePass" component={ChangePassword} options={{statusBarStyle:"dark"}} />
      {/* <Stack.Screen name="Add" component={Add} options={{statusBarStyle:"dark"}} /> */}
      <Stack.Screen name="FeedBack" component={Feedback} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="StudentFeedBack" component={StudentFeedBack} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="FeedBackList" component={FeedbacksList} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="ListofFeedback" component={ListofFeedbacks} options={{statusBarStyle:"dark",headerShown:false}} />
      <Stack.Screen name="CourseStream" component={CourseStream} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="Students" component={Students} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="Assign" component={Assignment} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="FetchAssignment" component={FetchAssignment} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="Internal" component={InternalAllotment} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="EmployeTask" component={EmployeTaskAlotment} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="ReadTask" component={ReadTasks} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="AllotedAssignment" component={AllotedAssignments} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="PrinclipleMessage" component={PrinclipleMessage} options={{headerShown:false,statusBarStyle:"dark"}} />
      <Stack.Screen name="AllotedTasks" component={AllotedTask} options={{headerShown:false,statusBarStyle:"dark"}} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}

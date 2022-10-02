import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import firebase from "firebase";
import firebase from "firebase/compat";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ItemList from "./components/ItemList";
import Add_edit_Item from "./components/Add_edit_Item";
import ItemDetails from "./components/ItemDetails";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';



export default function App() {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const firebaseConfig = {
    apiKey: "AIzaSyCTC2GTndFw4DhVxEeyHSps_bzrytkXJ4E",
    authDomain: "fir-db-64115.firebaseapp.com",
    projectId: "fir-db-64115",
    storageBucket: "fir-db-64115.appspot.com",
    messagingSenderId: "740826723303",
    appId: "1:740826723303:web:be77d366b76c2af3c80342",
    measurementId: "G-3P5DG8NDFZ"
  };


  // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
  // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'Item List'} component={ItemList}/>
          <Stack.Screen name={'Item Details'} component={ItemDetails}/>
          <Stack.Screen name={'Edit Item'} component={Add_edit_Item}/>
        </Stack.Navigator>
    )
  }

  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
          <Tab.Screen name={'Sign up'} component={SignUpForm} options={{tabBarIcon: () => ( <Ionicons name="create-outline" size={20} />)}}/>
          <Tab.Screen name={'Login'} component={LoginForm} options={{tabBarIcon: () => ( <Ionicons name="log-in-outline" size={20} />)}}/>
          <Tab.Screen name={'Add Item'} component={Add_edit_Item} options={{tabBarIcon: () => ( <Ionicons name="cart-outline" size={20} />)}}/>
          <Tab.Screen name={'Message'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="chatbubble-ellipses-outline" size={20} />)}}/>

        </Tab.Navigator>
      </NavigationContainer>
      
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

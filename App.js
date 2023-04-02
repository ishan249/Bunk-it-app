import React,{useState, useEffect,useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import themeContext from "./config/themeContext";
import { EventRegister } from "react-native-event-listeners";
import AppNavigator from "./navigation/AppNavigation";
const Stack = createStackNavigator();

export default function App() {
  const [mode, setMode] = useState(true);
  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  },[]);

  return (
    <themeContext.Provider value ={mode}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
     </themeContext.Provider>
  );
}

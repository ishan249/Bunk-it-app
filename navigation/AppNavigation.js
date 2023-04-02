import { React, useState, useEffect, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeBack from "../screens/WelcomeBack";
import Home from "../screens/Home";
import About from "../screens/About";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMoon,
  faSun,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { EventRegister } from "react-native-event-listeners";
import { StatusBar, View, TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import themeContext from "../config/themeContext";
import { useNavigation } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function AppNavigator() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [mode, setMode] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setMode(!mode);
    EventRegister.emit("changeTheme", mode);
  };

  const theme = useContext(themeContext);
  return (
    <>
      <StatusBar hidden={false} backgroundColor="#252525" />
      <Stack.Navigator initialRouteName={showWelcome ? "Welcome" : "Home"}>
        {showWelcome ? (
          <Stack.Screen
            name="Welcome"
            component={WelcomeBack}
            options={{ headerShown: false }}
          />
        ) : null}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Bunk It",
            headerStyle: {
              backgroundColor: "#252525",
              height: 68,
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              //   elevation: 0,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            cardStyle: {
              backgroundColor: theme ? "#252525" : "#fff",
            },
            headerRight: () => (
              <View style={{ flexDirection: "row", marginRight: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate("About")}>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    size={22}
                    color="#fff"
                    style={{ marginRight: 20 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleDarkMode}>
                  <FontAwesomeIcon
                    icon={theme ? faSun : faMoon}
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: "About",
            headerStyle: {
              backgroundColor: "#252525",
              height: 68,
              borderBottomWidth: 1,
              borderBottomColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            cardStyle: {
              backgroundColor:theme ? "#252525" : "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </>
  );
}

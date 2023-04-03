import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Linking, ScrollView } from "react-native";
import themeContext from "../config/themeContext";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function About() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const theme = useContext(themeContext);
  function handleIshanProfile() {
    Linking.openURL("https://ishanpatel.me");
  }
  function handleJaiminProfile() {
    Linking.openURL("https://www.linkedin.com/in/jaiminjariwala/");
  }
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      });
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={[styles.heading,{color:theme?"#fff":"#000"}]}>Hello User.</Text>
        <Text style={[styles.mainInfo,{color:theme?"#fff":"#000"}]}>
          Bunk It is an App which you can use to calculate how many lectures you
          can leave or have to attend to maintain required attendance. It's a
          very simple and easy to use, just input present slots, total slots,
          desired attendance and you are good to go. This is made for personal
          use only, there is no any other intention apart from helping an
          individual to maintain their schedule with college academics.
        </Text>
        <Text style={[styles.subHeading,{color:theme?"#fff":"#000"}]}>Developed By : </Text>
        <View style={styles.developerView}>
          <Text style={styles.developerName}>
            Jaimin Jariwala{" "}
            <Text style={styles.developerProfile} onPress={handleJaiminProfile}>
              {" "}
              Visit Profile{" "}
            </Text>{" "}
          </Text>
          <Text style={styles.developerRole}>did all the maths</Text>
        </View>
        <View
          style={[
            {
              marginTop: 12,
            },
            styles.developerView,
          ]}
        >
          <Text style={styles.developerName}>
            Ishan Patel{" "}
            <Text style={styles.developerProfile} onPress={handleIshanProfile}>
              Visit Profile
            </Text>
          </Text>
          <Text style={styles.developerRole}>developed an App</Text>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 12,
  },
  infoContainer: {
    padding: 10,
  },
  profileLinks: {
    color: "#3457D5",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
  },
  mainInfo: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    paddingTop: 20,
  },
  subHeading: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    paddingVertical: 16,
    fontWeight: "bold",
  },
  developerName: {
    color: "#000",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontWeight: "bold",
  },
  developerProfile: {
    color: "#4545F5",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 4,
    fontWeight: "bold",
  },
  developerRole: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    padding: 4,
  },
  developerView: {
    backgroundColor: "#D8D8D8",
    padding: 6,
    borderRadius: 10,
    width: "90%",
  },
});

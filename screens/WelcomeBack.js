import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

export default function WelcomeBack() {
  const [showMessage, setShowMessage] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    }

    loadFonts();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage(false);
    }, 2000); // hide message after 2-3 seconds

    setShowMessage(true);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    showMessage && (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={[{ textAlign: "center", justifyContent: "center" }]}>
          <Image
            source={require("../assets/images/newImage.png")}
            style={{ width: 186, height: 160 }}
          />
        </View>
        <Text style={styles.title}>Bunk it</Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "#EE2828",
    fontWeight: "bold",
    paddingTop: 14,
    fontFamily: "Poppins-SemiBold",
  },
  elevation: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },
});

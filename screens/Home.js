import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Dimensions
} from "react-native";
import React, { useState, useEffect ,useContext} from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import themeContext from "../config/themeContext";
import * as Font from "expo-font";
const windowWidth = Dimensions.get("window").width;
const windowFontSize = windowWidth / 20;
export default function Home() {
  const [presentSlot, setPresentSlot] = useState("");
  const [totalSlot, setTotalSlot] = useState("");
  const [requiredAttendance, setRequiredAttendance] = useState("");
  const [output1, setOutput1] = useState("");
  const [output2, setOutput2] = useState("");
  const [result, setResult] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [bunk, setBunk] = useState(true);
  const [slotsError, setSlotsError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
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

  const handleSubmit = () => {
    const attendance_calculation = (presentSlot / totalSlot) * 100;
    if(parseInt(totalSlot)>=parseInt(presentSlot)){
      setSlotsError("");
      if (attendance_calculation < requiredAttendance) {
        const res =
          ((requiredAttendance * totalSlot)- (presentSlot * 100)) /
          (100 - requiredAttendance);
        setResult(`${Math.trunc(res)}`);
        setOutput1("Hey User, You need to attend");
        setOutput2("Lectures to meet the criteria 😢😢");
        setModalVisible(true);
        setBunk(false);
      } else if (attendance_calculation > requiredAttendance) {
        const res = ((presentSlot * 100) / requiredAttendance) - totalSlot;
        setResult(`${Math.trunc(res)}`);
        setModalVisible(true);
        setOutput1("Hey user 🎉 You have");
        setOutput2("lectures remained to bunk");
        setBunk(true);
      }
    }
    else{
      setSlotsError("Total slot should be more than or equal to present slot");
    }
  };

  const handlePresentChange = (value) => {
    setPresentSlot(value);
  };

  const handleTotalChange = (value) => {
    setTotalSlot(value);
  };

  const handleRequiredAttendanceChange = (value) => {
    setRequiredAttendance(value);
  };
  const handleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.container}>
      <Text
        style={[
          {
            color: theme?"#fff":"#000",
          },
          styles.label,
        ]}
      >
        Present Slot:
      </Text>
      <TextInput
    
        style={[{
          backgroundColor:theme?"#AFAFAF":"#D8D8D8",
        },styles.input]}
        onChangeText={handlePresentChange}
        value={presentSlot}
        keyboardType="numeric"
        required
        selectionColor="black"
      />

      <Text
        style={[
          {
            color: theme?"#fff":"#000",

          },
          styles.label,
        ]}
      >
        Total Slot:
      </Text>
      <TextInput
        style={[{
          backgroundColor:theme?"#AFAFAF":"#D8D8D8",
        },styles.input]}
        onChangeText={handleTotalChange}
        value={totalSlot}
        keyboardType="numeric"
        required
        selectionColor="black"
      />
      <Text style={{color:"red"}}>{slotsError}</Text>
      <Text
        style={[
          {
            color: theme?"#fff":"#000",

          },
          styles.label,
        ]}
      >
        Required Attendance:
      </Text>
      <TextInput
        style={[{
          backgroundColor:theme?"#AFAFAF":"#D8D8D8",

        },styles.input]}
        onChangeText={handleRequiredAttendanceChange}
        value={requiredAttendance}
        keyboardType="numeric"
        required
        selectionColor="black"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
      <Modal
        style={styles.resultModal}
        transparent={true}
        visible={modalVisible}
        animationType={"fade"}
      >
        <View style={{ backgroundColor: "#505050aa", flex: 1 }}>
          <View
            style={[
              {
                backgroundColor: "#fff",
                marginTop: 300,
                marginHorizontal: 50,
                padding: 8,
                borderRadius: 10,
              },
              styles.elevation,
            ]}
          >
            <View
              style={[
                bunk ? styles.greenCard : styles.redCard,
                styles.elevation,
              ]}
            >
              <Text style={styles.label1}>{output1} </Text>
              <Text style={styles.ans}>{result}</Text>
              <Text style={styles.label1}>{output2}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={handleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// CSS classes to design the View, InputFields and all other things

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 20,
  },
  label: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "Poppins-SemiBold",
  },
  label1: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    padding: 4,
    fontFamily: "Poppins-SemiBold",
    marginHorizontal: 2,
    marginVertical: 2,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  ans: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 46,
    textAlign: "center",
    padding: 6,
    color: "#fff",
    fontWeight: "bold",
    margin: 6,
  },
  input: {
    height: 46,
    width: "88%",
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
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
  greenCard: {
    backgroundColor: "#03C03C",
    margin: 2,
    padding: 10,
    borderRadius: 10,
    // height: 200,
  },
  redCard: {
    backgroundColor: "#EE2828",
    margin: 2,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#DA2E32",
    borderRadius: 10,
    height: 2.4 * windowFontSize,
    alignItems: "center",
    paddingVertical: 0.02 * windowWidth,
    paddingHorizontal: 0.04 * windowWidth,
    width:7.4 * windowFontSize,
  },
  buttonText: {
    color: "#fff",
    textAlign:"center",
    fontSize: windowFontSize,
    fontFamily: "Poppins-SemiBold",
  },
  closeButton: {
    backgroundColor: "#4B4B4B",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    height: 44,
    marginTop: 10,
    textAlign: "center",
    alignContent: "center",
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    // fontFamily: 'Poppins-SemiBold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

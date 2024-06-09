import 'react-native-gesture-handler';
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Routes from "@/app/Routes/Routes"

export default function Index() {
  const [fontsLoaded] = useFonts({
    syne: require("../assets/fonts/Syne-Regular.ttf"),
    syneBold: require("../assets/fonts/Syne-Bold.ttf"),
    syneSemiBold: require("../assets/fonts/Syne-SemiBold.ttf"),
    quicksandBold: require("../assets/fonts/Quicksand-Bold.otf"),
    quicksand: require("../assets/fonts/Quicksand-Regular.otf"),
    barlow: require("../assets/fonts/Barlow-Regular.ttf"),
    barlowMid: require("../assets/fonts/Barlow-Medium.ttf"),
    barlowSemiBold: require("../assets/fonts/Barlow-SemiBold.ttf"),
    barlowBold: require("../assets/fonts/Barlow-Bold.ttf"),
    barlowExBold: require("../assets/fonts/Barlow-ExtraBold.ttf"),
  });

  //Color:
  // darkBlue: #03045e
  // lightBlue: #0077b6
  // skyBlue: #00b4d8
  // lightskyBlue: #90e0ef
  // whiteskyBlue: #caf0f8

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Routes />
  );
}

import { Slot, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import TopNavBar from "../../components/TopNavBar";
import { Colors } from "../../constants/Colors";
import { useGlobalInfo } from "../../context/GlobalContext";

export default function AppLayout() {
  const { isLoggedIn,theme } = useGlobalInfo();
  const router = useRouter();
  const segments = useSegments();

  // Only redirect once the layout has fully mounted and router is ready
  useEffect(() => {
    // if (!isLoggedIn) {
    //   // Only redirect if we're *inside* the (app) layout
    //   if (segments.length > 0 && segments[0] === "(app)") {
    //     // Using setTimeout to defer navigation until after layout mount
    //     setTimeout(() => {
    //       router.replace("/login");
    //     }, 0);
    //   }
    // }
    if (!isLoggedIn && segments[0] === "(app)") {
      setTimeout(() => {
        router.replace("/login");
      }, 0);
    }

  }, [isLoggedIn, segments, router]);

  // Show spinner while checking auth
  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors[theme].background }}>
        <ActivityIndicator size="large" color={Colors[theme].button} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      <TopNavBar />
      <Slot />
    </View>
  );
}
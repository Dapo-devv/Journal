// app/index.jsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";
import LoadingScreen from "@/components/loading";

export default function Index() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)/signin");
      }
      setChecking(false);
    });

    // cleanup listener
    return unsubscribe;
  }, []);

  if (checking) {
    // Optional loading spinner while we check auth
    return <LoadingScreen />;
  }

  return null; // We immediately redirect, so nothing to render
}

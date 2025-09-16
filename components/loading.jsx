import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#10B981" />
      <Text style={styles.text}>Please wait...</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
  },
});

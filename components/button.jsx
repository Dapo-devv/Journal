import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Button = ({ onPress, title }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    fontWeight: "bold",
    color: "#1F2937",
  },
});

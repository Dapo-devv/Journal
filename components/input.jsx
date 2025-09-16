import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const CustomInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  placeholderTextColor,
  secureTextEnter = false,
  autoCapitalize = "none",
  keyboardType = "email-address",
}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={secureTextEnter}
        label={label}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#374151",
    fontWeight: "bold",
    backgroundColor: "#1F2937",
    marginVertical: 15,
    color: "white",
  },
});

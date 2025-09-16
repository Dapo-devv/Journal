import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../firebaseConfig";
import { updateProfile, updateEmail } from "firebase/auth";
import Button from "../components/button";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const EditProfile = () => {
  const user = auth.currentUser;
  const router = useRouter();

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Allow access to photos to continue");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Fixed: Use MediaTypeOptions.Images
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      if (name !== user.displayName || photo !== user.photoURL) {
        await updateProfile(user, {
          displayName: name,
          photoURL: photo,
        });
      }

      if (email !== user.email) {
        await updateEmail(user, email);
      }

      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error) {
      console.log("Error updating profile:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" color="white" size={25} />
        </TouchableOpacity>

        <Text style={styles.header}>Edit Profile</Text>

        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>{name?.[0] || "U"}</Text>
            </View>
          )}
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor="grey"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="grey"
            keyboardType="email-address"
          />
        </View>

        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#111827",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4B5563",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  changePhotoText: {
    color: "grey",
    marginTop: 8,
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#1F2937",
    borderRadius: 10,
    padding: 12,
    color: "white",
  },
});

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const user = auth.currentUser;
  const firstName = user?.displayName ? user.displayName.split(" ")[0] : "";
  const router = useRouter();

  const logoutUser = async () => {
    try {
      await signOut(auth);
      router.replace("/signin");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Settings</Text>
        <Text style={styles.accountText}>Account</Text>

        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => router.push("/editProfile")}
        >
          <View style={styles.semiContainer}>
            {user?.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>{firstName[0]}</Text>
              </View>
            )}
            <View>
              <Text style={styles.userName}>{user?.displayName}</Text>
              <Text style={styles.userEmail}>View and edit your profile</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" color="white" size={25} />
        </TouchableOpacity>
        {/* App settings title */}
        <Text style={styles.appTitle}>App Settings</Text>

        <TouchableOpacity style={styles.profileContainer} onPress={logoutUser}>
          <View style={styles.semiContainer}>
            <Ionicons name="log-out-outline" size={30} color="red" />
            <View>
              <Text style={styles.logoutText}>Log Out</Text>
              <Text style={{color:"red"}}>You will be returned to the login screen</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" color="red" size={25} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#111827" },
  container: { flex: 1, padding: 10 },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  accountText: {
    color: "white",
    fontSize: 20,
    marginTop: 30,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "#1F2937",
    padding: 10,
    borderRadius: 10,
  },
  semiContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4B5563",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  userName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "grey",
    fontSize: 16,
  },
  appTitle: {
    color: "white",
    fontSize: 20,
    marginTop: 30,
  },
  logoutText: {
    color: "red",
    fontWeight:"bold"
  },
});

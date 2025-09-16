import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SafeAreaView from "react-native-safe-area-view";
import CustomInput from "../../components/input";
import Button from "../../components/button";
import { Link, useRouter } from "expo-router";
import LoadingScreen from "@/components/loading";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please input email and password");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/(tabs)/home");
    } catch (error) {
      setError(error.message);
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={require("../../assets/images/login.png")}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.header}>Welcome Back</Text>
            <View style={styles.inputContainer}>
              <CustomInput
                label="email"
                placeholder="Enter email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <CustomInput
                label="password"
                placeholder="Enter password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>

            <Button title="Sign in" onPress={handleLogin} />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have account?</Text>
              <Link href="/signup" style={{ marginLeft: 5 }}>
                <Text style={styles.linkText}>Sign up</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#111827",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    color: "#F9FAFB",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 70,
  },
  inputContainer: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  image: {
    width: 400,
    height: 200,
  },
  signupText: {
    color: "white",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    color: "green",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

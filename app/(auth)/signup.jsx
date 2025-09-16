// app/(auth)/signup.jsx
import React, { useState } from "react";
import { Image, StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import CustomInput from "../../components/input";
import SafeAreaView from "react-native-safe-area-view";
import Button from "../../components/button";
import { Link, useRouter } from "expo-router";
import LoadingScreen from "../../components/loading";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!firstname || !lastname) {
      setError("Please enter first and last name");
      return;
    }
    if (!email || !password) {
      setError("Input error", "Please enter email and password");

      return;
    }

    try {
      setLoading(true);

      const userCreate = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCreate.user, {
        displayName: `${firstname} ${lastname}`,
      });
      router.replace("/home");
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
              source={require("../../assets/images/signup.png")}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.header}>Create your account</Text>

            <View style={styles.inputContainer}>
              <CustomInput
                label="firstname"
                placeholder="First name"
                placeholderTextColor="#9CA3AF"
                value={firstname}
                onChangeText={setFirstname}
              />
              <CustomInput
                label="lastname"
                placeholder="Last name"
                placeholderTextColor="#9CA3AF"
                value={lastname}
                onChangeText={setLastname}
              />
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

            <Button title="Sign up" onPress={handleSignup} />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Already have an account?</Text>
              <Link href="/signin" style={{ marginLeft: 5 }}>
                <Text style={styles.linkText}>Sign in</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Signup;

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

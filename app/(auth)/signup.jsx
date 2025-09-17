import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import CustomInput from "../../components/input";
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
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const userCreate = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      await updateProfile(userCreate.user, {
        displayName: `${firstname} ${lastname}`,
      });
      router.replace("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 100}
      >
        {loading ? (
          <LoadingScreen />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
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
                  secureTextEntry
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#111827",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  container: {
    paddingHorizontal: 16,
  },
  header: {
    color: "#F9FAFB",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 180,
    alignSelf: "center",
  },
  signupText: {
    color: "white",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "center",
  },
  linkText: {
    color: "green",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 60}
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
                  secureTextEntry
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signin;

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

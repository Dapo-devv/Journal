import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "expo-router";

const iconMap = [
  {
    keywords: ["happy", "joy", "excited", "good"],
    icon: "happy-outline",
    color: "#FFD700",
  },
  {
    keywords: ["sad", "angry", "upset", "bad"],
    icon: "sad-outline",
    color: "#1E90FF",
  },
  {
    keywords: ["work", "project", "task"],
    icon: "briefcase-outline",
    color: "#4CAF50",
  },
  {
    keywords: ["dream", "idea", "plan"],
    icon: "bulb-outline",
    color: "#FFA500",
  },
  {
    keywords: ["health", "fitness", "wellness"],
    icon: "fitness-outline",
    color: "#FF4500",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notes"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(userNotes);
    });

    return unsubscribe;
  }, [user]);

  const chooseIcon = (title, content) => {
    const text = (title + " " + content).toLowerCase();
    for (let mapping of iconMap) {
      if (mapping.keywords.some((w) => text.includes(w))) {
        return { icon: mapping.icon, color: mapping.color };
      }
    }
    return { icon: "book-outline", color: "white" };
  };

  const firstName = user?.displayName ? user.displayName.split(" ")[0] : "";

  const handlePress = (id) => {
    router.push(`/note/${id}`);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Hey! {firstName}</Text>
          <Text style={styles.title}>My Journal</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" color="white" size={20} />
          <TextInput
            placeholder="Search entries..."
            placeholderTextColor="grey"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Notes List */}
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const { icon, color } = chooseIcon(item.title, item.content);
            return (
              <TouchableOpacity
                style={styles.contentContainer}
                activeOpacity={0.7}
                onPress={() => handlePress(item.id)}
              >
                <Ionicons
                  name={icon}
                  size={35}
                  color={color}
                  style={{ marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleList}>{item.title}</Text>
                  <Text
                    style={styles.contentList}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.content}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#111827",
  },
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#1F2937",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 30,
  },
  input: { flex: 1, color: "white", fontWeight: "bold" },
  contentContainer: {
    backgroundColor: "#1F2937",
    padding: 10,
    borderRadius: 15,
    margin: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  titleList: { fontSize: 18, fontWeight: "bold", color: "white" },
  contentList: { color: "grey", padding: 2, marginHorizontal: 3 },
  loaderOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function NoteDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);      // <-- track loading
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!id) return;
        const docRef = doc(db, "notes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNote(data);
          setTitle(data.title);
          setContent(data.content);
        }
      } catch (err) {
        console.log("Error fetching note:", err);
        Alert.alert("Error", "Failed to load note");
      } finally {
        setLoading(false); // stop loader regardless
      }
    };
    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Title and content cannot be empty");
      return;
    }
    try {
      await updateDoc(doc(db, "notes", id), {
        title: title.trim(),
        content: content.trim(),
      });
      setNote({ title: title.trim(), content: content.trim() });
      setEditable(false);
      Alert.alert("Success", "Note updated successfully");
    } catch (err) {
      console.log("Error updating note:", err);
      Alert.alert("Error", "Failed to update note");
    }
  };

  const handleDelete = async () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "notes", id));
            Alert.alert("Deleted", "Note deleted successfully");
            router.push("/home");
          } catch (err) {
            console.log("Error deleting note:", err);
            Alert.alert("Error", "Failed to delete note");
          }
        },
      },
    ]);
  };

  // Show dark loading screen until data is ready
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading note...</Text>
      </SafeAreaView>
    );
  }

  if (!note) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Note not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.wrapper}>
        <View style={styles.topBar}>
          <Link href="/home">
            <Ionicons name="chevron-back" color="white" size={30} />
          </Link>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity onPress={editable ? handleSave : () => setEditable(true)}>
              <Text style={styles.topText}>{editable ? "Save" : "Edit"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={[styles.topText, { color: "red" }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          {editable ? (
            <>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.titleInput}
              />
              <TextInput
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
                style={styles.contentInput}
              />
            </>
          ) : (
            <>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteContent}>{note.content}</Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#111827" },
  wrapper: { flex: 1, padding: 16 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topText: { color: "white", fontWeight: "bold", fontSize: 16 },
  titleInput: {
    backgroundColor: "#1F2937",
    padding: 12,
    borderRadius: 12,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
  },
  contentInput: {
    backgroundColor: "#1F2937",
    padding: 12,
    borderRadius: 12,
    color: "white",
    fontSize: 16,
    height: 250,
  },
  noteTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  noteContent: { color: "white", marginTop: 16, fontSize: 16 },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
});

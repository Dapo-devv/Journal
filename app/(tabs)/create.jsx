import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "expo-router";

const titles = [
  "Morning Motivation",
  "Gratitude Moment",
  "Work Reflection",
  "Fitness Goals",
  "Dream Journal",
  "Self-Care Evening",
  "Creative Burst",
  "Stressful Day",
  "Learning Reflection",
  "Evening Gratitude",
];

const contents = [
  "Woke up feeling refreshed and energized. Today, I want to focus on being productive and intentional with my time. I plan to start with a morning workout, followed by a healthy breakfast, and then dive into my most important tasks. I will remind myself to take short breaks and stay hydrated throughout the day to maintain focus and energy.",
  "Today, I am feeling incredibly grateful for the people in my life who support me unconditionally. Taking time to appreciate small moments like a warm cup of coffee, a good conversation, or even the sunlight streaming through the window has made me realize how much positivity surrounds me. Writing these thoughts down helps me remember to cherish every moment.",
  "The day at work was challenging, filled with meetings, deadlines, and unexpected tasks. While it was stressful at times, I am proud of the progress I made. I learned new ways to manage time efficiently and communicate more clearly with my colleagues. I want to reflect on the lessons today has given me and plan for a smoother workflow tomorrow.",
  "Completed a 5k run in the morning and followed it with a full-body strength workout. I feel stronger and more confident in my abilities. Keeping track of my fitness goals has motivated me to push myself further. I plan to set new milestones this week and challenge myself while also listening to my body to avoid overtraining.",
  "Had a vivid dream last night where I was flying over mountains and forests. The sensation of freedom and peace was amazing, and I woke up feeling inspired. Dreams like these remind me to embrace creativity and imagination in my daily life. I plan to write down more dreams and reflect on the messages they might hold for me.",
  "Spent the evening focusing on self-care. I took a long bath with relaxing music, read a few chapters of a book, and meditated for 20 minutes. I feel calm, centered, and ready for a restful night’s sleep. Self-care is essential for maintaining mental clarity and emotional balance, and I plan to make it a daily habit.",
  "This afternoon, I had a creative burst of energy and spent hours sketching, writing, and brainstorming new ideas for my projects. It felt incredibly satisfying to see my imagination take shape on paper. I realized that scheduling regular creative sessions can help me stay inspired and productive. Looking forward to continuing this practice.",
  "Today was tough, filled with challenges that tested my patience and resilience. Despite feeling overwhelmed, I managed to stay focused and handle each situation step by step. Reflecting on the day, I understand the importance of breathing exercises, taking breaks, and reminding myself that it’s okay to not be perfect. Tomorrow is a new opportunity to start fresh.",
  "Spent the day learning a new feature in React Native that could greatly improve my project workflow. I feel excited to implement what I learned and test it out in my code. Continuous learning not only improves my skills but also keeps me motivated. I want to dedicate a little time each day to explore new tools, techniques, and ideas.",
  "As I wind down for the day, I am reflecting on all the things I am grateful for: health, opportunities, supportive friends, and a productive day. Gratitude journaling helps me end the day on a positive note and sets a calm tone for tomorrow. I plan to continue this practice and even share it with loved ones to encourage mindfulness.",
];

export default function NotesScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      setLoading(true);
      await addDoc(collection(db, "notes"), {
        title: title.trim(),
        content: content.trim(),
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      router.replace("/home");
      setTitle("");
      setContent("");
    } catch (error) {
      console.log("Error saving note:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ independent random selection for title & content
  const handleRandom = () => {
    const randomTitleIndex = Math.floor(Math.random() * titles.length);
    const randomContentIndex = Math.floor(Math.random() * contents.length);
    setTitle(titles[randomTitleIndex]);
    setContent(contents[randomContentIndex]);
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>New Reflection</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="What's glowing in your mind?"
            placeholderTextColor="grey"
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            placeholder="Let your ideas flow..."
            placeholderTextColor="grey"
            value={content}
            onChangeText={setContent}
            style={styles.contentInput}
            multiline
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonRandom} onPress={handleRandom}>
            <Text style={styles.buttonText}>Random</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonClear} onPress={handleClear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonCreate, loading && { opacity: 0.6 }]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Create</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#111827" },
  container: { flex: 1, padding: 16 },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: { marginBottom: 20 },
  label: { color: "white", fontSize: 16, marginBottom: 5 },
  titleInput: {
    backgroundColor: "#1F2937",
    color: "white",
    padding: 12,
    borderRadius: 12,
    fontWeight: "600",
  },
  contentInput: {
    backgroundColor: "#1F2937",
    color: "white",
    padding: 12,
    borderRadius: 12,
    fontWeight: "600",
    height: 200,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  buttonRandom: {
    flex: 1,
    backgroundColor: "#6366F1",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonClear: {
    flex: 1,
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonCreate: {
    flex: 1,
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});

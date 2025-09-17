import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const AuthLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#111827",
          height: 78,
          borderTopWidth: 0,
          paddingBottom: 12,
          paddingTop: 8,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={30} color={color} />
          ),
        }}
      />

      {/* CREATE (Floating Action) */}
      <Tabs.Screen
        name="create"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "#10B981" : "#1F2937",
                borderRadius: 40,
                width: 64,
                height: 64,
                marginBottom: 20, // lift above bar
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 6,
                elevation: 6,
              }}
            >
              <Ionicons
                name="add-circle"
                size={40} // bigger icon for clear visibility
                color={focused ? "#fff" : "#9CA3AF"}
              />
            </View>
          ),
        }}
      />

      {/* SETTINGS */}
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;

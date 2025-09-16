import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { View } from "react-native";

const AuthLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#111827",
          height: 80,
          borderTopWidth: 0,
        },
        tabBarIconStyle: {},
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <SymbolView name="house.circle" size={35} tintColor={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({}) => (
            <View
              style={{
                backgroundColor: "#1F2937",
                borderRadius: 40,
                padding: 8,
                marginBottom: 20, // lifts it above the tab bar
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 5, // Android shadow
              }}
            >
              <SymbolView
                name="plus.circle"
                size={44}
                // icon color inside the green circle
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <SymbolView name="gearshape" size={35} tintColor={color} />
          ),
        }}
      />
    </Tabs>
  );
};
export default AuthLayout;

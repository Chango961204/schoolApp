import { Stack, router } from "expo-router";
import { AuthProvider, AuthContext } from "../src/context/AuthContext";
import { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

function RootLayoutNav() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    //  aquí mandamos según rol
    if (user.role === "MAESTRO") {
      router.replace("/(tabs-teacher)");
      return;
    }

    if (user.role === "ALUMNO") {
      router.replace("/(tabs-student)");
      return;
    }

    // fallback por si un día metes ADMIN
    router.replace("/login");
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs-teacher)" />
      <Stack.Screen name="(tabs-student)" />

      {/* pantallas globales */}
      <Stack.Screen name="class-details/[id]" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

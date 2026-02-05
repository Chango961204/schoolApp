import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../src/context/AuthContext";
import { router } from "expo-router";

export default function StudentHomeScreen() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Bienvenido {user?.nombre}
      </Text>

      <Text style={{ marginTop: 10 }}>Email: {user?.email}</Text>
      <Text style={{ marginTop: 5 }}>Rol: {user?.role}</Text>

      <View style={{ marginTop: 30 }}>
        <Button
          title="Ver mis clases"
          onPress={() => router.push("/(tabs-student)/student-classes")}
        />
      </View>

      <View style={{ marginTop: 15 }}>
        <Button
          title="Unirme a una clase"
          onPress={() => router.push("/(tabs-student)/student-join-class")}
        />
      </View>

      <View style={{ marginTop: 40 }}>
        <Button title="Cerrar sesión" onPress={signOut} />
      </View>
    </View>
  );
}

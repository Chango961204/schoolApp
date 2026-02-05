import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../src/context/AuthContext";
import { router } from "expo-router";

export default function TeacherHomeScreen() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Bienvenido Maestro {user?.nombre}
      </Text>

      <Text style={{ marginTop: 10 }}>Email: {user?.email}</Text>
      <Text style={{ marginTop: 5 }}>Rol: {user?.role}</Text>

      <View style={{ marginTop: 30 }}>
        <Button
          title="Ir a mis clases"
          onPress={() => router.push("/(tabs-teacher)/teacher-classes")}
        />
      </View>

      <View style={{ marginTop: 15 }}>
        <Button
          title="Crear nueva clase"
          onPress={() => router.push("/(tabs-teacher)/teacher-create-class")}
        />
      </View>
       <View style={{ marginTop: 40 }}>
        <Button title="Cerrar sesión" onPress={signOut} />
      </View>
    </View>
  );
}

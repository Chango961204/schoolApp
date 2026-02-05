import { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { AuthContext } from "../../src/context/AuthContext";
import { createClass } from "../../src/api/classes.api";

export default function TeacherCreateClassScreen() {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");

  async function handleCreate() {
    try {
      if (!token) return;

      if (!nombre.trim()) {
        Alert.alert("Error", "El nombre es obligatorio");
        return;
      }

      const data = await createClass(token, nombre.trim());

      Alert.alert("Éxito", `Clase creada con código: ${data.class.codigo}`);
      setNombre("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Crear Clase
      </Text>

      <Text>Nombre</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej: Programación 1"
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <Button title="Crear" onPress={handleCreate} />
    </View>
  );
}

import { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { AuthContext } from "../../src/context/AuthContext";
import { joinClass } from "../../src/api/enrollments.api";

export default function StudentJoinClassScreen() {
  const { token } = useContext(AuthContext);
  const [codigo, setCodigo] = useState("");

  async function handleJoin() {
    try {
      if (!token) return;

      if (!codigo.trim()) {
        Alert.alert("Error", "El código es obligatorio");
        return;
      }

      await joinClass(token, codigo.trim().toUpperCase());

      Alert.alert("Éxito", "Te uniste a la clase correctamente");
      setCodigo("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Unirme a una clase
      </Text>

      <Text>Código</Text>
      <TextInput
        value={codigo}
        onChangeText={setCodigo}
        placeholder="Ej: A1B2C3"
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
        autoCapitalize="characters"
      />

      <Button title="Unirme" onPress={handleJoin} />
    </View>
  );
}

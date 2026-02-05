import { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { login } from "../src/api/auth.api";
import { AuthContext } from "../src/context/AuthContext";

export default function LoginScreen() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const data = await login(email, password);

      await signIn(data.token, data.user);

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={{ padding: 20, marginTop: 80 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Login
      </Text>

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 10,
        }}
        autoCapitalize="none"
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 10,
        }}
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button, Alert } from "react-native";
import { AuthContext } from "../../src/context/AuthContext";
import { getClassById } from "../../src/api/classes.api";

export default function ClassDetailsScreen() {
    const { id } = useLocalSearchParams();
    const { token, user } = useContext(AuthContext);

    const [clase, setClase] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    async function loadClass() {
        try {
            if (!token) return;
            if (!id) return;

            setLoading(true);

            const data = await getClassById(token, String(id));
            setClase(data.class);
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadClass();
    }, [id]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!clase) {
        return (
            <View style={{ padding: 20, marginTop: 80 }}>
                <Text>No se encontró la clase.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>{clase.nombre}</Text>

            <Text style={{ marginTop: 10 }}>Código: {clase.codigo}</Text>

            <Text style={{ marginTop: 10 }}>
                Maestro: {clase.maestro?.nombre} ({clase.maestro?.email})
            </Text>

            <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Tareas</Text>

                <Text style={{ marginTop: 10, opacity: 0.7 }}>
                    (Todavía no cargamos tareas, siguiente paso)
                </Text>
            </View>

            <View style={{ marginTop: 40 }}>
                {user?.role === "MAESTRO" && (
                    <Button title="Crear tarea" onPress={() => Alert.alert("OK", "Aquí irá crear tarea")} />
                )}

                {user?.role === "ALUMNO" && (
                    <Button title="Ver tareas" onPress={() => Alert.alert("OK", "Aquí irá lista de tareas")} />
                )}
            </View>
        </View>
    );
}

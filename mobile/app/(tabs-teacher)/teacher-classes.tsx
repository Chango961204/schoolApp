import { useContext, useEffect, useState } from "react";
import {View,Text,FlatList,RefreshControl,Pressable,} from "react-native";
import { router } from "expo-router";

import { AuthContext } from "../../src/context/AuthContext";
import { getTeacherClasses } from "../../src/api/classes.api";

export default function TeacherClassesScreen() {
  const { token } = useContext(AuthContext);

  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadClasses() {
    try {
      if (!token) return;

      setLoading(true);

      const data = await getTeacherClasses(token);
      setClasses(data.classes || []);
    } catch (error) {
      console.log("Error loadClasses", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
        Mis clases
      </Text>

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadClasses} />
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/class-details/${item.id}`)}
            style={{
              borderWidth: 1,
              padding: 15,
              borderRadius: 15,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.nombre}
            </Text>

            <Text style={{ marginTop: 5 }}>Código: {item.codigo}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 20 }}>
            No tienes clases creadas todavía.
          </Text>
        }
      />
    </View>
  );
}

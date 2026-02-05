import { Tabs } from "expo-router";

export default function TeacherTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
        }}
      />

      <Tabs.Screen
        name="teacher-classes"
        options={{
          title: "Mis clases",
        }}
      />

      <Tabs.Screen
        name="teacher-create-class"
        options={{
          title: "Crear clase",
        }}
      />
    </Tabs>
  );
}

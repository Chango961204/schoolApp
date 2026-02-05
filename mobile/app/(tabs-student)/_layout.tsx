import { Tabs } from "expo-router";

export default function StudentTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
        }}
      />

      <Tabs.Screen
        name="student-classes"
        options={{
          title: "Mis clases",
        }}
      />

      <Tabs.Screen
        name="student-join-class"
        options={{
          title: "Unirme",
        }}
      />
    </Tabs>
  );
}

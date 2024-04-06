import { Image, StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";

export default function TabFourScreen() {
  return (
    <View style={styles.container}>
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 1,

          backgroundColor: "#fff",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 5,
          borderRadius: 10,
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/images/user.png")}
        />

        <Text style={styles.title}>Profile</Text>
      </View>
      <TouchableOpacity
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 1,
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 5,
          borderRadius: 10,
        }}
        onPress={() => {
          router.push("/editpg/");
        }}
      >
        <Text style={styles.title}>Add PG</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 1,
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 5,
          borderRadius: 10,
        }}
        onPress={() => {
          router.push("/editmanager/");
        }}
      >
        <Text style={styles.title}>Add Manager</Text>
      </TouchableOpacity>
      {/* <Text style={styles.title}>Profile</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: "100%",
  },
  title: {
    fontSize: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});

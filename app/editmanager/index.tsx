import { Alert, Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SafeAreaView, TextInput } from "react-native";
import { Link, router } from "expo-router";
export default function EditManagerScreen() {
  const [managerName, onChangeManagerName] = useState("");
  const [address, onChangeAddress] = useState("");
  const [mobileNo, onChangeMobileNo] = useState("");

  const supabase = createClient(
    "https://mjuoregelcweebqtiyyl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdW9yZWdlbGN3ZWVicXRpeXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3OTQyMjUsImV4cCI6MjAyNzM3MDIyNX0.g8mr0u7mZl6KO_8erFPLGcMzS6O3_ofrZkCX12vChPM"
  );

  const addManager = async () => {
    const { data, error } = await supabase
      .from("managers")
      .insert({
        managerName: managerName,
        address: address,
        mobileNo: mobileNo,
      })
      .select();
    if (error == null) {
      router.push("/(tabs)/four");
    }
    console.log("add manager data=======", data);
    console.log("error=======", error);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Add new Manager</Text>
        <Text style={styles.label}>Manager Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeManagerName}
          value={managerName}
        />
        <Text style={styles.label}>Mobile No</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeMobileNo}
          value={mobileNo}
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAddress}
          value={address}
        />

        <Button title="Press me" onPress={addManager} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    // alignItems: "center",
    // justifyContent: "center",
    // margin: 12,
  },
  title: {
    fontSize: 20,
    // fontWeight: "bold",
  },
  input: {
    height: 50,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#000",
    backgroundColor: "#fff",
    // marginHorizontal: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

import { Alert, Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SafeAreaView, TextInput } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function EditBedScreen() {
  const type = [
    { name: "AC", value: "ac" },
    { name: "Non-AC", value: "non-Fac" },
  ];
  const occupency = [
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
  ];
  const params = useLocalSearchParams();
  const { id } = params;

  console.log("id---------", id);

  const [bedDetails, setBedDetails] = useState({
    number: "",
  });
  const [managers, setManagers] = useState([]);

  const supabase = createClient(
    "https://mjuoregelcweebqtiyyl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdW9yZWdlbGN3ZWVicXRpeXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3OTQyMjUsImV4cCI6MjAyNzM3MDIyNX0.g8mr0u7mZl6KO_8erFPLGcMzS6O3_ofrZkCX12vChPM"
  );

  const addBed = async () => {
    const { data, error } = await supabase
      .from("bed")
      .insert({
        number: bedDetails?.number,
        room: id,
      })
      .select();
    if (error == null) {
      router.push("/(tabs)/three");
    }
    console.log("data=======", data);
    console.log("error=======", error);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Add new Bed</Text>
        <Text style={styles.label}>Bed code/Bed name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            console.log("e", e);

            setBedDetails({ ...bedDetails, number: e });
          }}
          value={bedDetails?.number}
        />
        <Text style={styles.label}>Rent</Text>
        <Button title="Add" onPress={addBed} />
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
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

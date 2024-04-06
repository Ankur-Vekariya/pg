import { Alert, Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SafeAreaView, TextInput } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function PgDetailScreen() {
  const params = useLocalSearchParams();
  const { id } = params;

  console.log("id==========", id);

  const [pgDetails, setPgDetails] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState();

  const supabase = createClient(
    "https://mjuoregelcweebqtiyyl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdW9yZWdlbGN3ZWVicXRpeXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3OTQyMjUsImV4cCI6MjAyNzM3MDIyNX0.g8mr0u7mZl6KO_8erFPLGcMzS6O3_ofrZkCX12vChPM"
  );

  console.log("selectedManager", typeof selectedManager, selectedManager);

  const getPgDetails = async () => {
    const { data, error } = await supabase.from("pg").select().eq("id", id);
    if (error == null) {
      setPgDetails(data);
      // router.push("/(tabs)/four");
    }
    console.log("getPgDetails data=======", data);
    console.log("getPgDetails error=======", error);
  };

  const getManagers = async () => {
    const { data, error } = await supabase.from("managers").select();
    console.log("data=======", data);
    console.log("error=======", error);

    if (error == null) {
      setManagers(data);
    }
  };

  useEffect(() => {
    // getManagers();
    getPgDetails();
  }, []);

  console.log("managers", managers);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>{pgDetails[0]?.name}</Text>
        <Text style={styles.label}>{pgDetails[0]?.address}</Text>
        <Text style={styles.label}>{pgDetails[0]?.rooms}</Text>

        <Button
          title="Add Room"
          onPress={() => {
            router.push({
              pathname: "/room/editroom/",
              params: { id: id },
            });
          }}
        />
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

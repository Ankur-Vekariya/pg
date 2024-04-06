import { Alert, Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SafeAreaView, TextInput } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function EditRoomScreen() {
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

  const [roomDetails, setRoomDetails] = useState({
    name: "",
    type: "Non-AC",
    occupency: 1,
  });
  const [managers, setManagers] = useState([]);

  const supabase = createClient(
    "https://mjuoregelcweebqtiyyl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdW9yZWdlbGN3ZWVicXRpeXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3OTQyMjUsImV4cCI6MjAyNzM3MDIyNX0.g8mr0u7mZl6KO_8erFPLGcMzS6O3_ofrZkCX12vChPM"
  );

  const addRoom = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .insert({
        name: roomDetails?.name,
        type: roomDetails?.type,
        occupency: roomDetails?.occupency,
        pg: id,
      })
      .select();
    if (error == null) {
      router.push("/(tabs)/three");
    }
    console.log("data=======", data);
    console.log("error=======", error);
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
    getManagers();
  }, []);

  console.log("managers", managers);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Add new Room</Text>
        <Text style={styles.label}>Room code/Room name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            console.log("e", e);

            setRoomDetails({ ...roomDetails, name: e });
          }}
          value={roomDetails?.name}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ minWidth: "50%" }}>
            <Text style={styles.label}>Select Occupency</Text>
            <Picker
              selectedValue={roomDetails?.occupency}
              onValueChange={(itemValue, itemIndex) =>
                setRoomDetails({ ...roomDetails, occupency: itemValue })
              }
              style={styles.input}
            >
              {occupency.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={item?.name}
                    value={item?.value}
                  />
                );
              })}
            </Picker>
          </View>
          <View style={{ minWidth: "50%", borderRadius: 10 }}>
            <Text style={styles.label}>Select Type</Text>
            <Picker
              selectedValue={roomDetails.type}
              onValueChange={(itemValue, itemIndex) =>
                setRoomDetails({ ...roomDetails, type: itemValue })
              }
              style={styles.input}
            >
              {type.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={item?.name}
                    value={item?.value}
                  />
                );
              })}
            </Picker>
          </View>
        </View>

        <Button title="Add" onPress={addRoom} />
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

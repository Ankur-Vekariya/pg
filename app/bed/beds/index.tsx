import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SafeAreaView, TextInput } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function BedScreen() {
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
  const data = params;

  console.log("id---------", data?.id, data?.occupency);

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

  // const addRoom = async () => {
  //   const { data, error } = await supabase
  //     .from("rooms")
  //     .insert({
  //       name: roomDetails?.name,
  //       type: roomDetails?.type,
  //       occupency: roomDetails?.occupency,
  //       pg: data?.id,
  //     })
  //     .select();
  //   if (error == null) {
  //     router.push("/(tabs)/three");
  //   }
  //   console.log("data=======", data);
  //   console.log("error=======", error);
  // };

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

  // let beds = Array(5);
  // console.log("managers===================",beds);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={beds}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            // onPress={() => {
            //   router.push({
            //     pathname: "/bed/beds/",
            //     params: { id: item?.id, occupency: item?.occupency },
            //   });
            // }}
          >
            <Text style={styles.title}>beds</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
      />
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
  item: {
    backgroundColor: "#FFC300",
    padding: 10,
    // marginVertical: 8,
    borderRadius: 20,
    marginRight: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});

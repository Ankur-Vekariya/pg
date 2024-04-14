import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
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
  const [modalVisible, setModalVisible] = useState(false);
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

  console.log("id---------", params?.id, params?.occupency);

  const [roomDetails, setRoomDetails] = useState({
    name: "",
    type: "Non-AC",
    occupency: 1,
  });
  const [beds, setBeds] = useState([]);

  const supabase = createClient(
    "https://mjuoregelcweebqtiyyl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdW9yZWdlbGN3ZWVicXRpeXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3OTQyMjUsImV4cCI6MjAyNzM3MDIyNX0.g8mr0u7mZl6KO_8erFPLGcMzS6O3_ofrZkCX12vChPM"
  );

  const getBeds = async () => {
    const { data, error } = await supabase
      .from("bed")
      .select()
      .eq("room", params?.id);
    console.log("data=======", data);
    console.log("error=======", error);

    if (error == null) {
      setBeds(data);
    }
  };

  useEffect(() => {
    getBeds();
  }, []);

  const numColumns = 2;
  const size = Dimensions.get("window").width / numColumns;
  return (
    <View style={styles.container}>
      <FlatList
        data={beds}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: size, height: size }}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                flex: 1,
                backgroundColor: "lightblue",
                marginVertical: 10,
                marginHorizontal: 10,
                padding: 10,
                borderRadius: 20,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5.46,
                minWidth: 100,
                elevation: 9,
              }}
            >
              {item?.number}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />

      <View style={{ marginBottom: 10 }}>
        <Button
          title="Add Bed"
          onPress={() => {
            router.push({
              pathname: "/bed/editbed/",
              params: { id: params?.id },
            });
          }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            height: "60%",
            marginTop: "auto",
            backgroundColor: "white",
            borderRadius: 50,
            padding: 10,
          }}
        >
          <Text style={styles.modalText}>Add Tenant</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backfaceVisibility: "hidden",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});

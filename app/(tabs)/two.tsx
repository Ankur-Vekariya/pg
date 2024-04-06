import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { supabase } from "@/constants/Supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function TabTwoScreen() {
  const [managers, setManagers] = useState([]);

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
      {managers?.map((item, index) => {
        return (
          <View
            key={index}
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
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
              }}
            >
              <Text style={styles.title}>{item?.managerName}</Text>
              <Text style={{ fontSize: 16 }}>{item?.address}</Text>
              <Text style={{ fontSize: 16 }}>{item?.mobileNo}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#fff",
              }}
            >
              <TouchableOpacity>
                <Entypo name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

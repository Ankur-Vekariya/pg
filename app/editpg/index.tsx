import { Alert, Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SafeAreaView, TextInput } from "react-native";
import { Link, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function EditPGScreen() {
  const [email, onChangeEmail] = useState("Email");
  const [password, onChangePassword] = useState("Password");
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState();
  0;

  const supabase = createClient(
    "https://mjuoregelcweebqtiyyl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdW9yZWdlbGN3ZWVicXRpeXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3OTQyMjUsImV4cCI6MjAyNzM3MDIyNX0.g8mr0u7mZl6KO_8erFPLGcMzS6O3_ofrZkCX12vChPM"
  );

  const login = async () => {
    const { data, error } = await supabase
      .from("countries")
      .insert({ id: 1, name: "Denmark" })
      .select();
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
        <Text style={styles.title}>Add new PG</Text>
        <Text style={styles.label}>PG Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        />
        <Text style={styles.label}>Select Manager</Text>
        <Picker
          selectedValue={selectedManager}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedManager(itemValue)
          }
        >
          {managers.map((item, index) => {
            return <Picker.Item key={index} label={item?.managerName} value={item?.id} />;
          })}
          {/* <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" /> */}
        </Picker>
        <Text style={styles.label}>PG Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
        />
        <Button title="Press me" onPress={login} />
        <Text style={styles.title}>
          Dont have an account
          <Link href="/signup/">Register</Link>
        </Text>
        {/* <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        /> */}
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

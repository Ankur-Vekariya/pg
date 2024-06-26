import { Alert, Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SafeAreaView, TextInput } from "react-native";
import { Link } from "expo-router";
export default function SignUpScreen() {
  const [email, onChangeEmail] = useState("Email");
  const [password, onChangePassword] = useState("Password");

  const supabase = createClient(
    "https://mjuoregelcweebqtiyyl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdW9yZWdlbGN3ZWVicXRpeXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3OTQyMjUsImV4cCI6MjAyNzM3MDIyNX0.g8mr0u7mZl6KO_8erFPLGcMzS6O3_ofrZkCX12vChPM"
  );

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: email,
    });
    console.log("sign up data=======", data);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
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
        <Button title="Press me" onPress={signUp} />
        <Text style={styles.title}>
          Already have an account
          <Link href="/login/">Login</Link>


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
    // alignItems: "center",
    justifyContent: "center",
    // margin: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 12,
  },
});

import { Alert, Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SafeAreaView, TextInput } from "react-native";
import { Link, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/userSlice";
import { supabase } from "@/lib/supabase";

export default function LoginScreen() {
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useState("admin@admin.com");
  const [password, onChangePassword] = useState("admin");

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: email,
    });
    console.log("data=======", data);
    console.log("error=======", error);
    if (data?.session?.access_token) {
      dispatch(setUser(data));
      router.replace("/(tabs)");
    }
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

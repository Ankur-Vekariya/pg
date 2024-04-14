import {
  Alert,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

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
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            style={{ width: 300, height: 300 }}
            source={require("../../assets/images/login-image.png")}
          />
        </View>
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
        <TouchableOpacity onPress={login} style={styles.button}>
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>
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
    backgroundColor: "#E4E5E8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    marginVertical: 10,
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  btntext: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

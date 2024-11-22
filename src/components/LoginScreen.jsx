import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

export default function LoginScreen() {
  return (
    <View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 50 }}>
        <Image
          source={require("./../../assets/images/login.png")}
          style={{
            width: 220,
            height: 400,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "black",
          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Yout Ultimate{" "}
          <Text style={{ color: Colors.PRIMARY }}>
            Community Business Directory
          </Text>{" "}
          App
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find yout favorite business near your own business to your Community
        </Text>
        <TouchableOpacity style={styles.bnt}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
  },
  bnt: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
  },
});

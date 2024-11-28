import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { Colors } from "@/constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";

export default function BusinessDetail() {
  const { businessId } = useLocalSearchParams();
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetBusinessDetailById();
  }, []);

  const GetBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setBusiness(docSnap.data());
    } else {
      console.log("No such document!");
    }
    setLoading(false);
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={{ marginTop: "70%" }}
        />
      ) : (
        <ScrollView>
          <Intro business={business} />
          <ActionButton business={business} />
          <About business={business} />
        </ScrollView>
      )}
    </View>
  );
}

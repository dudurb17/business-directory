import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <View
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            paddingLeft: 20,
            marginTop: 10,
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Category
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>
      <FlatList
        data={categoryList}
        horizontal={true}
        style={{ marginLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            key={index}
            onCategoryPress={(category) =>
              router.push("/businessList/" + item.name)
            }
          />
        )}
      />
    </View>
  );
}

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaViewBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { db } from "@/configs/FirebaseConfig";
import { storage } from "@/configs/FirebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  ref,
  uploadBytes,
} from "firebase/firestore";

export default function AddBusiness() {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [webSite, setWebSite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);

    snapShot.forEach((element) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: element.data().name,
          value: element.data().name,
        },
      ]);
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);
  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result.assets[0].uri);
    console.log(result);
  };

  const onAddNewBusiness = async () => {
    const fileName = Date.now().toString() + ".jpg";

    const resp = await fetch(image);
    const blob = await resp.blob();

    const imageRef = ref(storage, "business-app/" + fileName);

    uploadBytes(imageRef, blob).then((snapShot) => {
      console.log("File Uploaded");
    });
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Add New Business
      </Text>
      <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
        Fill all details in order to add new business{" "}
      </Text>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => onImagePick()}>
        {!image ? (
          <Image
            source={require("./../../../assets/images/placeholder.png")}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          placeholder="name"
          onChangeText={(value) => setName(value)}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Address"
          onChangeText={(value) => setAddress(value)}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Contact"
          onChangeText={(value) => setContact(value)}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="WebSite"
          onChangeText={(value) => setWebSite(value)}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="About"
          onChangeText={(value) => setAbout(value)}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onAddNewBusiness()}
        style={{
          padding: 10,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit-medium",
            color: "#fff",
          }}
        >
          Add New business
        </Text>
      </TouchableOpacity>
    </View>
  );
}

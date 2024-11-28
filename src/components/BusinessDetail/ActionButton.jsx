import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("./../../../assets/images/call.png"),
      url: "tel" + business.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("./../../../assets/images/pin.png"),
      url: "tel" + business.contact,
    },
    {
      id: 3,
      name: "Web",
      icon: require("./../../../assets/images/web.png"),
      url: "tel" + business.contact,
    },
    {
      id: 4,
      name: "Share",
      icon: require("./../../../assets/images/share.png"),
      url: "teste",
    },
  ];
  return (
    <View>
      <Text style={{ backgroundColor: "#fff", padding: 20 }}>
        <FlatList
          data={actionButtonMenu}
          numColumns={4}
          columnWrapperStyle={{
            justifyContent: "space-between",
            width: "100%",
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => console.log("Faltou colocar a função")}
            >
              <Image source={item?.icon} style={{ width: 50, height: 50 }} />
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  textAlign: "center",
                  marginTop: 3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </Text>
    </View>
  );
}

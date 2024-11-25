import * as SecureStore from "expo-secure-store";
import { Redirect, router, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import React, { useEffect } from "react";

export default function RootLayout() {
  useFonts({
    outfit: require("./../../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../../assets/fonts/Outfit-Bold.ttf"),
  });

  const tokenCache = {
    async getToken(key) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  const InitialLayout = ({ route, name }) => {
    const { isLoaded, isSignedIn } = useAuth();
    useEffect(() => {
      router.replace(route);
    }, [isSignedIn]);
    return (
      <Stack>
        <Stack.Screen name={name} options={{ headerShown: false }} />
      </Stack>
    );
  };

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SignedIn>
        <InitialLayout name="(tabs)" route="/home" />
      </SignedIn>
      <SignedOut>
        <InitialLayout name="(auth)" route="/LoginScreen" />
      </SignedOut>
    </ClerkProvider>
  );
}

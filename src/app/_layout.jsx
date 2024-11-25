import * as SecureStore from "expo-secure-store";
import { Redirect, router, Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/clerk-expo";
import React, { useEffect } from "react";
import { Text } from "react-native";
import LoginScreen from "./(auth)/LoginScreen";
import { replace } from "expo-router/build/global-state/routing";

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

  const RouterSignIn = () => {
    const { isLoaded, isSignedIn } = useAuth();
    useEffect(() => {
      router.replace("/home");
    }, [isSignedIn]);
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    );
  };

  const RouterSignOut = () => {
    const { isLoaded, isSignedIn } = useAuth();
    useEffect(() => {
      router.replace("/LoginScreen");
    }, [isSignedIn]);
    return (
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    );
  };

  return (
    <ClerkProvider
      // tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SignedIn>
        <RouterSignIn />
      </SignedIn>
      <SignedOut>
        <RouterSignOut />
      </SignedOut>
    </ClerkProvider>
  );
}

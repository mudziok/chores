import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TRPCProvider } from "./utils/trpc";

import { SignInSignUpScreen } from "./screens/signin";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import { Router } from "./router";

export const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ClerkProvider
          publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
          tokenCache={tokenCache}
        >
          <SignedIn>
            <TRPCProvider>
              <Router />
              <StatusBar />
            </TRPCProvider>
          </SignedIn>
          <SignedOut>
            <SignInSignUpScreen />
          </SignedOut>
        </ClerkProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

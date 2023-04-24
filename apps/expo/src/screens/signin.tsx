import React from "react";

import { View, SafeAreaView, Text } from "react-native";

import SignInWithOAuth from "../components/SignInWithOAuth";
import { Logo } from "../components/Logo";

export const SignInSignUpScreen = () => {
  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <View className="flex h-full w-full flex-1 items-center justify-center p-4">
        <View className="mb-2 flex flex-row items-center gap-2">
          <Logo />
          <Text className="text-3xl font-bold text-fuchsia-600">Chores</Text>
        </View>
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
};

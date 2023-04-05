import React from "react";

import { View, SafeAreaView } from "react-native";

import SignInWithOAuth from "../components/SignInWithOAuth";

export const SignInSignUpScreen = () => {
  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <View className="flex h-full w-full flex-1 items-center justify-center p-4">
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
};

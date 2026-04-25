import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_discord" });

  const handleSignInWithDiscordPress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity
      className="my-4 flex flex-row items-center justify-center rounded-full bg-fuchsia-600 p-3"
      onPress={handleSignInWithDiscordPress}
    >
      <Text className="pr-2 font-semibold text-white">
        Sign in with Discord
      </Text>
      <FontAwesome5 name="discord" color="white" size={16} />
    </TouchableOpacity>
  );
};

export default SignInWithOAuth;

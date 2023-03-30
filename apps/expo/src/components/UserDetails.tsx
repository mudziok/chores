import { useUser } from "@clerk/clerk-expo";
import { FC } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";

export const UserDetails: FC = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <View className="flex h-14 w-14 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  const { profileImageUrl, username } = user;

  return (
    <TouchableOpacity className="flex flex-row gap-4">
      <Image
        source={{
          uri: profileImageUrl,
        }}
        className="h-14 w-14 rounded-full border border-slate-200 shadow-sm"
      />
      <View className="flex items-start justify-center">
        <Text className="font-bold text-slate-900">{username}</Text>
        <Text className="text-slate-900">Nazwa mieszkania</Text>
      </View>
    </TouchableOpacity>
  );
};

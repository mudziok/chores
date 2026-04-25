import { FC } from "react";
import { View, Image, ActivityIndicator } from "react-native";

interface AvatarProps {
  user?: { username?: string | null; imageUrl?: string | null; profileImageUrl?: string | null } | null;
}

export const Avatar: FC<AvatarProps> = ({ user }) => {
  if (!user) {
    return (
      <View className="flex h-14 w-14 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  const uri = user.imageUrl ?? user.profileImageUrl ?? undefined;

  return (
    <Image
      source={{ uri }}
      className="h-14 w-14 rounded-full border border-slate-200 shadow-sm"
    />
  );
};

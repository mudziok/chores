import { useUser } from "@clerk/clerk-expo";
import { FC } from "react";
import { View, Image, ActivityIndicator } from "react-native";

type UseUserReturn = ReturnType<typeof useUser>;
type UserResource = NonNullable<UseUserReturn["user"]>;
interface AvatarProps {
  user: Pick<UserResource, "username" | "profileImageUrl"> | undefined | null;
}

export const Avatar: FC<AvatarProps> = ({ user }) => {
  if (!user) {
    return (
      <View className="flex h-14 w-14 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  const { profileImageUrl } = user;

  return (
    <Image
      source={{
        uri: profileImageUrl,
      }}
      className="h-14 w-14 rounded-full border border-slate-200 shadow-sm"
    />
  );
};

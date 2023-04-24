import { useAuth, useUser } from "@clerk/clerk-expo";
import { FC, useMemo } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "../components/Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../router";

type NavigationProp = NativeStackNavigationProp<StackParamList>;

const UserDetails: FC = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View className="flex w-full items-center bg-white p-4">
      <View className="mb-2">
        <Avatar user={user} />
      </View>
      <View className="flex items-center gap-4">
        <View className="flex items-center">
          <Text className="text-xl font-medium">{user?.username}</Text>
          <Text>{user?.emailAddresses[0]?.emailAddress || null}</Text>
        </View>
        <TouchableOpacity
          className="flex flex-row items-center justify-center rounded-full bg-fuchsia-600 p-3"
          onPress={() => signOut()}
        >
          <Text className="pr-2 font-semibold text-white">Logout</Text>
          <MaterialIcons name="logout" color="white" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SettingsScreen = () => {
  const { navigate } = useNavigation<NavigationProp>();

  const actions = useMemo(
    () => [
      {
        title: "Create new household",
        onPress: () => navigate("New household"),
      },
      {
        title: "Share household",
        onPress: () => navigate("Share household"),
      },
      {
        title: "Join household",
        onPress: () => navigate("Join household"),
      },
    ],
    [],
  );

  return (
    <SafeAreaView className="-mb-12 flex-1 bg-slate-100 text-slate-800">
      <FlatList
        data={actions}
        ListHeaderComponent={<UserDetails />}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex flex-row justify-between border-t border-slate-200 bg-white p-4"
            onPress={item.onPress}
          >
            <Text>{item.title}</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

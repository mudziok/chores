import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { trpc } from "../utils/trpc";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../router";

type NavigationProp = NativeStackNavigationProp<StackParamList>;

export const ShareHousehold = () => {
  const { navigate } = useNavigation<NavigationProp>();
  const { data } = trpc.household.inviteCode.useQuery();

  return (
    <SafeAreaView className="-mb-12 flex flex-1 items-center justify-center gap-4 bg-slate-100 text-slate-800">
      {data ? (
        <Text className="text-5xl font-semibold">{data.code}</Text>
      ) : (
        <View className="flex h-12 items-center justify-center">
          <ActivityIndicator />
        </View>
      )}
      <Text className="max-w-xs text-center">
        Share this code with the person you want to join your household
      </Text>
      <TouchableOpacity
        className="flex flex-row items-center justify-center rounded-full bg-fuchsia-600 p-3"
        onPress={() => navigate("Join household")}
      >
        <Text className="pr-1 font-semibold text-white">
          Wanna join with someone's code?
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={12} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
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
  const utils = trpc.useContext();
  const { data } = trpc.household.inviteCode.useQuery();
  const refreshMutation = trpc.household.refreshCode.useMutation({
    onMutate: () => {
      utils.household.inviteCode.reset();
    },
  });

  const showAlert = () =>
    Alert.alert(
      "Are you sure?",
      "This action will invalidate current code and generate a new one",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Refresh",
          onPress: () => refreshMutation.mutate(),
          style: "destructive",
        },
      ],
    );

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
        className="flex flex-row items-center justify-center rounded-full bg-slate-600 p-3"
        onPress={showAlert}
      >
        <Text className="pr-2 font-semibold text-white">Refresh code</Text>
        <MaterialIcons name="refresh" color="white" size={16} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex flex-row items-center justify-center"
        onPress={() => navigate("Join household")}
      >
        <Text className="pr-1">Wanna join with someone's code?</Text>
        <MaterialIcons name="arrow-forward-ios" size={12} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

import { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { trpc } from "../utils/trpc";

export const JoinHouseholdeScreen = () => {
  const [inviteCode, setInviteCode] = useState<string>("");

  const utils = trpc.useContext();
  const { mutate, error, isLoading, data } =
    trpc.household.joinHousehold.useMutation({
      onSuccess: () => {
        utils.household.inviteCode.reset();
        utils.chore.invalidate();
      },
    });

  const onChangeCode = (text: string) => {
    setInviteCode(text);
  };

  return (
    <SafeAreaView className="-mb-12 flex flex-1 items-center justify-center gap-4 bg-slate-100 text-slate-800">
      {!isLoading ? (
        <>
          <Text>Enter household code:</Text>
          <TextInput
            value={inviteCode}
            onChangeText={onChangeCode}
            keyboardType="numeric"
            className="w-52 rounded-xl bg-white p-2 pt-3 text-center text-5xl font-semibold"
            style={{ lineHeight: 50 }}
          />
          <TouchableOpacity
            className="flex flex-row items-center justify-center rounded-full bg-fuchsia-600 p-3"
            onPress={() => mutate({ inviteCode })}
          >
            <Text className="pr-2 font-semibold text-white">Join</Text>
            <MaterialIcons name="arrow-forward-ios" color="white" size={16} />
          </TouchableOpacity>
          {data && (
            <Text className="pr-2">{`Joined "${data.household.name}" succesfully!`}</Text>
          )}
          {error && (
            <Text className="pr-2 font-semibold text-red-400">
              {error.message}
            </Text>
          )}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import type { Household } from ".prisma/client";
import { trpc } from "../utils/trpc";

type NewHouseholdValues = Pick<Household, "name">;

export const NewHouseholdScreen = () => {
  const [household, setHousehold] = useState<NewHouseholdValues>({ name: "" });

  const { mutate, isLoading } = trpc.household.create.useMutation();

  if (isLoading) {
    return (
      <SafeAreaView className="-mb-12 flex flex-1 justify-center bg-slate-100 text-slate-800">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="-mb-12 flex flex-1 justify-center bg-slate-100 text-slate-800">
      <View className="p-4">
        <View className="flex w-full border-b border-slate-200 pb-4">
          <View className="flex flex-row items-center gap-1 pb-2">
            <MaterialIcons name="title" size={16} color={"black"} />
            <Text>Household name</Text>
          </View>
          <TextInput
            className="w-full rounded-xl bg-white p-4"
            value={household.name}
            onChangeText={(name) =>
              setHousehold((household) => ({ ...household, name }))
            }
          />
        </View>

        <TouchableOpacity
          className="my-4 flex flex-row items-center justify-center rounded-full bg-slate-600 p-3"
          onPress={() => mutate(household)}
        >
          <Text className="pr-2 font-semibold text-white">
            Create new household
          </Text>
          <MaterialIcons name="add" color="white" size={16} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

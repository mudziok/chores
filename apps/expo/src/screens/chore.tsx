import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackParamList } from "../router";
import { MaterialIcons } from "@expo/vector-icons";
import { SwipeToConfirm } from "../components/SwipeToConfirm";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { trpc } from "../utils/trpc";
import { format, startOfDay } from "date-fns";
import { Avatar } from "../components/Avatar";
import { useUser } from "@clerk/clerk-expo";
import { DelayTimer } from "../components/DelayTimer";

type ChoreScreenProps = NativeStackScreenProps<StackParamList, "Chore">;

export const ChoreScreen: FC<ChoreScreenProps> = ({ route, navigation }) => {
  const { params } = route;
  const { id, expectedDate, queryDate } = params;
  const utils = trpc.useContext();

  const choreDay = startOfDay(new Date(expectedDate));
  const { user } = useUser();
  const { profileImageUrl, username } = user!;

  const choreQuery = trpc.chore.byId.useQuery(
    { id, day: choreDay },
    {
      initialData: utils.chore.all
        .getData({ day: new Date(queryDate) })
        ?.chores.find((chore) => chore.id === id),
    },
  );

  const { mutate } = trpc.chore.changeStatus.useMutation({
    onMutate: async ({ done }) => {
      await utils.chore.byId.cancel({ id, day: choreDay });
      const data = utils.chore.byId.getData({ id, day: choreDay })!;

      const updated = {
        ...data,
        completedById: done ? "id" : null,
        slot: {
          ...data.slot,
          chores: data.slot.chores.map((chore) =>
            chore.id === id
              ? {
                  ...chore,
                  completedById: done ? "id" : null,
                  completedBy: done
                    ? {
                        id: "id",
                        householdId: "id",
                        profileImageUrl,
                        username: username || "username",
                      }
                    : null,
                }
              : chore,
          ),
        },
      } satisfies Required<typeof data>;

      utils.chore.byId.setData({ id, day: choreDay }, () => updated);
    },
    onSettled: () => utils.chore.all.invalidate(),
  });

  const deleteMutation = trpc.chore.delete.useMutation({
    onMutate: () => {
      const data = utils.chore.all.getData({ day: new Date(queryDate) })!;
      utils.chore.all.setData({ day: new Date(queryDate) }, () => ({
        ...data,
        chores: data.chores.filter((slot) => slot.id !== id),
      }));
    },
    onSuccess: () => {
      utils.chore.all.invalidate({ day: new Date(queryDate) });
      navigation.goBack();
    },
  });

  if (!choreQuery.data || deleteMutation.isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  const { slot, completedById, expectedDate: date } = choreQuery.data;
  const { title, description, chores, repeatDay } = slot;

  const showDeleteAlert = () =>
    Alert.alert(
      "Are you sure?",
      "This action will delete current chore and all chores related to it",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteMutation.mutate({ id: slot.id }),
          style: "destructive",
        },
      ],
    );

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex min-h-full flex-1 flex-col bg-white p-4">
        <View className="flex w-full flex-row items-center justify-between border-b border-slate-200 py-8">
          <Text
            className={`text-3xl font-medium ${
              completedById && "line-through"
            }`}
          >
            {title}
          </Text>
          <DelayTimer expectedDate={date} />
        </View>

        <View className="border-b border-slate-200 py-4">
          <View className="flex flex-row items-center gap-1 pb-2">
            <MaterialIcons name="date-range" size={16} color="black" />
            <Text>Deadline</Text>
          </View>
          <Text>{`${format(date, "d MMMM yyyy")} - ${
            repeatDay ? `every ${format(date, "EEEE")}` : "One time"
          }`}</Text>
        </View>

        {description.length > 0 && (
          <View className="border-b border-slate-200 py-4">
            <View className="flex flex-row items-center gap-1 pb-2">
              <MaterialIcons name="short-text" size={16} color="black" />
              <Text>Description</Text>
            </View>
            <Text>{description}</Text>
          </View>
        )}

        <View className="border-b border-slate-200 py-4">
          <View className="flex flex-row items-center gap-1 pb-2">
            <MaterialIcons name="history" size={16} color="black" />
            <Text>History</Text>
          </View>
          {chores ? (
            <View className="flex w-full flex-row-reverse justify-end">
              {chores.map(({ expectedDate, completedBy }) => (
                <View className="mr-1" key={expectedDate.toISOString()}>
                  {!completedBy ? (
                    <View className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 shadow-sm">
                      <MaterialIcons name="person-search" size={24} />
                    </View>
                  ) : (
                    <Avatar user={completedBy} />
                  )}
                </View>
              ))}
            </View>
          ) : (
            <ActivityIndicator className="h-14" />
          )}
        </View>

        <View className="py-4">
          <View className="flex flex-row items-center gap-1 pb-2">
            <MaterialIcons name="smart-button" size={16} color="black" />
            <Text>Actions</Text>
          </View>
          <View className="flex flex-row gap-2">
            <TouchableOpacity
              className="rounded-full bg-red-400 p-3"
              onPress={showDeleteAlert}
            >
              <Text className="font-semibold text-white">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 justify-end pb-8">
          <View className="flex flex-row items-center gap-1 pb-2">
            <MaterialIcons name="swipe" size={16} color="black" />
            <Text>{`Swipe to ${
              completedById ? "revert completion" : "complete"
            }`}</Text>
          </View>
          <SwipeToConfirm
            isConfirmed={!!completedById}
            setIsConfirmed={(done) => mutate({ id, done })}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

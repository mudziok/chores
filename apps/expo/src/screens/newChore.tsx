import { FC, useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Weekday, WeekdayPicker } from "../components/WeekdayPicker";
import { Checkbox } from "../components/Checkbox";
import { trpc } from "../utils/trpc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../router";

type ChoreValues = {
  title: string;
  description: string;
  weekday: Array<Weekday>;
};

type NewChoreScreenProps = NativeStackScreenProps<StackParamList, "New chore">;

export const NewChore: FC<NewChoreScreenProps> = ({ navigation, route }) => {
  const utils = trpc.useContext();
  const { params } = route;
  const { queryDate } = params;

  const [chore, setChore] = useState<ChoreValues>({
    title: "",
    description: "",
    weekday: [],
  });

  const { mutate, isLoading } = trpc.chore.create.useMutation({
    onSuccess: () => {
      utils.chore.all.invalidate({ day: new Date(queryDate) });
      navigation.goBack();
    },
  });

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView className="flex flex-1 flex-col bg-white p-4">
      <View className="flex w-full flex-row items-center justify-between border-b border-slate-200 py-8">
        <Text className="text-3xl font-medium">New chore</Text>
      </View>
      <View className="flex w-full border-b border-slate-200 py-4">
        <View className="flex flex-row items-center gap-1 pb-2">
          <MaterialIcons name="title" size={16} color={"black"} />
          <Text>Title</Text>
        </View>
        <TextInput
          className="w-full rounded-xl bg-slate-100 p-4"
          value={chore.title}
          onChangeText={(title) => setChore((chore) => ({ ...chore, title }))}
        />
      </View>
      <View className="flex w-full border-b border-slate-200 py-4">
        <View className="flex flex-row items-center gap-1 pb-2">
          <MaterialIcons name="short-text" size={16} color={"black"} />
          <Text>Description</Text>
        </View>
        <TextInput
          multiline
          className="w-full rounded-xl bg-slate-100 p-4 "
          value={chore.description}
          onChangeText={(description) =>
            setChore((chore) => ({ ...chore, description }))
          }
        />
      </View>
      <View className="flex w-full border-b border-slate-200 py-4">
        <View className="flex flex-row items-center gap-1 pb-4">
          <MaterialIcons name="access-time" size={16} color={"black"} />
          <Text>Repetition</Text>
        </View>
        <View className="flex flex-row items-center gap-2 pb-4">
          <TouchableOpacity
            onPress={() => setChore((chore) => ({ ...chore, weekday: [] }))}
          >
            <Checkbox checked={chore.weekday.length === 0}>
              <Text>One time</Text>
            </Checkbox>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              chore.weekday.length === 0 &&
              setChore((chore) => ({ ...chore, weekday: [0] }))
            }
          >
            <Checkbox checked={chore.weekday.length > 0}>
              <Text>Repeating</Text>
            </Checkbox>
          </TouchableOpacity>
        </View>
        <WeekdayPicker
          selectedWeekdays={chore.weekday}
          onSelect={(weekday) =>
            setChore((chore) => ({ ...chore, weekday: [weekday] }))
          }
        />
      </View>
      <TouchableOpacity
        className="my-4 flex flex-row items-center justify-center rounded-full bg-slate-600 p-3"
        onPress={() => mutate({ ...chore, repeatDay: chore.weekday[0] })}
      >
        <Text className="pr-2 font-semibold text-white">Create</Text>
        <MaterialIcons name="create" color="white" size={16} />
      </TouchableOpacity>
    </ScrollView>
  );
};

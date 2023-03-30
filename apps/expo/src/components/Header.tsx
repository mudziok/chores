import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { addDays, eachDayOfInterval, format } from "date-fns";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Text,
} from "react-native";
import { trpc } from "../utils/trpc";
import { Avatar } from "./Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { StackParamList } from "../router";

type NavigationProp = NativeStackNavigationProp<StackParamList>;

interface HeaderProps {
  day: Date;
  setDay: (day: Date) => void;
}

const avaliableDays = eachDayOfInterval({
  start: new Date(),
  end: addDays(new Date(), 7),
});

const viewabilityConfig = {
  waitForInteraction: true,
  itemVisiblePercentThreshold: 50,
};

export const Header: FC<HeaderProps> = ({ day, setDay }) => {
  const { user } = useUser();
  const { navigate } = useNavigation<NavigationProp>();
  const { data } = trpc.chore.all.useQuery({ day });

  const doneText = data && (
    <Text className="font-semibold text-slate-400">{`${data.stats.done}/${data.stats.all} done`}</Text>
  );

  const handleViewableItemsChanged = useCallback((info: any) => {
    setDay(info?.viewableItems[0]?.item);
  }, []);

  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigate("Settings")}>
          <Avatar user={user} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigate("New chore", { queryDate: day.toDateString() })
          }
        >
          <View className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 shadow-sm">
            <MaterialIcons name="add" size={24} />
          </View>
        </TouchableOpacity>
      </View>
      <View className="pt-16 pb-2">
        <FlatList
          data={avaliableDays}
          horizontal={true}
          decelerationRate="fast"
          snapToInterval={Dimensions.get("window").width - 32}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={handleViewableItemsChanged}
          renderItem={({ item }) => (
            <View
              className="flex flex-row items-center justify-between p-2"
              style={{ width: Dimensions.get("window").width - 32 }}
            >
              <Text className="text-3xl">{`${format(
                item,
                "MMMM d",
              )}'s Chores`}</Text>
              {doneText}
            </View>
          )}
        />
      </View>
    </View>
  );
};

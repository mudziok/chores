import React, { FC, useCallback, useState } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { format, startOfDay } from "date-fns";

import { trpc } from "../utils/trpc";
import { ChoreCard } from "../components/ChoreCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../router";
import { Header } from "../components/Header";

type HomeScreenProps = NativeStackScreenProps<StackParamList, "Home">;

const Separator: FC = () => <View className="h-4" />;

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { navigate } = navigation;

  const [day, setDay] = useState<Date>(startOfDay(new Date()));
  const parsedDay = startOfDay(day);
  const { data, refetch } = trpc.chore.all.useQuery({ day: parsedDay });

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="-mb-12 flex flex-1 flex-col bg-white p-4 text-slate-800">
      <FlatList
        data={data?.chores}
        // estimatedItemSize={20}
        ListHeaderComponent={<Header day={day} setDay={setDay} />}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center">
            {data && data.chores.length === 0 ? (
              <Text>{`No chores for ${format(day, "MMMM do")}!`}</Text>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        renderItem={(p) => (
          <TouchableOpacity
            onPress={() =>
              navigate("Chore", {
                id: p.item.id,
                queryDate: day.toDateString(),
                expectedDate: p.item.expectedDate.toDateString(),
              })
            }
          >
            <ChoreCard chore={p.item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

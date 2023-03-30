import { FC } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { formatDistance, isBefore, isSameDay, startOfDay } from "date-fns";
import type { Chore } from ".prisma/client";

type DelayTimerProps = Pick<Chore, "expectedDate">;

export const DelayTimer: FC<DelayTimerProps> = ({ expectedDate }) => {
  const startOfToday = startOfDay(new Date());
  const startOfExpectedDate = startOfDay(expectedDate);
  const isOnTime =
    isBefore(startOfToday, startOfExpectedDate) ||
    isSameDay(startOfToday, startOfExpectedDate);
  const delayTime = isOnTime
    ? "On time"
    : formatDistance(startOfExpectedDate, startOfToday);

  return (
    <View className="flex flex-row items-center gap-1">
      <MaterialIcons
        name="access-time"
        size={16}
        color={isOnTime ? "black" : "#EF4444"}
      />
      <Text className={`${!isOnTime && "text-red-500"}`}>{delayTime}</Text>
    </View>
  );
};

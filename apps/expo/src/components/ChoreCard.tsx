import { View, Text } from "react-native";
import type { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import { DelayTimer } from "./DelayTimer";

export const ChoreCard: React.FC<{
  chore: inferProcedureOutput<AppRouter["chore"]["all"]>["chores"][number];
}> = ({ chore }) => {
  const { slot, completedById, expectedDate } = chore;
  const { title, description } = slot;

  return (
    <View className="flex rounded-3xl border border-slate-200 p-4">
      <Text
        className={`pb-2 text-xl font-medium ${
          completedById && "line-through"
        }`}
      >
        {title}
      </Text>
      {description && (
        <Text className="pb-3 text-slate-500 ">{description}</Text>
      )}
      <View className="flex flex-row justify-between">
        <DelayTimer expectedDate={expectedDate} currentDate={new Date()} />
      </View>
    </View>
  );
};

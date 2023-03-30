import { FC } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // this should be infered from above

interface WeekdayPickerProps {
  selectedWeekdays: Array<Weekday>;
  onSelect: (weekday: Weekday) => void;
}

export const WeekdayPicker: FC<WeekdayPickerProps> = ({
  selectedWeekdays,
  onSelect,
}) => {
  return (
    <View className="flex w-full flex-row justify-between">
      {weekdays.map((date, index) => {
        const selected = selectedWeekdays.includes(index as Weekday);
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect(index as Weekday)}
          >
            <View
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 ${
                selected && "bg-slate-100"
              }`}
            >
              <Text className={`${selected && "font-semibold"}`}>{date}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

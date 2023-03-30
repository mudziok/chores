import { FC, ReactNode } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CheckboxProps {
  children: ReactNode;
  checked: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, children }) => {
  return (
    <View className="flex flex-row items-center gap-1">
      <View
        className={`flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 ${
          checked && "bg-slate-200"
        }`}
      >
        {checked && <MaterialIcons name="circle" size={10} color={"#334155"} />}
      </View>
      {children}
    </View>
  );
};

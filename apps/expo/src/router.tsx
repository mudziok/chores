import { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen } from "./screens/settings";
import { HomeScreen } from "./screens/home";
import { NewHouseholdScreen } from "./screens/newHousehold";
import { ShareHousehold } from "./screens/shareHousehold";
import { JoinHouseholdeScreen } from "./screens/joinHousehold";
import { ChoreScreen } from "./screens/chore";
import { NewChore } from "./screens/newChore";

export type StackParamList = {
  Home: undefined;
  Settings: undefined;
  Chore: { id: string; expectedDate: string; queryDate: string };
  "New chore": { queryDate: string };
  "New household": undefined;
  "Join household": undefined;
  "Share household": undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export const Router: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Chore"
          component={ChoreScreen}
          options={{
            gestureDirection: "vertical",
            animation: "fade_from_bottom",
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="New chore"
          component={NewChore}
          options={{
            gestureDirection: "vertical",
            animation: "fade_from_bottom",
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="New household" component={NewHouseholdScreen} />
        <Stack.Screen name="Share household" component={ShareHousehold} />
        <Stack.Screen name="Join household" component={JoinHouseholdeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

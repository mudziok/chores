import { FC, useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  runOnJS,
  interpolate,
} from "react-native-reanimated";

interface SwipeToConfirmProps {
  isConfirmed: boolean;
  setIsConfirmed: (isConfirmed: boolean) => void;
}

export const SwipeToConfirm: FC<SwipeToConfirmProps> = ({
  isConfirmed,
  setIsConfirmed,
}) => {
  const [maxX, setMaxX] = useState<number>(200);

  const isPressed = useSharedValue(false);
  const offsetX = useSharedValue(isConfirmed ? 1 : 0);
  const startX = useSharedValue(isConfirmed ? 1 : 0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            interpolate(offsetX.value, [0, 1], [0, maxX]),
            {
              duration: isPressed.value ? 0 : 200,
              easing: Easing.ease,
            },
          ),
        },
        { scale: withSpring(isPressed.value ? 1.1 : 1) },
      ],
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offsetX.value = startX.value + e.translationX / maxX;
    })
    .onEnd((e) => {
      if (e.velocityX > 200) {
        offsetX.value = 1;
      } else if (e.velocityX < -200) {
        offsetX.value = 0;
      } else if (offsetX.value > 0.5) {
        offsetX.value = 1;
      } else if (offsetX.value <= 0.5) {
        offsetX.value = 0;
      }
      runOnJS(setIsConfirmed)(offsetX.value > 0.5);
      startX.value = offsetX.value;
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  return (
    <View
      className="w-full rounded-full border border-slate-200 p-2"
      onLayout={(e) => setMaxX(e.nativeEvent.layout.width - 74)}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View
          className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-600"
          style={animatedStyles}
        >
          <MaterialIcons
            size={24}
            color="white"
            name={isConfirmed ? "close" : "check"}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

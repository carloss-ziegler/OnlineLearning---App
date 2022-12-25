import { View, Text } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import {
  IconButton,
  HorizontalCourseCard,
  LineDivider,
} from "../../components";
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  icons,
  dummyData,
} from "../../constants";
import { SharedElement } from "react-native-shared-element";

const CourseListing = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Text>CourseListing</Text>
    </View>
  );
};

export default CourseListing;

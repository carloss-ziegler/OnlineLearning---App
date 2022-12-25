import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { COLORS, SIZES, icons } from "../constants";

const HorizontalCourseCard = ({ containerStyle, course }) => {
  return (
    <TouchableOpacity style={{ flexDirection: "row", ...containerStyle }}>
      <ImageBackground
        source={course?.thumbnail}
        resizeMode="cover"
        style={{
          width: 130,
          height: 130,
          marginBottom: SIZES.radius,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            backgroundColor: COLORS.white,
          }}
        >
          <Image
            source={icons.favourite}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default HorizontalCourseCard;

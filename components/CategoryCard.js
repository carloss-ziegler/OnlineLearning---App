import { Text, TouchableOpacity, Image, StyleSheet, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";
import { SharedElement } from "react-native-shared-element";

const CategoryCard = ({
  category,
  containerStyle,
  onPress,
  sharedElementPrefix,
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 150,
        width: 200,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <SharedElement
        id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Image
          source={category?.thumbnail}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: SIZES.radius,
          }}
        />
      </SharedElement>

      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 5,
        }}
      >
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <Text
            style={{
              position: "absolute",
              color: COLORS.white,
              ...FONTS.h2,
              fontWeight: "600",
            }}
          >
            {category?.title}
          </Text>
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

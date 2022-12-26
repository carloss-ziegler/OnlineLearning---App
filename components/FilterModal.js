import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import { COLORS, SIZES, FONTS, icons, constants } from "../constants";
import { LineDivider, TextButton } from "../components";

const ClassTypeOption = ({
  containerStyle,
  classType,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={classType.icon}
        resizeMode="contain"
        style={{
          width: 40,
          height: 40,
          tintColor: isSelected ? COLORS.white : COLORS.gray80,
        }}
      />

      <Text
        style={{
          marginTop: SIZES.base,
          color: isSelected ? COLORS.white : COLORS.gray80,
          ...FONTS.h3,
          fontWeight: "500",
        }}
      >
        {classType.label}
      </Text>
    </TouchableOpacity>
  );
};

const ClassLevelOption = ({
  containerStyle,
  classLevel,
  isLastItem,
  isSelected,
  onPress,
}) => {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          ...containerStyle,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            flex: 1,
            ...FONTS.body3,
          }}
        >
          {classLevel.label}
        </Text>

        <Image
          source={isSelected ? icons.checkbox_on : icons.checkbox_off}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>

      {!isLastItem && (
        <LineDivider
          lineStyle={{
            height: 1,
          }}
        />
      )}
    </>
  );
};

const FilterModal = ({ filterModalSharedValue1, filterModalSharedValue2 }) => {
  const [selectedClassType, setSelectedClassType] = useState("");
  const [selectedClassLevel, setSelectedClassLevel] = useState("");
  const [selectedCreatedWithin, setSelectedCreatedWithin] = useState("");

  const filterModalContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue1.value,
        [SIZES.height, 0],
        [0, 1]
      ),
      transform: [
        {
          translateY: filterModalSharedValue1.value,
        },
      ],
    };
  });

  const filterModalBgAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1]
      ),
    };
  });

  const filterModalContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1]
      ),
      transform: [
        {
          translateY: filterModalSharedValue2.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 0,
          height: SIZES.height,
          width: SIZES.width,
        },
        filterModalContainerAnimatedStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            height: SIZES.height,
            width: SIZES.width,
            backgroundColor: COLORS.transparentBlack7,
          },
          filterModalBgAnimatedStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              height: SIZES.height * 0.9,
              width: SIZES.width,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: COLORS.white,
            },
            filterModalContentAnimatedStyle,
          ]}
        >
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: "row",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <View
              style={{
                width: 60,
              }}
            />

            <Text
              style={{
                flex: 1,
                textAlign: "center",
                ...FONTS.h1,
                fontWeight: "600",
              }}
            >
              Filter
            </Text>

            <TextButton
              label="Cancel"
              contentContainerStyle={{
                width: 60,
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.black,
                ...FONTS.body3,
              }}
              onPress={() => {
                filterModalSharedValue2.value = withTiming(SIZES.height, {
                  duration: 500,
                });

                filterModalSharedValue1.value = withDelay(
                  500,
                  withTiming(SIZES.height, {
                    duration: 100,
                  })
                );
              }}
            />
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding,
              paddingBottom: 50,
            }}
          >
            <View style={{ marginTop: SIZES.radius }}>
              <Text style={{ ...FONTS.h3, fontWeight: "500" }}>Class Type</Text>

              <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
                {constants.class_types.map((item, index) => {
                  return (
                    <ClassTypeOption
                      key={index}
                      classType={item}
                      isSelected={selectedClassType == item?.id}
                      containerStyle={{
                        marginLeft: index == 0 ? 0 : SIZES.base,
                      }}
                      onPress={() => {
                        setSelectedClassType(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>

            <View
              style={{
                marginTop: SIZES.padding,
              }}
            >
              <Text style={{ ...FONTS.h3, fontWeight: "500" }}>
                Class Level
              </Text>

              <View>
                {constants.class_levels.map((item, index) => {
                  return (
                    <ClassLevelOption
                      key={index}
                      classLevel={item}
                      isLastItem={index == constants.class_levels.length - 1}
                      isSelected={selectedClassLevel == item?.id}
                      onPress={() => {
                        setSelectedClassLevel(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default FilterModal;
